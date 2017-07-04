import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import color from '../utils/Color'
import {
  getTheme,
  MKTextField,
  MKButton,
  MKColor
} from 'react-native-material-kit';
const theme = getTheme()

import MaterialTextInput from '../components/MaterialTextInput'

export default class FundTransferConfirm extends React.Component {
    constructor() {
        super()
        
    }

    render() {
        return (
            <ScrollView style={[theme.cardStyle, styles.container]}>
                <View style={[
                        styles.fromCardContainer]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            CONFIRMATION
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 30}} />
                <Text style={styles.otptext}>
                    Enter pin received on SMS
                </Text>
                <MaterialTextInput placeholder={'OTP'} iconName={'md-apps'}/>
                <View style={{marginTop: 20}} />
                <View style={{marginTop: 5}} />
                <View style={{marginTop: 5}} />
                <Button text={'TRANSFER'} color={color.badgeColor} />
                <View style={{marginTop: 5}} />
                <Button text={'CANCEL'} color={'rgba(224,0,66 ,1)'} />

            </ScrollView>
        )
    }
}

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress || (()=>alert('Pressed'))}>
        <View style={[styles.buttonContainer, {backgroundColor:props.color || null}]}>
            <Text style={styles.buttonText}>
                {props.text || 'Done'}
            </Text>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        paddingBottom: 230
    },
    fromCardContainer: {
        
    },
    textContainer: {
        paddingLeft: 0,
        paddingBottom: 5,
        paddingTop: 5, 
        backgroundColor: color.badgeColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },
    headerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 30,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 17,
        fontWeight: '300',
        color: 'rgba(0, 0, 0, 0.8)'
    },
    radioContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    buttonContainer: {
        backgroundColor: 'rgba(124,179,66 ,1)',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '400',
        color: 'white'
    },
    otptext: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: '500',
        paddingLeft: 10,
        paddingBottom: 10
    }
})