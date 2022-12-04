import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BackButton = () => {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity onPress={goBack} style={styles.backButton}>
      <AntDesign name="arrowleft" size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 32,
    height: 32,
  },
});

export default React.memo(BackButton);