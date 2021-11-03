import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import useCreate from '../../hooks/useCreate'
import Editor from '../../components/Editor'
import { DiaryStackParamList } from '../../navigation/DiaryStack'
import { View, Text } from 'react-native'

export type CreateScreenNavigationProp = StackNavigationProp<DiaryStackParamList, 'Create'>

type Props = {
  navigation: CreateScreenNavigationProp
}

const DiaryCreate: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useCreate(navigation)

  return (
    // <View>
    //   <Text>aaa</Text>
    // </View>
    <Editor
      date={state.date}
      onChangeDate={handlers.onChangeDate}
      title={state.title}
      err_title={state.err_title}
      onChangeTitle={handlers.onChangeTitle}
      text={state.text}
      onChangeText={handlers.onChangeText}
      onSubmit={handlers.onClickCreate}
      isDisabled={state.isDisabled}
    />
  )
}

export default DiaryCreate
