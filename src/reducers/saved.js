const initialState = {
  lists: [],
  list: {},
  loading: false
}

export const savedReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SAVED/LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SAVED/CLEAR_ONE':
      return {
        ...state,
        list: {},
      }
    case 'SAVED/SET_ONE':
      return {
        ...state,
        list: payload,
        loading: false
      }
    case 'SAVED/SET_ALL':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'SAVED/DELETE_ONE':
      return {
        ...state,
        lists: [...state.lists.filter(v => v.id !== payload)],
        loading: false
      }
    case 'SAVED/SAVE_PROFESSOR':
      return {
        ...state,
        savedIds: [...state.savedIds, payload.pid],
        loading: false
      }
    case 'SAVED/UNSAVE_PROFESSOR':
      return {
        ...state,
        lists: payload.lists,
        savedIds: [...state.savedIds.filter(v => v.pid !== payload.pid)],
        loading: false
      }
    case 'SAVED/ERROR':
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
