import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { RootStack } from './src/navigation/MainStack/RootStack'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <RootStack />
    </SafeAreaView>
  )
}

export default App