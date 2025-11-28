import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';
import Map from '../../../components/Employee/Map/Map';
import moment from 'moment';
import { successMessage } from '../../../utils';

const Home = () => {
  const [ischeckin, setischeckin] = useState(false);
  const [startTime, setstartTime] = useState(null); 
  const [endTime, setendTime] = useState('');       
  const [netTime, setnetTime] = useState('');       

  const formatClock = (d) =>
    d
      ? new Date(d)
          .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
          .replace(' ', '')
      : '--:--';

  const checkin = async () => {
    const now = new Date();
    setischeckin(true);
    setstartTime(now.toISOString()); 
    setendTime('');
    setnetTime('');

    const label = now
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      .replace(' ', '');
    successMessage(`Checkin at ${label}`);
  };

  const checkout = async () => {
    if (!startTime) {
      successMessage('Please check in first');
      return;
    }

    const now = new Date();
    const start = new Date(startTime);

    const diffMs = now.getTime() - start.getTime();
    if (isNaN(diffMs) || diffMs < 0) {
      successMessage('Invalid time difference');
      return;
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedDuration = `${hours}h ${minutes}m`;
    const formattedEnd = now
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      .replace(' ', '');

    setischeckin(false);
    setendTime(formattedEnd);    
    setnetTime(formattedDuration);

    successMessage(`Checked out successfully at ${formattedEnd}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20) }} />

        <View style={{ marginTop: moderateScaleVertical(20), height: moderateScaleVertical(450) }}>
          <Map />
        </View>

        <View style={{ marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(18), flex: 1 }}>
          <View style={{ flex: 1 }}>
            {/* Date */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>
                {moment().format('Do MMMM YYYY')}
              </Text>
            </View>

            {/* Hours */}
            <View style={{ flex: 1, position: 'absolute', bottom: 110 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: moderateScaleVertical(15), flex: 1 }}>
                <View>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>
                    {formatClock(startTime)}
                  </Text>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>Checkin</Text>
                </View>

                <View>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>
                    {netTime || '--:--'}
                  </Text>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>Net Hours</Text>
                </View>

                <View>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>
                    {endTime || '--:--'}
                  </Text>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>Checkout</Text>
                </View>
              </View>

              {/* Button */}
              {ischeckin ? (
                <TouchableOpacity
                  onPress={checkout}
                  style={{
                    backgroundColor: 'orange',
                    width: moderateScale(350),
                    height: moderateScaleVertical(40),
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: moderateScaleVertical(25),
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 15, fontWeight: '600', letterSpacing: 1.5 }}>
                    CHECKOUT
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={checkin}
                  style={{
                    backgroundColor: 'orange',
                    width: moderateScale(350),
                    height: moderateScaleVertical(40),
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: moderateScaleVertical(25),
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 15, fontWeight: '600', letterSpacing: 1.5 }}>
                    CHECKIN
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
