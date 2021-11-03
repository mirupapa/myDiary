import React, { useEffect } from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet } from 'react-native'
import InputCalendar from './Inputs/InputCalendar'
import Input from './Inputs/Input'
import Button from './Buttons/Button'
import QuestionModal from './Modal/QuestionModal'
import { CommonContext } from 'src/context/commonContext'

type Props = {
  date: string
  onChangeDate?: (value: string) => void
  title: string
  err_title: string
  onChangeTitle?: (value: string) => void
  text: string
  onChangeText?: (value: string) => void
  onSubmit?: () => void
  isDisabled?: boolean
  isReadOnly?: boolean
  onClickViewEdit?: () => void
  isModalView?: boolean
  onClickDelete?: () => void
  changeModalView?: (value: boolean) => void
}

const Editor: React.FC<Props> = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    whitePaper: {
      backgroundColor: '#fff',
      padding: 20,
      flex: 1,
      position: 'relative',
      flexDirection: 'column',
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })
  const { changeModalView } = props
  const commonContext = CommonContext()

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () =>
      commonContext.dispatch({ type: 'IS_VIEW_KEYBOARD', payload: true }),
    )
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () =>
      commonContext.dispatch({ type: 'IS_VIEW_KEYBOARD', payload: false }),
    )

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.whitePaper}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <View style={{ marginRight: 20, minWidth: 150 }}>
              <InputCalendar value={props.date} onChange={props.onChangeDate} readOnly={props.isReadOnly} />
            </View>
            <View style={{ flex: 1, minWidth: 300, maxWidth: 300 }}>
              <Input
                label="TITLE"
                value={props.title}
                errMessage={props.err_title}
                onChange={props.onChangeTitle}
                readOnly={props.isReadOnly}
              />
            </View>
          </View>
          <View style={{ flex: 0.8 }}>
            <Input
              label="TEXT"
              value={props.text}
              onChange={props.onChangeText}
              isMultiline
              height="70%"
              readOnly={props.isReadOnly}
              onSubmit={Keyboard.dismiss}
            />
            {!commonContext.state.isViewKeyboard && (
              <View style={styles.buttonContainer}>
                {props.onSubmit && (
                  <Button
                    label="SAVE"
                    onPress={props.onSubmit}
                    colorType="base_green"
                    isDisabled={props.isDisabled}
                    paddingLeft={30}
                  />
                )}
                {props.isReadOnly && changeModalView && (
                  <View
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                      onPress={props.onClickViewEdit}
                      label="EDIT"
                      colorType="base_blue"
                      iconType="edit"
                      width={120}
                    />
                    <Button
                      onPress={() => changeModalView(true)}
                      label="DELETE"
                      colorType="base_red"
                      iconType="trash"
                      width={140}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {props.isModalView && props.onClickDelete && changeModalView && (
        <QuestionModal
          isView={props.isModalView}
          onPress={props.onClickDelete}
          onClose={() => changeModalView(false)}
          message="削除してよろしいですか？"
        />
      )}
      <KeyboardSpacer />
    </View>
  )
}

export default Editor
