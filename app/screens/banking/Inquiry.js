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
  ScrollView
} from 'react-native'

import Config from '../utils/Config'

import CollapsibleCard from '../components/CollapsibleCard'

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
export default class Inquiry extends React.Component {

  static navigationOptions = {
    title: 'Inquiry'
  }

  constructor() {
    super()
     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state = {
        data: [],
        loading: true

        
    }
  }

  componentDidMount = () => {
        const {params} = this.props.navigation.state
       

        const URI = Config.baseUrl + Config.customersUri + '/' + params.credentials.username + '/accounts'
        fetch(URI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTH-SECURITY-TOKEN': params.credentials.authKey
            }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            //change the state of the accounts
            this.displayAccounts(jsonResponse)
        })
  }

  displayAccounts = (jsonResponse) => {
      //set the new state
      LayoutAnimation.configureNext(CustomLayoutSpring);
      this.setState({
          data: jsonResponse.data
      })
  }

  renderAccountCard = (account) => {
      const {params} = this.props.navigation.state
      return (
          <CollapsibleCard nickName={account.nickName}
             key={account.nickName}
             verified={account.verified}
             account={account} credentials = {params.credentials} balanceInquiryPressEvent={() => this.onBalanceInquiryPressed(account)}/>
      )
  }

  onBalanceInquiryPressed = (account) => {
      alert('this is')
  }
  render() {
    let cards = this.state.data.map((account) => {
        return this.renderAccountCard(account)
    })
    return (
      <ScrollView style={styles.container}>
        {cards}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop: 3
  }
})