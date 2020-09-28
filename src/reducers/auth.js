const initialState = {
  isAuth: false,
  uid: '',
  email: '',
  personalDetails: {
    school: '',
    gender: '',
    birthDate: ''
  },
  reviewsCount: 0,
  reviews: [],
  professorsCount: 0,
  professorsAdded: [],
  dateCreated: '',
  loading: false
}

export const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'AUTH/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'AUTH/LOAD_USER':
    case 'AUTH/SIGN_UP':
    case 'AUTH/SIGN_IN':
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case 'AUTH/ERROR':
      return {
        ...state,
        loading: false
      }
    case 'AUTH/SIGN_OUT':
    default: return state;
  }
}
