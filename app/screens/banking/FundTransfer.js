import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

export default class FundTransfer extends React.Component {
    
    constructor() {
        super()
    }

    componentDidMount = () => {
        const {params} = this.props.navigation.state
        alert(JSON.stringify(params.credentials))
    }

    render() {
        return (
            <View>
                <Text>
                    Hi from the transfer page
                </Text>
            </View>
        )
    }
}