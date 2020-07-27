import React, { Component, useRef } from 'react';
import { Dimensions, View, StyleSheet, Text, Switch } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


class NotificationModule extends Component {
    timeID;
    notificationListener;
    responseListener;

    constructor(props) {
        super(props);
    }

    state = {
        isEnabled: false,
        odorTime: 0,
        sterTime: 0,
        expoPushToken: '',
        notification: false,
    };

    registerForPushNotifications = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                this.setState({
                    isEnabled: false
                });
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
            this.setState({
                isEnabled: false
            });
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    };

    toggleSwitch = () => {
        this.setState({
            isEnabled: !this.state.isEnabled
        })
        if (!this.state.isEnabled) {
            this.registerForPushNotifications().then(token => this.setState({ token: token }));
            this.notificationListener = Notifications.addNotificationReceivedListener(notification => { this.setState({ notification: notification }) });
            this.responseListener = Notifications.addNotificationResponseReceivedListener(response => { console.log(response) });
        } else {
            Notifications.removeNotificationSubscription(this.notificationListener);
            Notifications.removeNotificationSubscription(this.responseListener);
        }
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
        // this.notificationSubscription = Notifications.addPushTokenListener(this.handlePushNotification);
        this.updateTime();
    }

    UNSAFE_componentWillMount() {
        clearTimeout(this.timeID);
        // this.notificationSubscription.remove();
    }

    render() {
        return (
            <View style={_style.RoundedRect}>
                <Text style={_style.GrayText}>杀菌净味完成提醒</Text>
                <View style={_style.GrayRect}>
                    <Text style={{ position: 'absolute', top: 13, left: this.state.odorTime == 0 ? 30.5 : 17.5, fontSize: 14, color: this.state.odorTime == 0 ? '#329c4e' : 'black'}}>
                        {this.state.odorTime == 0 ? '净味已完成' : '距净味完成还有'}
                    </Text>
                    <Text style={{ position: 'absolute', bottom: 13, left: 52.5, fontSize: 14 }}>分钟</Text>

                    <Text style={{ position: 'absolute', top: 13, right: this.state.sterTime == 0 ? 75 : 60, fontSize: 14, color: this.state.sterTime == 0 ? '#329c4e' : 'black' }}>
                        {this.state.sterTime == 0 ? '杀菌已完成' : '距杀菌完成还有'}
                    </Text>
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