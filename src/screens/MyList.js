import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { View } from "react-native";
import UserList from "../components/UserList";
import AnimatedPopup from "../components/AnimatedPopup";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "./allUsers.json";

export default ({ navigation }) => {
  // console.log(navigation);
  // const myList = useMemo(() => data, []);
  // const [activeIndex, setActiveIndex] = useState(-1);
  const activate = useCallback((index) => {
    //setActiveIndex(index);
    navigation.navigate("Modal", { data: data[index] });
  }, []);
  // const deactivate = useCallback(() => {
  //   //setTimeout(() => setActiveIndex(() => -1), 0);
  // }, [setActiveIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <UserList data={data} onPress={activate} local={true} />
      {/* {activeIndex !== -1 && <AnimatedPopup data={myList[activeIndex]} onPress={deactivate} />} */}
    </View>
  );
};
