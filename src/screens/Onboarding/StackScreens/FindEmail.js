// import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
// import { useNavigation } from '@react-navigation/native';
// import { errorMessage } from '../../../utils';

// const FindEmail = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');


//   const submit = () => {
//     if (!email || !isValidEmail(email)) {
//       errorMessage("Error, Please Enter a Valid Email");
//     } else if (!password) {
//       errorMessage("Error, Please Enter a Valid Password");
//     } else {
//       // navigation.navigate('OTP');
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View style={{ flex: 1, marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>
//         <View>
//           <Image
//             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png' }}
//             style={{ height: moderateScaleVertical(20), width: moderateScale(20) }}
//           />
//         </View>
//         {/* Title */}
//         <View style={{ marginTop: moderateScaleVertical(120) }}>
//           <Text style={{ fontSize: 22, fontWeight: '500', letterSpacing: 2 }}>Enter Your <Text style={{ color: 'orange' }}>EaseEmployee <Text style={{ color: '#000' }}>Email</Text></Text></Text>
//         </View>
//         {/* Email */}
//         <View style={{ marginTop: moderateScale(80) }}>
//           <View>
//             <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Email:</Text>
//           </View>
//           <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(8), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6' }}>
//             <TextInput
//               value={email}
//               onChangeText={(text) => setemail(text)}
//               placeholder='Enter Email'
//               placeholderTextColor={'#c6c6c7'}
//               style={{ fontSize: 16, color: '#000', margin: 5 }}
//             />
//           </View>
//         </View>
//         {/* Button */}
//         <View>
//           <TouchableOpacity
//             disabled={loading}
//             onPress={submit}
//           >
//             <View style={{
//               borderWidth: 1,
//               height: moderateScale(43),
//               alignItems: 'center',
//               justifyContent: 'center', // Center content
//               borderRadius: 10,
//               // backgroundColor: loading ? 'yellow' : 'yellow',
//               backgroundColor: 'orange',
//               borderColor: 'orange',
//               marginTop: moderateScaleVertical(25)

//             }}>
//               {/* {loading ? (
//                         <ActivityIndicator size="small" color="black" />
//                       ) : (
//                         <Text style={{ fontWeight: '600', fontSize: 21, color: 'black' }}>
//                           Login
//                         </Text>
//                       )} */}
//               <Text style={{ fontWeight: '500', fontSize: 21, color: 'white', letterSpacing: 3 }}>
//                 Continue
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: moderateScale(150) }}>
//           <View style={{ marginTop: moderateScale(120) }}>
//             <Text style={{ fontWeight: '400', fontSize: 16, color: '#2C2C2C' }}>© 2025 EaseEmployee. All rights reserved.</Text>
//           </View>
//         </View>


//       </View>
//     </SafeAreaView>
//   )
// }

// export default FindEmail


import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize'
import { useNavigation } from '@react-navigation/native';
import { errorMessage } from '../../../utils';

const FindEmail = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('');


  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const submit = () => {
    if (!email || !isValidEmail(email)) {
      errorMessage("Error, Please Enter a Valid Email");
    } else {
      // Logic for handling email submission, e.g., to send an OTP
      navigation.navigate('ResetPass');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, marginLeft: moderateScale(20), marginRight: moderateScale(20), marginTop: moderateScaleVertical(25) }}>

        {/* Header and Main Content */}
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png' }}
              style={{ height: moderateScaleVertical(20), width: moderateScale(20) }}
            />
          </View>

          <View style={{ marginTop: moderateScaleVertical(120) }}>
            <Text style={{ fontSize: 22, fontWeight: '500', letterSpacing: 2 }}>
              Enter Your <Text style={{ color: 'orange' }}>EaseEmployee <Text style={{ color: '#000' }}>Email</Text></Text>
            </Text>
          </View>

          <View style={{ marginTop: moderateScale(70) }}>
            <View>
              <Text style={{ fontSize: 16, color: '#000', fontWeight: '400' }}>Email:</Text>
            </View>
            <View style={{ height: moderateScale(50), borderWidth: 1, borderRadius: 10, marginTop: moderateScale(28), backgroundColor: '#f6f7f6', borderColor: '#f6f7f6' }}>
              <TextInput
                value={email}
                onChangeText={(text) => setemail(text)}
                placeholder='Enter Email'
                placeholderTextColor={'#c6c6c7'}
                style={{ fontSize: 16, color: '#000', margin: 5 }}
              />
            </View>
          </View>
        </View>

        {/* Footer section with the button and copyright */}
        <View style={{ justifyContent: 'flex-end', marginBottom: moderateScaleVertical(25) }}>
          <TouchableOpacity
            disabled={loading}
            onPress={submit}
          >
            <View style={{
              borderWidth: 1,
              height: moderateScale(43),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: 'orange',
              borderColor: 'orange',
              marginBottom: moderateScaleVertical(25) // Spacing between button and copyright
            }}>
              <Text style={{ fontWeight: '500', fontSize: 21, color: 'white', letterSpacing: 3 }}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#2C2C2C' }}>
              © 2025 EaseEmployee. All rights reserved.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FindEmail