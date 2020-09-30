const initialState = {
  professors: [],
  professor: {},
  loading: false,
}

export const professorsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'PROFESSORS/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'PROFESSORS/CLEAR_PROFESSOR':
      return {
        ...state,
        professor: {}
      }
    case 'PROFESSORS/ADD_ONE':
      return {
        ...state,
        professors: [...state.professors, payload],
        newId: payload.id,
        loading: false
      }
    case 'PROFESSORS/REMOVE_ONE':
      return {
        ...state,
        professors: [...state.professors.filter(professor => professor.id !== payload)],
        loading: false
      }
    case 'PROFESSORS/SET_ALL':
      return {
        ...state,
        professors: [...payload],
        loading: false
      }
    case 'PROFESSORS/SET_FILTERS':
      return {
        ...state,
        filters: { ...payload },
        loading: false
      }
    case 'PROFESSORS/SET_ONE':
      const { professor, reviews } = payload;
      return {
        ...state,
        professor: {
          ...professor,
          reviews: [...reviews]
        },
        loading: false,
      }
    case 'PROFESSORS/CLEAR_ONE':
      return {
        ...state,
        professor: {},
        loading: false
      }
    case 'PROFESSORS/UPVOTE_REVIEW':
      return {
        ...state,
        professor: {
          ...state.professor,
          reviews: [...state.professor.reviews]
        }
      }
    case 'PROFESSORS/DOWNVOTE_REVIEW':
      return {
        ...state,
        professor: {
          ...state.professor,
          reviews: [...state.professor.reviews]
        }
      }
    default: return state;
  }
}
