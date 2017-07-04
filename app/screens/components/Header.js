import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

export default class Header extends React.Component {
    constructor() {
        super()

    }

    render() {

        const {
            value
        } = this.props


        return (
           <View style={{
                    backgroundColor: 'rgba(63,81,181 ,0.4)',
                    marginLeft: 10,
                    marginRight: 10,
                    height: 40,
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    paddingLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 20   ,
                    marginBottom: 10                  
                    
                }}>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 19,
                        fontWeight: '400'
                        
                    }}>
                        {value}
                        
                    </Text>
                    
                </View>
        )
    }
}