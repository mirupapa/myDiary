import React from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../App'
import InputCalendar from '../../components/Inputs/InputCalendar'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Buttons/Button'
import useCreate from '../../hooks/useCreate'
import BannerAd from '../../components/BannerAd'
import Editor from '../../components/Editor'

export type CreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Create'>

type Props = {
  navigation: CreateScreenNavigationProp
}

const DiaryCreate: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useCreate(navigation)

  return (
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
