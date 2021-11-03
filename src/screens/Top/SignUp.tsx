import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from 'src/styles/base'
import useLogin from 'src/hooks/useLogin'
import Spinner from 'src/components/Spinner'
import Input from 'src/components/Inputs/Input'
import Button from 'src/components/Buttons/Button'

const SignUp: React.FC = () => {
  const { state, handlers } = useLogin()

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
          width={150}
          paddingLeft={35}
        />
      </View>
      <Text style={{ marginTop: 20 }}>please enter your email and password</Text>
      <Spinner />
    </View>
  )
}

export default SignUp
