export const setAlert = ({ msg, type }) => async dispatch => {
  dispatch({
    type: 'ALERTS/SET_ONE',
    payload: {
      msg,
      type
    }
  })
  setTimeout(() => {
    dispatch(clearAlert())
  }, 3000);
}

export const clearAlert = () => async dispatch => {
  dispatch({
    type: 'ALERTS/CLEAR_ONE'
  })
}
