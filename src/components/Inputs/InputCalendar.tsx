import React, { useState } from 'react'
import { Text, View, StyleSheet, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Icon } from 'react-native-elements'

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
    view: {
      flexDirection: 'row',
      marginBottom: 30,
      height: 40,
      position: 'relative',
    },
    text: {
      width: 100,
      textAlign: 'right',
      fontSize: 24,
      lineHeight: 40,
      marginRight: 10,
    },
    calendarView: {
      width: 150,
      backgroundColor: errMessage !== '' ? 'pink' : readOnly ? '#ddd' : '#ffd9b9',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    calendarText: {
      lineHeight: 40,
    },
    errText: {
      position: 'absolute',
      left: 120,
      top: 40,
      color: 'red',
    },
    modalView: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mesh: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      opacity: 0.5,
    },
    calendarContainer: {
      backgroundColor: 'white',
      padding: '5%',
      borderRadius: 5,
    },
    title: {
      textAlign: 'center',
    },
    arrow: {
      color: '#36C1A7',
    },
  })
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.calendarView} onTouchStart={() => !readOnly && setIsView(true)}>
        <Text style={styles.calendarText}>{value.replaceAll('-', '/')}</Text>
      </View>
      <Text style={styles.errText}>{errMessage}</Text>
      <Modal animationType="fade" transparent={true} visible={isView} style={{ position: 'relative' }}>
        <View style={styles.mesh} onTouchStart={() => setIsView(false)} />
        <View style={styles.modalView}>
          <View style={styles.calendarContainer}>
            <Text style={styles.title}>Please Select Day</Text>
            <Calendar
              style={{ zIndex: 1 }}
              current={value ? new Date(value) : new Date()}
              renderArrow={(direction: 'left' | 'right') => {
                if (direction === 'left') {
                  return <Icon type="FontAwesome5" name="arrow-left" style={styles.arrow} />
                } else {
                  return <Icon type="FontAwesome5" name="arrow-right" style={styles.arrow} />
                }
              }}
              theme={{
                todayTextColor: '#36C1A7',
              }}
              onDayPress={(date) => {
                onChange(date.dateString)
                setIsView(false)
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default InputCalendar
