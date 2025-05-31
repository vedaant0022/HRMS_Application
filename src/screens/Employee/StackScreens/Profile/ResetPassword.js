import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import { errorMessage } from '../../../../utils'
import { useNavigation } from '@react-navigation/native'

const ResetPassword = () => {

    const navigation = useNavigation()

    const [current, setcurrent] = useState()
    const [newpassword, setnewpassword] = useState()
    const [confirm, setconfirm] = useState()
    const [showpass, setshowpass] = useState(true)

    const showbutton = () => {
        setshowpass(!showpass)
    }

    const submit = () => {
        if (!current || !newpassword || !confirm) {
            errorMessage('Error, Please Enter All Fields')
        }
        else {
            navigation.navigate('EmployeeTab')
        }


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }}>
                <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>
                    {/* Header */}
                    <View style={{ marginTop: moderateScaleVertical(1) }}>
                        <EmpHeader
                        name="Reset Password"
                        />
                    </View>

                    <View style={{ marginTop: moderateScaleVertical(50) }}>
                        <View>
                            <View>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Current Password</Text>
                            </View>
                            <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput
                                    value={current}
                                    onChangeText={(text) => setcurrent(text)}
                                    placeholder='Enter Current Password'
                                    placeholderTextColor={'#c6c6c7'}
                                    secureTextEntry={showpass}
                                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                                />
                                <TouchableOpacity
                                    onPress={showbutton}
                                >
                                    <Image
                                        source={{ uri: showpass ? 'https://cdn-icons-png.flaticon.com/512/2767/2767194.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' }}
                                        style={{ height: moderateScaleVertical(25), width: moderateScale(25) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: moderateScaleVertical(25) }}>
                            <View>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Set New Password</Text>
                            </View>
                            <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput
                                    value={newpassword}
                                    onChangeText={(text) => setnewpassword(text)}
                                    placeholder='Enter New Password'
                                    placeholderTextColor={'#c6c6c7'}
                                    secureTextEntry={showpass}
                                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                                />
                                <TouchableOpacity
                                    onPress={showbutton}
                                >
                                    <Image
                                        source={{ uri: showpass ? 'https://cdn-icons-png.flaticon.com/512/2767/2767194.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' }}
                                        style={{ height: moderateScaleVertical(25), width: moderateScale(25) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: moderateScaleVertical(25) }}>
                            <View>
                                <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Confirm New Password</Text>
                            </View>
                            <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput
                                    value={confirm}
                                    onChangeText={(text) => setconfirm(text)}
                                    placeholder='Enter Confirm New Password'
                                    placeholderTextColor={'#c6c6c7'}
                                    secureTextEntry={showpass}
                                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                                />
                                <TouchableOpacity
                                    onPress={showbutton}
                                >
                                    <Image
                                        source={{ uri: showpass ? 'https://cdn-icons-png.flaticon.com/512/2767/2767194.png' : 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png' }}
                                        style={{ height: moderateScaleVertical(25), width: moderateScale(25) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <View style={{
                        width: '98%', alignSelf: 'center',
                    }}>
                        <TouchableOpacity
                            // disabled={loading}
                            onPress={submit}
                        >
                            <View style={{
                                borderWidth: 1,
                                height: moderateScale(40),
                                alignItems: 'center',
                                justifyContent: 'center', // Center content
                                borderRadius: 10,
                                // backgroundColor: loading ? 'yellow' : 'yellow',
                                backgroundColor: 'orange',
                                borderColor: 'orange',
                                marginTop: moderateScaleVertical(75)

                            }}>
                                {/* {loading ? (
                                              <ActivityIndicator size="small" color="black" />
                                            ) : (
                                              <Text style={{ fontWeight: '600', fontSize: 21, color: 'black' }}>
                                                Login
                                              </Text>
                                            )} */}
                                <Text style={{ fontWeight: '500', fontSize: 19, color: 'white', letterSpacing: 2 }}>
                                    Confirm
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword