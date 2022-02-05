import { useReducer } from 'react'
import { Alert } from 'react-native'
import { auth } from 'src/../firebase'
import { CommonContext } from 'src/context/commonContext'
import { initialState, reducer, State } from 'src/reducers/loginReducer'
import { SignUpNavigationProp } from 'src/screens/Top/SignUp'

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

const useLogin = (navigation?: SignUpNavigationProp): UseLoginType => {
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
    try {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      await auth.signInWithEmailAndPassword(state.email, state.password)
      if (auth.currentUser && auth.currentUser.emailVerified) {
        commonDispatch({ type: 'SET_USER_INFO', payload: auth.currentUser })
      }
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert('Login Error')
      }
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }

  const onClickSignUp = async () => {
    try {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      const result = await auth.createUserWithEmailAndPassword(state.email, state.password)
      await result.user?.sendEmailVerification()
      Alert.alert('登録されたメールアドレスに、確認用リンクを送信しました。')
      navigation?.navigate('Top')
    } catch (err) {
      Alert.alert('SignUp Error')
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
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
