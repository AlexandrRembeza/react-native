import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./MapScreenStyle";
import ArrowLeftIcon from "../../../../assets/images/arrow-left.svg";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation, route: { params } }) => {
  const defaultLocation = {
    latitude: 49,
    longitude: 32,
  };

  const location =
    params.location.latitude && params.location.longitude
      ? params.location
      : defaultLocation;

  const fullLocation =
    String(location.latitude).length > 5 &&
    String(location.longitude).length > 5
      ? true
      : false;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Map</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.goBackButton}
          onPress={() =>
            navigation.navigate(params.fromProfile ? "Profile" : "Posts")
          }
        >
          <ArrowLeftIcon stroke="#ffffff" />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.mapContainer}
        region={{
          ...location,
          latitudeDelta: fullLocation ? 0.0922 : 15,
          longitudeDelta: fullLocation ? 0.0421 : 15,
        }}
      >
        {params.location.latitude && params.location.longitude && (
          <Marker title={params.title} coordinate={{ ...location }} />
        )}
      </MapView>

      <View style={styles.bottomContainer} />
    </View>
  );
};

export default MapScreen;
