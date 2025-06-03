import { View, Text, SafeAreaView, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';
import { successMessage } from '../../../utils';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Leaves = () => {
  const [selectedTab, setSelectedTab] = useState('Pending');

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
          // elevation: 5,
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

        {/* Tab Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginTop: moderateScaleVertical(50),
            marginLeft:moderateScale(20),
            marginRight:moderateScale(20)
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
          // elevation: 5,
        }}
        onPress={() => {
          successMessage('Add button pressed!');
        }}
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
