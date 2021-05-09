import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ListItem } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { RootStackParamList } from '../../../App'
import useDiary from '../../hooks/useDiary'
import QuestionModal from '../../components/Modal/QuestionModal'

export type DiaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Diary'>

type Props = {
  navigation: DiaryScreenNavigationProp
}

const Diary: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useDiary(navigation)

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#ddd',
    },
    createButton: {
      height: 100,
      width: 100,
      padding: 0,
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    row: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20,
      paddingVertical: 5,
    },
    title: {
      color: '#000',
      fontSize: 16,
    },
    date: {
      color: '#db7093',
      fontSize: 12,
    },
  })

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={state.diaries}
        style={{ width: '80%' }}
        renderItem={({ item: diary }) => (
          <ListItem
            containerStyle={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{ width: '70%' }}
              onPress={() => {
                navigation.navigate('Detail', { diary })
              }}>
              <View style={styles.row}>
                <Text style={styles.title}>{diary.title}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.date}>{diary.date}</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                name="edit"
                type="font-awesome-5"
                color="#f50"
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('Edit', { diary })}
              />
              <Icon
                name="trash"
                type="font-awesome-5"
                color="#666"
                onPress={() => {
                  handlers.changeModalView(true)
                  handlers.setTargetDiary(diary)
                }}
              />
            </View>
          </ListItem>
        )}
      />
      <View style={styles.createButton}>
        <Icon
          name="plus-square"
          type="font-awesome"
          color="#55A200"
          size={60}
          onPress={() => navigation.navigate('Create')}
        />
      </View>
      <QuestionModal
        isView={state.isModalView}
        onPress={handlers.onClickDelete}
        onClose={handlers.changeModalView}
        message="削除してよろしいですか？"
      />
    </View>
  )
}

export default Diary
