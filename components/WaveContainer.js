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
                var odorTime = data['odorTime'];
                this.setState({
                    progress: progress_,
                    gradientOut: odorTime != 0 ? '#9a8a8a' : (progress_ < 99.9 ? '#c3d1d3' : '#b0bfc9'),
                    nearColor: odorTime != 0 ? '#fcd142' : (progress_ < 99.9 ? '#d2f6f1' : '#acf0e1'),
                    farColor: odorTime != 0 ? '#f7a118' : (progress_ < 99.9 ? '#83c4d8' : '#77c4c8')
                });
                this.timeID = setTimeout(this.updateProgress.bind(this), 11800);
            });
    }

    componentDidMount() {
        this.updateProgress();
    }

    UNSAFE_componentWillMount() {
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
                <View style={[_styles.textContainer, { flex: 1, flexDirection: 'row' }]}>
                    <Text style={[_styles.textStyle, { textShadowColor: this.state.progress < 50 ? this.state.nearColor : this.state.farColor }]}>
                        {Math.floor(this.state.progress)}
                    </Text>
                    <Text style={[_styles.percentStyle, { textShadowColor: this.state.progress < 50 ? this.state.nearColor : this.state.farColor }]}>
                        {this.state.progress >= 99 ? '.' + this.state.progress * 10 % 10 : ''}%
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
        justifyContent: 'center',
        top: windowHeight * 1 / 3 - 60,
    },
    textStyle: {
        fontSize: 100,
        color: 'white',
        textShadowOffset: { width: 4, height: 5 },
        textShadowRadius: 4,
        marginRight: 4
    },
    percentStyle: {
        fontSize: 50,
        color: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        marginTop: 50,
        marginRight: 2,
    }
});

export default WaveContainer;