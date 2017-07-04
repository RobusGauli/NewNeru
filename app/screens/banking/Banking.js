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

import {
  getTheme,
} from 'react-native-material-kit';

import Config from '../utils/Config'


const theme = getTheme()

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
                credentials: params.credentials,
                accounts: params.accounts
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
        console.log('I am from the banking tab')
        const { data } = this.props;
        return (
            <ScrollView style={styles.container}>
                
                    
                    <Card color={color.cardColor} text='FUND TRANSFER' iconName={'md-paper-plane'} nameIs={() => this._onButtonPressed('TRANSFER', data)} />
                    <Card color={color.cardColor} text='SELF TRANSFER' iconName={'md-infinite'} nameIs={() => this._onButtonPressed('INQUIRY', data)}/>
                    <Card color={color.cardColor} text='INQUIRY' iconName={'md-cash'} nameIs={() => this._onButtonPressed('INQUIRY', data)}/>
                    <Card color={color.cardColor} text='FOREX' iconName={'logo-usd'} nameIs={() => this._onButtonPressed('FOREX')}/>
                    <Card color={color.cardColor} text='GENERAL' iconName={'md-card'} nameIs={() => this._onButtonPressed('GENERAL')}/>
                    <Card color={color.cardColor} text='EXTRA' iconName={'md-apps'} nameIs={() => this._onButtonPressed('EXTRA')}/>
                   
                              
            
            </ScrollView>
        )
    }
}
const Card = (props) => {
    return (
        <TouchableNativeFeedback onPress={() => props.nameIs()}>
        {/*<View style={[theme.cardStyle, {marginLeft: 10, marginRight: 10, marginBottom: 3, }]}
            >
            <Icon
                name={props.iconName}
                size = {30}
                style={{marginBottom : 10}}
                color={'rgba(0, 0, 0, 0.8)'} />
            <Text style={{fontSize : 17, color: 'rgba(0, 0, 0, 0.8)', fontWeight: '400'}}>{props.text}</Text>
            

        </View> */}
        <View style={[ styles.card, theme.cardStyle]} >
            <View style={styles.badge}>
                <Icon
                name={props.iconName}
                size = {25}
                style={{marginBottom : 10}}
                color={'rgba(255, 255, 255, 1)'} />
            </View>
            <Text style={styles.text}>
                {props.text}
            </Text>
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
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255,0.1)',
        padding: 5
    },
    
    card : {
        flex : 1, 
        backgroundColor : 'rgba(255, 255, 255, 0.8)',
        height : 80, 
        margin : 6,
        justifyContent : 'center',
        alignItems : 'center',
        marginRight: 10

    },
    text: {
        fontSize :17,

        fontWeight: '500'
    },
    badge: {
        height: 80,
        backgroundColor: color.badgeColor,
        position: 'absolute',
        left: 0,
        width : 80,
        justifyContent: 'center',
        alignItems: 'center'
    }

})