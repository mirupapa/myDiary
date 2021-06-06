import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
  onPress?: () => void
  label: string
  colorType: 'base_red' | 'base_blue' | 'base_green'
  iconType?: string | undefined
  isDisabled?: boolean
}

const Button: React.FC<Props> = ({
  onPress = () => undefined,
  label = '',
  colorType = '',
  iconType,
  isDisabled = false,
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
      width: iconType !== undefined ? 170 : 120,
      flexDirection: 'row',
      backgroundColor: isDisabled ? 'grey' : backColor,
      borderRadius: 5,
    },
    icon: {
      paddingVertical: 7,
      paddingLeft: 10,
      width: 50,
      textAlign: 'center',
    },
    text: {
      width: 120,
      color: isDisabled ? '#606060' : 'white',
      textAlign: 'center',
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
