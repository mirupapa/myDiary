import { useReducer } from 'react'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/menuReducer'
import { auth, db } from '../../firebase'
import { Alert } from 'react-native'

const useMenu = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { state: commonState, dispatch: commonDispatch } = CommonContext()

  const changeMenuView = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_MENU_VIEW',
      payload: value,
    })
  }

  const closeModalView = () => {
    dispatch({ type: 'CLOSE_MODAL_VIEW' })
  }

  const setModalLogout = () => {
    dispatch({
      type: 'SET_MODAL_VIEW',
      payload: {
        isView: true,
        onPress: logout,
        onClose: closeModalView,
        message: 'ログアウトしますか？',
      },
    })
  }
  const setModalRetire = () => {
    dispatch({
      type: 'SET_MODAL_VIEW',
      payload: {
        isView: true,
        onPress: retire,
        onClose: closeModalView,
        message: '全てのデータが削除されます。アカウントを削除してよろしいですか？',
      },
    })
  }

  const logout = () => {
    commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
    auth
      .signOut()
      .then(() => {
        console.log('Sign out success!')
      })
      .catch((error: { message: any }) => {
        console.error(error.message)
      })
      .finally(() => commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false }))
  }

  const retire = async () => {
    commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
    try {
      const info = commonState.userInfo
      const user = auth.currentUser
      if (user && info) {
        const list = await db.collection('diary').where('uid', '==', info.uid).get()
        list.forEach((item) => {
          item.ref.delete()
        })
        await auth.currentUser?.delete()
        await auth.signOut()
      } else {
        Alert.alert('Auth Error')
      }
    } catch (err) {
      Alert.alert('System Error')
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }

  return {
    state,
    handlers: {
      changeMenuView,
      setModalLogout,
      setModalRetire,
      logout,
      retire,
    },
  }
}

export default useMenu
