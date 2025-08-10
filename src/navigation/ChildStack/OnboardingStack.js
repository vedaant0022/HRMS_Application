import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../../screens/Onboarding/StackScreens/Splash'
import Login from '../../screens/Onboarding/StackScreens/Login';
import OTP from '../../screens/Onboarding/StackScreens/OTP';
import Getstarted from '../../screens/Onboarding/StackScreens/Getstarted';
import FindEmail from '../../screens/Onboarding/StackScreens/FindEmail';
import ResetPass from '../../screens/Onboarding/StackScreens/ResetPass';

const Onboarding = createStackNavigator();
export function OnboardingStack() {
    return (
        <Onboarding.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Splash"
        >
            <Onboarding.Screen name="Splash" component={Splash} />
            <Onboarding.Screen name="Getstarted" component={Getstarted} />
            <Onboarding.Screen name="Login" component={Login} />
            <Onboarding.Screen name="OTP" component={OTP} />
            <Onboarding.Screen name="Email" component={FindEmail} />
            <Onboarding.Screen name="ResetPass" component={ResetPass} />
        </Onboarding.Navigator>
    )
}