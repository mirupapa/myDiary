// src/navigations/AuthStack.js
import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import Login from 'src/screens/Top/Login'
import SignUp from 'src/screens/Top/SignUp'
import Top from 'src/screens/Top/Top'
import Logo from 'src/components/Logo'

export type AuthStackParamList = {
  Top: undefined
  Login: undefined
  SignUp: undefined
}

export type AuthStackParams = StackNavigationProp<AuthStackParamList>

const Stack = createStackNavigator()

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top" component={Top} options={{ headerTitle: () => <Logo /> }} />
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: () => <Logo /> }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: () => <Logo /> }} />
    </Stack.Navigator>
  )
}
