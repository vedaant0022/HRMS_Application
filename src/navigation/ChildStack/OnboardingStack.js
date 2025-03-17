import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../../screens/Onboarding/StackScreens/Splash'

const Onboarding = createStackNavigator
export function OnboardingStack() {
    return (
        <Onboarding.Navigator>
            <Onboarding.Screen name="Splash" component={Splash} />
        </Onboarding.Navigator>
    )
}