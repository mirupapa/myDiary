import { useIsFocused } from '@react-navigation/native'
import dayjs from 'dayjs'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useReducer } from 'react'
import { Alert } from 'react-native'
import { initialState, reducer, State } from '../reducers/diaryReducer'
import { CreateScreenNavigationProp } from '../screens/Diary/Create'

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

type navigationType = CreateScreenNavigationProp

const useCreate = (navigation: navigationType): UseType => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const isFocused = useIsFocused()
  const dbh = firebase.firestore()

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
    console.log('create:', isFocused)
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user && isFocused) {
          var uid = user.uid
          const id = dayjs().format('YYMMDDHHmmss') + uid.substring(0, 4)
          const date = state.date.replaceAll('-', '/') + ' 00:00:00'
          console.log('date:', date)
          await dbh
            .collection('diary')
            .doc(id)
            .set({
              uid: uid,
              title: state.title,
              text: state.text,
              date: new Date(date),
            })
            .then(async () => {
              console.log('isFocused:', isFocused)
              console.log('created')
            })
          navigation.navigate('Diary')
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
      onClickCreate,
      onChangeText,
      onChangeTitle,
      onChangeDate,
    },
  }
}

export default useCreate
