import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet } from 'react-native'
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
    </View>
    // <View style={styles.whitePaper}>
    //   <View style={styles.row}>
    //     <Text style={styles.label}>title</Text>
    //     <Text style={styles.title}>{diary.title}</Text>
    //   </View>
    //   <View style={styles.row}>
    //     <Text style={styles.label}>date</Text>
    //     <Text style={styles.date}>{diary.date}</Text>
    //   </View>
    //   <View style={styles.row}>
    //     <Text style={styles.label}>text</Text>
    //     <Text style={styles.text}>{diary.text}</Text>
    //   </View>
    // </View>
  )
}

export default Detail
