import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../App'
import useEdit from '../../hooks/useEdit'
import Editor from '../../components/Editor'

export type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit'>

type Props = {
  route: any
  navigation: EditScreenNavigationProp
}

const Edit: React.FC<Props> = ({ route, navigation }) => {
  const { state, handlers } = useEdit(navigation, route.params.diary)

  return (
    <Editor
      date={state.date}
      onChangeDate={handlers.onChangeDate}
      title={state.title}
      err_title={state.err_title}
      onChangeTitle={handlers.onChangeTitle}
      text={state.text}
      onChangeText={handlers.onChangeText}
      onSubmit={handlers.onClickEdit}
      isDisabled={state.isDisabled}
    />
  )
}

export default Edit
