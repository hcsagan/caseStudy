import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import IconButton from "./IconButton";

interface ContactDetailsProps {
  email: string;
  cell: string;
  phone: string;
}

const ContactDetails = ({ email, cell, phone }: ContactDetailsProps) => {
  const transition = useSharedValue<number>(0);
  const lastAction = useSharedValue<'opening' | 'closing'>('closing');

  const animate = () => {
    "worklet";

    if (lastAction.value === 'opening') {
      transition.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease)
      });
      lastAction.value = 'closing';
    }

    if (lastAction.value === "closing") {
      transition.value = withTiming(1, {
        duration: 500,
        easing: Easing.in(Easing.ease)
      });
      lastAction.value = 'opening';
    }
  };

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -1
        },
        {
          rotate: interpolate(transition.value, [0.2, 0.8], [0, -90], Extrapolate.CLAMP) + "deg"
        },
        {
          translateY: 1
        },
      ]
    }
  }, []);

  const links = [
    {
      text: cell,
      link: `tel:${cell}`,
      icon: "ios-call",
      iconColor: "#4c7",
      type: "GSM",
    },
    {
      text: phone,
      link: `tel:${phone}`,
      icon: "old-phone",
      iconColor: "#fa5",
      type: "Phone",
    },
    {
      text: email,
      link: `mailto:${email}`,
      icon: "ios-mail",
      iconColor: "#5af",
      type: "Mail",
    },
  ];

  return (
    <View>
      <View style={styles.headerWrapper}>
        <Text style={[styles.text, styles.headerText]}>Contact</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={animate}
        >
          <View style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>DETAILS</Text>
            <Animated.View
              style={arrowStyle}
            >
              <Entypo name="chevron-left" color="#557" size={20} />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        {links.map((item, index) => (
          <IconButton
            {...item}
            index={index}
            transition={transition}
            key={index.toString()}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },
  iconContainer: { height: 102 },
  contactIcon: {
    width: 16,
    marginRight: 4,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -6,
  },
  headerText: {
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  detailsButton: {
    backgroundColor: "#f5f5ff",
    padding: 6,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: "600",
    letterSpacing: -0.5,
    color: "#557",
  },
});

export default ContactDetails;
