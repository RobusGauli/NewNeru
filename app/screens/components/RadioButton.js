import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class RadioButton extends React.Component {
    constructor() {
        super()
        this.state = {
            selected: 'Account' 
        }
    }

    componentDidMount = () => {
        this.setState({
            selected: this.props.onRegisteredMobile ? 'Registered Mobile' : 'Account' 
        })

        
    }
    onPress = (name) => {
        this.setState({
            selected: name
        })
        //callback passed will be executed
        //this.props.onPress(name)
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
               <Circle text={'Account'} enabled={this.state.selected === 'Account'} onPress={() => this.onPress('Account')}/>
               <Circle text={'Registered Mobile'} enabled={this.state.selected === 'Registered Mobile'} onPress={() => this.onPress('Registered Mobile')}/>
            </View>
        )
    }
}


const Circle = (props) => {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <TouchableOpacity onPress={props.onPress} style={{
                
                paddingBottom: 8,
                paddingTop: 8,flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
            <View style={{
                height: 18, 
                width: 18,
                borderRadius: 100,
                borderWidth: 1,
                
                borderColor: 'rgba(0, 0, 200, 0.6)',
                backgroundColor: props.enabled ? 'rgba(0, 0, 200, 0.6)': null
            }}>
            </View>
            
            <Text style={{
                marginLeft: 5,
                marginRight: 40,
                fontWeight: 'bold'
            }}>
                {props.text}
            </Text>
            </TouchableOpacity>
        </View>
    )
}