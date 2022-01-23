import { useReducer } from 'react'
import { Alert } from 'react-native'
import { auth } from 'src/../firebase'
import { CommonContext } from 'src/context/commonContext'
import { initialState, reducer, State } from 'src/reducers/loginReducer'

export type HandlersType = {
  onClickLogin: () => void
  onClickSignUp: () => void
  onChangeEmail: (value: string) => void
  onChangePassword: (value: string) => void
}

export type UseLoginType = {
  state: State
  handlers: HandlersType
}

const useLogin = (): UseLoginType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { dispatch: commonDispatch } = CommonContext()

  const onChangeEmail = (value: string) => {
    dispatch({
      type: 'UPDATE_EMAIL',
      payload: value,
    })
  }

  const onChangePassword = (value: string) => {
    dispatch({
      type: 'UPDATE_PASSWORD',
      payload: value,
    })
  }

  const onClickLogin = async () => {
    commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
    try {
      await auth.signInWithEmailAndPassword(state.email, state.password)
      commonDispatch({ type: 'UPDATE_LOGIN', payload: true })
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert('Login Error')
      }
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }

  const onClickSignUp = () => {
    commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((_user: any) => {
        commonDispatch({ type: 'UPDATE_LOGIN', payload: true })
      })
      .catch(() => {
        Alert.alert('SignUp Error')
      })
      .finally(() => {
        commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
      })
  }

  return {
    state,
    handlers: {
      onClickLogin,
      onClickSignUp,
      onChangeEmail,
      onChangePassword,
    },
  }
}

export default useLogin
