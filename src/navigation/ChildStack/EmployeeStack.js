import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeTab from '../BottomTab/EmployeeTab';

const Employee = createStackNavigator();
const EmployeeStack = () => {
  return (
    <Employee.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <Employee.Screen name="EmployeeTab" component={EmployeeTab} />
    </Employee.Navigator>
  )
}

export default EmployeeStack