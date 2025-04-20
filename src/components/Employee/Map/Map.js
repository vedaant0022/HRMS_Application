import { View, SafeAreaView, StyleSheet, Text, ActivityIndicator, PermissionsAndroid, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Circle, Marker, Polygon } from 'react-native-maps';
import { moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';

import { useNavigation } from '@react-navigation/native';
import { errorMessage, successMessage } from '../../../utils';
import Geolocation from '@react-native-community/geolocation';

const Map = () => {

    const navigation = useNavigation();
    const [location, setLocation] = useState(null);


    useEffect(() => {
        requestLocationPermission()
    }, [])
    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location to show nearby content.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            successMessage("Successfully, Got your Location")

                            // successMessage(`📍 Latitude:${latitude} 'Longitude:', ${longitude}`)
                            setLocation({ latitude, longitude });
                        },
                        (error) => {
                            Alert.alert('Error', `Location error: ${error.message}`);
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                } else {
                    errorMessage('Permission Denied', 'You need to enable location permission to proceed.');
                }
            } else {
                // iOS permission handling
                Geolocation.requestAuthorization('whenInUse').then((result) => {
                    if (result === 'granted') {
                        Geolocation.getCurrentPosition(
                            (position) => {
                                const { latitude, longitude } = position.coords;
                                // successMessage(`📍 Latitude:${latitude} 'Longitude:', ${longitude}`)
                                successMessage("Successfully, Got your Location")
                                setLocation({ latitude, longitude });
                            },
                            (error) => {
                                Alert.alert('Error', `Location error: ${error.message}`);
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                        );
                    } else {
                        errorMessage('Permission Denied', 'You need to enable location permission to proceed.');
                    }
                });
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const defaultCoords = {
        latitude: 19.339012,
        longitude: 72.808541,
    };

    const mapRegion = {
        latitude: location?.latitude || defaultCoords.latitude,
        longitude: location?.longitude || defaultCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapWrapper}>

                {/* <MapView
                    initialRegion={{
                        latitude: 19.339012,
                        longitude: 72.808541,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    style={styles.map}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: 19.339012,
                            longitude: 72.808541,
                        }}
                        title="You are here"
                        description="Current location"
                    />

                    <Circle
                        center={{
                            latitude: 19.339012,
                            longitude: 72.808541,
                        }}
                        radius={150} // in meters
                        strokeWidth={1}
                        strokeColor="rgba(245, 8, 8, 0.5)"
                        fillColor="rgba(224, 126, 126, 0.43)"
                    />
                </MapView> */}

                <MapView
                    initialRegion={mapRegion}
                    style={styles.map}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={location || defaultCoords}
                        title="You are here"
                        description="Current location"
                    />

                    <Circle
                        center={defaultCoords}
                        radius={150}
                        strokeWidth={1}
                        strokeColor="rgba(245, 8, 8, 0.5)"
                        fillColor="rgba(224, 126, 126, 0.43)"
                    />
                    
                </MapView>

            </View>
        </SafeAreaView>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapWrapper: {
        flex: 1,
        borderRadius: 12,


    },
    map: {
        flex: 1,
        height: moderateScaleVertical(300)
    },
});



