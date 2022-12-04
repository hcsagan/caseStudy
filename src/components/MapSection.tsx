import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { default as mapViewStyle } from "../dataSets/mapStyle.json";
import { Ionicons } from "@expo/vector-icons";
import { useTransition } from "react-native-redash";
import Animated, { EasingNode } from "react-native-reanimated";
import { Location } from "../types/User";

const light = (text: string) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

interface MapSectionProps {
  location: Location;
  styles: unknown;
}

export default ({ location, styles: style }: MapSectionProps) => {
  const [showResetMap, setShowResetMap] = useState(false);

  const opacity = useTransition(showResetMap, {
    duration: 200,
    easing: EasingNode.in(EasingNode.circle),
  });

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
      showResetMap === false && setShowResetMap(true);
    } else {
      showResetMap === true && setShowResetMap(false);
    }
  };

  const mapRef = useRef<MapView>();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={[styles.text, styles.heading]}>LOCATION</Text>
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

      <View style={[styles.contact, styles.stretch, styles.addressWrapper]}>
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
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  mapStyle: {
    width: "100%",
    height: Dimensions.get('window').width * .5,
  },
  text: {
    color: "#556",
  },
  heading: {
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    alignItems: "center",
  },
});
