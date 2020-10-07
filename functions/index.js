const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// REVIEWS
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
exports.deleteReview = functions.firestore
  .document('/professors/{pid}/reviews/{reviewId}')
  .onDelete(async (change, context) => {
    const { tags, approved } = change.data()
    const pid = context.params.pid;

    if (approved === true) {
      if (tags) {
        tags.forEach(async v => await admin.firestore().collection('professors').doc(pid).update({
          tags: admin.firestore.FieldValue.arrayRemove(v)
        }))
      }
      const reviewsSnap = await admin.firestore().collection('professors').doc(pid).collection('reviews').get()
      let reviews = []
      reviewsSnap.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }))
      const filteredReviews = reviews.filter(v => v.approved).map(v => { return v.rating })

      const sum = filteredReviews.reduce((a, b) => a + b, 0)
      const overallRating = (sum / filteredReviews.length)

      return admin.firestore().doc(`professors/${pid}`).update({
        numberOfReviews: admin.firestore.FieldValue.increment(-1),
        overallRating
      })
    } else {
      return null
    }
  })

exports.addReview = functions.firestore
  .document('/professors/{pid}/reviews/{rid}')
  .onCreate(async (snap, context) => {
    const pid = context.params.pid;
    const rid = context.params.rid;
    const { tags, approved } = snap.data()

    if (approved === true) {
      const reviewsSnap = await admin.firestore().collection('professors').doc(pid).collection('reviews').get()
      let reviews = []
      reviewsSnap.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }))
      const filteredReviews = reviews.filter(v => v.approved).map(v => { return v.rating })

      const sum = filteredReviews.reduce((a, b) => a + b, 0)
      const overallRating = (sum / filteredReviews.length)

      if (tags) {
        tags.forEach(async v => {
          await admin.firestore().collection('professors').doc(pid).update({
            tags: admin.firestore.FieldValue.arrayUnion(v)
          })
        })
      }

      await admin.firestore().collection('latestReviews').doc(rid).set(snap.data())
      return await admin.firestore().collection('professors').doc(pid).set({
        overallRating,
        numberOfReviews: filteredReviews.length
      }, { merge: true })
    } else {
      return null
    }
  })

exports.updateReview = functions.firestore
  .document('/professors/{pid}/reviews/{rid}')
  .onUpdate(async (change, context) => {
    const pid = context.params.pid;
    const rid = context.params.rid;
    const { tags, approved } = change.after.data()

    const reviewsSnap = await admin.firestore().collection('professors').doc(pid).collection('reviews').get()
    let reviews = []
    reviewsSnap.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }))
    const filteredReviews = reviews.filter(v => v.approved).map(v => { return v.rating })

    const sum = filteredReviews.reduce((a, b) => a + b, 0)
    const overallRating = (sum / filteredReviews.length)

    if (tags && approved === true) {
      tags.forEach(async v => {
        await admin.firestore().collection('professors').doc(pid).update({
          tags: admin.firestore.FieldValue.arrayUnion(v)
        })
      })
    } else if (tags && approved === false) {
      tags.forEach(async v => {
        await admin.firestore().collection('professors').doc(pid).update({
          tags: admin.firestore.FieldValue.arrayRemove(v)
        })
      })
    }

    await admin.firestore().collection('latestReviews').doc(rid).set(change.after.data())
    return await admin.firestore().collection('professors').doc(pid).set({
      overallRating,
      numberOfReviews: filteredReviews.length
    }, { merge: true })
  })


// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// TAGS
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################
// ###################################################

// TODO
// 1. add functions that adds professor names to the tags collection
// 2. ... for the rest of the content added
