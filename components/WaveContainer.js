import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Gradient from './RadialGradient'
import Wave from 'react-native-waveview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const containerWidth = windowWidth * 0.618 / 1.7;

class WaveContainer extends Component {
    // #b0bfc9 - green outer circle
    // #a6a9bf - purple outer circle
    timeID;

    constructor(props) {
        super(props);
        this.state = {
            progress: 50,
            nearColor: '#bffaea',
            farColor: '#84c4d7',
            gradientOut: '#b0bfc9'
        };
        this.updateProgress = this.updateProgress.bind(this);
    }

    updateProgress = () => {
        fetch('http://127.0.0.1:5000/api/info')
            .then(response => response.json())
            .then(data => {
                var progress_ = data['prog'];
                this.setState({
                    progress: progress_,
                    gradientOut: progress_ < 50 ? '#a6a9bf' : '#b0bfc9',
                    nearColor: progress_ < 50 ? '#996fd3' : '#bffaea',
                    farColor: progress_ < 50 ? '#b3aef2' : '#84c4d7'
                });
                this.timeID = setTimeout(this.updateProgress.bind(this), 5000);
            });
    }

    componentDidMount() {
        this.updateProgress();
    }

    componentWillMount() {
        clearTimeout(this.timeID);
    }

    render() {
        return (
            <View style={{ position: 'absolute' }}>
                <Gradient x={windowWidth / 2} y={windowHeight / 3} r={containerWidth} incolor='#c2c6cc' outcolor={this.state.gradientOut}></Gradient>
                <View style={_styles.container}>
                    <Wave ref={(wave) => {
                        wave &&
                            wave.setWaterHeight(containerWidth * 2 * this.state.progress / 100);
                        wave &&
                            wave.setWaveParams([
                                { A: 25, T: 360, fill: this.state.farColor },
                                { A: 40, T: 400, fill: this.state.nearColor },
                            ]);
                        return wave;
                    }}
                        style={_styles.waveBall}
                        H={containerWidth * 2 * this.state.progress / 100}
                        speed={7000}
                        waveParams={[
                            { A: 25, T: 360, fill: this.state.farColor },
                            { A: 40, T: 400, fill: this.state.nearColor },
                        ]}
                        animated={true}
                    />
                </View>
                <View style={_styles.textContainer}>
                    <Text style={[_styles.textStyle, { textShadowColor: this.state.farColor }]}>
                        {this.state.progress}
                    </Text>
                </View>
                <View style={_styles.percentContainer}>
                    <Text style={[_styles.percentStyle, { textShadowColor: this.state.farColor }]}>
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