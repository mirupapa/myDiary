import { useIsFocused } from '@react-navigation/native'
import dayjs from 'dayjs'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect, useReducer } from 'react'
import { Alert } from 'react-native'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryScreenNavigationProp } from '../screens/Diary'
import { DiaryType, isDiaries, isDiary } from '../types/diary'

export type HandlersType = {
  onClickDelete: () => void
  changeModalView: (value: boolean) => void
  setTargetDiary: (value: DiaryType) => void
}

export type UseType = {
  state: State
  handlers: HandlersType
}

type navigationType = DiaryScreenNavigationProp

const useDiary = (navigation: navigationType): UseType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { state: commonState } = CommonContext()
  const isFocused = useIsFocused()
  const dbh = firebase.firestore()

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
    console.log('delete')
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user && state.targetDiary) {
          dbh
            .collection('diary')
            .doc(state.targetDiary.id)
            .delete()
            .then(() => {
              changeModalView(false)
              loadList()
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

  const loadList = async () => {
    console.log('loadList')
    let _diaries: unknown[] = []
    let uid = ''
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid
      } else {
        navigation.navigate('Login')
      }
    })
    console.log(uid)
    const searchWord = commonState.searchWord
    const result = await dbh.collection('diary').where('uid', '==', uid).orderBy('date').get()
    result.forEach((item) => {
      if (searchWord === '' || (typeof item.data().title === 'string' && item.data().title.indexOf(searchWord) > -1)) {
        const tmp = {
          id: item.id,
          title: item.data().title,
          text: item.data().text,
          date: dayjs(item.data().date.toDate()).format('YYYY/MM/DD'),
        }
        _diaries.push(tmp)
      }
    })
    console.log(_diaries.length)
    if (isDiaries(_diaries)) {
      dispatch({ type: 'SET_DIARIES', payload: _diaries })
    }
  }

  useEffect(() => {
    console.log('useDiary:', isFocused)
    let isMounted = true
    if (isMounted && isFocused) {
      console.log('isMounted:', isMounted)
      ;(async () => {
        loadList()
      })()
    }
    return () => {
      isMounted = false
    }
    // isFocused
  }, [isFocused, commonState.searchWord])

  return {
    state,
    handlers: {
      onClickDelete,
      changeModalView,
      setTargetDiary,
    },
  }
}

export default useDiary
