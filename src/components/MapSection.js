import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { default as mapViewStyle } from "../mapStyle.json";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useTransition } from "react-native-redash";
import Animated, { EasingNode } from "react-native-reanimated";

const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

export default ({ location, styles: style }) => {
  const [backToPosition, setBackToPosition] = useState(false);
  const opacity = useTransition(backToPosition, {
    duration: 200,
    easing: EasingNode.in(EasingNode.circle),
  });
  // const opacity = interpolate(transition, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 1],
  // });
  const coordinates = {
    latitude: parseFloat(location.coordinates.latitude),
    longitude: parseFloat(location.coordinates.longitude),
  };
  const region = {
    ...coordinates,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  // ! What I did here is, just check if region is different than user's location.
  // ! If, it is different, just make marker icon red, if it's not, turn back to grey
  const regionCheck = ({ latitude, longitude }) => {
    if (
      Math.abs(coordinates.longitude - longitude) > 0.3 ||
      Math.abs(coordinates.latitude - latitude) > 0.18
    ) {
      backToPosition === false && setBackToPosition(true);
    } else {
      backToPosition === true && setBackToPosition(false);
    }

    //console.warn(`${latitude} ${longitude}`);
  };
  const mapRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={[style.text, style.heading]}>LOCATION</Text>
        <Animated.View style={{ opacity }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => mapRef.current.animateToRegion(region)}
          >
            <View style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>RESET</Text>
              <View>
                <Ionicons name="md-locate" size={16} style={styles.locationIcon} color="#713" />
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={[style.contact, styles.stretch, styles.addressWrapper]}>
        <Ionicons name="ios-pin" size={20} color="#be3a3a" style={styles.markerIcon} />
        <View>
          {light(location.street.name + ", Nr. " + location.street.number)}
          <View style={{ height: 4 }} />
          {light(location.postcode + ", " + location.city + "/" + location.country)}
        </View>
      </View>
      <MapView
        ref={mapRef}
        provider="google"
        style={style.mapStyle}
        customMapStyle={mapViewStyle}
        initialRegion={region}
        onRegionChangeComplete={regionCheck}
      >
        <Marker coordinate={coordinates} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  addressWrapper: {
    marginTop: -8,
  },
  mapContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#f0f0f7",
    alignItems: "center",
  },
  detailsButton: {
    backgroundColor: "#fff5f5",
    padding: 6,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    height: 36,
  },
  detailsButtonText: {
    transform: [{ translateX: 0 }],
    opacity: 1,
    fontSize: 14,
    marginVertical: 2,
    fontWeight: "600",
    letterSpacing: -0.5,
    color: "#713",
    marginRight: 8,
  },
  locationIcon: { marginRight: 4, marginTop: 2 },
  markerIcon: { marginRight: 12, marginLeft: 4 },
  stretch: { alignItems: "stretch" },
});
