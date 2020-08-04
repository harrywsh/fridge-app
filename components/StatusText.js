import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Svg, Text } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class StatusText extends Component {
    timeID;

    constructor(props) {
        super(props);
        this.updateStatus = this.updateStatus.bind(this);
    }

    state = {
        progress: 0,
        odorTime: 0,
    };

    updateStatus = () => {
        fetch('http://127.0.0.1:5000/api/info')
            .then(response => response.json())
            .then(data => {
                var progress_ = data['prog'];
                var odorTime = data['odorTime'];
                this.setState({
                    progress: progress_,
                    odorTime: odorTime
                });
                this.timeID = setTimeout(this.updateStatus.bind(this), 1000);
            });
    }

    componentDidMount() {
        this.updateStatus();
    }

    UNSAFE_componentWillMount() {
        clearTimeout(this.timeID);
    }

    render() {

        return (
            <Svg height={windowHeight} width={windowWidth}>
                <Text
                    fill="white"
                    stroke="none"
                    fontSize="18"
                    fontWeight="bold"
                    x={windowWidth / 2}
                    y={windowHeight * 0.58}
                    textAnchor="middle"
                >
                    {this.state.progress < 99.9 ? '暴风式离子释放中' : '杀菌净味进程已全部完成'}
            </Text>
                <Text
                    fill="white"
                    stroke="none"
                    fontSize="12"
                    fontWeight="bold"
                    x={windowWidth / 2}
                    y={windowHeight * 0.61}
                    textAnchor="middle"
                >
                    {this.state.progress < 99.9 ? (this.state.odorTime == 0 ? '细菌分子正在被快速电解' : '异味和细菌分子正在被快速电解') : ''}
            </Text>
            </Svg>
        )
    }
}

export default StatusText;