import heb from "./translation/heb"

export const professorCardSubtitle = ({ num, school }) => {
  if (!num) {
    return school
  } else if (num === 1) {
    return `${heb.oneReview}`
  } else if (num > 1) {
    return `${num} ${heb.reviews}`
  }
}

export const numberOfProfessors = ({ num }) => {
  if (!num) {
    return null
  } else if (num === 1) {
    return `${heb.oneProfessor}`
  } else if (num > 1) {
    return `${num} ${heb.professors}`
  }
}
