import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Diary from './src/screens/Diary/Index'
import DiaryCreate from './src/screens/Diary/Create'
import DiaryDetail from './src/screens/Diary/Detail'
import DiaryEdit from './src/screens/Diary/Edit'
import Login from './src/screens/Top/Login'
import SignUp from './src/screens/Top/SignUp'
import { firebaseLoad } from './src/firebase'
import { DiaryType } from './src/types/diary'
import { CommonContext, CommonProvider } from './src/context/commonContext'
import Menu from './src/components/Menu'
import Top from './src/screens/Top/Top'
import Logo from './src/components/Logo'
import Search from './src/components/Search'

export type RootStackParamList = {
  Top: undefined
  Login: undefined
  SignUp: undefined
  Diary: undefined
  Create: undefined
  Detail: { diary: DiaryType }
  Edit: { diary: DiaryType }
}

const App: React.VFC = () => {
  firebaseLoad() // firebase設定読み込み
  const Stack = createStackNavigator()

  const Routing = () => {
    const { state: loginState } = CommonContext()
    return (
      <NavigationContainer>
        {!loginState.isLogin ? (
          <Stack.Navigator>
            <Stack.Screen name="Top" component={Top} options={{ headerTitle: () => <Logo /> }} />
            <Stack.Screen name="Login" component={Login} options={{ headerTitle: () => <Logo /> }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: () => <Logo /> }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Diary"
              component={Diary}
              options={{
                headerLeft: () => <Search />,
                headerRight: () => <Menu />,
                headerTitle: () => <Logo />,
              }}
            />
            <Stack.Screen
              name="Create"
              component={DiaryCreate}
              options={{
                headerRight: () => <Menu />,
                headerTitle: () => <Logo />,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DiaryDetail}
              options={{
                headerRight: () => <Menu />,
                headerTitle: () => <Logo />,
              }}
            />
            <Stack.Screen
              name="Edit"
              component={DiaryEdit}
              options={{
                headerRight: () => <Menu />,
                headerTitle: () => <Logo />,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    )
  }
  return (
    <CommonProvider>
      <Routing />
    </CommonProvider>
  )
}

export default App
