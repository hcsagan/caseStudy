import React, { useState, useEffect, createRef } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import io from "socket.io-client";
import { StatusBar } from "expo-status-bar";
import myList from "./allUsers";
const socket = io("https://wunder-provider.herokuapp.com");
import UserContainer from "../components/UserContainer";
import UserButton from "../components/UserButton";
import UserDetails from "../components/UserDetails";
import Popup from "../components/Popup";
import Animated from "react-native-reanimated";
const statusList = ["Yükleniyor...", "Bağlandı", "Bağlantı Hatası", "Bağlanılamadı", "Bağlantı Koptu"];
const statusColors = ["#fe0", "#af0", "#f55", "#f55", "#f55"];
const { width, height } = Dimensions.get("window");
const VW = width / 100;
const VH = height / 100;
export default () => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastUser, setLastUser] = useState();
  const [activeIndex, setActiveIndex] = useState(-1);
  const scrollRef = createRef();
  //Initialization and setup the socket
  useEffect(() => {
    socket.on("connect", () => setStatus(1));
    socket.on("connect_error", () => setStatus(2));
    socket.on("connect_failed", () => setStatus(3));
    socket.on("disconnect", () => setStatus(4));
    //socket.on("userList", ({ results }) => results[0] !== lastUser && setLastUser(results[0]));
  }, []);

  //update the user list
  useEffect(() => {
    lastUser !== undefined && setUserList([lastUser, ...userList]);
  }, [lastUser]);

  //scroll to current active user when triggered.
  // useEffect(() => {
  //   activeIndex !== -1 &&
  //     scrollRef.current.scrollToIndex({
  //       animated: true,
  //       index: activeIndex,
  //       viewPosition: 0,
  //     });
  // }, [activeIndex]);
  const scroller = (index) => {
    //console.warn(index);
    /*console.warn(scrollRef.toString());*/
    setActiveIndex(index);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text>Durum: {statusList[status]}</Text>
        <View style={{ ...styles.info, backgroundColor: statusColors[status] }} />
      </View>
      <FlatList
        ref={scrollRef}
        data={myList}
        renderItem={({ item, index }) => (
          // <User {...item} active={activeIndex === index ? true : false} onPress={() => scroller(index)} />
          <UserContainer gender={item.gender} key={item.key} active={activeIndex}>
            {activeIndex !== index && <UserButton {...item} onPress={() => scroller(index)} />}
            {activeIndex === index && <UserDetails {...item} />}
          </UserContainer>
        )}
        keyExtractor={(item) => item.email}
      />
      <Animated.View>
        <Popup />
      </Animated.View>
    </View>
  );
};

// const Popup = (props) => {
//   return (
//     <View style={{ width, height, position: "absolute", backgroundColor: "#0005" }}>
//       <View
//         style={{
//           width: 90 * VW,
//           height: 90 * VH,
//           top: 3 * VH,
//           left: 5 * VW,
//           backgroundColor: "#fff",
//           borderRadius: 20,
//           overflow: "hidden",
//         }}
//       >
//         <Image
//           style={{ width: "100%", height: 220 }}
//           source={{ uri: "https://randomuser.me/api/portraits/women/33.jpg" }}
//         ></Image>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  info: {
    width: 16,
    height: 16,
    borderRadius: 8,
    elevation: 3,
  },
});
