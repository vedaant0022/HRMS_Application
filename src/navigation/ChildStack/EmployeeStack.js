import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeTab from '../BottomTab/EmployeeTab';
import ResetPassword from '../../screens/Employee/StackScreens/Profile/ResetPassword';
import Feedback from '../../screens/Employee/StackScreens/Profile/Feedback';
import MyShifts from '../../screens/Employee/StackScreens/Profile/MyShifts';
import Myprofile from '../../screens/Employee/StackScreens/Profile/Myprofile';
import Notification from '../../screens/Employee/StackScreens/Profile/Notification';

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
      <Employee.Screen name="ShareFeedBack" component={Feedback} />
      <Employee.Screen name="Shifts" component={MyShifts} />
      <Employee.Screen name="Myprofile" component={Myprofile} />
      <Employee.Screen name="Notification" component={Notification} />

    </Employee.Navigator>
  )
}

export default EmployeeStack