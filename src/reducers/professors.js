const initialState = {
  professors: [],
  lastProfessorId: '',
  professor: {},
  loading: false,
  isFetchingMore: false
}

export const professorsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'PROFESSORS/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'PROFESSORS/CLEAR_LOADING':
      return {
        ...state,
        loading: false
      }
    case 'PROFESSORS/FETCHING_MORE':
      return {
        ...state,
        isFetchingMore: true
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
    case 'PROFESSORS/DELETE_ONE':
      return {
        ...state,
        professors: [...state.professors.filter(professor => professor.id !== payload)],
        loading: false
      }
    case 'PROFESSORS/SET_ALL':
      return {
        ...state,
        ...payload,
        isFetchingMore: false,
        loading: false
      }
    case 'PROFESSORS/SET_FILTERS':
      return {
        ...state,
        ...payload
      }
    case 'PROFESSORS/SET_LAST_PROFESSOR':
      return {
        ...state,
        lastProfessorId: payload
      }
    case 'PROFESSORS/SET_FILTERS':
      return {
        ...state,
        filters: { ...payload },
        loading: false
      }
    case 'PROFESSORS/SET_ONE':
      const { professor } = payload;
      return {
        ...state,
        professor: {
          ...professor,
        },
        loading: false,
      }
    case 'PROFESSORS/CLEAR_ALL':
      return {
        ...state,
        professors: [],
        loading: false
      }
    case 'PROFESSORS/CLEAR_ONE':
      return {
        ...state,
        professor: {},
        loading: false
      }
    case 'PROFESSORS/ERROR':
      return {
        ...state,
        isFetchingMore: false,
        loading: false
      }
    default: return state;
  }
}
