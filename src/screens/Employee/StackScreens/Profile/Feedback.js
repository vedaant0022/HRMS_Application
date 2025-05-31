import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { errorMessage } from '../../../../utils'


const Feedback = () => {
  const navigation = useNavigation()

  const [feedback, setfeedback] = useState('')

  const submit = () => {
    if (feedback.length == 0 || !feedback) {
      errorMessage('Please Enter Feedback')
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
          <View>
            <EmpHeader
              name="Share Feedback"
            />
          </View>

          <View>
            <View style={{ marginTop: moderateScaleVertical(25) }}>
              <View>
                <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Enter your Feedback</Text>
              </View>
              <View style={{ height: moderateScale(220), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', }}>
                <TextInput
                  value={feedback}
                  onChangeText={(text) => setfeedback(text)}
                  placeholder='Enter your Feedback'
                  placeholderTextColor={'#c6c6c7'}
                  style={{ fontSize: 16, color: '#000', margin: 5 }}
                />
              </View>

            </View>

            <View>
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



        </View>
      </View>
    </SafeAreaView>
  )
}

export default Feedback