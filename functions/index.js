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

exports.adminApproveReview = functions.firestore
  .document('pendingReviews/{rid}')
  .onWrite(async (change, context) => {
    const { rid } = context.params
    const review = { id: change.after.id, ...change.after.data() }
    const { pid } = review

    try {
      if (review.approved === true) {
        await admin.firestore().collection('professors').doc(pid).collection('reviews').doc(rid).update({
          approved: true
        })
        await admin.firestore().collection('pendingReviews').doc(rid).delete()
        await admin.firestore().collection('latestReviews').doc(rid).set(review)
      }
    } catch (error) {
      console.log(error)
    }
  })

exports.updateProfessorOnReviewAdd = functions.firestore
  .document('professors/{pid}/reviews/{rid}')
  .onWrite(async (change, context) => {
    const { pid } = context.params;
    const review = { id: change.after.id, ...change.after.data(), pid }
    const professorRef = admin.firestore().collection('professors').doc(pid)

    try {
      // Get all reviews and calc: new professor average && reviewCount
      const reviewsSnap = await professorRef.collection('reviews').get()

      let reviews = []
      reviewsSnap.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }))

      // calculate new approved reviews size
      const approvedReviewsArr = reviews.filter(v => v.approved)
      const approvedReviewsSize = approvedReviewsArr.length
      const approvedRatingsArr = approvedReviewsArr.map(v => { if (v.approved) return v.rating })

      // calculate new rating
      let newOverallRating;
      if (approvedRatingsArr.length > 1) {
        const sum = approvedRatingsArr.reduce((a, b) => a + b, 0)
        newOverallRating = (sum / approvedReviewsSize)
      } else {
        newOverallRating = approvedRatingsArr[0]
      }

      // count tags
      let newTags = {}
      approvedReviewsArr.forEach(v => {
        if (v.tags) {
          v.tags.forEach(tag => {
            if (!newTags[tag]) {
              newTags[tag] = 1
            } else {
              newTags[tag] = newTags[tag] + 1
            }
          })
        }
      })

      // if approved push to latest reviews
      if (review.approved === true) {
        await admin.firestore().collection('latestReviews').doc(review.id).set(review)
        await admin.firestore().collection('pendingReviews').doc(review.id).delete()
      } else if (review.approved === false) {
        await admin.firestore().collection('latestReviews').doc(review.id).delete()
        await admin.firestore().collection('pendingReviews').doc(review.id).set(review)
      } else {
        await admin.firestore().collection('latestReviews').doc(review.id).delete()
        await admin.firestore().collection('pendingReviews').doc(review.id).delete()
        await professorRef.collection('reviews').doc(review.id).delete()
      }

      const data = { reviewsCount: approvedReviewsSize, rating: newOverallRating, tags: newTags }
      // update professor doc
      return await professorRef.set(data, { merge: true })
    } catch (error) {
      console.log('###########################')
      console.log('########## ERROR ##########')
      console.log('###########################')
      return console.log(error)
    }
  })

// // TODO
// // 1. add functions that adds professor names to the tags collection
// // 2. ... for the rest of the content added
