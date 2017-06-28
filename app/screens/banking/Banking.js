import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback,
    Modal,
    TouchableHighlight
} from 'react-native'

import Interactable from 'react-native-interactable'

import Icon from 'react-native-vector-icons/Ionicons'
import color from '../utils/Color'

export default class BankingView extends React.Component {
    constructor(props) {
        super(props)
        
    }

    componentDidMount = () => {
        
        
    }

    _onButtonPressed = (text, data) => {
        
        //alert(text + JSON.stringify(data))
        if (text === 'TRANSFER') {
            const { params } = this.props.navigation.state;
            const { navigate } = this.props.navigation

            navigate('FundTransfer', {
                credentials: params.credentials
            })
        } 

        if (text === 'INQUIRY') {
            const { params } = this.props.navigation.state;
            const { navigate } = this.props.navigation

            navigate('Inquiry', {
                credentials: params.credentials
            })
        }
        
        
        
    }

    render() {
        const { data } = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.cardContainer}>
                    
                    <Card color={color.cardColor} text='FUND TRANSFER' iconName={'md-paper-plane'} nameIs={() => this._onButtonPressed('TRANSFER', data)} />
                    <Card color={color.cardColor} text='INQUIRY' iconName={'md-cash'} nameIs={() => this._onButtonPressed('INQUIRY', data)}/>
                    <Card color={color.cardColor} text='FOREX' iconName={'logo-usd'} nameIs={() => this._onButtonPressed('FOREX')}/>
                    <Card color={color.cardColor} text='GENERAL' iconName={'md-card'} nameIs={() => this._onButtonPressed('GENERAL')}/>
                    <Card color={color.cardColor} text='EXTRA' iconName={'md-apps'} nameIs={() => this._onButtonPressed('EXTRA')}/>
                   
               </View>
               
            
            </ScrollView>
        )
    }
}
const Card = (props) => {
    return (
        <TouchableNativeFeedback onPress={() => props.nameIs()}>
        <View style={[styles.card, {backgroundColor : props.color}]}
            >
            <Icon
                name={props.iconName}
                size = {30}
                style={{marginBottom : 10}}
                color={'rgba(255, 255, 255, 0.8)'} />
            <Text style={{fontSize : 22, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '400'}}>{props.text}</Text>
            

        </View>
        </TouchableNativeFeedback>
    )
}

const CardRow = (props) => {
    return (
        <View
          style={{flex : 1, height : 100, flexDirection : 'row'}}></View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer : {
        flexDirection : 'column',
        backgroundColor: 'rgba(120,144,156 ,0.3)'
    },
    card : {
        flex : 1, 
        backgroundColor : 'rgba(0, 0, 0, 1)',
        height : 100, 
        margin : 6,
        justifyContent : 'center',
        alignItems : 'center'
    }

})