import 'firebase/firestore'
import firebase from 'firebase/app'
import { useReducer } from 'react'
import { NavigationProp } from '../screens/Diary/Detail'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryType } from '../types/diary'
import { Alert } from 'react-native'
import { db } from 'src/../firebase'
import { CommonContext } from 'src/context/commonContext'

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
  const commonContext = CommonContext()

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
    try {
      if (commonContext.state.userInfo) {
        db.collection('diary')
          .doc(diary.id)
          .delete()
          .then(() => {
            changeModalView(false)
            navigation.navigate('Diary')
          })
      } else {
        Alert.alert('認証エラー')
      }
    } catch (err) {
      Alert.alert('内部エラー')
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
