export const getCorrectCount = professor => {
  if (professor?.reviews) {
    const { reviews } = professor;
    console.log(reviews)
    let approved = reviews?.filter(v => v.approved)
    console.log(approved)
  }
}
