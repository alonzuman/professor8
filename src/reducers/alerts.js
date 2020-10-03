const initialState = {
  msg: '',
  severity: '',
  on: false
}

export const alertsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'ALERTS/SET_ONE':
      const { msg, severity } = payload
      console.log('hi from reducer')
      return {
        ...state,
        msg,
        severity,
        on: true
      }
    case 'ALERTS/CLEAR_ONE':
      return {
        ...state,
        msg: '',
        severity: '',
        on: false
      }
    default: return state;
  }
}
