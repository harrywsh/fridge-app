import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Text, Switch } from 'react-native';
// import { Notifications } from 'react-native-notifications';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class NotificationModule extends Component {
    timeID;

    constructor(props) {
        super(props);
        
    }

    state = {
        isEnabled: false,
        odorTime: 27,
        sterTime: 3684
    };

    toggleSwitch = () => {
        this.setState({
            isEnabled: !this.state.isEnabled
        })
    }

    updateTime = () => {
        fetch('http://127.0.0.1:5000/api/info')
            .then(response => response.json())
            .then(data => {
                var odor = data['odorTime'];
                var ster = data['sterTime'];
                this.setState({
                    odorTime: odor,
                    sterTime: ster
                });
                this.timeID = setTimeout(this.updateTime.bind(this), 5000);
            })
    }

    componentDidMount() {
        this.updateTime();
    }

    componentWillMount() {
        clearTimeout(this.timeID);
    }

    render() {
        return (
            <View style={_style.RoundedRect}>
                <Text style={_style.GrayText}>杀菌净味完成提醒</Text>
                <View style={_style.GrayRect}>
                    <Text style={{ position: 'absolute', top: 13, left: 17.5, fontSize: 14 }}>距净味完成还有</Text>
                    <Text style={{ position: 'absolute', bottom: 13, left: 52.5, fontSize: 14 }}>分钟</Text>

                    <Text style={{ position: 'absolute', top: 13, right: 60, fontSize: 14 }}>距杀菌完成还有</Text>
                    <Text style={{ position: 'absolute', bottom: 13, right: 52.5, fontSize: 14 }}>分钟</Text>
                    <Text style={{ position: 'absolute', bottom: 13, right: 142.5, fontSize: 14 }}>小时</Text>

                    <View style={[_style.TimeCard, { left: 30 }]}>
                        <Text style={_style.TimeText}>
                            {Math.floor(this.state.odorTime / 10)}
                        </Text>
                    </View>
                    <View style={[_style.TimeCard, { left: 70 }]}>
                        <Text style={_style.TimeText}>
                            {this.state.odorTime % 10}
                        </Text>
                    </View>

                    <View style={[_style.TimeCard, { right: 160 }]}>
                        <Text style={_style.TimeText}>
                            {Math.floor(this.state.sterTime / 60 / 10)}
                        </Text>
                    </View>
                    <View style={[_style.TimeCard, { right: 120 }]}>
                        <Text style={_style.TimeText}>
                            {Math.floor((this.state.sterTime / 60) % 10)}
                        </Text>
                    </View>

                    <View style={[_style.TimeCard, { right: 70 }]}>
                        <Text style={_style.TimeText}>
                            {Math.floor((this.state.sterTime % 60) / 10)}
                        </Text>
                    </View>
                    <View style={[_style.TimeCard, { right: 30 }]}>
                        <Text style={_style.TimeText}>
                            {(this.state.sterTime % 60) % 10}
                        </Text>
                    </View>

                    <Text style={[_style.TimeText, { right: 107.5 }]}>:</Text>
                </View>
                <Switch
                    style={_style.GreenSwitch}
                    trackColor={{ false: "#ededed", true: "#448dd1" }}
                    ios_backgroundColor="#ededed"
                    onValueChange={this.toggleSwitch}
                    value={this.state.isEnabled}></Switch>
            </View>
        )
    }
}

const _style = StyleSheet.create({
    RoundedRect: {
        position: 'absolute',
        alignSelf: 'center',
        left: 20,
        top: windowHeight * 0.68,
        height: windowHeight * 0.27,
        width: windowWidth - 40,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    GrayText: {
        top: 16,
        left: 20,
        fontSize: 18,
    },
    GrayRect: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        top: 50,
        height: windowHeight * 0.27 - 70,
        width: windowWidth - 40,
        backgroundColor: '#ededed',
    },
    GreenSwitch: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    TimeCard: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        top: (windowHeight * 0.27 - 70) * 0.3,
        height: (windowHeight * 0.27 - 70) * 0.4,
        width: 35,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowOffset: { width: 0.5, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    TimeText: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: (windowHeight * 0.27 - 70) * 0.2,
    }
})

export default NotificationModule;