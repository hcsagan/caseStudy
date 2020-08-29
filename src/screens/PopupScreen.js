import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ContactDetails from "../components/ContactDetails";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapSection from "../components/MapSection";
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
const Name = ({ name }) => (
  <View style={{ flexDirection: "column", width: "75%" }}>
    <Text adjustsFontSizeToFit={true} style={{ ...styles.nameText, ...styles.text }}>
      {name.first} {name.last}
    </Text>
  </View>
);

const App = React.memo(({ gender, name, dob, email, cell, phone, picture, location }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ height: Dimensions.get("window").height - (insets.top + insets.bottom + 5 * VW) }}
      bounces={false}
    >
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
          <ContactDetails email={email} cell={cell} phone={phone} />
          <MapSection location={location} styles={styles} />
        </View>
      </View>
    </ScrollView>
  );
});

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
    // overflow: "hidden",
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
