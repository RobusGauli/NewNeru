'use strict';

import React from 'react'
import {
  Text,
  View,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableNativeFeedback,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import Config from '../utils/Config'
import moment from 'moment'

import Icon from 'react-native-vector-icons/Ionicons'
var CustomLayoutSpring = {
    duration: 800,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.9,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.9,
    },
  };
  

export default class ScaleView extends React.Component {

  constructor() {
    super()
     UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state = {
      displayMenu: false,
      displayBalanceInquiry: false,
      displayMiniStatement: false
    }
  }

  
  renderMenu = () => {
    return (
      <View style={styles.menuContainer} >
        <View style={{
            
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
            <Menu name={'Balance Inquiry'} iconName={'ios-card'} account={this.props.account} onPress={this.onBalanceInquiryPress}/>
            <Menu name={'Mini Statement'} iconName={'ios-apps'} onPress={this.onMiniStatementPress}/>
        </View>
        <View style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
        <Menu name={'Transaction Inquiry'} iconName={'ios-copy'}/>
            <Menu name={'Card Due Inquiry'} iconName={'md-list-box'}/>
        </View>

        
      </View>
    )
  }

  onBalanceInquiryPress = () => {
      //change the state of 
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({
            displayMenu: this.state.displayMenu,
            displayBalanceInquiry : !this.state.displayBalanceInquiry,
            displayMiniStatement: this.state.displayMiniStatement
      })
  }

  onMiniStatementPress = () => {
      LayoutAnimation.configureNext(CustomLayoutSpring)
      this.setState({
          displayMenu: this.state.displayMenu,
          displayBalanceInquiry: this.state.displayBalanceInquiry,
          displayMiniStatement: !this.state.displayMiniStatement
      })
  }

  _onAccountPressed = () => {
    //this must chagne the start
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({
      displayMenu: !this.state.displayMenu
    })
  }

  renderMiniStatement = () => {
      return (
          <MiniStatementBox account={this.props.account}  credentials={this.props.credentials}/>
      )
  }
  renderInquiryBox = () => {
      return (
          <BalanceInquiryBox account={this.props.account} credentials={this.props.credentials}/>
      )
  }

  

  render() {
    let menu = this.state.displayMenu ? this.renderMenu(): null
    const {
        nickName,
        verified
    } = this.props

    let balanceInquiryBox = this.state.displayBalanceInquiry? this.renderInquiryBox() : null
    let miniStatement = this.state.displayMiniStatement ? this.renderMiniStatement() : null
    


    return (
        <View >
            <TouchableOpacity style={styles.buttonContainer} onPress={this._onAccountPressed}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Icon name={"ios-cube"} size={25} color={'white'} />
            <Text style={styles.text}>
                {nickName}
            </Text>
            </View>
            <View style={styles.verifiedContainer}>
                <Text style={styles.verifiedText}>
                    {verified ? 'Verified' : 'Not Verified'}
                </Text>
            </View>
            </TouchableOpacity>
            <View>
                {balanceInquiryBox}
                
            </View>
            <View>
                {miniStatement}
                
            </View>
            <View>
                {menu}
            </View>
        </View>
    )
  }
}

const Menu = (props) => {

    const {
        onPress
    } = props
    return (
        <TouchableOpacity style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}
            onPress={onPress?onPress : null}>
            <Icon name={props.iconName} size={40} color={'white'} />
            <Text style={{color:'white'}}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const BalanceInquiryMenu = (props) => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}
            >
            <Text style={{
                color: 'white',
                fontSize: 24,
                fontWeight: '400'
            }}>
                {'Rs.' + props.value}
            </Text>
            <Text style={{color:'white', fontWeight: '400'}}>{props.name}</Text>
        </View>
    )
}

class BalanceInquiryBox extends React.Component {
    
    constructor() {
        super()
        this.state = {
            currentView: this.renderIndicator()
        }
    }
    componentDidMount = () => {
        const {
            account,
            credentials
        } = this.props
        
        let payload = {
            
	        "nickName": account.nickName,
	        "sourceBank" : account.bank
        }
        fetch(Config.baseUrl + Config.inquiryUri,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTH-SECURITY-TOKEN' : credentials.authKey
            },
            body: JSON.stringify(payload)

            
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            this.displayBalance(jsonResponse)
        })

    }

    displayBalance = (jsonResponse) => {
        this.setState({
            currentView: this.renderBalanceInquiryMenu(jsonResponse.data)
        })
    }

    renderBalanceInquiryMenu = (data) => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingBottom: 20
            }}>
                <BalanceInquiryMenu name={'Current Balance'} value={data.currentBalance} />
                <BalanceInquiryMenu name={'Available Balance'} value={data.availableBalance}/>
            </View>
        )
    }

    renderIndicator = () => {
        return (
              <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 30
            }}>
                <ActivityIndicator  color={'white'} size={40}/>
            </View>
        )
    }

    render() {
        return (
             <View style={styles.inquiryContainer} >
            <View style={{
            
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-around',

             }}>
            
        </View>
        
            {this.state.currentView}

        
      </View>
        )
    }
}

const renderCreditDebit = (iconName, iconColor, value) => {
    return (
         <Text style={{
                color: iconColor,
                fontSize:16,
                fontWeight: '400',
                marginBottom: 20,

            }}>
            <Icon name={iconName} size={30} color={iconColor} /> {value}
        </Text>
    )
}
const StatementRow = (props) => {
    let creditDebitView = null;
    
    if (props.cd == 'D') {
        creditDebitView = renderCreditDebit('md-arrow-round-up', 'rgba(255,61,0 ,1)', '   ')
    }else if(props.cd == 'C') {
        creditDebitView = renderCreditDebit('md-arrow-round-down', 'rgba(124,179,66 ,1)', '   ')
    } else {
        creditDebitView = renderCreditDebit('ios-information-circle-outline', 'white', '   ')
    }

    
    let dateRegex = props.date.match(/(\w{2})(\w{2})(\w{4})/)
    let date = dateRegex[3] + '-' + dateRegex[2] + '-' + dateRegex[1]
    let d = moment("2017-06-23").format('MMMM do YY')

    return (
        <View style={{
            
            marginTop: 6,
            borderBottomWidth: 0.5,
            marginRight: 6,
            marginLeft: 6,
            borderColor: 'rgba(255, 255, 255, 0.7)',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}
            >
            <Text style={{
                color: 'white',
                fontSize:16,
                fontWeight: '400',
                marginBottom: 5,

            }}>
                { d }
            </Text>

            <Text style={{
                color: 'white',
                fontSize:16,
                fontWeight: '400',
                marginBottom: 5,

            }}>
                { 'NPR ' + props.amount}
            </Text>

            {creditDebitView}
            
        </View>
    )
}


class MiniStatementBox extends React.Component {
    
    constructor() {
        super()
        this.state = {
            currentView: this.renderIndicator()
        }
    }
    componentDidMount = () => {
        const {
            account,
            credentials
        } = this.props
        
        let payload = {
            
	        "nickName": account.nickName,
	        "sourceBank" : account.bank
        }
        fetch(Config.baseUrl + Config.statementUri,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTH-SECURITY-TOKEN' : credentials.authKey
            },
            body: JSON.stringify(payload)

            
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            this.displayBalance(jsonResponse)
        }).catch((error) => {
            console.log('could not load')
        })

    }

    displayBalance = (jsonResponse) => {
        
        this.setState({
            currentView: this.renderBalanceInquiryMenu(jsonResponse.data)
        })
    }

    renderBalanceInquiryMenu = (data) => {
   
        let rows = []
        for (let i= 0; i < data.length; i++) {
            let view = (<StatementRow key={i} name={'Date'} date={data[i].date} amount={data[i].amount} cd={data[i].debitOrCredit} />)
            rows.push(view)
        }
        return (
            <ScrollView style={{
                flexDirection: 'column',

                paddingBottom: 10,
               
            }}>
                <View style={{
            
                    marginTop: 15,
                    borderBottomWidth: 0.5,
                    marginRight: 12,
                    marginLeft: 12,
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
                    >
            <Text style={{
                color: 'white',
                fontSize:19,
                fontWeight: '500',
                marginBottom: 20,

            }}>
                {'Date'}
            </Text>

            <Text style={{
                color: 'white',
                fontSize:19,
                fontWeight: '500',
                marginBottom: 20,

            }}>
                { 'Amt.'}
            </Text>

            <Text style={{
                color: 'white',
                fontSize:19,
                fontWeight: '500',
                marginBottom: 20,

            }}>
                { 'Dr/Cr'}
            </Text>
            
        </View>

                {rows}
                
            </ScrollView>
        )
    }

    renderIndicator = () => {
        return (
              <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 150
            }}>
                <ActivityIndicator  color={'white'} size={40}/>
            </View>
        )
    }

    render() {
        return (
             <View style={styles.statementContainer} >
           
             
            {this.state.currentView}

        
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    cardContainer: {
        height: 90,
        backgroundColor: 'rgba(41,182,246 ,1)',
        margin: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor : 'rgba(33,150,243 ,1)',
        height: 90,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        margin: 5,
        

    },
    text: {
        fontSize:25,
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '600',
        marginLeft: 10
    },
    verifiedContainer: {
        backgroundColor : 'rgba(139,195,74 ,1)',
        borderRadius: 40, 
        width: 80, 
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
        
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },
    menuContainer: {
        height: 160,
        backgroundColor: '#DE3641',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    inquiryContainer: {
        //rgba(139,195,74 ,1)
        height: 100,
        backgroundColor: '#66787E',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    statementContainer: {
        height: 330,
        backgroundColor: '#66787e',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        
    }

})