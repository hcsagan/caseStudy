import React, { useState, useEffect } from "react";
import { View } from "react-native";
import myList from "./allUsers";
import UserList from "../components/UserList";
import { Value, Easing, timing } from "react-native-reanimated";
import AnimatedPopup from "../components/AnimatedPopup";
import { SafeAreaView } from "react-native-safe-area-context";

const animConfig = {
  duration: 500,
  toValue: 1,
  easing: Easing.inOut(Easing.cubic),
};

export default () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const popupValue = new Value(0);
  const anim = timing(popupValue, animConfig);
  const animBack = timing(popupValue, { ...animConfig, toValue: 0 });
  const deactivate = async () => {
    setTimeout(() => setActiveIndex(() => -1), 0);
  };
  // ! scroll to current active user when triggered.
  useEffect(() => {
    activeIndex !== -1 && anim.start();
  }, [activeIndex]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <UserList data={myList} onPress={setActiveIndex} />
      {activeIndex !== -1 && (
        <AnimatedPopup
          popupValue={popupValue}
          data={{ ...myList[activeIndex] }}
          onPress={() => {
            animBack.start(deactivate);
          }}
        />
      )}
    </SafeAreaView>
  );
};
