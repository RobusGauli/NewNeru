import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
    Picker
} from 'react-native'
import AnimatedEditText from '../components/AnimatedEditText'
import Header from '../components/Header'

import {
  getTheme,
  MKTextField,
  MKButton,
  MKColor
} from 'react-native-material-kit';

const theme = getTheme()

import Icon from 'react-native-vector-icons/Ionicons'
import color from '../utils/Color'
import MaterialTextInput from '../components/MaterialTextInput'

var CustomLayoutLinear = {
    duration: 2000,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 1.2,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1.4,
    },
  };

export default class MerchantPayment extends React.Component {

    constructor() {
        super()
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        this.state = {
            showMerchantRequest: true,
            showMerchantConfirm: false,
            showMerchantAuthorise: false,
            merchantRequestDone: false,
            merchantConfirmDone: false,
            currentView: this.renderMerchantRequest(),
            currentTitleView: this.renderCurrentTitle('REQUEST')
            
        }
    }

    onMerchantRequestPress = () => {
        //change the state tot 
        LayoutAnimation.configureNext(CustomLayoutLinear);
        this.setState({
            showMerchantRequest: this.state.showMerchantRequest,
            showMerchantConfirm: !this.state.showMerchantConfirm,
            showMerchantAuthorise: this.state.showMerchantAuthorise,
            merchantRequestDone: true,
            currentView: this.renderMerchantConfirm(),
            currentTitleView: this.renderCurrentTitle('CONFIRM')
        })
    }

    onMerchantConfirmPress = () => {
        LayoutAnimation.configureNext(CustomLayoutLinear);
        this.setState({
            showMerchantRequest: this.state.showMerchantRequest,
            showMerchantConfirm: this.state.showMerchantConfirm,
            showMerchantAuthorise: !this.state.showMerchantAuthorise,
            merchantRequestDone: this.state.merchantRequestDone,
            merchantConfirmDone: true,
            currentView: this.renderMerchantAuthorization(),
            currentTitleView: this.renderCurrentTitle('AUTHORIZATION')
        })
    }

    onMerchantAuthorizationPress = () => {
        LayoutAnimation.configureNext(CustomLayoutLinear);
        this.setState({
            currentView: this.renderMerchantComplete()
        })
    }

    onMerchantCompletePress = () => {
        LayoutAnimation.configureNext(CustomLayoutLinear);
        this.setState({
            currentView: null
        })
    }


    renderMerchantRequest = (done=false) => {
        return (
            <MerchantRequest onPress={this.onMerchantRequestPress} done={done} />
        )
    }

    renderMerchantConfirm = (done=false) => {
        return (
            <MerchantConfirm onPress={this.onMerchantConfirmPress} done={done} />
        )
    }

    renderMerchantAuthorization = (done=false) => {
        return (
            <MerchantAuthorization onPress={this.onMerchantAuthorizationPress} done={done}/>
        )
    }

    renderMerchantComplete = (done=false) => {
        return (
            <MerchantPaymentComplete onPress={this.onMerchantCompletePress}/>
        )
    }

    renderCurrentTitle = (title) => {
        return (
            <Header value={title} />
        )
    }
    render() {
        // let merchantRequestView = this.state.showMerchantRequest ? this.renderMerchantRequest(done=this.state.merchantRequestDone) : null
        // let merchantConfirmView = this.state.showMerchantConfirm ? this.renderMerchantConfirm(done=this.state.merchantConfirmDone): null

        // let merchantAuthorizationView = this.state.showMerchantAuthorise ? this.renderMerchantAuthorization() : null
        let currentView = this.state.currentView
        let title = this.state.currentTitleView
        return (
            <View style={{flex: 1}}>
                
                {currentView}
            </View>
        )
    }
}


class MerchantRequest extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {
            onPress,
            done
        } = this.props

        return (
            <ScrollView style={[theme.cardStyle, styles.container]}>
                <View style={[
                        styles.fromCardContainer]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            REQUEST
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 30}} />
                <Text style={styles.otptext}>
                    Enter ID of the Merchant
                </Text>
                
                <MaterialTextInput placeholder={'ID'} iconName={'md-apps'}/>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                    marginBottom: 5
                }}>
                <Text style={styles.orText}>
                     OR
                </Text>
                </View>

                <QRButton text={'SCAN QR'}/>
                
                <View style={{marginTop: 20}} />
                <View style={{marginTop: 5}} />
                <View style={{marginTop: 5}} />
                <Button text={'CONTINUE'} color={color.badgeColor}  onPress={onPress} />
                <View style={{marginTop: 5}} />
                <Button text={'CANCEL'} color={'rgba(224,0,66 ,1)'}/>

            </ScrollView>
        )
    }
}



class MerchantConfirm extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {
            onPress,
            done
        } = this.props

        return (
            <ScrollView style={[theme.cardStyle, styles.container]}>
                <View style={[
                        styles.fromCardContainer]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            CONFIRM
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 30}} />
                
                
                <MaterialTextInput placeholder={'ID'} iconName={'md-apps'}/>
                <View style={{marginTop: 10}} />
                <MaterialTextInput placeholder={'AMOUNT'} iconName={'md-apps'}/>
                <View style={{marginTop: 10}} />
                <MaterialTextInput placeholder={'NOTE'} iconName={'md-apps'}/>
                

                
                
                <View style={{marginTop: 20}} />
                <View style={{marginTop: 5}} />
                <View style={{marginTop: 5}} />
                <Button text={'CONTINUE'} color={color.badgeColor} onPress={onPress}/>
                <View style={{marginTop: 5}} />
                <Button text={'CANCEL'} color={'rgba(224,0,66 ,1)'} />

            </ScrollView>
        )
    }
}


class MerchantAuthorization extends React.Component {
    constructor() {
        super()
        this.state = {
            language: 'Mega'
        }
    }
    render() {
        const {
            onPress,
            done
        } = this.props
        return (
            <ScrollView style={[theme.cardStyle, styles.container]}>
                <View style={[
                        styles.fromCardContainer]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            AUTHORIZATION
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
                <Button text={'PAY'} color={color.badgeColor} />
                <View style={{marginTop: 5}} />
                <Button text={'CANCEL'} color={'rgba(224,0,66 ,1)'} />

            </ScrollView>
        )
    }
}


class MerchantPaymentComplete extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={{
                flex: 1, 
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>
                    Completed
                </Text>
            </View>
        )
    }
}

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress || (() => alert('button preessed'))}>
        <View style={[styles.buttonContainer, {backgroundColor:props.color || null}]}>
            <Text style={styles.buttonText}>
                {props.text || 'Done'}
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const QRButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress || (() => alert('button preessed'))}>
        <View style={styles.qrButtonContainer}>
            <Text style={styles.qrText}>
                {props.text || 'Done'}
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
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
    },
    qrButtonContainer: {
        backgroundColor: 'rgba(124,179,66 ,0.0)',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        borderWidth: 1
    },
    qrText: {
        color: 'rgba(0, 0, 0, 0.8)',
        fontWeight: '500',
        fontSize: 17

    }
})