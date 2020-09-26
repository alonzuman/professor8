const initialState = {
  filterOptions: [],
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
    case 'PROFESSORS/SET_FILTER_OPTIONS':
      return {
        ...state,
        filterOptions: payload,
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
          reviews
        },
        loading: false,
      }
    case 'PROFESSORS/ADD_REVIEW':
      return {
        ...state,
        professor: {
          ...state.professor,
          reviews: [payload, ...state.professor.reviews]
        },
        loading: false
      }
    case 'PROFESSORS/CLEAR_ONE':
      return {
        ...state,
        professor: {},
        loading: false
      }
    default: return state;
  }
}
