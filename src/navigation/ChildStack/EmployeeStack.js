import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeTab from '../BottomTab/EmployeeTab';
import ResetPassword from '../../screens/Employee/StackScreens/Profile/ResetPassword';

const Employee = createStackNavigator();
const EmployeeStack = () => {
  return (
    <Employee.Navigator
    screenOptions={{
      headerShown:false
    }}
    // initialRouteName='Login'
    >
      <Employee.Screen name="EmployeeTab" component={EmployeeTab} />
      <Employee.Screen name="ResetPassword" component={ResetPassword} />

    </Employee.Navigator>
  )
}

export default EmployeeStack