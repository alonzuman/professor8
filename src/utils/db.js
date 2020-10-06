import { db } from "../firebase"

export const approveAllProfessors = async () => {
  try {
    const snap = await db.collection('professors').get()
    snap.forEach(doc => db.collection('professors').doc(doc.id).set({
      approved: true
    }, { merge: true }))
    console.log('done')
  } catch (error) {
    console.log(error)
  }
}
