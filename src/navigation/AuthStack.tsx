// src/navigations/AuthStack.js
import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import Login from '../screens/Top/Login'
import SignUp from '../screens/Top/SignUp'
import Top from '../screens/Top/Top'
import Logo from '../components/Logo'

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
