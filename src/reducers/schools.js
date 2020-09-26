const initialState = {
  schools: [],
  school: {},
  loading: false
}

export const schoolsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SCHOOLS/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SCHOOLS/SET_ALL':
      return {
        ...state,
        schools: payload,
        loading: false
      }
    case 'SCHOOLS/SET_ONE':
      return {
        ...state,
        school: payload,
        loading: false
      }
    default: return state;
  }
}
