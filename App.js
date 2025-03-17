import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { RootStack } from './src/navigation/MainStack/RootStack'
import FlashMessage from 'react-native-flash-message'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <RootStack />
      <FlashMessage />
    </SafeAreaView>
  )
}

export default App