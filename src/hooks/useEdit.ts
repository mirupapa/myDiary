// import 'firebase/firestore'
import { useEffect, useReducer } from 'react'
import { Alert } from 'react-native'
import { auth, db } from '../../firebase'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { EditScreenNavigationProp } from '../screens/Diary/Edit'
import { DiaryType, isDiary } from '../types/diary'

export type HandlersType = {
  onClickEdit: () => void
  onChangeText: (value: string) => void
  onChangeTitle: (value: string) => void
  onChangeDate: (value: string) => void
}

export type UseLoginType = {
  state: State
  handlers: HandlersType
}

type navigationType = EditScreenNavigationProp

const useDiary = (navigation: navigationType, diary?: DiaryType): UseLoginType => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onChangeText = (value: string) => {
    dispatch({
      type: 'UPDATE_TEXT',
      payload: value,
    })
  }

  const onChangeTitle = (value: string) => {
    dispatch({
      type: 'UPDATE_TITLE',
      payload: value,
    })
  }

  const onChangeDate = (value: string) => {
    dispatch({
      type: 'UPDATE_DATE',
      payload: value,
    })
  }

  const onClickEdit = async () => {
    if (!diary) return null
    try {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          const date = state.date.replaceAll('-', '/') + ' 00:00:00'
          db.collection('diary')
            .doc(diary.id)
            .update({ title: state.title, text: state.text, date: new Date(date) })
          navigation.navigate('Diary')
        } else {
          Alert.alert('Auth Error')
        }
      })
    } catch (err) {
      Alert.alert('System Error')
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (isDiary(diary)) {
        dispatch({
          type: 'UPDATE_TITLE',
          payload: diary.title,
        })
        dispatch({
          type: 'UPDATE_TEXT',
          payload: diary.text,
        })
        dispatch({
          type: 'UPDATE_DATE',
          payload: diary.date,
        })
      }
    }
    return () => {
      isMounted = false
    }
  }, [])

  return {
    state,
    handlers: {
      onClickEdit,
      onChangeText,
      onChangeTitle,
      onChangeDate,
    },
  }
}

export default useDiary
