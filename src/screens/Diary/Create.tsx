import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../App'
import InputCalendar from '../../components/Inputs/InputCalendar'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Buttons/Button'
import useCreate from '../../hooks/useCreate'

export type CreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Create'>

type Props = {
  navigation: CreateScreenNavigationProp
}

const DiaryCreate: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useCreate(navigation)

  const styles = StyleSheet.create({
    whitePaper: {
      backgroundColor: '#fff',
      height: '100%',
      paddingTop: 10,
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.whitePaper}>
        <StatusBar style="auto" />
        <InputCalendar value={state.date} onChange={handlers.onChangeDate} />
        <Input
          label="TITLE"
          value={state.title}
          errMessage={state.err_title}
          onChange={handlers.onChangeTitle}
          width="60%"
        />
        <Input label="TEXT" value={state.text} onChange={handlers.onChangeText} isMultiline height="60%" width="60%" />
        <View style={styles.buttonContainer}>
          <Button label="SAVE" onPress={handlers.onClickCreate} colorType="base_green" isDisabled={state.isDisabled} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DiaryCreate
