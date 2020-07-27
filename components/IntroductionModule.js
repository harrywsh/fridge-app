import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class IntroductionModule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={_style.IntroRect}>
                <Text style={[_style.TitleText, { top: 20 }]}>
                    超磁感离子电解
                </Text>
                <Text style={[_style.IntroText, { top: 50 }]}>
                    在独立的智能净味装置内， 漩涡吸风舱将冰箱内空气持续吸入超磁感放电场，
                    空气经过电场被电离，释放出大量活性离子， 以风暴席卷式将异味和细菌分子快速分解为无害小分子。
                </Text>
                <Image style={[_style.IntroImage, { top: 50 }]} source={require('../assets/1.jpg')}></Image>

                <Text style={[_style.TitleText, { top: 180 }]}>
                    高活性金属催化
                </Text>
                <Text style={[_style.IntroText, { top: 210 }]}>
                    同时装置内搭载高能活性金属催化剂 进一步加速催化活性离子与异味{'&'}细菌分子反应，
                    并持续释放高活性物质， 将异味和细菌分子彻底分解。
                </Text>
                <Image style={[_style.IntroImage, { top: 210 }]} source={require('../assets/2.jpg')}></Image>

                <Text style={[_style.TitleText, { top: 340 }]}>
                    技术详解
                </Text>
                <Text style={[_style.IntroText, { top: 370, width: (windowWidth - 40) * 0.9 }]}>
                    PST+超磁电离净味科技，内置漩涡吸风装置，以突破性超磁感离子电解和高活性金属催化的双重净化除 菌技术，革新传统净味方式，首次实现19min快速净味、99.99%彻底净味、十年长效安全净味。 在冷藏室独立智能净化装置内，漩涡吸风舱将冰箱内空气持续吸入超磁感放电场，空气经过电场被电离， 形成暴风式的活性离子，将异味和细菌分子快速分解为无害小分子。同时，系统内搭载高活性金属催化剂， 能够进一步加速催化活性离子与异味&细菌分子反应，并持续释放高活性物质，将异味和细菌分子彻底分 解。整个净味过程，在独立的净化装置内部完成，避免箱体二次污染;超磁感离子电解+高活性金属催化 的双重净化科技，首次实现19min快速主动净味;由电场自主释放离子进行电解，无需耗材，实现十年稳 定净味，长效守护食材清新健康。
                </Text>
            </View>
        );
    }
}

const _style = StyleSheet.create({
    IntroRect: {
        position: 'absolute',
        left: 20,
        top: windowHeight * 0.12,
        height: windowHeight * 0.83,
        width: windowWidth - 40,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 0.5,
    },
    IntroText: {
        position: 'absolute',
        marginLeft: 15,
        marginRight: 15,
        width: (windowWidth - 40) * 0.45,
        fontSize: 12,
        textAlign: 'justify'
    },
    TitleText: {
        position: 'absolute',
        marginLeft: 15,
        color: '#448dd1',
        fontSize: 17,
        fontWeight: 'bold'
    },
    IntroImage: {
        position: 'absolute',
        height: ((windowWidth - 40) * 0.47 - 15) / 612 * 476,
        width: (windowWidth - 40) * 0.47 - 15,
        resizeMode: 'stretch',
        right: 15
    }
})

export default IntroductionModule;