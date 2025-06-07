import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../styles/Responsiveness/responsiveSize';


const ButtonComponent = ({ text, onPress, backgroundColor = 'orange', textColor = 'white', disabled = false }) => {
    return (
        <View style={{ width: '98%', alignSelf: 'center' }}>
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <View
                    style={{
                        borderWidth: 1,
                        height: moderateScale(40),
                        alignItems: 'center',
                        justifyContent: 'center', // Center content
                        borderRadius: 10,
                        backgroundColor: disabled ? '#c6c6c7' : backgroundColor,
                        borderColor: backgroundColor,
                        // marginTop: moderateScaleVertical(75),
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '500',
                            fontSize: 19,
                            color: disabled ? '#8c8c8c' : textColor, 
                            letterSpacing: 2,
                        }}
                    >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonComponent;
