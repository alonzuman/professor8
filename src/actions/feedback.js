export const clearFeedback = () => {
  return {
    type: 'FEEDBACK/CLEAR_ONE'
  }
}

export const setFeedback = ({ msg, severity }) => async dispatch => {
  dispatch({
    type: 'FEEDBACK/SET_ONE',
    payload: {
      msg, severity
    }
  })
  setTimeout(() => {
    dispatch(clearFeedback())
  }, 4000);
}
