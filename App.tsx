import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CommonContext, CommonProvider } from './src/context/commonContext'
import { auth } from './firebase'
import { StatusBar } from 'expo-status-bar'
import { AuthStack } from 'src/navigation/AuthStack'
import { DiaryStack } from 'src/navigation/DiaryStack'
import BannerAd from 'src/components/BannerAd'
import { View, Alert } from 'react-native'
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-ads-admob'

const Auth: React.VFC = () => {
  const commonContext = CommonContext()

  React.useLayoutEffect(() => {
    const adMob = async () => {
      const now = await getPermissionsAsync()
      if (!now.granted && now.canAskAgain) {
        Alert.alert(
          '広告の最適化',
          `トラッキングを許可することで、広告が適切にカスタマイズされ、関連性の高い広告が表示されます。
    また、アプリ作成者に広告収益が発生するので、このアプリの改善に使用します。`,
          [{ text: 'OK', onPress: () => requestPermissionsAsync() }],
        )
      }
    }
    adMob()

    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
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
