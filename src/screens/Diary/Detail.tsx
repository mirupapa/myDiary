import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import useDetail from '../../hooks/useDetail'
import Editor from '../../components/Editor'
import { DiaryStackParamList } from '../../navigation/DiaryStack'

export type NavigationProp = StackNavigationProp<DiaryStackParamList, 'Detail'>

type Props = {
  route: any
  navigation: NavigationProp
}

const Detail: React.FC<Props> = ({ route, navigation }) => {
  const { diary } = route.params
  const { state, handlers } = useDetail(diary, navigation)

  return (
    <Editor
      date={diary.date}
      title={diary.title}
      err_title={diary.err_title}
      text={diary.text}
      isReadOnly
      isModalView={state.isModalView}
      onClickViewEdit={handlers.onClickViewEdit}
      onClickDelete={handlers.onClickDelete}
      changeModalView={(value: boolean) => handlers.changeModalView(value)}
    />
  )
}

export default Detail
