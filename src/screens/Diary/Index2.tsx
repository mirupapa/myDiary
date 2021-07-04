import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import useDiary from '../../hooks/useDiary'
import QuestionModal from '../../components/Modal/QuestionModal'
import { DiaryType } from '../../types/diary'
import Spinner from '../../components/Spinner'
import { DiaryStackParamList } from '../../navigation/DiaryStack'
import dayjs from 'dayjs'

export type DiaryScreenNavigationProp = StackNavigationProp<DiaryStackParamList, 'Diary'>

type Props = {
  navigation: DiaryScreenNavigationProp
}

const Diary: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useDiary()

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      alignItems: 'center',
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#ddd',
    },
    createButton: {
      height: 50,
      width: '100%',
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end'
      // position: 'absolute',
      // bottom: 30,
      // right: 0,
    },
    rowItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      backgroundColor: '#fff',
    },
    title: {
      color: '#000',
      fontSize: 16,
    },
    date: {
      color: '#db7093',
      fontSize: 12,
    },
    rowItemTitle: {
      width: '50%',
    },
    titleRow: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20,
      paddingVertical: 5,
    },
    rowItemButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateArea: {
      width: 50,
      backgroundColor: 'grey',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })

  const DateArea: React.FC<{date: string}> = ({ date }) => {
    const da = dayjs(date)
    return (
      <View style={styles.dateArea}>
        <Text style={{ backgroundColor: 'blue', display: 'flex' }}>{da.format('YYYY年')}</Text>
        <Text style={{ backgroundColor: 'red', display: 'flex' }}>{da.format('MM月')}</Text>
        <Text style={{ backgroundColor: 'green', display: 'flex' }}>{da.format('DD日')}</Text>
      </View>
    )
  }

  const RowItem: React.FC<{ diary: DiaryType }> = ({ diary }) => {
    return (
      <View style={styles.rowItem}>
        <DateArea date={diary.date} />
        <TouchableOpacity
          style={styles.rowItemTitle}
          onPress={() => {
            navigation.navigate('Detail', { diary })
          }}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{diary.title}</Text>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.date}>{diary.date}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rowItemButtons}>
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
      </View>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      {/* <View style={styles.container}> */}
      <View style={{
          flexGrow: 0,width: '100%', height: '85%', padding: 10, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
       <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={state.diaries}
        renderItem={({ item: diary }) => <RowItem diary={diary} />}
        onEndReached={() => handlers.loadList(state.diaries.length + 20)}
        onEndReachedThreshold={0.3}
      />
      </View>

      <View style={styles.createButton}>
        <Icon
          name="plus-square"
          type="font-awesome"
          color="#55A200"
          size={50}
          onPress={() => navigation.navigate('Create')}
        />
      </View>

      <QuestionModal
        isView={state.isModalView}
        onPress={handlers.onClickDelete}
        onClose={handlers.changeModalView}
        message="削除してよろしいですか？"
      />
      <Spinner />
      {/* </View> */}
    </SafeAreaView>
  )
}

export default Diary
