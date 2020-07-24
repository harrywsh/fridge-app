import React, {useState} from 'react';
import { Dimensions, View, StyleSheet, Text, Switch } from 'react-native';
import { Timer, FlipNumber } from 'react-native-flip-timer';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NotificationModule = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={_style.RoundedRect}>
            <Text style={_style.GrayText}>杀菌净味完成提醒</Text>
            <View style={_style.GrayRect}>
                
            </View>
            <Switch 
                style={_style.GreenSwitch} 
                trackColor={{ false: "#ededed", true: "#448dd1" }}
                ios_backgroundColor="#ededed"
                onValueChange={toggleSwitch}
                value={isEnabled}></Switch>
        </View>
    )
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
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    GrayText: {
        top: windowHeight * 0.05 - 10 - 9,
        left: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    GrayRect: {
        position: 'absolute',
        alignSelf: 'center',
        top: windowHeight * 0.1 - 20,
        height: windowHeight * 0.17,
        width: windowWidth - 40,
        backgroundColor: '#ededed',
    },
    GreenSwitch: {
        position: 'absolute',
        top: 8,
        right: 10,
    }
})

export default NotificationModule;