import React, { useState } from 'react'
import { View, StyleSheet, Text, Modal, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import { CommonContext } from '../context/commonContext'
import useMenu from '../hooks/useMenu'

const Search = () => {
  const { state, handlers } = useMenu()
  const [word, setWord] = useState('')
  const { state: commonState, dispatch: commonDispatch } = CommonContext()
  const onClickSearch = (value: string) => {
    commonDispatch({ type: 'UPDATE_SEARCH_WORD', payload: value })
    handlers.changeMenuView(!state.isMenuView)
  }
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
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 10,
      backgroundColor: '#333',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '10%',
      paddingLeft: 10,
      backgroundColor: '#555',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    menuItemText: { color: 'white', fontSize: 20, marginRight: 10 },
  })

  return (
    <View style={{ width: 50 }}>
      <Icon
        name="search"
        onPress={() => handlers.changeMenuView(!state.isMenuView)}
        type="font-awesome-5"
        tvParallaxProperties={undefined}
      />
      {!state.modalView?.isView && (
        <Modal animationType="fade" transparent={true} visible={state.isMenuView}>
          <View style={styles.modalView}>
            <View style={styles.menuArea}>
              <View onTouchStart={() => handlers.changeMenuView(false)} style={styles.closeButton}>
                <Icon color="white" name="close" size={25} tvParallaxProperties={undefined} />
              </View>
              <View style={styles.menuItem}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon color="white" name="chevron-right" size={25} tvParallaxProperties={undefined} />
                  <Text style={styles.menuItemText}>SEARCH</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={{
                      width: '60%',
                      height: 30,
                      backgroundColor: 'white',
                      marginRight: 10,

                      paddingLeft: 10,
                    }}
                    onChange={(event) => setWord(event.nativeEvent.text)}
                    onSubmitEditing={() => onClickSearch(word)}
                    value={word}
                  />
                  <Icon
                    name="search"
                    color="white"
                    style={{ paddingTop: 5 }}
                    onPress={() => onClickSearch(word)}
                    type="font-awesome-5"
                    tvParallaxProperties={undefined}
                  />
                  <Icon
                    name="times"
                    color="white"
                    style={{ marginLeft: 10, paddingTop: 5 }}
                    onPress={() => {
                      setWord('')
                      onClickSearch('')
                    }}
                    type="font-awesome-5"
                    tvParallaxProperties={undefined}
                  />
                </View>
              </View>
            </View>
            {/* <View style={styles.cancelArea} onTouchStart={() => handlers.changeMenuView(false)} /> */}
          </View>
        </Modal>
      )}
    </View>
  )
}

export default Search
