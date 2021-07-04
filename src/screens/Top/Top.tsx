import React from 'react'
import { View, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { styles } from '../../styles/common'
import Button from '../../components/Buttons/Button'
import { AuthStackParamList } from '../../navigation/AuthStack'

export type ScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Top'>

type Props = {
  navigation: ScreenNavigationProp
}

const Login: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate('Login')
        }}
        label="LOGIN"
        colorType="base_red"
        iconType="chevron-right"
      />
      <View style={{ height: 20 }}></View>
      <Button
        onPress={() => navigation.navigate('SignUp')}
        label="SIGN UP"
        colorType="base_blue"
        iconType="user-plus"
      />
    </View>
  )
}

export default Login
