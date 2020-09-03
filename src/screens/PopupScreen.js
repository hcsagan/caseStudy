import React, { useRef, useState, useEffect } from "react";
import { Animated, Dimensions, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Path, Svg } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContactDetails from "../components/ContactDetails";
import MapSection from "../components/MapSection";

const { width } = Dimensions.get("window");
const VW = width / 100; // not volkswagen :) it is viewport width.

const Icon = ({ name, size = 16, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);

const Name = ({ name }) => (
  <View style={styles.nameContainer}>
    <Text adjustsFontSizeToFit={true} style={[styles.nameText, styles.text]}>
      {name.first} {name.last}
    </Text>
  </View>
);

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const App = ({ gender, name, dob, email, cell, phone, picture, location }) => {
  const [load, setLoad] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: scrollY } },
      },
    ],
    { useNativeDriver: true }
  );
  // * Delaying the contact and mapview sections
  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <Animated.ScrollView
      style={styles.scrollView(insets)}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <Animated.Image style={styles.image(scrollY)} source={{ uri: picture.large }} />
        <AnimatedSvg viewBox="0 0 100 100" style={styles.mask(scrollY)}>
          <Path d="M-1 100.125V87C31.1713 102.77 68.8287 102.77 101 87V100.125H-1Z" fill="white" />
        </AnimatedSvg>
        <Animated.View style={styles.content(scrollY)}>
          <View style={styles.titleContainer}>
            <Animated.Text style={[styles.nameText, styles.text, styles.title(scrollY)]}>
              {name.title}
            </Animated.Text>
          </View>
          <View style={styles.nameSection}>
            <Name name={name} />
            <View style={styles.genderAndAge}>
              <Icon name={`ios-${gender}`} size={24} color={gender === "male" ? "#059" : "#faf"} />
              <Text style={[styles.text, { fontSize: 24 }]}>{dob.age}</Text>
            </View>
          </View>
          {!load && <ActivityIndicator size="large" />}
          {load && (
            <>
              <ContactDetails email={email} cell={cell} phone={phone} />
              <MapSection location={location} styles={styles} />
            </>
          )}
        </Animated.View>
      </View>
    </Animated.ScrollView>
  );
};

const mask = {
  width: Math.floor(90 * VW),
  height: 50,
  bgColor: "#fff",
};

const styles = StyleSheet.create({
  scrollView: ({ top, bottom }) => ({
    height: Dimensions.get("window").height - (top + bottom + 5 * VW),
  }),
  text: {
    color: "#556",
  },
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  mask: (scrollY) => ({
    width: Math.round(90 * VW),
    height: Math.round(90 * VW),
    position: "absolute",
    transform: [
      {
        scaleX: scrollY.interpolate({
          inputRange: [-width * 0.9, 0, width * 0.45, width * 0.9],
          outputRange: [2, 1.1, 1.3, 4],
        }),
      },
    ],
  }),
  image: (scrollY) => ({
    top: 0,
    width: Math.round(90 * VW),
    height: Math.round(90 * VW),
    zIndex: -1,
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [-mask.width, 0, mask.width],
          outputRange: [-mask.width / 2, 0, mask.width / 2],
        }),
      },
      {
        scale: scrollY.interpolate({
          inputRange: [-mask.width, 0, mask.width],
          outputRange: [2, 1, 1],
        }),
      },
    ],
  }),
  title: (scrollY) => ({
    fontWeight: "100",
    opacity: scrollY.interpolate({
      inputRange: [0, width * 0.45],
      outputRange: [1, 0],
    }),
  }),
  nameSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#f0f0f7",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 16,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "400",
  },
  nameContainer: { flexDirection: "column", width: "75%" },
  genderAndAge: {
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  content: (scrollY) => ({
    paddingHorizontal: 16,
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    opacity: scrollY.interpolate({
      inputRange: [-width * 0.5, 0, 1],
      outputRange: [0, 1, 1],
    }),
  }),
  titleContainer: {
    marginTop: -8,
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

export default React.memo(App);
