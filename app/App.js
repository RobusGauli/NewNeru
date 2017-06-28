import {
    AppRegistry
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import { TabNavigator } from 'react-navigation'

import Login from './screens/login/Login'
import Banking from './screens/banking/Banking'
import Payment from './screens/payment/Payment'

import FundTransfer from './screens/banking/FundTransfer'
import Inquiry from './screens/banking/Inquiry'

import ScaleView from './screens/components/ScaleView'

import MerchantPayment from './screens/merchant/MerchantPayment'
import MerchantListing from './screens/merchant/MerchantListing'
import MerchantFav from './screens/merchant/MerchantFav'



const Tabs = TabNavigator({
  Banking: { screen: Banking },
  Payment: { screen: Payment },
  Other: {screen: Payment}
    },
    { tabBarOptions: {
        title: 'Tabs',
        activeTintColor: 'white',
        tabBarVisible: false,
        labelStyle: {
            fontSize: 14,
            fontWeight: '600'
        },
        style: {
            backgroundColor : 'rgba(198,40,40 ,1)'
        },
        tabStyle: {
            height: 60,
            borderWidth :0.2,
            borderColor: 'rgba(2,136,209 ,0.3)',
            //backgroundColor: 'rgba(2,136,209 ,0.9)'
        },
        indicatorStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            height: 5
        }
   }
    }
);

const MerchantTabs = TabNavigator({
  Merchant: { screen: MerchantPayment },
  Favourites: { screen: MerchantFav },
  All: {screen: MerchantListing}
    },
    { tabBarOptions: {
        title: 'Merchant Tabs',
        activeTintColor: 'white',
        tabBarVisible: false,
        labelStyle: {
            fontSize: 14,
            fontWeight: '600'
        },
        style: {
            backgroundColor : 'rgba(198,40,40 ,1)'
        },
        tabStyle: {
            height: 60,
            borderWidth :0.2,
            borderColor: 'rgba(2,136,209 ,0.3)',
            //backgroundColor: 'rgba(2,136,209 ,0.9)'
        },
        indicatorStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            height: 5
        }
   }
    }
);

const Neru = StackNavigator({
    Home: { screen: Login },
    Tabs: { screen: Tabs },
    FundTransfer: {screen: FundTransfer},
    Inquiry: {screen: Inquiry},
    MerchantTabs:{screen: MerchantTabs}
    })

AppRegistry.registerComponent('Neru', () => Neru)