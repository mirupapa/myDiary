import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
  onPress?: () => void
  label: string
  colorType: 'base_red' | 'base_blue' | 'base_green'
  iconType?: string | undefined
  isDisabled?: boolean
  width?: number
  paddingLeft?: number
}

const Button: React.FC<Props> = ({
  onPress = () => undefined,
  label = '',
  colorType = '',
  iconType,
  isDisabled = false,
  width = 120,
  paddingLeft = 45,
}) => {
  const backColor =
    colorType === 'base_green'
      ? '#55A200'
      : colorType === 'base_red'
      ? '#db7093'
      : colorType === 'base_blue'
      ? '#007AFF'
      : 'grey'
  const styles = StyleSheet.create({
    view: {
      position: 'relative',
      width: width,
      flexDirection: 'row',
      backgroundColor: isDisabled ? 'grey' : backColor,
      borderRadius: 5,
    },
    icon: {
      position: 'absolute',
      left: 10,
      top: 0,
      // paddingHorizontal: 10,
      // backgroundColor: 'gray',
      width: 30,
      lineHeight: 39,
      textAlign: 'center',
    },
    text: {
      paddingLeft: paddingLeft,
      width: '100%',
      // backgroundColor: 'gray',
      color: isDisabled ? '#606060' : 'white',
      textAlign: 'left',
      lineHeight: 40,
      fontSize: 24,
      fontWeight: 'bold',
    },
  })
  return (
    <View style={styles.view}>
      {iconType && <Icon color="white" name={iconType} size={25} style={styles.icon} />}
      {!isDisabled ? (
        <Text onPress={() => onPress()} style={styles.text}>
          {label}
        </Text>
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </View>
  )
}

export default Button
