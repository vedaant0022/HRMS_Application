import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { useNavigation } from '@react-navigation/native'
import useUserStore from '../../../zustand/Store/useUserStore'

const Profile = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView scrollEnabled style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* Basic Profile details */}
          <View style={{ alignItems: 'center', marginTop: moderateScaleVertical(40) }}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }}
              style={{
                width: moderateScale(120),
                height: moderateScaleVertical(120),
                borderRadius: 25,
              }}
            />
            <View style={{ alignItems: 'center', marginTop: moderateScaleVertical(8) }}>
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 22 }}>{user.User.personalDetails.firstName} {user.User.personalDetails.lastName}</Text>
              <Text style={{ color: '#898889', fontWeight: '600', fontSize: 17 }}>{user.User.email}</Text>
              <Text style={{ color: '#898889', fontWeight: '600', fontSize: 17 }}>{user.User.jobDetails.designation}</Text>
            </View>
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginTop: moderateScaleVertical(50) }}>
            {/* My Shifts */}
            {/* <TouchableOpacity
            onPress={()=>{navigation.navigate('Shifts')}}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>My Shifts </Text>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5343/5343102.png' }}
                  style={{
                    width: moderateScale(18),
                    height: moderateScaleVertical(18),
                    tintColor: 'black'
                  }}
                />
              </View>
            </TouchableOpacity> */}
            <View style={{ borderWidth: 1, marginTop: moderateScaleVertical(15), borderColor: '#f5f4f4', }}></View>

            {/* Profile Information */}
            <TouchableOpacity
              onPress={() => { navigation.navigate('Myprofile') }}
              style={{ marginTop: moderateScaleVertical(12) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>Profile Information </Text>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5343/5343102.png' }}
                  style={{
                    width: moderateScale(18),
                    height: moderateScaleVertical(18),
                    tintColor: 'black'
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ borderWidth: 1, marginTop: moderateScaleVertical(15), borderColor: '#f5f4f4', }}></View>


            {/* Notification Settings */}
            <TouchableOpacity
              onPress={() => { navigation.navigate('Notification') }}
              style={{ marginTop: moderateScaleVertical(12) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>Notification Settings </Text>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5343/5343102.png' }}
                  style={{
                    width: moderateScale(18),
                    height: moderateScaleVertical(18),
                    tintColor: 'black'
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ borderWidth: 1, marginTop: moderateScaleVertical(15), borderColor: '#f5f4f4', }}></View>


            {/* Reset Password */}
            <TouchableOpacity
              onPress={() => { navigation.navigate('ResetPassword') }}
              style={{ marginTop: moderateScaleVertical(12) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>Reset Password </Text>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5343/5343102.png' }}
                  style={{
                    width: moderateScale(18),
                    height: moderateScaleVertical(18),
                    tintColor: 'black'
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ borderWidth: 1, marginTop: moderateScaleVertical(15), borderColor: '#f5f4f4', }}></View>


            {/* Share Feedback */}
            <TouchableOpacity
              onPress={() => { navigation.navigate('ShareFeedBack') }}
              style={{ marginTop: moderateScaleVertical(12) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>Share Feedback </Text>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5343/5343102.png' }}
                  style={{
                    width: moderateScale(18),
                    height: moderateScaleVertical(18),
                    tintColor: 'black'
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ borderWidth: 1, marginTop: moderateScaleVertical(15), borderColor: '#f5f4f4', }}></View>

          </View>

          <View style={{ width: '93%', alignSelf: 'center' }}>
            <TouchableOpacity
            // disabled={loading}
            // onPress={submit}
            >
              <View style={{
                borderWidth: 1,
                height: moderateScale(40),
                alignItems: 'center',
                justifyContent: 'center', // Center content
                borderRadius: 10,
                // backgroundColor: loading ? 'yellow' : 'yellow',
                backgroundColor: 'orange',
                borderColor: 'orange',
                marginTop: moderateScaleVertical(125)

              }}>
                <Text style={{ fontWeight: '400', fontSize: 19, color: 'white', letterSpacing: 2 }}>
                  LOGOUT
                </Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ alignItems: 'center', }}>
            <Text style={{ color: 'black', fontWeight: '500' }}>v.0.0.1</Text>
          </View>




        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile