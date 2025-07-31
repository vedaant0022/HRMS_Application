import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HRStack } from '../ChildStack/HRStack';
import EmployeeStack from '../ChildStack/EmployeeStack';
import AdminStack from '../ChildStack/AdminStack';
import { OnboardingStack } from '../ChildStack/OnboardingStack';

const Stack = createStackNavigator();
export function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Onboarding'
      >
        <Stack.Screen name="HR" component={HRStack} />
        <Stack.Screen name="Employee" component={EmployeeStack} />
        <Stack.Screen name="Admin" component={AdminStack} />
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}