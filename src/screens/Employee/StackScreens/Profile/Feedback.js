import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { errorMessage, successMessage } from '../../../../utils'
import axios from 'axios'
import { base_url } from '../../../../utils/api'
import useUserStore from '../../../../zustand/Store/useUserStore'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Feedback = () => {
  const navigation = useNavigation()

  const [feedback, setfeedback] = useState('')

  const submit = async () => {
    try {
      if (!feedback || feedback.trim().length === 0) {
        errorMessage("Please Enter Feedback");
        return;
      }
  
      // ✅ Get user directly from Zustand state
      const user = useUserStore.getState().user;
  
      if (!user) {
        errorMessage("User not found, please login again");
        return;
      }
  
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        errorMessage("Unauthorized Access");
        return;
      }
  
      const id = user?.User?._id; // safe access
      if (!id) {
        errorMessage("Invalid user data");
        return;
      }
  
      const body = {
        employeeId: id,
        feedback: feedback,
      };
  
      const url = `${base_url}/feedback/addfeedback`;
      console.log("API HIT >>", url);
      console.log("BODY >>", body);
  
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response Status:", response.data);
  
      if (response.status === 201) {
        successMessage(response.data.message);
        console.log(response.data.message);
        navigation.goBack();
      }
    } catch (error) {
      console.error("API ERROR >>", error.response?.data || error.message);
      if (error.response?.data?.message) {
        errorMessage(error.response.data.message);
      } else {
        errorMessage("Something went wrong. Please try again.");
      }
    }
  };

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