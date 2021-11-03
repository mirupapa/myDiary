import { useIsFocused } from '@react-navigation/core'
import React, { LegacyRef, useRef, useState } from 'react'
import { Text, View, StyleSheet, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Icon } from 'react-native-elements'
// import Overlay from 'react-native-modal-overlay'

import { Overlay } from 'react-native-elements'

type Props = {
  label?: string
  value: string
  errMessage?: string
  onChange?: (text: string) => void
  readOnly?: boolean
}

const InputCalendar: React.FC<Props> = ({
  label = 'DATE',
  value,
  errMessage = '',
  onChange = () => undefined,
  readOnly = false,
}) => {
  const [isView, setIsView] = useState(false)
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    topLabel: {
      textAlign: 'left',
      fontSize: 18,
      lineHeight: 40,
      marginLeft: 5,
    },
    inputCalendarView: {
      width: 150,
      backgroundColor: errMessage !== '' ? 'pink' : readOnly ? '#eeeeee' : '#ffd9b9',
      borderRadius: 5,
      paddingHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputCalendarText: {
      lineHeight: 40,
    },
    calendarIcon: {
      paddingTop: 7,
    },
    errText: {
      position: 'absolute',
      top: 80,
      left: 5,
      color: 'red',
    },
    overlayContainer: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayChildren: {
      padding: 10,
      width: '80%',
      borderRadius: 5,
    },
    modalCalendarContainer: {
      backgroundColor: 'white',
      width: '100%',
      paddingBottom: 10,
      borderRadius: 5,
    },
    modalCalendar: {
      zIndex: 1,
    },
    modalCalenderTitle: {
      textAlign: 'center',
    },
    arrow: {
      color: '#36C1A7',
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.topLabel}>{label}</Text>
      <View style={styles.inputCalendarView} onTouchStart={() => !readOnly && setIsView(true)}>
        <Text style={styles.inputCalendarText}>{value.replaceAll('-', '/')}</Text>
        <Icon name="calendar-day" type="font-awesome-5" style={styles.calendarIcon} />
      </View>
      <Text style={styles.errText}>{errMessage}</Text>
      <Overlay isVisible={isView} onBackdropPress={() => setIsView(false)}>
        <View style={styles.modalCalendarContainer}>
          <Text style={styles.modalCalenderTitle}>Please Select Day</Text>
          <Calendar
            style={styles.modalCalendar}
            theme={{
              todayTextColor: '#36C1A7',
            }}
            onDayPress={(date) => {
              onChange(date.dateString)
              setIsView(false)
            }}
          />
        </View>
      </Overlay>
    </View>
  )
}

export default InputCalendar
