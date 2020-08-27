import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
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
  const coordinates = {
    latitude: parseFloat(location.coordinates.latitude),
    longitude: parseFloat(location.coordinates.longitude),
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: picture.large }} />
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
          <View>
            <Text>Konum</Text>
            <MapView
              provider="google"
              style={styles.mapStyle}
              customMapStyle={mapViewStyle}
              initialRegion={{
                ...coordinates,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
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
    width: "100%",
    height: 300,
  },
  mask: {
    flex: 5,
    marginTop: 260,
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
  },
  titleContainer: {
    marginTop: -20,
    marginBottom: -4,
  },
  mapStyle: {
    width: "100%",
    height: 50 * VW,
  },
});

export default App;
