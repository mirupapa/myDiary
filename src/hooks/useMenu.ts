import { useReducer } from 'react'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/menuReducer'
import { auth } from '../../firebase'

export type HandlersType = {
  changeMenuView: (value: boolean) => void
  changeModalView: (value: boolean) => void
  logout: () => void
}

export type UseLoginType = {
  state: State
  handlers: HandlersType
}

const useMenu = (): UseLoginType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { dispatch: commonDispatch } = CommonContext()

  const changeMenuView = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_MENU_VIEW',
      payload: value,
    })
  }

  const changeModalView = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_MODAL_VIEW',
      payload: value,
    })
  }

  const logout = () => {
    commonDispatch({ type: 'UPDATE_LOGIN', payload: false })
    auth
      .signOut()
      .then(() => {
        console.log('Sign out success!')
      })
      .catch((error: { message: any }) => {
        console.error(error.message)
      })
  }

  return {
    state,
    handlers: {
      changeMenuView,
      changeModalView,
      logout,
    },
  }
}

export default useMenu
