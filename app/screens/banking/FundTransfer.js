import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Picker,
    TouchableNativeFeedback,
    Switch,
    LayoutAnimation,
    UIManager,
    ActivityIndicator
} from 'react-native'

import {
  getTheme,
  MKTextField,
  MKButton,
  MKColor
} from 'react-native-material-kit';

import FundTransferRequest from './FundTransferRequest'
import FundTransferConfirm from './FundTransferConfirm'

const theme = getTheme()


import AnimatedEditText from '../components/AnimatedEditText'

import Header from '../components/Header'
import RadioButton from '../components/RadioButton'
import Config from '../utils/Config'

var CustomLayoutSpring = {
    duration: 800,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.1,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.9,
    },
  };

export default class FundTransfer extends React.Component {
    
    static navigationOptions = {
        title: 'TRANSFER',
        
    }

    constructor() {
        super()
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        this.accounts = []
        this.banks = []
        this.credentials = {}
        
        this.fromSelectedBank = ''
        this.toSelectedBank = ''
        this.toTargetNumber = ''
        this.amount = ''
        this.note = ''

        this.state = {
            isRegisteredMobile: true,
            transferRequest: true,
            selectedBank: 'NIBL',
            loading: false

        }

    }

    
    onFromBankSelected = (value, position) => {
        this.fromSelectedBank = value
        //alert(this.fromSelectedBank)
        

    }

    onToBankSelected = (value, position) => {
        this.toSelectedBank = value
    }

    onAccountTextInputChange = (text) => {
        this.toTargetNumber = text
    }

    onAmountTextInputChange = (text) => {
        this.amount = text
    }

    onNoteTextInputChange = (text) => {
        this.note = text
    }

    onSubmitPress = () => {
        // LayoutAnimation.configureNext(CustomLayoutSpring);
        // this.setState({
        //     transferRequest: false
        // })
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState({
           ...this.state,
           loading: true
        })
        
        let jsonPayload = {
            amount: parseFloat(this.amount.trim()),
            note: this.note.trim(),
            targetNumber: this.toTargetNumber.trim(),
            targetBank: this.toSelectedBank.bin,
            customerNumber: this.credentials.username,
            nickName: this.fromSelectedBank.nickName,
            sourceBank: this.fromSelectedBank.bank


        }
        console.log(jsonPayload)
        //make the post request
        this.postFundTransferRequest(jsonPayload)
    }
    
    postFundTransferRequest = (jsonPayload) => {
        let fundRequestUrl = Config.baseUrl + Config.fundTransferRequestUri

        fetch(fundRequestUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTH-SECURITY-TOKEN': this.credentials.authKey
            },
            body: JSON.stringify(jsonPayload)
        })
        .then((response) => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)
            console.log(JSON.stringify(jsonPayload))
            if (jsonResponse.message === 'SUCCESS'){
                LayoutAnimation.configureNext(CustomLayoutSpring);
                this.setState({
                    ...this.state,
                    transferRequest: !this.state.transferRequest,
                    loading: false
                })
                //and handle the request confirmation
                this.updateFundTransferConfirm(jsonResponse)
            } else {
                //handle failurt case
                LayoutAnimation.configureNext(CustomLayoutSpring);
                this.setState({
                    ...this.state,
                    loading: false
                })
                alert('Unable to process Request!!')
            }
        })
    }

    updateFundTransferConfirm = (jsonResponse) => {
        //now make another payload
        confirmPayload = {
            nickName: this.fromSelectedBank.nickName,
            sourceBank: this.fromSelectedBank.bank,
            requestNumber: jsonResponse.data.token,
            passCode: jsonResponse.data.temp
        }
        console.log(confirmPayload)
        //make the confirmg request
        let fundConfirmUri = Config.baseUrl + Config.fundTransferConfirmUri

        fetch(fundConfirmUri, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTH-SECURITY-TOKEN': this.credentials.authKey
            },
            body: JSON.stringify(confirmPayload)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)
            
        })

    } 
    onBankSelect = (itemValue, itemIndex) => {
        this.setState({
            selectedBank: itemValue
        })
    }
    renderBalanceTransferRequest = () => {
        
        return (
            <FundTransferRequest onSubmitPress={this.onSubmitPress}
                fromAccounts={this.accounts}
                onFromBankSelected={this.onFromBankSelected}
                defaultFromBank={this.fromSelectedBank}
                toBanks={this.banks}
                defaultToBank={this.toSelectedBank}
                onToBankSelected={this.onToBankSelected}
                onAccountTextInputChange={this.onAccountTextInputChange}
                onAmountTextInputChange={this.onAmountTextInputChange}
                onNoteTextInputChange={this.onNoteTextInputChange}
            />
            
        )
    }

    renderFundTransferConfirm = () => {
        return (
            <FundTransferConfirm />
        )
    }

    componentWillMount = () => {
        const { params } = this.props.navigation.state
        this.accounts = params.accounts
        this.credentials = params.credentials

        if (this.accounts.length >= 1) {
            this.fromSelectedBank = this.accounts[0]
            //console.log(this.fromSelectedBank)
        }
        
        this.banks = [
        {
            "name": "Mega Bank",
            "bin": "636283",
            "logoUrl": "http://www.megabanknepal.com/images/logo.png"
        },
        {
            "name": "NIBL Bank",
            "bin": "004",
            "logoUrl": "https://storage.googleapis.com/suraj-test/images/nibl_logo.png"
        }
        
    ]
    this.toSelectedBank = this.banks[1]

}


    componentDidMount = () => {
        const {params} = this.props.navigation.state
        
        
    }

    render() {
        let loader = this.state.loading ? <Loader /> : null  
        let transferRequestView = this.renderBalanceTransferRequest()
        let transferConfirmView = !this.state.transferRequest ? this.renderFundTransferConfirm(): null
        return (
            <View>
                {loader}
                {transferConfirmView}        
                {transferRequestView}
            </View>
        )
    }
}



const Loader = (props) => {
    return (
        <View style={{
            marginTop: 10
        }}>
            <ActivityIndicator color={'black'} size={40} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})