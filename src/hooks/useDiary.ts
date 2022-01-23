import { useIsFocused } from '@react-navigation/core'
import 'firebase/firestore'
import { useEffect, useReducer } from 'react'
import { Alert } from 'react-native'
import { auth, db } from '../../firebase'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryType, isDiaries, isDiary } from '../types/diary'
import { formatDate } from '../utils/utils'

export type HandlersType = {
  onClickDelete: () => void
  changeModalView: (value: boolean) => void
  setTargetDiary: (value: DiaryType) => void
  loadList: (limit: number) => void
}

export type UseType = {
  state: State
  handlers: HandlersType
}

const useDiary = (): UseType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const isFocused = useIsFocused()
  const commonContext = CommonContext()

  const changeModalView = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_MODAL_VIEW',
      payload: value,
    })
  }

  const setTargetDiary = (diary: DiaryType) => {
    dispatch({
      type: 'SET_TARGET_DIARY',
      payload: diary,
    })
  }

  const onClickDelete = async () => {
    try {
      await auth.onAuthStateChanged((user) => {
        if (user && state.targetDiary) {
          db.collection('diary')
            .doc(state.targetDiary.id)
            .delete()
            .then(() => {
              changeModalView(false)
              loadList()
            })
        } else {
          Alert.alert('Auth Error')
        }
      })
    } catch (err) {
      Alert.alert('System Error')
    }
  }

  const loadList = async (limit = 20) => {
    try {
      commonContext.dispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      let _diaries: unknown[] = []
      if (commonContext.state.userInfo) {
        const result = await db
          .collection('diary')
          .where('uid', '==', commonContext.state.userInfo.uid)
          .orderBy('date', 'desc')
          .limit(limit)
          .get()
        result.forEach((item) => {
          if (
            commonContext.state.searchWord === '' ||
            (typeof item.data().title === 'string' && item.data().title.indexOf(commonContext.state.searchWord) > -1)
          ) {
            const tmp = {
              id: item.id,
              title: item.data().title,
              text: item.data().text,
              date: formatDate(item.data().date.toDate(), 'YYYY/MM/DD'),
            }
            _diaries.push(tmp)
          }
        })
        if (isDiaries(_diaries)) {
          dispatch({ type: 'SET_DIARIES', payload: _diaries })
        }
        console.log('_diaries:', _diaries.length)
      } else {
        return
      }
    } catch (err) {
      console.log(err)
    } finally {
      commonContext.dispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }

  useEffect(() => {
    ;(async () => {
      loadList()
    })()
  }, [isFocused, commonContext.state.searchWord])

  return {
    state,
    handlers: {
      onClickDelete,
      changeModalView,
      setTargetDiary,
      loadList,
    },
  }
}

export default useDiary
