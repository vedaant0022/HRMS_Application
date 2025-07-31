import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation()
  setTimeout(() => {
    navigation.navigate('Getstarted')
  }, 3000);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{flex:1,backgroundColor:'#fff',marginLeft:moderateScale(15),marginRight:moderateScale(15),marginTop:moderateScaleVertical(30)}}>
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
          <Text style={{fontSize:28,letterSpacing:5,paddingBottom:25}}>Ease<Text style={{color: 'orange'}}>Employee</Text></Text>
          <ActivityIndicator size={'large'} color={'orange'} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Splash