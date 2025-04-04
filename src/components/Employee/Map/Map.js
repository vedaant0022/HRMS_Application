import { View, SafeAreaView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { moderateScaleVertical } from '../../../styles/Responsiveness/responsiveSize';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

const Map = () => {

    // const [CurrentLocation, setCurrentLocation] = useState(null);

    // const getcurrentLocation = async () => {
    //     Geolocation.getCurrentPosition(
    //         position => {
    //             const { latitude, longitude } = position.coords;
    //             setCurrentLocation({ latitude, longitude });
    //         },
    //         error => {
    //             console.log(error.message);
    //         },
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    //     );
    // };

    // useEffect(() => {
    //     getcurrentLocation();
    // }, []);
    // 19.339012, 72.808541

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapWrapper}>

                <MapView
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



