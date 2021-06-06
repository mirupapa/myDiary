import 'firebase/firestore'
import firebase from 'firebase/app'
import { useReducer } from 'react'
import { NavigationProp } from '../screens/Diary/Detail'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryType, isDiary } from '../types/diary'
import { Alert } from 'react-native'

export type HandlersType = {
  onClickDelete: () => void
  changeModalView: (value: boolean) => void
  onClickViewEdit: () => void
}

export type Type = {
  state: State
  handlers: HandlersType
}

const useDetail = (diary: DiaryType, navigation: NavigationProp): Type => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dbh = firebase.firestore()

  const changeModalView = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_MODAL_VIEW',
      payload: value,
    })
  }

  const onClickViewEdit = () => {
    navigation.navigate('Edit', { diary })
  }

  const onClickDelete = async () => {
    console.log('delete')
    console.log('test2', diary.id)
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user && diary.id) {
          dbh
            .collection('diary')
            .doc(diary.id)
            .delete()
            .then(() => {
              changeModalView(false)
              console.log('test2')
              navigation.navigate('Diary')
            })
        } else {
          Alert.alert('Auth Error')
          navigation.navigate('Login')
        }
      })
    } catch (err) {
      Alert.alert('System Error')
      navigation.navigate('Login')
    }
  }

  return {
    state,
    handlers: {
      onClickViewEdit,
      onClickDelete,
      changeModalView,
    },
  }
}

export default useDetail
