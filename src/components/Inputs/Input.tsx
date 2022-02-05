import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

type Props = {
  label?: string
  value: string
  errMessage?: string
  isPassword?: boolean
  isMultiline?: boolean
  width?: string | number
  height?: string | number
  onChange?: (text: string) => void
  onSubmit?: () => void
  readOnly?: boolean
  isFlex?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

const Input: React.FC<Props> = ({
  label = '',
  value = '',
  errMessage = '',
  isPassword = false,
  isMultiline = false,
  width = undefined,
  height,
  onChange = () => undefined,
  onSubmit = () => undefined,
  readOnly = false,
  isFlex,
  onFocus,
  onBlur,
}) => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    topLabel: {
      textAlign: 'left',
      fontSize: 18,
      lineHeight: 40,
      marginLeft: 5,
    },
    textInput: {
      width: width || '100%',
      backgroundColor: errMessage !== '' ? 'pink' : readOnly ? '#eeeeee' : '#ffd9b9',
      borderRadius: 5,
      paddingHorizontal: 5,
      height: height ? height : 40,
      flex: isFlex ? 1 : 0,
    },
    errText: {
      position: 'absolute',
      bottom: 0,
      left: 5,
      color: 'red',
    },
    inputCalendarText: {
      lineHeight: 40,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.topLabel, display: label ? 'flex' : 'none' }}>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChange={(event) => onChange(event.nativeEvent.text)}
        onSubmitEditing={() => onSubmit()}
        value={value}
        secureTextEntry={isPassword}
        multiline={isMultiline}
        editable={!readOnly}
        keyboardType={label === 'email' ? 'email-address' : 'default'}
        onFocus={onFocus || undefined}
        onBlur={onBlur || undefined}
      />
      <Text style={styles.errText}>{errMessage}</Text>
    </View>
  )
}

export default Input
