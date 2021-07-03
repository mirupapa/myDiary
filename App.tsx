import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CommonProvider } from './src/context/commonContext'
import { auth } from './firebase'
import { StatusBar } from 'expo-status-bar'
import { AuthStack } from './src/navigation/AuthStack'
import { DiaryStack } from './src/navigation/DiaryStack'
import BannerAd from './src/components/BannerAd'

const App: React.VFC = () => {
  const [loggedIn, setLoggedIn] = useState(true)

  React.useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
    return unSubscribe
  })

  return (
    <CommonProvider>
      <NavigationContainer>
        <NavigationContainer independent>{loggedIn ? <DiaryStack /> : <AuthStack />}</NavigationContainer>
      </NavigationContainer>
      <BannerAd />
      <StatusBar style="auto" />
    </CommonProvider>
  )
}

export default App
