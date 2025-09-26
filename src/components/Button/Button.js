import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { moderateScale } from '../../styles/Responsiveness/responsiveSize';

const ButtonComponent = ({
    text,
    onPress,
    backgroundColor = 'orange',
    textColor = 'white',
    disabled = false,
    loading = false, // new prop
    loaderColor = 'white', // customizable loader color
}) => {
    return (
        <View style={{ width: '98%', alignSelf: 'center' }}>
            <TouchableOpacity 
                onPress={onPress} 
                disabled={disabled || loading} // disable when loading
            >
                <View
                    style={{
                        borderWidth: 1,
                        height: moderateScale(40),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor:  backgroundColor,
                        borderColor: backgroundColor,
                        flexDirection: 'row', // so loader + text can sit side by side if needed
                    }}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={loaderColor} />
                    ) : (
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
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonComponent;

