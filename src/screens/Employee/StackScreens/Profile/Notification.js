import { View, Text, SafeAreaView, Switch } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'


const Notification = () => {



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }}>
                <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>
                    {/* Header */}
                    <View style={{ marginTop: moderateScaleVertical(1) }}>
                        <EmpHeader
                            name="Notifications"
                        />
                    </View>

                    <View style={{ marginTop: moderateScale(30), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>Allow All Notifications</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#F0D3AB' }}
                            thumbColor={isEnabled ? 'orange' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />


                    </View>


                </View>
            </View>
        </SafeAreaView>
    )
}

export default Notification