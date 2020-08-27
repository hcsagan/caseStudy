export default (props) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        width,
        height: "100%",
        backgroundColor: "#0017",
        opacity: popupValue,
        paddingTop: popupValue.interpolate({ inputRange: [0, 1], outputRange: [100 * VH, 0] }),
        zIndex: cond(greaterThan(popupValue, 0), 1, -1),
      }}
    >
      <PopupContainer>
        <Popup {...myList[1]} />
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
          onPress={() => {
            timing(popupValue, { ...animConfig, toValue: 0 }).start();
            //setTimeout(() => setActiveIndex(-1), 500);
          }}
        >
          <Ionicons name="ios-close" style={{ margin: 0 }} size={48} color="black" />
        </TouchableOpacity>
      </PopupContainer>
    </Animated.View>
  );
};

const PopupContainer = (props) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 5 * VW,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          ...boxShadow,
        }}
      >
        {props.children}
      </View>
    </View>
  );
};

const boxShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3.84,

  elevation: 5,
};
