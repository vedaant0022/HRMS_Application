import { View, SafeAreaView, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import React, { useRef } from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';

const { width, height } = Dimensions.get('window');

const Getstarted = () => {
    const navigation = useNavigation();
    const swiperRef = useRef(null); // Create swiper reference

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Swiper
                ref={swiperRef}
                loop={false}
                showsButtons={false}
                autoplay={false}
                showsPagination={true}
                dotStyle={{ backgroundColor: 'gray', width: 8, height: 8, borderRadius: 4 }}
                activeDotStyle={{ backgroundColor: 'white', width: 12, height: 8, borderRadius: 4 }}
            >
                {/* Slide 1 */}
                <View style={{ width, height, }}>
                    <Image
                        source={require('../../../assets/Swiper/1.jpg')}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                    <TouchableOpacity
                        onPress={() => swiperRef.current.scrollBy(2)}
                        style={{
                            position: 'absolute',
                            bottom: 60,
                            alignSelf: 'center',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            paddingVertical: 12,
                            paddingHorizontal: 25,
                            borderRadius: 25,
                        }}
                    >
                        {/* <View style={{backgroundColor:'#fff',width:moderateScale(50),height:moderateScaleVertical(50),alignItems:'center',justifyContent:'center',borderRadius:25,}}>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271226.png' }}
                                style={{ height: moderateScaleVertical(40), width: moderateScale(40), resizeMode: 'center' }}
                                tintColor='#000'
                            />
                        </View> */}
                    </TouchableOpacity>
                </View>

                {/* Slide 2 */}
                <View style={{ width, height }}>
                    <Image
                        source={require('../../../assets/Swiper/2.jpg')}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                </View>

                {/* Slide 3 */}
                <View style={{ width, height }}>
                    <Image
                        source={require('../../../assets/Swiper/1.jpg')}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            position: 'absolute',
                            bottom: 60,
                            alignSelf: 'center',
                            backgroundColor: '#fff',
                            paddingVertical: 12,
                            paddingHorizontal: 25,
                            borderRadius: 25,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10
                        }}
                    >
                        <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600' }}>Get Started</Text>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1549/1549454.png' }}
                            style={{ width: 24, height: 24, tintColor: '#000000' }}
                        />
                    </TouchableOpacity>
                </View>
            </Swiper>
        </SafeAreaView>
    );
};

export default Getstarted;
