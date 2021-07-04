// src/navigations/AuthStack.js
import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { DiaryType } from '../types/diary'
import Logo from '../components/Logo'
import Menu from '../components/Menu'
import Search from '../components/Search'
import DiaryCreate from '../screens/Diary/Create'
import DiaryDetail from '../screens/Diary/Detail'
import DiaryEdit from '../screens/Diary/Edit'
import Diary from '../screens/Diary/Index2'

export type DiaryStackParamList = {
  Diary: undefined
  Create: undefined
  Detail: { diary: DiaryType }
  Edit: { diary: DiaryType }
}

export type DiaryStackParam = StackNavigationProp<DiaryStackParamList>

const Stack = createStackNavigator()

export const DiaryStack = () => {
  return (
    <Stack.Navigator initialRouteName="Diary">
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
  )
}
