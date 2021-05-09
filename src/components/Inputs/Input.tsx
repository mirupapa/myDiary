import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
  label: string
  value: string
  errMessage?: string
  isPassword?: boolean
  isMultiline?: boolean
  width?: string | number
  height?: string | number
  onChange?: (text: string) => void
  onSubmit?: () => void
  readOnly?: boolean
}

const Input: React.FC<Props> = ({
  label = '',
  value = '',
  errMessage = '',
  isPassword = false,
  isMultiline = false,
  width,
  height,
  onChange = () => undefined,
  onSubmit = () => undefined,
  readOnly = false,
}) => {
  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      marginBottom: 30,
      height: height === undefined ? 40 : height,
      position: 'relative',
    },
    text: {
      width: 100,
      textAlign: 'right',
      fontSize: 24,
      lineHeight: 40,
      marginRight: 10,
    },
    textInput: {
      width: width === undefined ? 250 : width,
      backgroundColor: errMessage !== '' ? 'pink' : readOnly ? '#ddd' : '#ffd9b9',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    errText: {
      position: 'absolute',
      left: 120,
      top: 40,
      color: 'red',
    },
  })

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChange={(event) => onChange(event.nativeEvent.text)}
        onSubmitEditing={() => onSubmit()}
        value={value}
        secureTextEntry={isPassword}
        multiline={isMultiline}
        editable={!readOnly}
      />
      <Text style={styles.errText}>{errMessage}</Text>
    </View>
  )
}

export default Input
