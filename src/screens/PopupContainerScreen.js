import React from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Popup from "./PopupScreen";
// ! DEPRECATED imports
// import PopupContainer from "../components/PopupContainer";
// import AnimatedPopup from "../components/AnimatedPopup";
const { width } = Dimensions.get("window");
export default React.memo(({ route, navigation }) => {
  const { data } = route.params;
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container(insets)}>
      <Popup loaded {...data} />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "white",
          width: 48,
          height: 48,
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 16,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-close" style={styles.closeIcon} size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  container: ({ top, bottom, left, right }) => ({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: top + width * 0.01,
    marginBottom: bottom + width * 0.05,
    marginLeft: left + width * 0.05,
    marginRight: right + width * 0.05,
  }),
  closeIcon: { margin: 0 },
});
