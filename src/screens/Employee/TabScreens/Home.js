import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import Map from '../../../components/Employee/Map/Map'
import moment from 'moment'

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), }}>
        </View>
        <View style={{ marginTop: moderateScaleVertical(20), height: moderateScaleVertical(450), }}>
          <Map />
        </View>

        <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(18), flex: 1 }}>
          <View style={{flex:1}}>
            {/* Date */}
            <View style={{flex:1}}>
              <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>
                {moment().format('Do MMMM YYYY')}
              </Text>
            </View>
            {/* Hours */}
            <View style={{flex:1,position:'absolute',bottom:110}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: moderateScaleVertical(15), flex: 1 }}>
                <View>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>--:--</Text>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>Checkin</Text>
                </View>
                <View>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>--:--</Text>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>Net Hours</Text>
                </View>
                <View>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>--:--</Text>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>Checkout</Text>
                </View>
              </View>
              {/* Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: 'orange', width: moderateScale(350), height: moderateScaleVertical(40), borderRadius: 12,
                  alignItems: 'center', justifyContent: 'center', marginTop: moderateScaleVertical(25)
                }}
              >
                <Text style={{ color: '#000', fontSize: 15, fontWeight: '600', letterSpacing: 1.5 }}>CHECKIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home