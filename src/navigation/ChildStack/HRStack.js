import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HRtabs from '../BottomTab/HRTabs';


const HrStack = createStackNavigator();
export function HRStack() {
  return (
    <HrStack.Navigator>
      <HrStack.Screen name="HRTabs" component={HRtabs} />
    </HrStack.Navigator>
  )
}