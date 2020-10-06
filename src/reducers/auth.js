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
  savedProfessors: [],
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
    case 'AUTH/SET_USER':
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
    case 'AUTH/SAVE_PROFESSOR':
      return {
        ...state,
        savedProfessors: [...state.savedProfessors, payload],
        loading: false
      }
    case 'AUTH/UNSAVE_PROFESSOR':
      return {
        ...state,
        savedProfessors: [...state.savedProfessors.filter(v => v.id !== payload.id)],
        loading: false
      }
    case 'AUTH/SIGN_OUT':
    default: return state;
  }
}
