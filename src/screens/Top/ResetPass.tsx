import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import { styles } from 'src/styles/base'
import Spinner from 'src/components/Spinner'
import Input from 'src/components/Inputs/Input'
import Button from 'src/components/Buttons/Button'
import { AuthStackParamList } from 'src/navigation/AuthStack'
import useResetPass from 'src/hooks/useResetPass'

export type ResetPassNavigationProp = StackNavigationProp<AuthStackParamList, 'ResetPass'>

type Props = {
  navigation: ResetPassNavigationProp
}

const ResetPass: React.FC<Props> = ({ navigation }) => {
  const { state, handlers } = useResetPass(navigation)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>登録されたメールアドレスを入力してください。</Text>
      <View style={{ height: 20 }}></View>
      <Input width={200} value={state.email} onChange={handlers.onChangeEmail} />
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => handlers.onClickSendMail()}
          label="確定"
          colorType="base_blue"
          width={100}
          paddingLeft={28}
        />
      </View>
      <Spinner />
    </View>
  )
}

export default ResetPass
