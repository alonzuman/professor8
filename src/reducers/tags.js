const initialState = {
  tags: {},
  loading: true
}

export const tagsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'TAGS/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'TAGS/SET_ALL':
      return {
        ...state,
        ...payload,
        loading: false
      }
    default: return state;
  }
}
