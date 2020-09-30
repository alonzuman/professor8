import { db } from "../firebase"
import qs from 'query-string'
import firebase from 'firebase'
const professorsRef = db.collection('professors')
const tagsRef = db.collection('tags')

export const addProfessorAndReview = ({ professor, review }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  const { tags, school, name } = professor
  try {
    let tagsObj = {}
    tags.map(v => tagsObj[v] = 1)

    const snapshot = await professorsRef.add({
      ...professor,
      tags: tagsObj
    })

    await tagsRef.doc('professors').update({
      [school]: firebase.firestore.FieldValue.arrayUnion(name)
    })

    tags.forEach(async v => {
      await tagsRef.doc('professorTags').update({
        tags: firebase.firestore.FieldValue.arrayUnion(v)
      })
    })

    const newProfessor = { id: snapshot.id, ...professor }
    const newReview = { pid: snapshot.id, ...review }

    await dispatch(addReview({ review: newReview, professor: newProfessor }))

    dispatch({
      type: 'PROFESSORS/ADD_ONE',
      payload: newProfessor
    })
  } catch (error) {
    console.log(error)
  }
}

export const getProfessors = () => async dispatch => {
  const parsed = qs.parse(window.location.search)
  const { schools, name } = parsed
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
    }
  }
}

export const getProfessor = (id) => async dispatch => {
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
      payload: { professor, reviews }
    })
  } catch (error) {
    console.log(error)
  }
}

export const clearProfessor = () => {
  return ({
    type: 'PROFESSORS/CLEAR_ONE'
  })
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

    await db.collection('professors').doc(pid).set({
      numberOfReviews: firebase.firestore.FieldValue.increment(-1),
      overallRating: overall
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
  } catch (error) {
    console.log(error);
  }
}

export const addReview = ({ review, professor }) => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const { overallRating } = professor
    const { rating, tags, pid } = review
    const total = professor?.reviews?.length || 0
    let overall;

    if (total === 0) {
      overall = rating
    } else {
      overall = (((overallRating * total) + rating) / (total + 1))
    }

    let tagsObj = {}
    tags.map(v => {
      if (Object.keys(professor.tags).includes(v)) {
        tagsObj[v] = (professor.tags[v] + 1)
      } else {
        tagsObj[v] = 1
      }
    })

    await db.collection('professors').doc(pid).set({
      numberOfReviews: firebase.firestore.FieldValue.increment(1),
      overallRating: overall,
      tags: tagsObj
    }, { merge: true })

    const snap = await db.collection('professors').doc(pid).collection('reviews').add(review)
    const newReviews = professor?.reviews ? [...professor.reviews, { id: snap.id, ...review }] : [{ id: snap.id, ...review }]

    if (professor?.reviews.length !== 0) {
      dispatch({
        type: 'PROFESSORS/SET_ONE',
        payload: {
          professor: {
            ...professor,
            numberOfReviews: (professor.numberOfReviews + 1),
            overallRating: overall
          },
          reviews: newReviews
        }
      })
    }
  } catch (error) {
    console.log(error);
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
  }
}

export const deleteProfessor = professor => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    await professorsRef.doc(professor.id).collection('reviews').delete()
    await professorsRef.doc(professor.id).delete()
    await tagsRef.doc('professors').update({
      [professor.school]: firebase.firestore.FieldValue.arrayRemove(professor.name)
    })

    dispatch({
      type: 'PROFESSORS/DELETE_ONE',
      payload: professor.id
    })
  } catch (error) {
    console.log(error)
  }
}
