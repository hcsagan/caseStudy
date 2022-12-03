import React from "react";
import LocalList from "./src/pages/LocalList";
import SocketList from "./src/pages/SocketList";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectScreen from "./src/pages/SelectScreen";
import PopupScreen from "./src/pages/PopupScreen";
import { enableScreens } from "react-native-screens";
import { Dimensions } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

enableScreens();

const { height: VIEWPORT_HEIGHT } = Dimensions.get("window");

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Select Screen" component={SelectScreen} />
    <Stack.Screen name="Local List" component={LocalList} />
    <Stack.Screen name="Online List" component={SocketList} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <RootStack.Navigator
          mode="modal"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
                transform: [
                  {
                    translateY: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [VIEWPORT_HEIGHT, 0],
                      extrapolateLeft: "clamp",
                    }),
                  },
                  {
                    scale: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                      extrapolateLeft: "clamp",
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.25],
                  extrapolate: "clamp",
                }),
              },
            }),
          }}
        >
          <RootStack.Screen name="Main" component={MainNavigator} />
          <RootStack.Screen name="Modal" component={PopupScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
