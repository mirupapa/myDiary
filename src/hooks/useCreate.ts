// import 'firebase/firestore'
import { useReducer } from 'react'
import { Alert } from 'react-native'
import { CommonContext } from 'src/context/commonContext'
import { db } from 'src/../firebase'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { CreateScreenNavigationProp } from '../screens/Diary/Create'
import { formatDate } from '../utils/utils'

export type HandlersType = {
  onClickCreate: () => void
  onChangeText: (value: string) => void
  onChangeTitle: (value: string) => void
  onChangeDate: (value: string) => void
}

export type UseType = {
  state: State
  handlers: HandlersType
}

const useCreate = (navigation: CreateScreenNavigationProp): UseType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const commonContext = CommonContext()

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

  const onClickCreate = async () => {
    try {
      if (commonContext.state.userInfo) {
        var uid = commonContext.state.userInfo.uid
        const id = formatDate(new Date(), 'YYYYMMDDHHmmss') + uid.substring(0, 4)
        const date = state.date.replaceAll('-', '/') + ' 00:00:00'
        await db
          .collection('diary')
          .doc(id)
          .set({
            uid: uid,
            title: state.title,
            text: state.text,
            date: new Date(date),
          })
          .then(async () => {
            console.log('created')
          })
        navigation.navigate('Diary')
      } else {
        Alert.alert('Auth Error')
      }
    } catch (err) {
      Alert.alert('System Error')
    }
  }

  return {
    state,
    handlers: {
      onClickCreate,
      onChangeText,
      onChangeTitle,
      onChangeDate,
    },
  }
}

export default useCreate
