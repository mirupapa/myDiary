import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../App'
import useLogin from '../../hooks/useLogin'
import { styles } from '../../styles/common'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Buttons/Button'
import Spinner from '../../components/Spinner'

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

type Props = {
  navigation: LoginScreenNavigationProp
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useLogin(navigation)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input
        label="Email"
        value={state.email}
        errMessage={state.err_email}
        onChange={handlers.onChangeEmail}
        onSubmit={handlers.onClickLogin}
      />
      <Input
        label="Password"
        value={state.password}
        errMessage={state.err_password}
        onChange={handlers.onChangePassword}
        onSubmit={handlers.onClickLogin}
        isPassword
      />
      <Button
        onPress={() => handlers.onClickLogin()}
        label="Login"
        colorType="base_red"
        isDisabled={state.isDisabled}
      />
      <Spinner />
    </View>
  )
}

export default Login
