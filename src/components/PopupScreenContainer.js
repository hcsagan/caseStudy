import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width: VIEWPORT_WIDTH } = Dimensions.get("window");

export default React.memo(({ children }) => {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container(insets)}>
      {children}
      <TouchableOpacity style={styles.closeButton} onPress={goBack}>
        <Ionicons
          name="ios-close"
          style={styles.closeIcon}
          size={48}
          color="black"
        />
      </TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor="black" />
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
    marginTop: top + VIEWPORT_WIDTH * 0.01,
    marginBottom: bottom + VIEWPORT_WIDTH * 0.05,
    marginLeft: left + VIEWPORT_WIDTH * 0.05,
    marginRight: right + VIEWPORT_WIDTH * 0.05,
  }),
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "white",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 16,
  },
  closeIcon: { margin: 0 },
});
