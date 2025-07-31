import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';

const Getstarted = () => {
    return (
        <SafeAreaView style={{ flex: 1,}}>
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Swiper
                        loop={true}
                        showsButtons={false}
                        paginationStyle={{ backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'flex-end', marginRight: moderateScale(20), marginVertical: moderateScaleVertical(720) }}
                        dot={<View style={{ backgroundColor: '#808080', width: 10, height: 5, borderRadius: 20, margin: 6, }} />}
                        activeDot={<View style={{ backgroundColor: '#ffffff', width: 25, height: 5, borderRadius: 20, margin: 6 }} />}

                    >

                        {/* Slide 1 */}
                        <View style={{ backgroundColor: '#4b6fd8', flex: 1, alignItems: 'center' }}>
                            <View style={{ marginTop: moderateScaleVertical(105) }}>
                                <Text style={{ fontSize: 31, textAlign: 'center', fontWeight: '600', color: '#fff', width: moderateScale(260), letterSpacing: 1 }}>Quick pick & drop with easy tracking</Text>
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: '400', color: '#aabbec', letterSpacing: 1, paddingTop: moderateScaleVertical(9) }}>track order with pin point location</Text>
                            </View>
                            <View>
                                <Image
                                    source={require('../../../assets/Swiper/1.jpg')}
                                    style={{ width: moderateScale(450), height: moderateScaleVertical(450), resizeMode: 'contain', alignSelf: 'baseline' }}
                                />
                            </View>
                            <TouchableOpacity
                                // onPress={() => { navigation.navigate('Phone') }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: moderateScaleVertical(50) }}>
                                    <Text style={{ color: '#fff', letterSpacing: 1, fontSize: 25, fontWeight: '600' }}>
                                        Get Started
                                    </Text>
                                    <Image
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1549/1549454.png' }}
                                        style={{ width: moderateScale(28), height: moderateScaleVertical(28), resizeMode: 'contain', tintColor: '#fff', }}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>






                        {/* Slide 2 */}
                        <View style={{ flex: 1, backgroundColor: '#44d6b3', alignItems: 'center' }}>
                            <View style={{ marginTop: moderateScaleVertical(105) }}>
                                <Text style={{ fontSize: 31, textAlign: 'center', fontWeight: '600', color: '#fff', width: moderateScale(245), letterSpacing: 1 }}>Smooth payment wiht COD option</Text>
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: '400', color: '#9ee7d5', letterSpacing: 1, paddingTop: moderateScaleVertical(9) }}>pay the way you like, enjoy!</Text>
                            </View>
                            <View>
                                <Image
                                    source={require('../../../assets/Swiper/2.jpg')}
                                    style={{ width: moderateScale(450), height: moderateScaleVertical(450), resizeMode: 'contain' }}
                                />
                            </View>
                            <TouchableOpacity
                                // onPress={() => { navigation.navigate('Phone') }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: moderateScaleVertical(50) }}>
                                    <Text style={{ color: '#fff', letterSpacing: 1, fontSize: 25, fontWeight: '600' }}>
                                        Get Started
                                    </Text>
                                    <Image
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1549/1549454.png' }}
                                        style={{ width: moderateScale(28), height: moderateScaleVertical(28), resizeMode: 'contain', tintColor: '#fff', }}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>

                        {/* Slide 3 */}
                        <View style={{ flex: 1, backgroundColor: '#46bddb', alignItems: 'center' }}>
                            <View style={{ marginTop: moderateScaleVertical(105) }}>
                                <Text style={{ fontSize: 31, textAlign: 'center', fontWeight: '600', color: '#fff', width: moderateScale(260), letterSpacing: 1 }}>Quick pick & drop with easy tracking</Text>
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: '400', color: '#9edaea', letterSpacing: 1, paddingTop: moderateScaleVertical(9) }}>track order with pin point location</Text>
                            </View>
                            <View>
                                <Image
                                    source={require('../../../assets/Swiper/1.jpg')}
                                    style={{ width: moderateScale(450), height: moderateScaleVertical(450), resizeMode: 'contain', alignSelf: 'baseline' }}
                                />
                            </View>
                            <TouchableOpacity
                                // onPress={() => { navigation.navigate('Phone') }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: moderateScaleVertical(50) }}>
                                    <Text style={{ color: '#fff', letterSpacing: 1, fontSize: 25, fontWeight: '600' }}>
                                        Get Started
                                    </Text>
                                    <Image
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1549/1549454.png' }}
                                        style={{ width: moderateScale(28), height: moderateScaleVertical(28), resizeMode: 'contain', tintColor: '#fff', }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Swiper>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Getstarted