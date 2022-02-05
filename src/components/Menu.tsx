import React from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import { Icon } from 'react-native-elements'
import useMenu from '../hooks/useMenu'
import QuestionModal from './Modal/QuestionModal'

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

const Menu = () => {
  const { state, handlers } = useMenu()

  return (
    <View style={{ width: 50 }}>
      <Icon
        name="ellipsis-v"
        onPress={() => handlers.changeMenuView(!state.isMenuView)}
        type="font-awesome-5"
        tvParallaxProperties={undefined}
      />
      {state.modalView && (
        <QuestionModal
          isView={state.modalView.isView}
          onPress={state.modalView.onPress}
          onClose={state.modalView.onClose}
          message={state.modalView.message}
        />
      )}
      {!state.modalView && (
        <Modal animationType="fade" transparent={true} visible={state.isMenuView}>
          <View style={styles.modalView}>
            {/* <View style={styles.cancelArea} onTouchStart={() => handlers.changeMenuView(false)} /> */}
            <View style={styles.menuArea}>
              <View onTouchStart={() => handlers.changeMenuView(false)} style={styles.closeButton}>
                <Icon color="white" name="close" size={25} tvParallaxProperties={undefined} />
              </View>
              <View style={styles.menuItem} onTouchStart={() => handlers.setModalLogout()}>
                <Icon color="white" name="chevron-right" size={25} tvParallaxProperties={undefined} />
                <Text style={styles.menuItemText}>LOGOUT</Text>
              </View>
              <View style={styles.menuItem} onTouchStart={() => handlers.setModalRetire()}>
                <Icon color="white" name="chevron-right" size={25} tvParallaxProperties={undefined} />
                <Text style={styles.menuItemText}>アカウント削除</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

export default Menu
