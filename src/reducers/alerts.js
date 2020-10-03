const initialState = {
  msg: '',
  type: '',
}

export const alertsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'ALERTS/SET_ONE':
      const { msg, type } = payload
      return {
        ...state,
        msg,
        type
      }
    case 'ALERTS/CLEAR_ONE':
      return {
        msg: '',
        type: ''
      }
    default: return state;
  }
}
