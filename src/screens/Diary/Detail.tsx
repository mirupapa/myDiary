import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import BannerAd from '../../components/BannerAd'
import Input from '../../components/Inputs/Input'
import InputCalendar from '../../components/Inputs/InputCalendar'

type Props = {
  route: any
}

const Detail: React.FC<Props> = ({ route }) => {
  const { diary } = route.params

  const styles = StyleSheet.create({
    whitePaper: {
      backgroundColor: '#fff',
      height: '100%',
      paddingTop: 10,
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  })

  return (
    <View style={styles.whitePaper}>
      <StatusBar style="auto" />
      <InputCalendar value={diary.date} readOnly />
      <Input label="TITLE" value={diary.title} errMessage={diary.err_title} width="60%" readOnly />
      <Input label="TEXT" value={diary.text} isMultiline height="60%" width="60%" readOnly />
      <BannerAd />
    </View>
  )
}

export default Detail
