import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import useLogin from 'src/hooks/useLogin'
import { styles } from 'src/styles/common'
import Input from 'src/components/Inputs/Input'
import Button from 'src/components/Buttons/Button'
import Spinner from 'src/components/Spinner'
import { AuthStackParamList } from 'src/navigation/AuthStack'
import { StackNavigationProp } from '@react-navigation/stack'

export type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>

type Props = {
  navigation: LoginNavigationProp
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
        errMessage={state.err_email}
        onChange={handlers.onChangeEmail}
        onSubmit={handlers.onClickLogin}
      />
      <Input
        width={200}
        label="Password"
        value={state.password}
        errMessage={state.err_password}
        onChange={handlers.onChangePassword}
        onSubmit={handlers.onClickLogin}
        isPassword
      />
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => handlers.onClickLogin()}
          label="Login"
          colorType="base_red"
          isDisabled={state.isDisabled}
          width={120}
          paddingLeft={30}
        />
      </View>
      <Text style={{ marginTop: 20 }}>please enter your email and password</Text>
      <Spinner />
    </View>
  )
}

export default Login
