import React from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { styles } from '../../styles/common'
import { RootStackParamList } from '../../../App'
import Button from '../../components/Buttons/Button'

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Top'>

type Props = {
  navigation: ScreenNavigationProp
}

// todo auth情報初期読み込み

const Login: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('Login')}
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
