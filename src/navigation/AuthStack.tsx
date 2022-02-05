// src/navigations/AuthStack.js
import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import Login from 'src/screens/Top/Login'
import SignUp from 'src/screens/Top/SignUp'
import Top from 'src/screens/Top/Top'
import Logo from 'src/components/Logo'
import Constants from 'expo-constants'
import { View, Text } from 'react-native'
import ResetPass from 'src/screens/Top/ResetPass'

export type AuthStackParamList = {
  Top: undefined
  Login: undefined
  SignUp: undefined
  ResetPass: undefined
}

export type AuthStackParams = StackNavigationProp<AuthStackParamList>

const Stack = createStackNavigator()

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Top"
        component={Top}
        options={{
          headerTitle: () => <Logo />,
          headerRight: () => (
            <View>
              <Text style={{ marginRight: 10 }}>Ver:{Constants.manifest?.version}</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: () => <Logo /> }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: () => <Logo /> }} />
      <Stack.Screen name="ResetPass" component={ResetPass} options={{ headerTitle: () => <Logo /> }} />
    </Stack.Navigator>
  )
}
