import { View, Text, SafeAreaView, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ButtonComponent from '../../../components/Button/Button';
import { errorMessage, successMessage } from '../../../utils';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { launchImageLibrary } from 'react-native-image-picker';



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

  const data = ['Travel', 'Food', 'Office Supplies', 'Medical', 'Others'];

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
          <Text>Pending Finance Approvals</Text>
        </View>
      </View>
    )
  }
  const approvedcontent = () => {
    return (
      <View>
        <View>
          <Text>Finance Approved</Text>
        </View>
      </View>
    )
  }

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
    setIsImageEnlarged(!isImageEnlarged); // Toggle the enlarged view
  };


  const closemodal = () => {
    setModal(false);
    setdescription('');
    setSelectedOption('');
    setdocument('');
    setamount('');
  }

  const submitLeave = () => {
    if (!description || !amount || !selectedOption) {
      errorMessage("Please Enter all fields")
    }else{
      setModal(!modal)
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
                disabled={false}
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
