import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native'

import {
  getTheme,

} from 'react-native-material-kit';


const theme = getTheme()
import color from '../utils/Color'
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
        console.log('i am from payment shit')
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
    return (
        <TouchableNativeFeedback onPress={() => props.onPress()}>
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
                color={'rgba(255, 255, 255, 0.8)'} />
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