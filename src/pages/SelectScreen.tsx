import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ViewStyle,
  TextStyle
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainNavigatorParamList, RootNavigatorParamList } from "../../App";

interface ButtonProps {
  label: string;
  iconName: string;
  fontColor: string;
  reverse?: boolean;
  onPress: () => any;
  description: string;
}

const Button = ({ label, iconName, fontColor, reverse = false, onPress, description }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={dynamicStyle.header(reverse)}>
        <Text style={dynamicStyle.headerText(fontColor)}>{label}</Text>
        <View style={dynamicStyle.iconWrapper(fontColor)}>
          <Entypo name={iconName as any} size={24} color="white" style={styles.icon} />
        </View>
      </View>
      <Text style={dynamicStyle.description(reverse)}>{description}</Text>
    </TouchableOpacity>
  );
};

interface SelectScreenProps {
  navigation: StackNavigationProp<MainNavigatorParamList, "Select Screen">
}

export default ({ navigation: { navigate } }: SelectScreenProps) => {
  const backgroundColor = useSharedValue("#dedede");

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  useEffect(() => {
    backgroundColor.value = withRepeat(
      withTiming("#fafafa", {
        duration: 5000,
      }),
      0,
      true
    );
  }, []);

  return (
    <>
      <Header>
        <Text style={styles.text}>Select Screen</Text>
      </Header>
      <Animated.View style={[styles.container, containerStyle]}>
        <Text style={styles.chooseText}>
          Please select one of the following options:
        </Text>
        <View style={styles.buttons}>
          <Button
            onPress={() => navigate("Online List")}
            label="Online List"
            description="Live list, listens for an external socket"
            iconName="network"
            fontColor="#097"
            reverse
          />
          <Button
            onPress={() => navigate("Local List")}
            label="Local List"
            description="Useful when the socket connection is not available."
            iconName="drive"
            fontColor="#936"
          />
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    marginTop: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  chooseText: {
    fontWeight: "500",
    fontSize: 14,
    alignSelf: "flex-start",
    marginHorizontal: "10%",
    marginBottom: 12,
    marginTop: -28,
    color: "#557",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    lineHeight: 38,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttons: {
    alignItems: "center",
  },
});

const dynamicStyle: { [k: string]: (...args: any) => ViewStyle | TextStyle } = {
  header: (reverse: boolean): ViewStyle => ({
    flexDirection: reverse ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  headerText: (color: string) => ({
    fontWeight: "700",
    fontSize: 24,
    color,
  }),
  iconWrapper: (backgroundColor: string) => ({
    backgroundColor,
    padding: 6,
    borderRadius: 20,
  }),
  description: (reverse = false) => ({
    fontSize: 12,
    color: "#556",
    marginTop: 12,
    alignSelf: reverse === true ? "flex-end" : undefined,
  }),
}
