import React from 'react';
import { View, Dimensions } from 'react-native';
import Gradient from './RadialGradient'
import { Svg, Circle } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WaveContainer = () => {
    return (
        <View>
            <Gradient x={windowWidth / 2} y={windowHeight / 3} r={windowWidth * 0.618 / 1.7} incolor='#c2c6cc' outcolor='#a6a9bf'></Gradient>
        </View>
    )
}

export default WaveContainer;