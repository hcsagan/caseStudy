import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const mask = {
  width: Dimensions.get('window').width,
  height: 50,
  bgColor: '#ecf0f1',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
  },
  mask: {
    flex: 5,
    justifyContent: 'flex-end',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mask.bgColor,
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
  }
});

const App = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={{uri: "https://randomuser.me/api/portraits/women/33.jpg"}} />
    <View style={styles.mask}>
      <Svg width={mask.width} height={mask.height}>
        <Path
          fill={mask.bgColor}
          d={`M 0 0 L 0 ${mask.height} L ${mask.width} ${mask.height} L ${mask.width} 0 A ${mask.width / 2} ${mask.height / 2} 0 0 1 ${mask.width / 2} ${mask.height / 2} A ${mask.width / 2} ${mask.height / 2} 0 0 1 0 0 z `} />
      </Svg>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Text</Text>
    </View>
  </View>
);

export default App;