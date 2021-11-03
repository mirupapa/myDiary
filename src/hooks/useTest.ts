import { useIsFocused } from '@react-navigation/native'
import 'firebase/firestore'
import { useEffect, useLayoutEffect, useReducer, useState } from 'react'
import { Alert } from 'react-native'
import { auth, db } from '../../firebase'
import { CommonContext } from '../context/commonContext'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { DiaryScreenNavigationProp } from '../screens/Diary/Index'
import { DiaryType, isDiaries, isDiary } from '../types/diary'
import { formatDate } from '../utils/utils'

const useTest = () => {
  const [diary, setDiary] = useState<DiaryType[]>([])
  const commonContext = CommonContext()

  const loadList = async (limit = 20) => {
    let _diaries: DiaryType[] = []

    // await auth.onAuthStateChanged(async (user) => {
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
    }
    // })
    setDiary(_diaries)
  }

  useEffect(() => {
    ;(() => loadList(20))()
    // console.log('diary:', diary[0])
    // console.log('effect')
    // let aaaa: DiaryType[] = []
    // await auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log('yes')
    //     aaaa = []
    //   }
    // })
    // setDiary(aaaa)
  }, [])

  return {
    diary,
  }
}

export default useTest
