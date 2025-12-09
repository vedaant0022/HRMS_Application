import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import useUserStore from '../../../zustand/Store/useUserStore';

const HomeBar = () => {
    const user = useUserStore((state) => state.user);
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', width: '100%', }}>
            <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(15) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }}
                            style={{
                                width: moderateScale(50),
                                height: moderateScaleVertical(50),
                                borderRadius: 25,
                                marginRight: moderateScale(12),
                            }}
                        />
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{user.User.personalDetails.firstName} {user.User.personalDetails.lastName}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'green', fontSize: 16 }}>●</Text>
                                <Text style={{ fontSize: 14, color: '#555', marginLeft: 4 }}>Online</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/891/891012.png' }}
                            style={{ width: moderateScale(24), height: moderateScaleVertical(24), }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeBar