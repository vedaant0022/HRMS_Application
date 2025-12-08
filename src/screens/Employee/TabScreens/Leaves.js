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
  const [leave, setleave] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useUserStore((state) => state.user);
  console.log("USER DETAILS >> ", user)

  const data = ['Sick', 'Causal', 'Paid', 'Other'];
  const handleSelectionChange = (value) => {
    setSelectedOption(value);
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

  const handleAccept = (id) => {
    console.log("Accepted Leave:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected Leave:", id);
  };

  const buttons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 50,
          position: 'absolute'
        }}
      >
        <TouchableOpacity
          onPress={() => handleAccept(item._id)}
          style={{
            backgroundColor: "#27ae60",
            paddingVertical: 10,
            paddingHorizontal: moderateScale(20),
            borderRadius: 8,
            height: moderateScaleVertical(40)
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleReject(item._id)}
          style={{
            backgroundColor: "#e74c3c",
            paddingVertical: 10,
            paddingHorizontal: moderateScale(20),
            borderRadius: 8,
            height: moderateScaleVertical(40)
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Reject</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const pendingContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, marginBottom: 60 }}
        >
          {Array.isArray(leave) && leave.length > 0 ? (
            leave.map((item, index) => {
              if (item.status?.toLowerCase() === "pending") {
                return (
                  <View
                    key={index}
                    style={{
                      borderRadius: 16,
                      padding: 18,
                      marginBottom: 18,
                      backgroundColor: "#ffffff",
                      borderLeftWidth: 5,
                      borderLeftColor:
                        item.status === "Approved"
                          ? "#27ae60"
                          : item.status === "Rejected"
                            ? "#e74c3c"
                            : "#f7a82b",

                    }}
                  >
                    <View >
                      <View style={{ flex: 1, }}>
                        {/* Status + Type */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: moderateScale(150) }}>
                          <View>
                            <Text style={{ fontSize: 17, fontWeight: "700", color: "#343a40" }}>
                              {item.leaveType}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text
                              style={{
                                alignSelf: "flex-end",
                                backgroundColor:
                                  item.status === "Approved"
                                    ? "rgba(39, 174, 96, 0.15)"
                                    : item.status === "Rejected"
                                      ? "rgba(231, 76, 60, 0.15)"
                                      : "rgba(247, 168, 43, 0.15)",
                                color:
                                  item.status === "Approved"
                                    ? "#27ae60"
                                    : item.status === "Rejected"
                                      ? "#e74c3c"
                                      : "#d38800",
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                fontWeight: "700",
                                marginTop: 4,
                              }}
                            >
                              {item.status}
                            </Text>
                            {/* buttons */}
                            {(user?.User?.role === "Manager" || user?.User?.role === "HR") ? (

                              buttons()

                            ) : (
                              <></>
                            )}
                          </View>
                        </View>

                        {/* Dates */}
                        <Text style={{ marginBottom: 6, color: "#444" }}>
                          📅 Start:{" "}
                          <Text style={{ fontWeight: "600" }}>
                            {new Date(item.startDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </Text>
                        </Text>

                        <Text style={{ marginBottom: 6, color: "#444" }}>
                          📅 End:{" "}
                          <Text style={{ fontWeight: "600" }}>
                            {new Date(item.endDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </Text>
                        </Text>

                        {/* Days */}
                        <Text style={{ marginBottom: 10, fontWeight: "700", color: "#f7a82b" }}>
                          ⏱ Total Days:{" "}
                          {(() => {
                            if (item.startDate && item.endDate) {
                              const start = new Date(item.startDate);
                              const end = new Date(item.endDate);
                              const diffTime = Math.abs(end - start);
                              return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                            }
                            return 0;
                          })()}
                        </Text>

                        {/* Reason */}
                        <Text style={{ color: "#6c757d" }}>📝 {item.reason}</Text>
                      </View>
                    </View>
                  </View>
                );
              }
              return null;
            })
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No pending leaves
            </Text>
          )}
        </ScrollView>
      </View>
    );
  };



  const approvedcontent = () => {
    return (
      <View style={{ flex: 1, }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {Array.isArray(leave) && leave.length > 0 ? (
            leave.map((item, index) => {
              if (item.status?.toLowerCase() === "approved") {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 18,
                      borderLeftColor: "#27ae60",
                      borderLeftWidth: 5
                    }}
                  >
                    {/* Header with Status Badge */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 18, fontWeight: "700", color: "#2d3436" }}>
                        {item.leaveType}
                      </Text>

                      <View
                        style={{
                          backgroundColor: "#27ae60",
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                          borderRadius: 12,
                        }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
                          {item.status}
                        </Text>

                      </View>
                    </View>
                    {/* Dates */}
                    <View style={{ marginTop: 8 }}>
                      <Text style={{ color: "#666" }}>
                        📅 Start:{" "}
                        <Text style={{ fontWeight: "600" }}>
                          {new Date(item.startDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </Text>
                      </Text>

                      <Text style={{ color: "#666", marginTop: 2 }}>
                        📌 End:{" "}
                        <Text style={{ fontWeight: "600" }}>
                          {new Date(item.endDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </Text>
                      </Text>
                    </View>

                    {/* Total Days */}
                    <Text
                      style={{
                        marginTop: 8,
                        fontWeight: "700",
                        color: "#2d3436",
                        fontSize: 15,
                      }}
                    >
                      Total Days:{" "}
                      {(() => {
                        if (item.startDate && item.endDate) {
                          const start = new Date(item.startDate);
                          const end = new Date(item.endDate);
                          const diffDays =
                            Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
                          return diffDays;
                        }
                        return 0;
                      })()}
                    </Text>

                    {/* Reason */}
                    {item.reason ? (
                      <Text style={{ color: "#636e72", marginTop: 10, fontSize: 14 }}>
                        📝 {item.reason}
                      </Text>
                    ) : null}
                  </View>
                );
              }
              return null;
            })
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                fontSize: 16,
                fontWeight: "600",
                color: "#555",
              }}
            >
              No approved leaves found ✨
            </Text>
          )}
        </ScrollView>
      </View>
    );
  };

  const closemodal = () => {
    setModal(false);
    setreason('');
    setStartDate('');
    setEndDate('');
    setSelectedOption('');
  }

  const getLeaves = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      if (!token) {
        errorMessage("Unauthorized Access - No token found");
        return;
      }

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
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status);
      // console.log("Response Data >>>", response.data);

      if (response.status >= 200 && response.status < 300) {
        successMessage(response.data?.message || "Leaves fetched successfully");
        setleave(response.data?.leaves || []);
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

  useEffect(() => {
    getLeaves()
  }, []);

  const submitLeave = async () => {
    try {
      setLoading(true); // start loader

      const token = await AsyncStorage.getItem("access_token");
      const user = useUserStore.getState().user;
      const id = user?.User?._id;

      if (!reason || !startDate || !endDate || !selectedOption) {
        errorMessage("Please enter all fields");
        setLoading(false);
        return;
      }
      if (!token) {
        errorMessage("Unauthorized Access");
        setLoading(false);
        return;
      }
      if (!id) {
        errorMessage("Invalid user data");
        setLoading(false);
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

        // ✅ Reset form
        setreason("");
        setStartDate("");
        setEndDate("");
        setSelectedOption(null);

        setModal(false);
        getLeaves();
        return response.data;

      }
    } catch (error) {
      console.error("API ERROR >>", error.response?.data || error.message);

      if (error.response?.data?.message) {
        errorMessage(error.response.data.message);
      } else {
        errorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // stop loader always
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
                loading={loading}
                disabled={loading}
              />

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'center', backgroundColor: 'orange', borderRadius: 50, borderWidth: 0.1, borderColor: 'orange', marginHorizontal: moderateScale(10),
            marginTop: moderateScaleVertical(30), padding: 5,
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
      </ScrollView>
      <View >
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
      </View>
    </SafeAreaView>
  );
};

export default Leaves;
