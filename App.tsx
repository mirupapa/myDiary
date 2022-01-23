import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CommonContext, CommonProvider } from './src/context/commonContext'
import { auth } from './firebase'
import { StatusBar } from 'expo-status-bar'
import { AuthStack } from 'src/navigation/AuthStack'
import { DiaryStack } from 'src/navigation/DiaryStack'
import BannerAd from 'src/components/BannerAd'
import { View } from 'react-native'

const Auth: React.VFC = () => {
  const commonContext = CommonContext()

  React.useLayoutEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        commonContext.dispatch({ type: 'SET_USER_INFO', payload: user })
      } else {
        commonContext.dispatch({ type: 'SET_USER_INFO', payload: null })
      }
    })
    return unSubscribe
  }, [])

  return <View style={{ flex: 1 }}>{commonContext.state.userInfo ? <DiaryStack /> : <AuthStack />}</View>
}

const App: React.VFC = () => {
  return (
    <CommonProvider>
      <NavigationContainer independent>
        <Auth />
      </NavigationContainer>
      <BannerAd />
      <StatusBar style="auto" />
    </CommonProvider>
  )
}

export default App
