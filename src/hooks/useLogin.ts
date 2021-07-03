import { useReducer } from 'react'
import { Alert } from 'react-native'
import { auth } from '../../firebase'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/loginReducer'
import { LoginScreenNavigationProp } from '../screens/Top/Login'
import { SignUpScreenNavigationProp } from '../screens/Top/SignUp'

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

type navigationType = LoginScreenNavigationProp | SignUpScreenNavigationProp

const useLogin = (navigation: navigationType): UseLoginType => {
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

  const onClickLogin = () => {
    console.log('login')
    commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
    auth
      .signInWithEmailAndPassword(state.email, state.password)
      .then((user) => {
        commonDispatch({ type: 'UPDATE_LOGIN', payload: true })
        // navigation.navigate('Diary')
      })
      .catch((error) => {
        Alert.alert('Login Error')
      })
      .finally(() => {
        commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
      })
  }

  const onClickSignUp = () => {
    commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((user) => {
        commonDispatch({ type: 'UPDATE_LOGIN', payload: true })
        //navigation.navigate('Diary')
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
