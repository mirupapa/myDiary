import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'

const BannerAd = () => {
  const bannerError = () => {
    console.log('Ad Fail error')
  }
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      height: 50,
      bottom: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <AdMobBanner
        adUnitID={
          __DEV__
            ? 'ca-app-pub-3940256099942544/6300978111' // テスト広告
            : Platform.select({
                ios: 'ca-app-pub-1644718158559488~6238198923', // iOS
                android: 'ca-app-pub-1644718158559488~9779866410', // android
              })
        }
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  )
}

export default BannerAd
