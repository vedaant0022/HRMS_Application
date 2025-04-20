import { View, Text, SafeAreaView, TextInput, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { errorMessage, successMessage } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

const OTP = () => {
  const navigation = useNavigation();

  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);
  const [loading, setloading] = useState(false);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      otpRefs.current[index - 1].focus();
    }
  };

  const submit = () =>{
    const otpString = otp.join('');
    if(otpString.length == 0 || !otpString){
      errorMessage("Error, Please Enter a Valid OTP")
    }else{
      navigation.navigate('Employee')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/7685/7685029.png" }}
              style={{ height: moderateScaleVertical(250), width: moderateScale(250) }}
            />
            <View style={{ marginTop: moderateScaleVertical(30), padding: 2 }}>
              <View>
                <Text style={{ fontSize: 28, fontWeight: '500', letterSpacing: 2 }}>OTP Verification</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15 }}>Enter 4-digit code sent on your email</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: moderateScaleVertical(50), }}>

              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  style={{
                    width: 65,
                    height: 65,
                    borderWidth: 1.5,
                    borderColor: 'grey',
                    textAlign: 'center',
                    fontSize: 24,
                    borderRadius: 9,
                    color: '#000',
                    margin: moderateScale(10),
                    backgroundColor: '#fff'

                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}

            </View>
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                disabled={loading}
              onPress={submit}
              >
                <View style={{
                  borderWidth: 1,
                  height: moderateScale(43),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  // backgroundColor: loading ? 'yellow' : 'yellow',
                  backgroundColor: 'orange',
                  borderColor: 'orange',
                  marginTop: moderateScaleVertical(75),

                }}>
                  {/* {loading ? (
                            <ActivityIndicator size="small" color="black" />
                          ) : (
                            <Text style={{ fontWeight: '600', fontSize: 21, color: 'black' }}>
                              Login
                            </Text>
                          )} */}
                  <Text style={{ fontWeight: '500', fontSize: 21, color: 'black', letterSpacing: 3 }}>
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>



          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default OTP