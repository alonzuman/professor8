const initialState = {
  filters: {
    name: '',
    institution: ''
  },
  professors: [],
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
    default: return state;
  }
}
