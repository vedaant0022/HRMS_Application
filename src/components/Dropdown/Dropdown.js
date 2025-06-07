import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { moderateScaleVertical } from '../../styles/Responsiveness/responsiveSize';

const Dropdown = ({
    title,
    data,
    defaultValue,
    onChangeHandler,
    defaultText = 'Please select an option', // Default text if no value is selected
}) => {
    const [selectedItem, setSelectedItem] = useState(defaultValue);

    // Function to handle selection
    const handleSelect = (selectedItem, index) => {
        console.log(selectedItem, index);
        setSelectedItem(selectedItem);
        if (onChangeHandler) {
            onChangeHandler(selectedItem); // Call the handler function passed as a prop
        }
    };

    // Function to get all dates between start and end date for period marking
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

    return (
        <View style={{ borderRadius: 10 }}>
            <SelectDropdown
                defaultValue={selectedItem}
                onSelect={handleSelect}
                data={data}
                renderButton={(selectedItem) => (
                    <View style={{ marginTop: moderateScaleVertical(10) }}>
                        <View
                            style={{
                                paddingVertical: 15,
                                borderRadius: 10,
                                backgroundColor: '#f6f7f6',
                                borderColor: '#f6f7f6',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                paddingLeft:25,
                                paddingRight:25
                                
                            }}
                        >
                            <Text style={{ fontSize: 16,  }}>
                                {selectedItem || defaultText} {/* Display selected value or default text */}
                            </Text>
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/60/60995.png',
                                }}
                                style={{ height: 12, width: 12, marginLeft: 8 }}
                            />
                        </View>
                    </View>
                )}
                renderItem={(selectedItem, index, isSelected) => (
                    <View style={{ marginVertical: 10, justifyContent: 'center' }}>
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: '400',
                                fontSize: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                        >
                            {selectedItem} 
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Dropdown;
