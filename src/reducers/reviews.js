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
    case 'REVIEWS/ADD_ONE':
      return {
        ...state,
        reviews: [...state.reviews, payload],
        loading: false
      }
    case 'REVIEWS/SET_ALL':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'PROFESSORS/UPVOTE_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews]
      }
    case 'PROFESSORS/DOWNVOTE_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews]
      }
    case 'REVIEWS/CLEAR_LOADING':
    case 'REVIEWS/ERROR':
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
