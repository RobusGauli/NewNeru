import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class PaymentView extends React.Component {
    constructor(props) {
        super(props)
    }
    onButtonPressed = (text, data) => {
        if (text == 'MERCHANT') {
            const { params } = this.props.navigation.state
            //push the new page onto the stack
            
            const { navigate } = this.props.navigation;
            navigate('MerchantTabs', {
                credentials: params.credentials 
            })
            
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.cardContainer}>
                    
                    <Card color={'rgba(2,136,209 ,1)'} 
                            text='MERCHANT' iconName={'md-paper-plane'} 
                            onPress={() => this.onButtonPressed('MERCHANT')}/>
                    <Card color={'rgba(2,136,209 ,1)'} 
                            text='INSTANT PAY' iconName={'md-cash'} 
                            onPress={() => alert('istant')}/>
                    <Card color={'rgba(2,136,209 ,1)'} 
                            text='CARD PAYMENT' 
                            iconName={'logo-usd'} 
                            onPress={() => alert('istant')}/>
                    <Card color={'rgba(2,136,209 ,1)'} text='TOP UP' iconName={'md-card'} onPress={() => alert('istant')}/>
                    <Card color={'rgba(2,136,209 ,1)'} text='RECHARGE CARD' iconName={'md-apps'} onPress={() => alert('istant')}/>
                    
               </View>
            </ScrollView>
        )
    }
}
const Card = (props) => {

    const {
        onPress
    } = props

    return (
        <TouchableNativeFeedback onPress={() => onPress()}>
        <View style={[styles.card, {backgroundColor : props.color}]}
            >
            <Icon
                name={props.iconName}
                size = {30}
                style={{marginBottom : 10}}
                color={'rgba(255, 255, 255, 0.8)'} />
            <Text style={{fontSize : 22, color: '#rgba(255, 255, 255, 0.8)'}}>{props.text}</Text>
            

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