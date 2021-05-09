import React, { createContext, Dispatch, useContext, useReducer } from 'react'

export type State = {
  isLogin: boolean
  isSpinnerView: boolean
  errorMessage: string
}

export const initialState = {
  isLogin: false,
  isSpinnerView: false,
  errorMessage: '',
}

export type Action =
  | { type: 'UPDATE_LOGIN'; payload: boolean }
  | { type: 'UPDATE_SPINNER_VIEW'; payload: boolean }
  | { type: 'UPDATE_ERROR_MESSAGE'; payload: string }

export const loginReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
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