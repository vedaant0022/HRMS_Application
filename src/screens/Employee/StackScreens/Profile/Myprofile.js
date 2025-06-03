import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../../styles/Responsiveness/responsiveSize'
import EmpHeader from '../../../../components/Employee/Header/EmpHeader'
import { useNavigation } from '@react-navigation/native'
import ImagePickerfrom, { launchImageLibrary } from 'react-native-image-picker';


const Myprofile = () => {
  const navigation = useNavigation()

  const [modal, setModal] = useState(false);
  const [photo, setphoto] = useState('');

  const picker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 400,
        maxWidth: 400,
      });

      if (!result.didCancel) {
        setphoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick an image');
      console.error('Image picker error:', error);
    }
  };

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
                    // value={current}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='John Dow'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
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
                    // value={current}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='John.dow@gmail.com'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
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
                    // value={current}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='9898989898'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
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
                    // value={current}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='Software Developer'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
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
                    // value={current}
                    // onChangeText={(text) => setcurrent(text)}
                    placeholder='1.20LPA'
                    placeholderTextColor={'#c6c6c7'}
                    // secureTextEntry={showpass}
                    style={{ fontSize: 16, color: '#000', margin: 5 }}
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