import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import HomeBar from '../../../components/Employee/Homebar/HomeBar'

const Attendance = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <View>
        <View>
          <HomeBar />
        </View>
      </View>
    </SafeAreaView>

  )
}

export default Attendance