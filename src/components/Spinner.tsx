import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { CommonContext } from '../context/commonContext'

const Spinner: React.FC = () => {
  const { state } = CommonContext()
  const styles = StyleSheet.create({
    view: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10,
    },
  })

  if (state.isSpinnerView) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" />
      </View>
    )
  } else {
    return null
  }
}

export default Spinner
