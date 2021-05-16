import React from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import { Icon } from 'react-native-elements'
import useMenu from '../hooks/useMenu'
import QuestionModal from './Modal/QuestionModal'

const Menu = () => {
  const { state, handlers } = useMenu()
  const styles = StyleSheet.create({
    modalView: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    cancelArea: {
      flex: 0.5,
      backgroundColor: 'grey',
      opacity: 0.5,
    },
    menuArea: { flex: 1, backgroundColor: 'grey', opacity: 0.9 },
    closeButton: {
      height: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10,
      backgroundColor: '#333',
    },
    menuItem: {
      height: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: 20,
      backgroundColor: '#555',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    menuItemText: { color: 'white', fontSize: 24 },
  })

  return (
    <View style={{ width: 50 }}>
      <Icon name="ellipsis-v" onPress={() => handlers.changeMenuView(!state.isMenuView)} type="font-awesome-5" />
      {state.isModalView && (
        <QuestionModal
          isView={state.isModalView}
          onPress={() => {
            handlers.logout()
          }}
          onClose={handlers.changeModalView}
          message="ログアウトしますか？"
        />
      )}
      {!state.isModalView && (
        <Modal animationType="fade" transparent={true} visible={state.isMenuView}>
          <View style={styles.modalView}>
            {/* <View style={styles.cancelArea} onTouchStart={() => handlers.changeMenuView(false)} /> */}
            <View style={styles.menuArea}>
              <View onTouchStart={() => handlers.changeMenuView(false)} style={styles.closeButton}>
                <Icon color="white" name="close" size={25} />
              </View>
              <View style={styles.menuItem} onTouchStart={() => handlers.changeModalView(true)}>
                <Icon color="white" name="chevron-right" size={25} />
                <Text style={styles.menuItemText}>LOGOUT</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

export default Menu
