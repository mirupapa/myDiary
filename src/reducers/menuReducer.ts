export type State = {
  isMenuView: boolean
  modalView: {
    isView: boolean
    onPress: () => void
    onClose: () => void
    message: string
  } | null
}

export type Action =
  | { type: 'UPDATE_IS_MENU_VIEW'; payload: boolean }
  | { type: 'SET_MODAL_VIEW'; payload: State['modalView'] }
  | { type: 'CLOSE_MODAL_VIEW' }

export const initialState: State = {
  isMenuView: false,
  modalView: null,
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_IS_MENU_VIEW': {
      return {
        ...state,
        isMenuView: action.payload,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.payload,
      }
    }
    case 'CLOSE_MODAL_VIEW': {
      return {
        ...state,
        modalView: null,
      }
    }
    default: {
      throw new Error()
    }
  }
}
