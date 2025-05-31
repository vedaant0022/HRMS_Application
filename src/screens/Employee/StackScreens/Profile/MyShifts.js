import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'

const MyShifts = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>
          <View>
            <EmpHeader
              name="My Shifts"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyShifts