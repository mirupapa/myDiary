import React from 'react'
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native'

type Props = {
  message: string
  isView: boolean
  onPress: () => void
  onClose: (value: boolean) => void
}

const QuestionModal: React.FC<Props> = ({ message = '', isView = false, onPress, onClose }) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalButton: {
      width: 100,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  })

  return (
    <Modal animationType="fade" transparent={true} visible={isView} onRequestClose={() => onClose(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: 220,
            }}>
            <Pressable
              style={[styles.modalButton, styles.buttonClose]}
              onPress={() => {
                onPress()
              }}>
              <Text style={styles.modalButtonText}>はい</Text>
            </Pressable>
            <Pressable style={[styles.modalButton, styles.buttonClose]} onPress={() => onClose(false)}>
              <Text style={styles.modalButtonText}>いいえ</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default QuestionModal
