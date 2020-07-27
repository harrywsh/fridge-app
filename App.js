import React from 'react';
import { View, Dimensions, Button, TouchableHighlight, Text } from 'react-native';
import Gradient from './components/RadialGradient';
import WaveContainer from './components/WaveContainer';
import StatusText from './components/StatusText';
import NotificationModule from './components/NotificationModule';
import IntroductionModule from './components/IntroductionModule';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MeijuApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='home' component={HomeScreen} options={({ navigation, route }) => ({
                    title: '您的冰箱: BCD-468WDNMD',
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerRight: () => (
                        // <Button title='?' onPress={() => navigation.navigate('introduction')} color='white'></Button>
                        <TouchableOpacity onPress={() => navigation.navigate('introduction')}
                            style={{
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 26,
                                height: 26,
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderRadius: 13,
                                marginRight: 10,
                            }} activeOpacity={.7}>
                            <Text style={{color: 'white', fontSize: 18}}>?</Text>
                        </TouchableOpacity>
                    )
                })}>

                </Stack.Screen>
                <Stack.Screen name='introduction' component={IntroductionScreen} options={{
                    title: '美的PST+超磁电离净味',
                    headerTransparent: true,
                    headerTintColor: 'white',
                }}>
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const HomeScreen = () => {
    return (
        <View style={{ backgroundColor: '#8a939a', flex: 1 }}>

            <View style={{ position: 'absolute' }}>
                <Gradient x={windowWidth / 10} y={windowHeight / 2} r={windowWidth} incolor='#b9c1c9' outcolor='#8a939a'></Gradient>
            </View>

            <View style={{ position: 'absolute' }}>
                <WaveContainer></WaveContainer>
            </View>

            <View style={{ position: 'absolute' }}>
                <StatusText></StatusText>
            </View>

            <View style={{ position: 'absolute' }}>
                <NotificationModule></NotificationModule>
            </View>

        </View>
    )
}

const IntroductionScreen = () => {
    return (
        <View style={{ backgroundColor: '#8a939a', flex: 1 }}>

            <View style={{ position: 'absolute' }}>
                <Gradient x={windowWidth / 10} y={windowHeight / 2} r={windowWidth} incolor='#b9c1c9' outcolor='#8a939a'></Gradient>
            </View>

            <View style={{ position: 'absolute' }}>
                <IntroductionModule></IntroductionModule>
            </View>
        </View>
    )
}

export default MeijuApp;