const initialState = {
  msg: '',
  severity: ''
}

export const feedbackReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'FEEDBACK/SET_ONE':
      const { msg, severity } = payload;
      return {
        ...state,
        msg,
        severity
      }
    case 'FEEDBACK/CLEAR_ONE':
      return {
        ...state,
        msg: '',
        severity: ''
      }
    default: return state;
  }
}
