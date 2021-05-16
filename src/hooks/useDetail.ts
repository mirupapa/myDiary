import { useIsFocused } from '@react-navigation/native'
import 'firebase/firestore'
import { useEffect, useReducer } from 'react'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryType, isDiary } from '../types/diary'

export type HandlersType = {
  onClickDelete: () => void
  onClickCreate: () => void
  onClickEdit: (item: DiaryType) => void
  onChangeText: (value: string) => void
  onChangeTitle: (value: string) => void
  onChangeDate: (value: string) => void
  changeModalView: (value: boolean) => void
  setTargetDiary: (value: DiaryType) => void
}

export type Type = {
  state: State
}

const useDetail = (diary: DiaryType): Type => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log('useDetail:', isFocused)
    let isMounted = true
    if (isMounted) {
      console.log('isMounted:', isMounted)
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
  }
}

export default useDetail
