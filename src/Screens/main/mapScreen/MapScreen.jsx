import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./MapScreenStyle";
import ArrowLeftIcon from "../../../../assets/images/arrow-left.svg";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation, route: { params } }) => {
  const fullLocation =
    String(params.location.latitude).length > 5 &&
    String(params.location.longitude).length > 5
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
          ...params.location,
          latitudeDelta: fullLocation ? 0.0922 : 15,
          longitudeDelta: fullLocation ? 0.0421 : 15,
        }}
      >
        <Marker title={params.title} coordinate={{ ...params.location }} />
      </MapView>

      <View style={styles.bottomContainer} />
    </View>
  );
};

export default MapScreen;
