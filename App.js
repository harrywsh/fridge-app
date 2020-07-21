import React from 'react';
import { View, Dimensions} from 'react-native';
import Gradient from './components/RadialGradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HelloWorldApp = () => {
    return (
        <View style={
            {
                flex: 1,
                backgroundColor: '#8a939a'
            }
        }>
            <Gradient x={windowWidth / 10} y={windowHeight / 2} r={windowWidth} incolor='#b9c1c9' outcolor='#8a939a'></Gradient>
        </View>
    )
}
export default HelloWorldApp;