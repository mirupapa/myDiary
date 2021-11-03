import React, { createContext, Dispatch, useContext, useReducer } from 'react'

export type State = {
  isLogin: boolean
  isSpinnerView: boolean
  errorMessage: string
  searchWord: string
  userInfo: firebase.User | null
}

export const initialState: State = {
  isLogin: false,
  isSpinnerView: false,
  errorMessage: '',
  searchWord: '',
  userInfo: null,
}

export type Action =
  | { type: 'UPDATE_LOGIN'; payload: boolean }
  | { type: 'UPDATE_SPINNER_VIEW'; payload: boolean }
  | { type: 'UPDATE_ERROR_MESSAGE'; payload: string }
  | { type: 'UPDATE_SEARCH_WORD'; payload: string }
  | { type: 'SET_USER_INFO'; payload: firebase.User | null }

export const loginReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
        searchWord: '',
      }
    case 'UPDATE_SPINNER_VIEW':
      return {
        ...state,
        isSpinnerView: action.payload,
      }
    case 'UPDATE_ERROR_MESSAGE': {
      return {
        ...state,
        errorMessage: action.payload,
      }
    }
    case 'UPDATE_SEARCH_WORD': {
      return {
        ...state,
        searchWord: action.payload,
      }
    }
    case 'SET_USER_INFO': {
      return {
        ...state,
        userInfo: action.payload,
      }
    }
    default: {
      throw new Error('context default error')
    }
  }
}

const Context = createContext(
  {} as {
    state: State
    dispatch: React.Dispatch<Action>
  },
)

export const CommonProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState)
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export const CommonContext = (): {
  state: State
  dispatch: Dispatch<Action>
} => useContext(Context)
