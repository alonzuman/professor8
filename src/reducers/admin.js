const initialState = {
  role: null,
  reviews: [],
  professors: [],
  loading: false
}

export const adminReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'ADMIN/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'ADMIN/SET_PROFESSORS':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'ADMIN/SET_REVIEWS':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'ADMIN/APPROVE_PROFESSOR':
    case 'ADMIN/DECLINE_PROFESSOR':
      return {
        ...state,
        professors: [...state.professors.filter(v => v.id !== payload)],
        loading: false
      }
    case 'ADMIN/DECLINE_REVIEW':
    case 'ADMIN/APPROVE_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews.filter(v => v.id !== payload)],
        loading: false
      }
    case 'ADMIN/UNAPPROVE_REVIEW':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'ADMIN/ERROR':
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
