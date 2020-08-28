import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { ScrollView, TouchableOpacity, PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ContactDetails from "../components/ContactDetails";
import MapView, { Marker } from "react-native-maps";
import { default as mapViewStyle } from "../mapStyle.json";
const { width, height } = Dimensions.get("window");
const VW = width / 100;
const VH = height / 100;
const Icon = ({ name, size = 16, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);
const Mask = () => (
  <View style={styles.mask}>
    <Svg width="100%" height={mask.height}>
      <Path
        fill={mask.bgColor}
        d={`M 0 0 L 0 ${mask.height} L ${mask.width} ${mask.height} L ${mask.width} 0 A ${mask.width / 2} ${
          mask.height / 2
        } 0 0 1 ${mask.width / 2} ${mask.height / 2} A ${mask.width / 2} ${mask.height / 2} 0 0 1 0 0 z `}
      />
    </Svg>
  </View>
);
const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;
const Name = ({ name }) => (
  <View style={{ flexDirection: "column", width: "75%" }}>
    <Text adjustsFontSizeToFit={true} style={{ ...styles.nameText, ...styles.text }}>
      {name.first} {name.last}
    </Text>
  </View>
);

const App = ({ gender, name, dob, email, cell, phone, picture, location }) => {
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
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <Image
          style={{
            ...styles.image,
            zIndex: -1,
          }}
          source={{ uri: picture.large }}
        />
        <Mask />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={{ ...styles.nameText, ...styles.text, fontWeight: "100" }}>{name.title} </Text>
          </View>
          <View style={styles.nameContainer}>
            <Name name={name} />
            <View style={{ width: "25%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
              <Icon name={`ios-${gender}`} size={24} color={gender === "male" ? "#059" : "#faf"} />
              <Text style={[styles.text, { fontSize: 24 }]}>{dob.age}</Text>
            </View>
          </View>
          {ContactDetails(email, cell, phone)}
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
              <Ionicons name="md-locate" size={20} color={styles.text.color} />
            </View>

            <TouchableOpacity onPress={() => mapRef.current.animateToRegion(region)}>
              <View style={{ ...styles.contact, alignItems: "stretch" }}>
                <Icon
                  name="ios-pin"
                  size={20}
                  iconStyle={{ marginRight: 10 }}
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
        </View>
      </View>
    </ScrollView>
  );
};

const mask = {
  width: 90 * VW,
  height: 50,
  bgColor: "#fff",
};

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  image: {
    position: "absolute",
    top: 0,
    width: 90 * VW,
    height: 90 * VW,
  },
  mask: {
    flex: 5,
    marginTop: 90 * VW - 30,
    justifyContent: "flex-start",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#f0f0f7",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "400",
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    // position: "absolute",
  },
  titleContainer: {
    marginTop: -20,
    marginBottom: -4,
  },
  mapStyle: {
    width: "100%",
    height: 50 * VW,
  },
  heading: {
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    alignItems: "center",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default App;
