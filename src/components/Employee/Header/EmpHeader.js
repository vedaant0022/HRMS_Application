import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { useNavigation } from '@react-navigation/native'

const EmpHeader = (props) => {
  const navigation = useNavigation()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity
      onPress={()=>{navigation.goBack()}}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png' }}
          style={{
            width: moderateScale(20),
            height: moderateScaleVertical(20),
            borderRadius: 25,
          }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 18 }}>{props.name}</Text>
      <View></View>
    </View>
  )
}

export default EmpHeader