const initialState = {
  reviews: [],
  loading: false
}

export const reviewsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'REVIEWS/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'REVIEWS/SET_ALL':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'REVIEWS/ERROR':
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}