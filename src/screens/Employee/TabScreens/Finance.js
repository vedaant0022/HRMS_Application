import { View, Text, SafeAreaView, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform, ScrollView, Modal, TouchableWithoutFeedback, TextInput, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ButtonComponent from '../../../components/Button/Button';
import { errorMessage, successMessage } from '../../../utils';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../../../zustand/Store/useUserStore';
import axios from 'axios';
import { base_url } from '../../../utils/url';
import HomeBar from '../../../components/Employee/Homebar/HomeBar';


if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Finance = () => {
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [modal, setModal] = useState(false);
  const [description, setdescription] = useState('')
  const [startDate, setStartDate] = useState('');
  const [amount, setamount] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [selectedOption, setSelectedOption] = useState('');
  const [document, setdocument] = useState('');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [finance, setfinance] = useState('');
  const [loading, setLoading] = useState(false);


  const data = ['Travel', 'Food', 'Office Supplies', 'Medical', 'Others'];
  const user = useUserStore((state) => state.user);
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

  const buttons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 50,
          position: 'absolute',
          right: 0,
        }}
      >
        <TouchableOpacity
          // onPress={() => handleAccept(item._id)}
          style={{
            backgroundColor: "#27ae60",
            paddingVertical: 10,
            paddingHorizontal: moderateScale(15),
            borderRadius: 8,
            height: moderateScaleVertical(40)
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => handleReject(item._id)}
          style={{
            backgroundColor: "#e74c3c",
            paddingVertical: 10,
            paddingHorizontal: moderateScale(15),
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
          {Array.isArray(finance) && finance.length > 0 ? (
            finance.map((item, index) => {
              if (
                item.status?.toLowerCase() === "pending" ||
                item.status?.toLowerCase() === "rejected"
              ) {
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
                    {/* Top Section */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8, }}>
                      <View >
                        <Text style={{ fontSize: 17, fontWeight: "700", color: "#343a40" }}>
                          {item.category}
                        </Text>
                      </View>
                      <View >
                        <Text
                          style={{
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

                    {/* Amount */}
                    <Text style={{ marginBottom: 6, color: "#444" }}>
                      💰 Amount:{" "}
                      <Text style={{ fontWeight: "700", color: "#000" }}>
                        ₹{item.amount}
                      </Text>
                    </Text>

                    {/* Dates */}
                    <Text style={{ marginBottom: 6, color: "#444" }}>
                      📅 Submitted:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        {new Date(item.submittedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Text>
                    </Text>

                    {/* Description */}
                    {item.description ? (
                      <Text style={{ color: "#6c757d", marginBottom: 8 }}>
                        📝 {item.description}
                      </Text>
                    ) : null}

                    {/* Documents Section */}
                    {item.documents && item.documents.length > 0 && (
                      <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: "600", marginBottom: 4 }}>
                          📎 Documents:
                        </Text>

                        {item.documents.map((doc, docIndex) => (
                          <TouchableOpacity
                            key={docIndex}
                            onPress={() => Linking.openURL(doc.url)}
                          >
                            <Text
                              style={{
                                color: "#0d6efd",
                                textDecorationLine: "underline",
                                marginVertical: 2,
                              }}
                            >
                              View Document {docIndex + 1}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              }
              return null;
            })
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No pending or rejected reimbursements
            </Text>
          )}
        </ScrollView>
      </View>
    );
  };


  // const approvedcontent = () => {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={{ paddingBottom: 20 }}
  //       >
  //         {Array.isArray(finance) && finance.length > 0 ? (
  //           finance
  //             .filter((item) => item.status?.toLowerCase() === "approved")
  //             .map((item, index) => (
  //               <View
  //                 key={index}
  //                 style={{
  //                   borderWidth: 1,
  //                   borderRadius: 12,
  //                   marginBottom: 10,
  //                   padding: 20,
  //                 }}
  //               >
  //                 <Text>Status: {item.status}</Text>
  //                 <Text>Category: {item.category}</Text>
  //                 <Text>Amount: ₹{item.amount}</Text>
  //                 <Text>Description: {item.description}</Text>
  //                 <Text>Employee ID: {item.employeeId}</Text>

  //                 <Text>
  //                   Submitted At:{" "}
  //                   {new Date(item.submittedAt).toLocaleDateString("en-GB", {
  //                     day: "2-digit",
  //                     month: "short",
  //                     year: "numeric",
  //                   })}
  //                 </Text>

  //                 <Text>
  //                   Updated At:{" "}
  //                   {new Date(item.updatedAt).toLocaleDateString("en-GB", {
  //                     day: "2-digit",
  //                     month: "short",
  //                     year: "numeric",
  //                   })}
  //                 </Text>

  //                 {/* Documents */}
  //                 {item.documents && item.documents.length > 0 && (
  //                   <View style={{ marginTop: 10 }}>
  //                     <Text>Documents:</Text>
  //                     {item.documents.map((doc, docIndex) => (
  //                       <View key={docIndex} style={{ marginVertical: 5 }}>
  //                         <TouchableOpacity
  //                           onPress={() => Linking.openURL(doc.url)}
  //                         >
  //                           <Text
  //                             style={{
  //                               color: "blue",
  //                               textDecorationLine: "underline",
  //                             }}
  //                           >
  //                             View Document {docIndex + 1}
  //                           </Text>
  //                         </TouchableOpacity>
  //                         <Text>
  //                           Uploaded At:{" "}
  //                           {new Date(doc.uploadedAt).toLocaleDateString("en-GB", {
  //                             day: "2-digit",
  //                             month: "short",
  //                             year: "numeric",
  //                           })}
  //                         </Text>
  //                       </View>
  //                     ))}
  //                   </View>
  //                 )}
  //               </View>
  //             ))
  //         ) : (
  //           <Text style={{ textAlign: "center", marginTop: 20 }}>
  //             No approved finance
  //           </Text>
  //         )}
  //       </ScrollView>
  //     </View>
  //   );
  // };

  const approvedcontent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, marginBottom: 60 }}
        >
          {Array.isArray(finance) && finance.length > 0 ? (
            finance
              .filter((item) => item.status?.toLowerCase() === "approved")
              .map((item, index) => (
                <View
                  key={index}
                  style={{
                    borderRadius: 16,
                    padding: 18,
                    marginBottom: 18,
                    backgroundColor: "#ffffff",
                    borderLeftWidth: 5,
                    borderLeftColor: "#27ae60",
                  }}
                >
                  {/* Top Section */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ fontSize: 17, fontWeight: "700", color: "#343a40" }}>
                      {item.category}
                    </Text>

                    <Text
                      style={{
                        backgroundColor: "rgba(39, 174, 96, 0.15)",
                        color: "#27ae60",
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        fontWeight: "700",
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>

                  {/* Employee ID */}
                  {/* <Text style={{ color: "#6c757d", marginBottom: 6 }}>
                    🧑‍💼 Employee ID:{" "}
                    <Text style={{ fontWeight: "600", color: "#000" }}>
                      {item.employeeId}
                    </Text>
                  </Text> */}

                  {/* Amount */}
                  <Text style={{ marginBottom: 6, color: "#444" }}>
                    💰 Amount:{" "}
                    <Text style={{ fontWeight: "700", color: "#000" }}>
                      ₹{item.amount}
                    </Text>
                  </Text>

                  {/* Submitted & Updated Dates */}
                  <Text style={{ marginBottom: 6, color: "#444" }}>
                    📤 Submitted:{" "}
                    <Text style={{ fontWeight: "600" }}>
                      {new Date(item.submittedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </Text>

                  <Text style={{ marginBottom: 6, color: "#444" }}>
                    🔄 Updated:{" "}
                    <Text style={{ fontWeight: "600" }}>
                      {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </Text>

                  {/* Description */}
                  {item.description && (
                    <Text style={{ color: "#6c757d", marginBottom: 8 }}>
                      📝 {item.description}
                    </Text>
                  )}

                  {/* Documents */}
                  {item.documents?.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontWeight: "600", marginBottom: 4 }}>
                        📎 Documents:
                      </Text>

                      {item.documents.map((doc, docIndex) => (
                        <TouchableOpacity
                          key={docIndex}
                          onPress={() => Linking.openURL(doc.url)}
                        >
                          <Text
                            style={{
                              color: "#0d6efd",
                              textDecorationLine: "underline",
                              marginVertical: 4,
                              fontWeight: "600",
                            }}
                          >
                            View Document {docIndex + 1}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No approved reimbursements found
            </Text>
          )}
        </ScrollView>
      </View>
    );
  };

  const picker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        maxHeight: 400,
        maxWidth: 400,
      });

      if (!result.didCancel && result.assets) {
        const fileUri = result.assets[0].uri;
        const fileType = result.assets[0].type;
        if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png' || fileType === 'application/pdf') {
          setdocument(fileUri);
        } else {
          Alert.alert('Invalid file type', 'Only JPG, JPEG, PNG, and PDF files are allowed.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick an image');
      console.error('Image picker error:', error);
    }
  };

  const deleteFile = () => {
    setdocument(null);
  };

  const toggleImageEnlarged = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };


  const closemodal = () => {
    setModal(false);
    setdescription('');
    setSelectedOption('');
    setdocument('');
    setamount('');
  }

  const getfinanceRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      if (!token) {
        errorMessage("Unauthorized Access - No token found");
        return;
      }

      const url = `${base_url}/reimbursement/listreimbursement`;
      console.log("API HIT >>", url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status);
      console.log("Response Data >>>", response.data.reimbursements);
      setfinance(response.data.reimbursements);

      if (response.status >= 200 && response.status < 300) {
        successMessage(response.data?.message || "Reimbursement fetched successfully");
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
    getfinanceRequests();
  }, [])


  const submitLeave = async () => {
    try {
      setLoading(true); // start loader

      const token = await AsyncStorage.getItem("access_token");
      const user = useUserStore.getState().user;
      const id = user?.User?._id;

      if (!description || !amount || !selectedOption || !document) {
        errorMessage("Please Enter all fields");
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

      const formData = new FormData();
      formData.append("category", selectedOption);
      formData.append("amount", amount);
      formData.append("description", description);
      formData.append("documents", {
        uri: document.uri || document,
        type: document.type || "image/jpeg",
        name: document.fileName || "upload.jpg",
      });

      console.log("FORMDATA SENT >>> ", formData);

      const response = await axios.post(
        `${base_url}/reimbursement/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("RESPONSE >>>", response.data);
      successMessage("Reimbursement submitted successfully");
      setdescription("");
      setamount("");
      setSelectedOption(null);
      setdocument(null);
      setModal(false);
    } catch (error) {
      console.error(
        "Error submitting reimbursement >>>",
        error.response?.data || error.message
      );
      errorMessage("Failed to submit reimbursement");
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
              <View style={{ flex: 1, marginLeft: moderateScale(15), marginRight: moderateScale(15), marginTop: moderateScaleVertical(10) }}>
                <TouchableOpacity
                  onPress={() => { closemodal() }}
                >
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png' }}
                    style={{ height: moderateScaleVertical(15), width: moderateScale(15) }}
                  />
                </TouchableOpacity>
                {/* Category Type */}
                <View style={{ marginTop: moderateScaleVertical(25) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Category</Text>
                  <Dropdown
                    data={data}
                    defaultValue={selectedOption}
                    onChangeHandler={handleSelectionChange}
                  />
                </View>
                {/* Amount */}
                <View style={{ marginTop: moderateScaleVertical(25) }}>
                  <View>
                    <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Amount</Text>
                  </View>
                  <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                      value={amount}
                      onChangeText={(text) => setamount(text)}
                      placeholder='Enter Amount'
                      placeholderTextColor={'#c6c6c7'}
                      // secureTextEntry={showpass}
                      style={{ fontSize: 16, color: '#000', margin: 5 }}
                    />
                  </View>
                </View>
                {/* Description */}
                <View style={{ marginTop: moderateScaleVertical(30) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Description</Text>
                  <View style={{
                    height: moderateScale(150),
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: moderateScale(8),
                    backgroundColor: '#f6f7f6',
                    borderColor: '#f6f7f6',
                  }}>
                    <TextInput
                      value={description}
                      onChangeText={(text) => setdescription(text)}
                      placeholder="Enter description"
                      placeholderTextColor="#c6c6c7"
                      style={{ fontSize: 16, color: '#000', margin: 5 }}
                    />
                  </View>
                </View>
                {/* File upload */}
                <View style={{ marginTop: moderateScaleVertical(30) }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Upload File (Image/PDF)</Text>
                  <TouchableOpacity onPress={picker}>
                    <View
                      style={{
                        height: moderateScale(50),
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: moderateScale(8),
                        backgroundColor: '#f6f7f6',
                        borderColor: '#f6f7f6',
                        justifyContent: 'center',
                        paddingLeft: moderateScale(10),
                      }}
                    >
                      <Text style={{ fontSize: 16, color: '#000' }}>
                        {document ? 'File Selected' : 'Select File'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* File/Image Preview */}
                {document && (
                  <View style={{ marginTop: moderateScaleVertical(20), alignItems: 'center' }}>
                    {document.includes('pdf') ? (
                      <Text style={{ fontSize: 16, color: '#000' }}>PDF Selected</Text> // PDF preview (just text here)
                    ) : (
                      // <Image source={{ uri: document }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                      <TouchableOpacity onPress={toggleImageEnlarged}>
                        <Image source={{ uri: document }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={deleteFile}>
                      <View style={{ marginTop: 10, backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontWeight: '500' }}>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}





              </View>
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

      </TouchableWithoutFeedback >
      {isImageEnlarged && (
        <Modal transparent={true} visible={isImageEnlarged} onRequestClose={toggleImageEnlarged}>
          <TouchableWithoutFeedback onPress={toggleImageEnlarged}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
              }}
            >
              <Image
                source={{ uri: document }}
                style={{ width: '90%', height: '80%', resizeMode: 'contain' }}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </Modal >
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View>
          <HomeBar />
        </View>

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

export default Finance;
