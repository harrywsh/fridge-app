import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Gradient from './RadialGradient'
import Wave from 'react-native-waveview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const containerWidth = windowWidth * 0.618 / 1.7;

class WaveContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 50,
            farColor: '#b3aef2',
            nearColor: '#996fd3'
        };
    }

    render() {
        return (
            <View style={{ position: 'absolute' }}>
                <Gradient x={windowWidth / 2} y={windowHeight / 3} r={containerWidth} incolor='#c2c6cc' outcolor='#a6a9bf'></Gradient>
                <View style={_styles.container}>
                    <Wave
                        style={_styles.waveBall}
                        H={containerWidth * 2 * this.state.progress / 100}
                        speed={7000}
                        waveParams={[
                            { A: 25, T: 360, fill: this.state.farColor },
                            // { A: 35, T: 300, fill: '#0087dc' },
                            { A: 40, T: 400, fill: this.state.nearColor },
                        ]}
                        animated={true}
                    />
                </View>
                <View style={_styles.textContainer}>
                    <Text style={_styles.textStyle}>
                        {this.state.progress}
                </Text>
                </View>
                <View style={_styles.percentContainer}>
                    <Text style={_styles.percentStyle}>
                        %
                </Text>
                </View>
            </View>
        )
    }
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
    },
    textContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: windowHeight * 1 / 3 - 60,
    },
    percentContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: windowHeight * 1 / 3 - 12.5,
        left: windowWidth / 2 + 60,
        width: 60
    },
    textStyle: {
        fontSize: 100,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: '#996fd3',
        textShadowOffset: { width: 4, height: 5 },
        textShadowRadius: 4
    },
    percentStyle: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: '#996fd3',
        textShadowOffset: { width: 4, height: 5 },
        textShadowRadius: 4
    }
});

export default WaveContainer;