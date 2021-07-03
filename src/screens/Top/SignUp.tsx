import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { styles } from '../../styles/base'
import useLogin from '../../hooks/useLogin'
import Spinner from '../../components/Spinner'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Buttons/Button'
import { AuthStackParamList } from '../../navigation/AuthStack'

export type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>

type Props = {
  navigation: SignUpScreenNavigationProp
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useLogin(navigation)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input
        width={200}
        label="Email"
        value={state.email}
        onChange={handlers.onChangeEmail}
        onSubmit={handlers.onClickLogin}
      />
      <Input
        width={200}
        label="Password"
        value={state.password}
        onChange={handlers.onChangePassword}
        onSubmit={handlers.onClickLogin}
        isPassword
      />
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => handlers.onClickSignUp()}
          label="Sign Up"
          colorType="base_blue"
          isDisabled={state.isDisabled}
        />
      </View>
      <Spinner />
    </View>
  )
}

export default Login
