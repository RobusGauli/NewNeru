import React from 'react'
import {
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native'

export default class Button extends React.Component {
    
    render() {
        const {
            text,
            buttonStyle
        } = this.props

        const {
            onPress
        } = this.props

        return (
            <TouchableNativeFeedback onPress={onPress? () => onPress(): () => null}>
                <View style={{
                    backgroundColor: 'green',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 290,
                    height: 55,
                    ...buttonStyle
                    }}>
                    <Text style={{color: 'white', fontSize: 24, fontWeight : '400'}}>
                        {text}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
        width: 250,
        height: 70,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    }
})