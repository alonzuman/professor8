import { db } from "../firebase"
import qs from 'query-string'
import firebase from 'firebase'
const professorsRef = db.collection('professors')
const tagsRef = db.collection('tags')

export const addProfessor = professor => async dispatch => {
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    const snapshot = await professorsRef.add(professor)
    await tagsRef.doc('professors').update({
      [professor.school]: firebase.firestore.FieldValue.arrayUnion(professor.name)
    })
    dispatch({
      type: 'PROFESSORS/ADD_ONE',
      payload: {
        id: snapshot.id,
        ...professor
      }
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
    let professor = { id: professorSnapshot.id, ...professorSnapshot.data()}
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
    // Calculate professor average rating
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
  const { pid } = review;
  dispatch({
    type: 'PROFESSORS/LOADING'
  })
  try {
    // Calculate professor average rating
    const { overallRating } = professor
    const { rating } = review
    const total = professor.reviews.length

    let overall;

    if (total === 0) {
      overall = rating
    } else {
      overall = (((overallRating * total) + rating) / (total + 1))
    }

    await db.collection('professors').doc(pid).set({
      numberOfReviews: firebase.firestore.FieldValue.increment(1),
      overallRating: overall
    }, { merge: true })

    const snap = await db.collection('professors').doc(pid).collection('reviews').add(review)
    dispatch({
      type: 'PROFESSORS/SET_ONE',
      payload: {
        professor: {
          ...professor,
          numberOfReviews: (professor.numberOfReviews + 1),
          overallRating: overall
        },
        reviews: [...professor.reviews, { id: snap.id, ...review }]
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const upVoteReview = review => async dispatch => {
  try {
    // TODO add a anonymous sign in and set upvotes & downvotes array
    await professorsRef.doc(review.pid).collection('reviews').doc(review.id).update({
      votes: firebase.firestore.FieldValue.increment(1)
    })
    dispatch({
      type: 'PROFESSORS/UPVOTE_REVIEW',
      payload: review.id
    })
  } catch (error) {
    console.log(error)
  }
}

export const downVoteReview = review => async dispatch => {
  try {
    await professorsRef.doc(review.pid).collection('reviews').doc(review.id).update({
      votes: firebase.firestore.FieldValue.increment(-1)
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
