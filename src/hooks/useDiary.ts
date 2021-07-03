import { useIsFocused } from '@react-navigation/native'
import dayjs from 'dayjs'
import 'firebase/firestore'
import { useEffect, useLayoutEffect, useReducer } from 'react'
import { Alert } from 'react-native'
import { auth, db } from '../../firebase'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryScreenNavigationProp } from '../screens/Diary/Index'
import { DiaryType, isDiaries, isDiary } from '../types/diary'

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
  const { state: commonState, dispatch: commonDispatch } = CommonContext()
  const isFocused = useIsFocused()

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
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: true })
      let _diaries: unknown[] = []

      // const unSubscribe = auth.onAuthStateChanged((user: any) => {
      //   console.log(user)
      // })
      // console.log(unSubscribe)

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const result = await db
            .collection('diary')
            .where('uid', '==', user.uid)
            .orderBy('date', 'desc')
            .limit(limit)
            .get()
          result.forEach((item) => {
            if (
              commonState.searchWord === '' ||
              (typeof item.data().title === 'string' && item.data().title.indexOf(commonState.searchWord) > -1)
            ) {
              const tmp = {
                id: item.id,
                title: item.data().title,
                text: item.data().text,
                date: dayjs(item.data().date.toDate()).format('YYYY/MM/DD'),
              }
              _diaries.push(tmp)
            }
          })
          if (isDiaries(_diaries)) {
            dispatch({ type: 'SET_DIARIES', payload: _diaries })
          }
          console.log('_diaries:', _diaries.length)
        } else {
          Alert.alert('un auth')
          return
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      commonDispatch({ type: 'UPDATE_SPINNER_VIEW', payload: false })
    }
  }



  useEffect(() => {
    let isMounted = true
    console.log('useDiary:', isFocused, 'isMounted:', isMounted)
    if (isMounted && isFocused) {
      console.log('isMounted:', isMounted)
      ;(async () => {
        loadList(state.diaries.length > 0 ? state.diaries.length : 20)
      })()
    }
    return () => {
      isMounted = false
    }
    // isFocused
  }, [isFocused, commonState.searchWord])

  // useLayoutEffect(() => {
  //   const unsubscribe = db
  //     .collection("chats")
  //     .orderBy("createdAt", "desc")
  //     .onSnapshot((snapshot: { docs: any[]; }) =>
  //       setMessages(
  //         snapshot.docs.map((doc) => ({
  //           _id: doc.data()._id,
  //           createdAt: doc.data().createdAt.toDate(),
  //           text: doc.data().text,
  //           user: doc.data().user,
  //         }))
  //       )
  //     );
  //   return unsubscribe;
  // }, []);

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
