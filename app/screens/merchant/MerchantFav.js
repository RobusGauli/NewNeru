import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class MerchantFav extends React.Component {

    constructor() {
        super()
        this.state = {
            totalButtons : 1
        }
    }

    onPress = () => {
        //changes the state
        this.setState({
            totalButtons :  this.state.totalButtons + 1 % 5 
        })
    }

    render() {
       
        return (
            <View>
                <MyView propValue={2}/>
            </View>
        )
    }
}

class MyView extends React.Component {

    //life cycle method
    state = {
        count: 'loading'
    }

    onTextPress = () => {
        //this will change the statte
        this.setState({
            count: this.state.count + 1
        })
    }
    //life cylce method one
    //callled one time
    componentWillMount = () => {
        console.log('component will mount called')
        console.log(this.state)
        console.log(this.props)
    }

    componentDidMount = () => {
        console.log('component was mounted on to the screen')
        
    }
    
    //methods that are calleed when component is rerendered
    componentWillReceivedProps = () => {
        console.log('component will receive props')
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        console.log(this.props)
        console.log(nextProps)
        console.log(this.state)
        console.log(nextState)
        return true
    }
    render() {
        console.log('component is rendered')
        return (
            <View style={styles.buttonContainer}>
                <Text onPress={this.onTextPress}>
                    {'Count: ' + this.state.count}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'red',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})