import React from 'react';
import { Dimensions } from 'react-native';
import { Svg, Text } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StatusText = () => {
    return (
        <Svg height={windowHeight} width={windowWidth}>
            <Text
                fill="white"
                stroke="none"
                fontSize="18"
                fontWeight="bold"
                x={windowWidth / 2}
                y={windowHeight * 0.61}
                textAnchor="middle"
            >
                暴风式离子释放中
            </Text>
            <Text
                fill="white"
                stroke="none"
                fontSize="12"
                fontWeight="bold"
                x={windowWidth / 2}
                y={windowHeight * 0.64}
                textAnchor="middle"
            >
                细菌分子正在被快速电解
            </Text>
        </Svg>
    )
}

export default StatusText;