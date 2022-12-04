import React from 'react';
import { Animated } from 'react-native';
import { Ionicons, Entypo } from "@expo/vector-icons";

type IconProps = {
    name: any, // Unfortunately vector-icons doesn't have exposed types
    size?: number,
    color: string
}

const AnimatedIcon = React.memo(({ name, size = 36, color }: IconProps) => {
    const NewIcon = Animated.createAnimatedComponent(
        name === "old-phone" ? Entypo : Ionicons
    );
    return (
        <NewIcon
            name={name}
            size={name === "old-phone" ? size - 6 : size}
            color={color}
        />
    );
});

export default AnimatedIcon;
