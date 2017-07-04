import React from 'react'
import {
    Animated,
    Easing,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native'
import {
    UIManager
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import color from '../utils/Color'

export default class MaterialTextInput extends React.Component {
    constructor() {
        super()
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        this.animatedValue = new Animated.Value(0)
    }

    componentDidMount = () => {
        
        
    }

    _startAnimation = () => {
        Animated.spring(
            this.animatedValue,
            {
                toValue: 1,
                duration: 800,
                easing: Easing.linear,
                useNativeDriver: true,
                tension : 300
            }
        ).start()
    }

        _shrinkAnimation = () => {
        Animated.spring(
            this.animatedValue,
            {
                toValue: 0,
                duration: 800,
                easing: Easing.linear,
                useNativeDriver: true,
                tension : 300
            }
        ).start()
    }

    render() {
        let scale = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.97, 1]
        })

        const { placeholder, iconName, isPassword } = this.props
        

        const {
            onChangeText,
            value
        } = this.props
        return (
            <Animated.View 
                style={{ flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0.4,
                
                paddingLeft: 0,
                    transform: [{scale}]}}>
                <View style={{
                    backgroundColor: 'rgba(63,81,181 ,0.9)',
                    height: 50,
                    width : 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon name={iconName || 'md-person'} size = {25} color={'white'} />
                </View>
                 <TextInput
                    value = {value} 
                    onFocus = {() => this._startAnimation()}
                    onEndEditing= {() => this._shrinkAnimation()}
                    autoCorrect={ false }
                    caretHidden={ false }
                    placeholder={placeholder || 'Enter text'}
                    placeholderTextColor='rgba(0, 0, 0, 0.4)' 
                    secureTextEntry={isPassword ? true : false}
                    inlineImageLeft= 'ic_launcher.png'
                    underlineColorAndroid= 'rgba(0, 0, 0, 0)'
                    onChangeText={onChangeText || ((text) => null)}
                    returnKeyType={'go'}
                    style={{
                        
                        width: 250,
                        fontSize: 20,
                        height: 50,
                        
                        color: 'rgba(0, 0, 0, 0.7)'
                        
                    }}
                />
            </Animated.View>
        )
    }

}