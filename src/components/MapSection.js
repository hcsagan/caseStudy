import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { default as mapViewStyle } from "../mapStyle.json";
import { Ionicons } from "@expo/vector-icons";

const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

export default ({ location, styles }) => {
  const [backToPosition, setBackToPosition] = useState(false);
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
    if (Math.abs(coordinates.longitude - longitude) > 0.3 || Math.abs(coordinates.latitude - latitude) > 0.18) {
      backToPosition === false && setBackToPosition(true);
    } else {
      backToPosition === true && setBackToPosition(false);
    }

    //console.warn(`${latitude} ${longitude}`);
  };
  const mapRef = useRef();
  return (
    <View style={{ marginTop: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#f0f0f7",
          alignItems: "center",
        }}
      >
        <Text style={{ ...styles.text, ...styles.heading }}>location</Text>
        <Ionicons name="ios-pin" size={20} color={styles.text.color} />
      </View>

      <TouchableOpacity onPress={() => mapRef.current.animateToRegion(region)}>
        <View style={{ ...styles.contact, alignItems: "stretch" }}>
          <Ionicons
            name="md-locate"
            size={16}
            style={{ marginRight: 10, marginTop: 2 }}
            color={backToPosition ? "#be3a3a" : "#778"}
          />
          <View>
            {light(location.street.name + ", Nr. " + location.street.number)}
            <View style={{ height: 4 }} />
            {light(location.postcode + ", " + location.city + "/" + location.country)}
          </View>
        </View>
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.mapStyle}
        customMapStyle={mapViewStyle}
        initialRegion={region}
        onRegionChangeComplete={regionCheck}
      >
        <Marker coordinate={coordinates} />
      </MapView>
    </View>
  );
};
