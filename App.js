import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import Gradient from './components/RadialGradient';
import WaveContainer from './components/WaveContainer';
import StatusText from './components/StatusText';
import NotificationModule from './components/NotificationModule';
import { Svg, G } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HelloWorldApp = () => {
    return (
        <View style={{backgroundColor: '#8a939a', flex: 1}}>

            <View style={{position: 'absolute'}}>
                <Gradient x={windowWidth / 10} y={windowHeight / 2} r={windowWidth} incolor='#b9c1c9' outcolor='#8a939a'></Gradient>
            </View>

            <View style={{position: 'absolute'}}>
                <WaveContainer></WaveContainer>
            </View>

            <View style={{position: 'absolute'}}>
                <StatusText></StatusText>
            </View>

            <View style={{position: 'absolute'}}>
                <NotificationModule></NotificationModule>
            </View>

        </View>
    )
}
export default HelloWorldApp;