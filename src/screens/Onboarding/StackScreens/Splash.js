import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { NavigationRouteContext, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { errorMessage, successMessage } from '../../../utils'
import { base_url } from '../../../utils/url'
import axios from 'axios'
import useUserStore from '../../../zustand/Store/useUserStore'


const Splash = () => {
  const navigation = useNavigation()

  const getDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        errorMessage("Unauthorized Access");
        return; 
      }
  
      const url = `${base_url}/users/me`;
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      // console.log("USER DETAILS >>>", response.data.user);
      const setUser = useUserStore.getState().setUser;
    setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("ERROR FETCHING DETAILS >>>", error.response?.data || error.message);
      errorMessage(error.response?.data?.message || "Failed to fetch user details");
    }
  };
  
  useEffect(() => {
    
  }, []);
  setTimeout(async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      navigation.navigate('Getstarted');
      
    } else {
      getDetails();
      navigation.navigate('Employee');
      successMessage('Welcome back!');
      console.log("Token Received>>",token)
    }
    // navigation.navigate('Getstarted');

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