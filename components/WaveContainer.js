import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Gradient from './RadialGradient'
import Wave from 'react-native-waveview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const containerWidth = windowWidth * 0.618 / 1.7;

const WaveContainer = () => {
    return (
        <View>
            <View style={{ position: 'absolute' }}>
                <Gradient x={windowWidth / 2} y={windowHeight / 3} r={containerWidth} incolor='#c2c6cc' outcolor='#a6a9bf'></Gradient>
                <View style={_styles.container}>
                <Wave
                    style={_styles.waveBall}
                    H={containerWidth * 2 * 0.1}
                    speed={7000}
                    waveParams={[
                        { A: 25, T: 360, fill: '#b3aef2' },
                        // { A: 35, T: 300, fill: '#0087dc' },
                        { A: 40, T: 400, fill: '#996fd3' },
                    ]}
                    animated={true}
                />
            </View>
            </View>
        </View>

    )
}

const _styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        top: windowHeight * 1 / 3 - windowWidth * 0.618 / 1.78,
    },
    wave: {
        width: 100,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    waveBall: {
        width: windowWidth * 0.618 * 2 / 1.78,
        aspectRatio: 1,
        borderRadius: windowWidth * 0.618 / 1.7,
        overflow: 'hidden',
    }
});

export default WaveContainer;