import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'
import { useNavigation } from '@react-navigation/native'
import ImagePickerfrom, { launchImageLibrary } from 'react-native-image-picker';
import useUserStore from '../../../../zustand/Store/useUserStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { errorMessage } from '../../../../utils'
import ButtonComponent from '../../../../components/Button/Button'
import { base_url } from '../../../../utils/api'
import axios from 'axios'


const Myprofile = () => {
  const navigation = useNavigation()

  const [modal, setModal] = useState(false);
  const [photo, setphoto] = useState('');
  const [photoImage, setPhotoImage] = useState(null);

  const user = useUserStore((state) => state.user);

  const picker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 400,
        maxWidth: 400,
      });

      console.log("Picker Result >>>", result);

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri || result.assets[0].path;
        console.log("Selected Photo URI >>>", uri);

        if (uri) {
          setphoto(uri); // ✅ save to state
        } else {
          Alert.alert("Error", "No valid image URI found");
        }
      } else {
        console.log("Image picking canceled or no assets found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick an image");
      console.error("Image picker error:", error);
    }
  };


  const uploadPhoto = async () => {
    if (!photo) {
      Alert.alert("Error", "No photo selected!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("access_token");
      const user = useUserStore.getState().user;
      const id = user?.User?._id;

      const formData = new FormData();
      formData.append("employeeId", id);
      formData.append("profileImage", {
        uri: photo,
        type: "image/jpeg",
        name: `photo_${Date.now()}.jpg`,
      });

      console.log("API HIT >> http://192.168.137.1:3000/api/users/update-profile-image");
      console.log("Uploading photo URI >>>", photo);

      const response = await fetch("http://192.168.137.1:3000/api/users/update-profile-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Upload success:", result);
      Alert.alert("Success", "Photo uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload photo");
    }
  };

  // const uploadPhoto = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("access_token");
  //     const user = useUserStore.getState().user;
  //     const id = user?.User?._id;
  //     const formData = new FormData();

  //     formData.append('employeeId', id);

  //     // Append photo
  //     formData.append('photo', {
  //       uri: photoImage,
  //       type: 'image/jpeg',
  //     });

  //     const response = await fetch('http://34.47.223.144:3000/api/users/update-profile-image', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`, 
  //       },

  //       body: formData,
  //     });

  //     const result = await response.json();
  //     console.log('Upload success:', result);
  //     Alert.alert('Success', 'Photo uploaded successfully!');
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     Alert.alert('Error', 'Failed to upload photo');
  //   }
  // };

  const updatephoto = async () => {
    setphoto(photo)
  }

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
                height: moderateScaleVertical(300),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 16,
              }}
            >
              <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(15) }}>
                {photo ? (
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                      source={{ uri: photo }}
                      style={{
                        width: moderateScale(250),
                        height: moderateScaleVertical(150),
                        borderRadius: 25,
                      }}
                    />
                    <View style={{ marginTop: moderateScaleVertical(20) }}></View>
                    <ButtonComponent
                      text="Update Image"
                      onPress={uploadPhoto}
                      backgroundColor="orange"
                      textColor="white"
                      disabled={false}
                    />
                  </View>


                ) : (
                  <TouchableOpacity onPress={picker}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3185/3185902.png' }}
                        style={{
                          width: moderateScale(25),
                          height: moderateScaleVertical(25),
                          borderRadius: 25,
                        }}
                      />
                      <Text style={{ fontSize: 18 }}>Update Profile Image</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>
            {/* Header */}
            <View>
              <EmpHeader
                name="Profile Information"
              />
            </View>
            {/* Details */}
            <View >
              <View style={{ alignItems: 'center', marginTop: moderateScaleVertical(70) }}>
                <TouchableOpacity
                  onPress={() => setModal(true)}
                >
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }}
                    style={{
                      width: moderateScale(150),
                      height: moderateScaleVertical(150),
                      borderRadius: 25,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* Name */}
              <View style={{ marginTop: moderateScaleVertical(25) }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Name</Text>
                </View>
                <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput
                    value={user.User.personalDetails.firstName}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='John Dow'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                    editable={false}
                  />
                </View>
              </View>
              {/* Email */}
              <View style={{ marginTop: moderateScaleVertical(25) }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Email</Text>
                </View>
                <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput
                    value={user.User.email}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='John.dow@gmail.com'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                    editable={false}
                  />
                </View>
              </View>
              {/* Contact */}
              <View style={{ marginTop: moderateScaleVertical(25) }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Contact</Text>
                </View>
                <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput
                    value={user.User.personalDetails.phone}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='9898989898'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                    editable={false}
                  />
                </View>
              </View>
              {/* Position */}
              <View style={{ marginTop: moderateScaleVertical(25) }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Position</Text>
                </View>
                <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput
                    value={user.User.jobDetails.designation}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='Software Developer'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                    editable={false}
                  />
                </View>
              </View>
              {/* CTC */}
              <View style={{ marginTop: moderateScaleVertical(25) }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>CTC</Text>
                </View>
                <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput
                    value={user.User.jobDetails.Salary}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='1.20LPA'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
                    editable={false}
                  />
                </View>
              </View>

              <View style={{ marginBottom: moderateScaleVertical(20) }}></View>
            </View>
          </View>
          {modalfn()}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Myprofile