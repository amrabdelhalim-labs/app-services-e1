import React, { useState, useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import styles from '../styles/authStyles';

// Dynamically load map implementation to avoid importing native-only internals on web
export default function MapViewContainer(props) {
    const [MapLib, setMapLib] = useState(null);
    const [MarkerComp, setMarkerComp] = useState(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                if (Platform.OS === 'web') {
                    // use web-compatible package (react-native-web-maps) which wraps Google Maps JS
                    const mod = await import('react-native-web-maps');
                    const MapDefault = mod.default || mod.MapView || mod;
                    const Marker = mod.Marker || MapDefault.Marker || null;
                    if (mounted) {
                        setMapLib(MapDefault);
                        setMarkerComp(Marker);
                    }
                } else {
                    const mod = await import('react-native-maps');
                    const MapDefault = mod.default || mod.MapView || mod;
                    const Marker = mod.Marker || MapDefault.Marker || null;
                    if (mounted) {
                        setMapLib(MapDefault);
                        setMarkerComp(Marker);
                    }
                }
            } catch (e) {
                console.warn('Failed to load maps implementation:', e);
            }
        };
        load();
        return () => { mounted = false };
    }, []);

    if (!MapLib) {
        return (
            <View style={styles.mapContainer}>
                <Text>Loading map...</Text>
            </View>
        );
    }

    const MarkerElement = MarkerComp || MapLib.Marker;

    return (
        <View style={styles.mapContainer}>
            <MapLib
                style={styles.map}
                provider={'google'}
                initialRegion={{
                    latitude: props.location.latitude,
                    longitude: props.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}>
                {MarkerElement ? (
                    <MarkerElement
                        coordinate={{
                            latitude: props.location.latitude,
                            longitude: props.location.longitude
                        }}
                        draggable
                        onDragEnd={(e) => {
                            if (Platform.OS === 'web') {
                                // web marker event shape may differ (Google Maps JS)
                                const lat = e?.latLng?.lat ? e.latLng.lat() : undefined;
                                const lng = e?.latLng?.lng ? e.latLng.lng() : undefined;
                                if (lat && lng) {
                                    props.lat(lat);
                                    props.lng(lng);
                                }
                            } else {
                                props.lat(e.nativeEvent.coordinate.latitude);
                                props.lng(e.nativeEvent.coordinate.longitude);
                            }
                        }}
                    />
                ) : null}
            </MapLib>
        </View>
    );
}