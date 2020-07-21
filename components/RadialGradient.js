import React from 'react';
import { View, Dimensions } from 'react-native';
import { RadialGradient, Svg, Defs, Stop, Circle } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Gradient = (props) => {
    return (
        <View>
            <Svg height={windowHeight} width={windowWidth}>
                <Defs>
                    <RadialGradient
                        id="grad"
                        cx={props.x}
                        cy={props.y}
                        r={props.r}
                        fx={props.x}
                        fy={props.y}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop offset="0" stopColor={props.incolor} stopOpacity="1" />
                        <Stop offset="1" stopColor={props.outcolor} stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Circle cx={props.x} cy={props.y} r={props.r} fill="url(#grad)" />
            </Svg>
        </View>
    )
}
export default Gradient;