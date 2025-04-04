import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminTab from '../BottomTab/AdminTab';


const Admin = createStackNavigator();
const AdminStack = () => {
  return (
    <Admin.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Admin.Screen name="AdminTabs" component={AdminTab} />
    </Admin.Navigator>
  )
}

export default AdminStack