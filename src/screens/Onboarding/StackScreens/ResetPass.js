import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { useNavigation } from '@react-navigation/native'

const ResetPass = () => {
  const navigation = useNavigation()

  const [password, setpassword] = useState('')
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>
        {/* Header */}
        <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9312/9312240.png' }}
                style={{ height: moderateScaleVertical(35), width: moderateScale(35) }}
              />
            </TouchableOpacity>
            <Text style={{fontSize:21,fontWeight:'400'}}>Reset Password</Text>
            <View></View>
          </View>
        </View>

<View></View>

      </View>
    </SafeAreaView>
  )
}

export default ResetPass