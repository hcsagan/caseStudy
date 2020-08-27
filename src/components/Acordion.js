import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ title, data }) => {
  return (
    <View>
      <TouchableOpacity>
        <Text>{title}</Text>
      </TouchableOpacity>
      {data}
    </View>
  );
};
