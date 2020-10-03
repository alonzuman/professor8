const initialState = {
  msg: '',
  type: '',
  on: false
}

export const alertsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'ALERTS/SET_ONE':
      const { msg, type } = payload
      console.log(msg, type)
      return {
        ...state,
        msg,
        type,
        on: true
      }
    case 'ALERTS/CLEAR_ONE':
      return {
        ...state,
        msg: '',
        type: '',
        on: false
      }
    default: return state;
  }
}
