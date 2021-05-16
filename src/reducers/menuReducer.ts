export type State = {
  isMenuView: boolean
  isModalView: boolean
}

export type Action =
  | { type: 'UPDATE_IS_MENU_VIEW'; payload: boolean }
  | { type: 'UPDATE_IS_MODAL_VIEW'; payload: boolean }

export const initialState: State = {
  isMenuView: false,
  isModalView: false,
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_IS_MENU_VIEW': {
      return {
        ...state,
        isMenuView: action.payload,
      }
    }
    case 'UPDATE_IS_MODAL_VIEW': {
      return {
        ...state,
        isModalView: action.payload,
      }
    }
  }
}
