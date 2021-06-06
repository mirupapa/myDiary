import React from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Text } from 'react-native'
import InputCalendar from './Inputs/InputCalendar'
import Input from './Inputs/Input'
import Button from './Buttons/Button'
import BannerAd from './BannerAd'
import QuestionModal from './Modal/QuestionModal'

const Editor: React.FC<{
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
}> = ({
  date,
  onChangeDate,
  title,
  err_title,
  onChangeTitle,
  text,
  onChangeText,
  onSubmit,
  isDisabled,
  isReadOnly,
  onClickViewEdit,
  isModalView,
  onClickDelete,
  changeModalView,
}) => {
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

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.whitePaper}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <View style={{ marginRight: 20, minWidth: 150 }}>
              <InputCalendar value={date} onChange={onChangeDate} readOnly={isReadOnly} />
            </View>
            <View style={{ flex: 1, minWidth: 300, maxWidth: 300 }}>
              <Input
                label="TITLE"
                value={title}
                errMessage={err_title}
                onChange={onChangeTitle}
                readOnly={isReadOnly}
              />
            </View>
          </View>
          <View style={{ flex: 0.8 }}>
            <Input label="TEXT" value={text} onChange={onChangeText} isMultiline height="80%" readOnly={isReadOnly} />
            <View style={styles.buttonContainer}>
              {onSubmit && <Button label="SAVE" onPress={onSubmit} colorType="base_green" isDisabled={isDisabled} />}
              {isReadOnly && changeModalView && (
                <View>
                  <View style={{ marginBottom: 20 }}>
                    <Button onPress={onClickViewEdit} label="EDIT" colorType="base_blue" iconType="edit" />
                  </View>
                  <Button onPress={() => changeModalView(true)} label="DELETE" colorType="base_red" iconType="trash" />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isModalView && onClickDelete && changeModalView && (
        <QuestionModal
          isView={isModalView}
          onPress={onClickDelete}
          onClose={() => changeModalView(false)}
          message="削除してよろしいですか？"
        />
      )}
      <BannerAd />
      <KeyboardSpacer />
    </View>
  )
}

export default Editor
