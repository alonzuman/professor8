const initialState = {
  lists: {},
  ids: [],
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
    case 'SAVED/SET_ALL':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'SAVED/SAVE_PROFESSOR':
      const { list, professor } = payload
      const lists = {
        ...state.lists,
        [list]: state.lists[list] ? [...state.lists[list], professor] : [professor]
      }
      return {
        ...state,
        lists,
        ids: [...state.ids, professor.id],
        loading: false
      }
    case 'SAVED/UNSAVE_PROFESSOR':
      return {
        ...state,
        lists: payload.lists,
        ids: [...state.ids.filter(v => v !== payload.professor.id)],
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
