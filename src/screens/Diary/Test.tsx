import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import useDiary from '../../hooks/useDiary'
import QuestionModal from '../../components/Modal/QuestionModal'
import { DiaryType } from '../../types/diary'
import Spinner from '../../components/Spinner'
import { TestStackParamList } from 'src/navigation/TestStack'
import useTest from 'src/hooks/useTest'
import { auth, db } from 'src/../firebase'

export type TestScreenNavigationProp = StackNavigationProp<TestStackParamList, 'Diary'>

type Props = {
  navigation: TestScreenNavigationProp
}

const Test: React.FC<Props> = ({ navigation }) => {
  const { diary } = useTest()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          paddingVertical: 10,
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
        }}>
        {diary.map((v) => {
          return <Text key={v.id}>{v.title}</Text>
        })}
      </View>
      <Spinner />
    </SafeAreaView>
  )
}

export default Test
