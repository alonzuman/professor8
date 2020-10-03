import { db } from "../firebase"
import qs from 'query-string'
import firebase from 'firebase'
import { setAlert } from "./alerts"
import heb from "../utils/translation/heb"
const professorsRef = db.collection('professors')
const tagsRef = db.collection('tags')

export const addProfessorAndReview = ({ professor, review }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  const { name, school } = professor
  try {
    const professorSnap = await professorsRef.where('name', '==', name).get()
    let oldResults = []
    let snapshot;

    if (professorSnap.size !== 0) {
      professorSnap.forEach(doc => oldResults.push({ id: doc.id, ...doc.data() }))
      snapshot = await professorsRef.doc(oldResults[0].id).set({
        ...professor,
      }, { merge: true })
    } else {
      snapshot = await professorsRef.add({
        ...professor,
        tags: []
      })
    }


    await tagsRef.doc('professors').update({
      [school]: firebase.firestore.FieldValue.arrayUnion(name)
    })

    const newProfessor = { id: snapshot.id, ...professor }
    const newReview = { pid: snapshot.id, ...review }

    await dispatch(addReview({ review: newReview, professor: newProfessor, isNew: true }))

    dispatch({
      type: 'PROFESSORS/ADD_ONE',
      payload: newProfessor
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const getProfessors = () => async dispatch => {
  const parsed = qs.parse(window.location.search)
  const { schools, name } = parsed
  dispatch({
    type: 'PROFESSORS/CLEAR_ALL'
  })
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  if (schools || name) {
    try {
      let snapshot;
      if (schools && name) {
        snapshot = await professorsRef.where("school", "==", schools).where('name', '==', name).get()
      } else if (schools) {
        snapshot = await professorsRef.where("school", "==", schools).get()
      } else {
        snapshot = await professorsRef.where("name", "==", name).get()
      }
      let results = []
      snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
      dispatch({
        type: 'PROFESSORS/SET_ALL',
        payload: results
      })
    } catch (error) {
      console.log(error)
      dispatch(setAlert({
        msg: heb.serverError,
        severity: 'error'
      }))
    }
  }
}

export const getProfessor = (id) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/CLEAR_ONE'
  })
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const professorSnapshot = await professorsRef.doc(id).get()
    const reviewsSnapshot = await professorsRef.doc(id).collection('reviews').get()
    let professor = { id: professorSnapshot.id, ...professorSnapshot.data() }
    let reviews = []
    reviewsSnapshot.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'PROFESSORS/SET_ONE',
      payload: { professor, reviews: reviews.filter(v => v.approved) }
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const deleteReview = ({ review, professor }) => async dispatch => {
  const { pid } = review;
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const { overallRating } = professor
    const { rating } = review
    const total = professor.reviews.length

    let overall;
    if (total === 1) {
      overall = 0
    } else {
      overall = (((overallRating * total) - rating) / (total - 1))
    }

    let newTagsObj = {}
    Object.keys(professor.tags).map((v, i) => {
      if (review.tags.includes(v)) {
        return newTagsObj[v] = professor.tags[v] - 1
      } else {
        return newTagsObj[v] = professor.tags[v]
      }
    })

    await db.collection('professors').doc(pid).set({
      numberOfReviews: firebase.firestore.FieldValue.increment(-1),
      overallRating: overall,
      tags: newTagsObj
    }, { merge: true })

    await db.collection('professors').doc(pid).collection('reviews').doc(review.id).delete()
    dispatch({
      type: 'PROFESSORS/SET_ONE',
      payload: {
        professor: {
          ...professor,
          numberOfReviews: (professor.numberOfReviews - 1),
          overallRating: overall
        },
        reviews: [...professor.reviews.filter(v => v.id !== review.id)]
      }
    })
    dispatch(setAlert({
      severity: 'success',
      msg: heb.reviewDeleted
    }))
  } catch (error) {
    console.log(error);
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const addReview = ({ review, professor, isNew }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    await db.collection('reviews').add({
      dateCreated: Date.now(),
      pid: professor.id,
      ...review,
      approved: false
    })

    dispatch({
      type: 'PROFESSORS/CLEAR_LOADING',
    })
    dispatch(setAlert({
      severity: 'success',
      msg: heb.actionSuccessAndPending
    }))
  } catch (error) {
    console.log(error);
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const upVoteReview = ({ review, uid, pid }) => async dispatch => {
  const { id } = review;
  try {
    await professorsRef.doc(pid).collection('reviews').doc(id).update({
      votes: firebase.firestore.FieldValue.increment(1),
      upVotesArray: firebase.firestore.FieldValue.arrayUnion(uid),
      downVotesArray: firebase.firestore.FieldValue.arrayRemove(uid)
    })
    dispatch({
      type: 'PROFESSORS/UPVOTE_REVIEW',
      payload: id
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const downVoteReview = ({ review, uid }) => async dispatch => {
  try {
    await professorsRef.doc(review.pid).collection('reviews').doc(review.id).update({
      votes: firebase.firestore.FieldValue.increment(-1),
      upVotesArray: firebase.firestore.FieldValue.arrayRemove(uid),
      downVotesArray: firebase.firestore.FieldValue.arrayUnion(uid)
    })
    dispatch({
      type: 'PROFESSORS/DOWNVOTE_REVIEW',
      payload: review.id
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}

export const deleteProfessor = professor => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const reviewsSnap = await professorsRef.doc(professor.id).collection('reviews').get()
    reviewsSnap.forEach(async doc => await professorsRef.doc(professor.id).collection('reviews').doc(doc.id).delete())
    await professorsRef.doc(professor.id).delete()
    await tagsRef.doc('professors').update({
      [professor.school]: firebase.firestore.FieldValue.arrayRemove(professor.name)
    })

    dispatch({
      type: 'PROFESSORS/DELETE_ONE',
      payload: professor.id
    })
    dispatch(setAlert({
      severity: 'success',
      msg: heb.deletedSuccessfully
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: heb.serverError,
      severity: 'error'
    }))
  }
}
