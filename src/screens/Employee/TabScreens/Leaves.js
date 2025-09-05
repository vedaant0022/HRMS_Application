import { View, Text, SafeAreaView, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ButtonComponent from '../../../components/Button/Button';
import { errorMessage, successMessage } from '../../../utils';
import Dropdown from '../../../components/Dropdown/Dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { base_url } from '../../../utils/url';
import useUserStore from '../../../zustand/Store/useUserStore';
import { useNavigation } from '@react-navigation/native';



if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Leaves = () => {


  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('Pending');
  const [modal, setModal] = useState(false);
  const [reason, setreason] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [selectedOption, setSelectedOption] = useState('');

  const data = ['Sick', 'Causal', 'Paid', 'Other'];

  const user = useUserStore.getState().user;
  const token = AsyncStorage.getItem("access_token");

  const handleSelectionChange = (value) => {
    setSelectedOption(value); // Update the selected option
  };

  const handleStartDateChange = (date) => {
    if (date < today) {
      alert('Start date must be greater than today.');
      return;
    }
    setStartDate(date);
    setShowStartCalendar(false);
  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      alert('End date cannot be earlier than start date.');
      return;
    }
    setEndDate(date);
    setShowEndCalendar(false);
  };

  const getMarkedDates = (start, end) => {
    let markedDates = {};
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    while (startDateObj <= endDateObj) {
      const dateStr = startDateObj.toISOString().split('T')[0];
      markedDates[dateStr] = { selected: true, selectedColor: 'orange' };
      startDateObj.setDate(startDateObj.getDate() + 1);
    }

    return markedDates;
  };

  const handleTabChange = (tab) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTab(tab);
  };

  const pendingContent = () => {
    return (
      <View>
        <View>
          <Text>Pending Approvals</Text>
        </View>
      </View>
    )
  }
  const approvedcontent = () => {
    return (
      <View>
        <View>
          <Text>Approved</Text>
        </View>
      </View>
    )
  }



  const closemodal = () => {
    setModal(false);
    setreason('');
    setStartDate('');
    setEndDate('');
    setSelectedOption('');
  }

  const getLeaves = async () => {
    try {
      // ✅ Always fetch token fresh from AsyncStorage
      const token = await AsyncStorage.getItem("access_token");

      if (!token) {
        errorMessage("Unauthorized Access - No token found");
        return;
      }

      // ✅ Get user from Zustand
      const user = useUserStore.getState().user;
      const id = user?.User?._id;

      if (!id) {
        errorMessage("Invalid user data - employeeId missing");
        return;
      }

      const body = { employeeId: id };
      const url = `${base_url}/leaves/getleaves`;

      console.log("API HIT >>", url);
      console.log("BODY >>", body);
      console.log("Token >>", token);

      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Correct format
        },
      });

      console.log("Response Status:", response.status);
      console.log("Response Data >>>", response.data);

      if (response.status >= 200 && response.status < 300) {
        successMessage(response.data?.message || "Leaves fetched successfully");
        return response.data; // ✅ return so caller can use
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

  useEffect(() => {
    getLeaves()
  }, []);



  const submitLeave = async () => {
    try {
      // ✅ Fetch token fresh from storage
      const token = await AsyncStorage.getItem("access_token");

      const user = useUserStore.getState().user;
      const id = user?.User?._id;

      // ✅ Validate fields
      if (!reason || !startDate || !endDate || !selectedOption) {
        errorMessage("Please enter all fields");
        return;
      }
      if (!token) {
        errorMessage("Unauthorized Access");
        return;
      }
      if (!id) {
        errorMessage("Invalid user data");
        return;
      }

      const body = {
        employeeId: id,
        leaveType: selectedOption,
        startDate,
        endDate,
        reason,
      };

      const url = `${base_url}/leaves/apply`;

      console.log("API HIT >>", url);
      console.log("BODY >>", body);

      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status);
      console.log("Response Data >>>", response.data);

      if (response.status === 200 || response.status === 201) {
        successMessage(response.data?.message || "Leave applied successfully");
        console.log(response.data?.message || "Leave applied successfully");
        setModal(false); // close modal
        return response.data;
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






  const modalfn = () => (
    <Modal
      visible={modal}
      onRequestClose={() => setModal(false)}
      transparent={true}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setModal(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '92%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 16,
                elevation: 10
              }}
            >
              <View style={{ flex: 1, marginLeft: moderateScale(15), marginRight: moderateScale(15), marginTop: moderateScaleVertical(30) }}>
                <TouchableOpacity
                  onPress={() => { closemodal() }}
                >
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png' }}
                    style={{ height: moderateScaleVertical(15), width: moderateScale(15) }}
                  />
                </TouchableOpacity>
                {/* Leave Type */}
                <View style={{ marginTop: moderateScaleVertical(40) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Leave Types</Text>
                  <Dropdown
                    data={data}
                    defaultValue={selectedOption}
                    onChangeHandler={handleSelectionChange}
                  />
                </View>

                {/* Reason */}
                <View style={{ marginTop: moderateScaleVertical(30) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Reason</Text>
                  <View style={{
                    height: moderateScale(150),
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: moderateScale(8),
                    backgroundColor: '#f6f7f6',
                    borderColor: '#f6f7f6',
                  }}>
                    <TextInput
                      value={reason}
                      onChangeText={(text) => setreason(text)}
                      placeholder="Enter your reason"
                      placeholderTextColor="#c6c6c7"
                      style={{ fontSize: 16, color: '#000', margin: 5 }}
                    />
                  </View>
                </View>

                {/* Start Date */}
                <View style={{ marginTop: moderateScaleVertical(30) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Start Date</Text>
                  <TouchableOpacity onPress={() => setShowStartCalendar(true)}>
                    <View style={{
                      height: moderateScale(50),
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: moderateScale(8),
                      backgroundColor: '#f6f7f6',
                      borderColor: '#f6f7f6',
                      justifyContent: 'center',
                      paddingLeft: moderateScale(10),
                    }}>
                      <Text style={{ fontSize: 16, color: '#000' }}>
                        {startDate || 'Select Start Date'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* End Date */}
                <View style={{ marginTop: moderateScaleVertical(30) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>End Date</Text>
                  <TouchableOpacity onPress={() => setShowEndCalendar(true)}>
                    <View style={{
                      height: moderateScale(50),
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: moderateScale(8),
                      backgroundColor: '#f6f7f6',
                      borderColor: '#f6f7f6',
                      justifyContent: 'center',
                      paddingLeft: moderateScale(10),
                    }}>
                      <Text style={{ fontSize: 16, color: '#000' }}>
                        {endDate || 'Select End Date'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {showStartCalendar && (
                <Calendar
                  current={startDate}
                  minDate={today}
                  markedDates={{
                    [startDate]: { selected: true, selectedColor: 'orange' },
                    ...getMarkedDates(startDate, endDate),
                  }}
                  onDayPress={(day) => handleStartDateChange(day.dateString)}
                  monthFormat={'yyyy MM'}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: 10,
                    zIndex: 999,
                  }}
                />
              )}
              {showEndCalendar && (
                <Calendar
                  current={endDate}
                  minDate={startDate}
                  markedDates={{
                    [endDate]: { selected: true, selectedColor: 'orange' },
                    ...getMarkedDates(startDate, endDate),
                  }}
                  onDayPress={(day) => handleEndDateChange(day.dateString)}
                  monthFormat={'yyyy MM'}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: 10,
                    zIndex: 999,
                  }}
                />
              )}

              <ButtonComponent
                text="Confirm"
                onPress={submitLeave}
                backgroundColor="orange"
                textColor="white"
                disabled={false} // Set to true if you want to disable the button
              />

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'orange',
          borderRadius: 50,
          borderWidth: 0.1,
          borderColor: 'orange',
          marginHorizontal: moderateScale(10),
          marginTop: moderateScaleVertical(30),
          padding: 5,
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: selectedTab === 'Pending' ? '#fff' : 'orange',
              borderRadius: 50
            }}
            onPress={() => handleTabChange('Pending')}
          >
            <Text style={{
              color: selectedTab === 'Pending' ? 'orange' : '#fff',
              fontSize: 16,
              fontWeight: '600'
            }}>Pending</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: selectedTab === 'Approved' ? '#fff' : 'orange',
              borderRadius: 50
            }}
            onPress={() => handleTabChange('Approved')}
          >
            <Text style={{
              color: selectedTab === 'Approved' ? 'orange' : '#fff',
              fontSize: 16,
              fontWeight: '600'
            }}>Approved</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginTop: moderateScaleVertical(50),
            marginLeft: moderateScale(20),
            marginRight: moderateScale(20)
          }}
        >
          {selectedTab === 'Pending' ? (
            <View>
              {pendingContent()}
            </View>
          ) : (
            <View>
              {approvedcontent()}
            </View>
          )}

        </ScrollView>
        {modalfn()}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          width: moderateScale(50),
          height: moderateScaleVertical(50),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          position: 'absolute',
          bottom: moderateScaleVertical(90),
          right: moderateScale(20),
        }}
        onPress={() => setModal(true)}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2997/2997933.png' }}
          style={{ height: moderateScaleVertical(25), width: moderateScale(25) }}
          tintColor='white'
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default Leaves;
