import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../../screens/Onboarding/StackScreens/Splash'
import Login from '../../screens/Onboarding/StackScreens/Login';
import OTP from '../../screens/Onboarding/StackScreens/OTP';

const Onboarding = createStackNavigator();
export function OnboardingStack() {
    return (
        <Onboarding.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Login"
        >
            <Onboarding.Screen name="Splash" component={Splash} />
            <Onboarding.Screen name="Login" component={Login} />
            <Onboarding.Screen name="OTP" component={OTP} />
        </Onboarding.Navigator>
    )
}