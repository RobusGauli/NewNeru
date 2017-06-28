import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TouchableNativeFeedback
} from 'react-native'

import Config from '../utils/Config'
import Icon from 'react-native-vector-icons/Ionicons'
import Interactable from 'react-native-interactable'


export default class MerchantListing extends React.Component {

    constructor() {
        super()
        this.state = {
            listings: []
        }
    }

    componentDidMount = () => {
        const { params } = this.props.navigation.state
        let authKey = params.credentials.authKey

        //once the component is mounted , make the api call 
        let merchantUri = Config.baseUrl + Config.merchantUri

        fetch(merchantUri,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'AUTH-SECURITY-TOKEN': authKey 
            },
            method: 'GET'
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            //now when there is a data chante the state
            this.displayListing(jsonResponse.data)
        })

    }

    displayListing = (data) => {
        this.setState({
            listings: data
        })
    }

    renderMerchantItem = (item) => {
        return (
            <MerchantItem 
                name={item.name}
                code={item.code}
                active={item.active}
                key={item.code}/>
        )
    } 

    render() {
        let listingViews = this.state.listings.map((item) => {
            return this.renderMerchantItem(item)
        })
        return (
            <ScrollView>
                {listingViews}
                
            </ScrollView>
        )
    }
}


class MerchantItem extends React.Component {
    constructor() {
        super()

    }

    render() {
        return (
            <Interactable.View style={styles.merchantItemContainer}>
                <View style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center'
                    
                }}>
                    <Image source={{uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png'}}
                    style={{width: 50, height: 50, borderRadius: 40}} />
                </View>


                <View style={{
                    
                    flex: 2,
                    justifyContent: 'center',
                    borderTopLeftRadius: 3,
                    alignItems: 'flex-start'                    
                    
                    
                }}>
                    <Text style={{
                        
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 10,
                        color: 'rgba(0, 0, 0, 0.9)'
                    }}>
                        {this.props.name + '(' + this.props.code + ')'}
                    </Text>
                    
                      <View style={{
                        width: 60,
                        backgroundColor: 'rgba(85,139,47 ,1)',
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        marginBottom: 5,
                        marginLeft: 10,
                        marginTop: 5
                    }}>
                        <Text style={{color:'white'}}>
                            Active
                        </Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    
                    <TouchableOpacity style={{
                        width: 60,
                        
                        height: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50
                    }}>
                        <Icon name={'md-bookmark'} size={40} color={'rgba(97,97,97 ,1)'} />
                    </TouchableOpacity>
                </View>
            </Interactable.View>
        )
    }
}


const styles = StyleSheet.create({
    merchantItemContainer: {
        height: 80,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 10,
        flexDirection: 'row'

        

    }
})