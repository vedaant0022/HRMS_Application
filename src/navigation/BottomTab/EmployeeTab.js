import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Employee/TabScreens/Home';
import Attendance from '../../screens/Employee/TabScreens/Attendance';
import Finance from '../../screens/Employee/TabScreens/Finance';
import Leaves from '../../screens/Employee/TabScreens/Leaves';
import Profile from '../../screens/Employee/TabScreens/Profile';
import { moderateScale, moderateScaleVertical } from '../../styles/Responsiveness/responsiveSize';

const EmployeeTab = () => {
  const Tab = createBottomTabNavigator();

  const EmpHeader = () => {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', width: '100%', }}>
        <View style={{marginLeft:moderateScale(20),marginRight:moderateScale(20),marginTop:moderateScaleVertical(15)}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }}
              style={{
                width: moderateScale(50),
                height: moderateScaleVertical(50),
                borderRadius: 25,
                marginRight: moderateScale(12),
              }}
            />
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>John Doe</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'green', fontSize: 16 }}>●</Text>
                <Text style={{ fontSize: 14, color: '#555', marginLeft: 4 }}>Online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/891/891012.png' }}
              style={{width: moderateScale(24),height: moderateScaleVertical(24),}}
            />
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: true,
        header: EmpHeader,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey', tabBarShowLabel: false,
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: -42,
          borderRadius: 4,
          elevation: 10,
          height: '12%',
          left: 3,
          right: 3
        }
      }}
    >
      <Tab.Screen name="Attendance" component={Attendance} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', marginLeft: 10, marginTop: 15 }}>
            <Image
              // source={require('../../assets/Logo.png')}
              source={{uri:'https://cdn-icons-png.flaticon.com/512/1286/1286827.png'}}
              style={{ height: 25, width: 25, tintColor: focused ? '#000000' : 'grey' }}
            />
            <Text style={{ fontWeight: '400', color: focused ? '#000000' : 'grey', fontSize: 13, width: 90, textAlign: 'center' }}>Attendance</Text>
          </View>
        )
      }} />

      <Tab.Screen name="Finance" component={Finance} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Image
              // source={require('../../assets/Logo.png')}
              source={{uri:'https://cdn-icons-png.flaticon.com/512/1077/1077976.png'}}
              style={{ height: 25, width: 25, tintColor: focused ? '#000000' : 'grey' }}
            />
            <Text style={{ fontWeight: '400', color: focused ? '#000000' : 'grey', fontSize: 13, width: 70, textAlign: 'center' }}>Finance</Text>

          </View>
        )
      }} />


      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', top: -10, justifyContent: 'center',height: 50, width: 50, backgroundColor: 'orange',alignItems:'center',borderRadius:60}}>
            <Image
              // source={require('../../assets/icons/Home.png')}
              source={{uri:'https://cdn-icons-png.flaticon.com/512/25/25694.png'}}
              style={{ height: 25, width: 25, tintColor: '#000000' ,alignSelf:'center',justifyContent:'center',marginTop:15,}}
            />
            <Text style={{ fontWeight: '400', color: focused ? '#000000' : 'grey', fontSize: 13, width: 50, textAlign: 'center' ,top:25}}>Home</Text>
          </View>
        )
      }} />

      <Tab.Screen name="Leaves" component={Leaves} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Image
              // source={require('../../assets/Logo.png')}
              source={{uri:'https://cdn-icons-png.flaticon.com/512/3658/3658555.png'}}
              style={{ height: 25, width: 25, tintColor: focused ? '#000000' : 'grey' }}
            />
            <Text style={{ fontWeight: '400', color: focused ? '#000000' : 'grey', fontSize: 13, width: 50, textAlign: 'center' }}>Leaves</Text>
          </View>
        )
      }} />


      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', marginTop: 15 ,}}>
            <Image
              // source={require('../../assets/Logo.png')}
              source={{uri:'https://cdn-icons-png.flaticon.com/512/266/266134.png'}}
              style={{ height: 25, width: 25, tintColor: focused ? '#000000' : 'grey' }}
            />
            <Text style={{ fontWeight: '400', color: focused ? '#000000' : 'grey', textAlign: 'center', fontSize: 13, width: 50 }}>Profile</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  )
}

export default EmployeeTab