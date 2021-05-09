import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../App'
import { styles } from '../../styles/base'
import useLogin from '../../hooks/useLogin'
import Spinner from '../../components/Spinner'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Buttons/Button'

export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>

type Props = {
  navigation: SignUpScreenNavigationProp
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useLogin(navigation)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input label="Email" value={state.email} onChange={handlers.onChangeEmail} onSubmit={handlers.onClickLogin} />
      <Input
        label="Password"
        value={state.password}
        onChange={handlers.onChangePassword}
        onSubmit={handlers.onClickLogin}
        isPassword
      />
      <Button
        onPress={() => handlers.onClickSignUp()}
        label="Sign Up"
        colorType="base_blue"
        isDisabled={state.isDisabled}
      />
      <Spinner />
    </View>
  )
}

export default Login
