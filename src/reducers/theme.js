const initialState = {
  language: 'he',
  theme: localStorage.getItem('theme'),
  loading: false
}

export const themeReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'THEME/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'THEME/SET_THEME':
      return {
        ...state,
        theme: payload,
        loading: false
      }
    case 'THEME/CLEAR_LOADING':
    case 'THEME/ERROR':
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
