import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Picker,
    TouchableNativeFeedback,
    Switch,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import {
  getTheme,
  MKTextField,
  MKButton,
  MKColor
} from 'react-native-material-kit';


import color from '../utils/Color'

const theme = getTheme()


import MaterialTextInput from '../components/MaterialTextInput'


import Header from '../components/Header'
import RadioButton from '../components/RadioButton'


export default class FundTransferRequest extends React.Component {
    constructor() {
        super()
        
    }

    onOptionSelected = (name) => {
        alert('Option selected' + name)
    }

    
    render() {

        const {
            fromAccounts,
            onFromBankSelected,
            defaultFromBank,
            toBanks,
            defaultToBank,
            onToBankSelected, 
            onAccountTextInputChange,
            onAmountTextInputChange, 
            onNoteTextInputChange,
            onSubmitPress
        } = this.props

        return (
            <ScrollView style={styles.container}>
                <FromCard fromAccounts={fromAccounts} 
                    defaultFromBank={defaultFromBank}
                    onFromBankSelected={onFromBankSelected}
                    
                />
                <View style={{marginTop: 5}} />
                
                <View style={{marginTop: 3}} />
                <ToCard toBanks={toBanks}
                    defaultToBank={defaultToBank}
                    onToBankSelected={onToBankSelected} 
                    onAccountTextInputChange={onAccountTextInputChange}
                    onAmountTextInputChange={onAmountTextInputChange}
                    onNoteTextInputChange={onNoteTextInputChange}
                />
                <View style={{marginTop: 8}} />
                <View style={{flexDirection: 'row'}}>
                <Button text={'CANCEL'} color={'rgba(224,0,66 ,1)'} />
                <Button text={'SUBMIT'} color={color.badgeColor} onPress={onSubmitPress}/>
                
                </View>
            </ScrollView>
        )
    }
}


class FromCard extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedValue: 'MEGA'
        }
    }
    
    _onValueChange = (val, pos, onFromBankSelected) => {
        this.setState({
            selectedValue: val
        })

        //call the props
        if (onFromBankSelected) {
            onFromBankSelected(val, pos)
        }
    }

    componentWillMount = () => {
        const {
            defaultFromBank
        } = this.props

        this.setState({
            selectedValue: defaultFromBank
        })
    }
    
    render() {
        const {
            fromAccounts,
            defaultFromBank,
            onFromBankSelected
        } = this.props

        console.log(defaultFromBank + '>>>>>>><<<<<<<<')
        let pickerItems = fromAccounts.map((account) => {
            return (
                <Picker.Item label={account.nickName} value={account} key={account.nickName} />
            )
        })
        return (
            <View style={[theme.cardStyle,
                        styles.fromCardContainer]}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        FROM
                    </Text>
                </View>
                {/*<View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Select Bank
                    </Text>
                </View>*/}
                <Picker
                    selectedValue={this.state.selectedValue}
                    mode={'dropdown'}
                    style={styles.dropdown}
                    onValueChange={(val, pos) => this._onValueChange(val, pos, onFromBankSelected)}>
                    {pickerItems}
                </Picker>
            </View>
        )
    }
}

class ToCard extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedValue: ''
        }

    }

    componentWillMount = () => {
        const {
            defaultToBank
        } = this.props
        this.setState({
            selectedValue: defaultToBank
        })
    }

    _onValueChange = (val, pos, onToBankSelected) => {
        this.setState({
            selectedValue: val
        })

        //call the props
        
        if (onToBankSelected) {
            onToBankSelected(val, pos)
        }
    }


    render() {
        const {
            toBanks,
            defaultToBank,
            onToBankSelected, 
            onAccountTextInputChange,
            onAmountTextInputChange,
            onNoteTextInputChange
        } = this.props;

        let bankItems = toBanks.map((item) => {
            return (
                <Picker.Item label={item.name} value={item} key={item.name}/>
            )
        })
        return (
            <View style={[theme.cardStyle,
                        styles.fromCardContainer]}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        TO
                    </Text>
                </View>
                {/*<View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Select Bank
                    </Text>
                </View>*/}
                
                <Picker
                    selectedValue={this.state.selectedValue}
                    mode={'dropdown'}
                    style={styles.dropdown}
                    onValueChange={(val, pos) => this._onValueChange(val, pos, onToBankSelected)}>
                    {bankItems}
                </Picker>
                <View style={styles.radioContainer}>
                    <RadioButton />
                </View>
                <View style={{marginTop: 10}} />
                <MaterialTextInput placeholder={'Account Number'} 
                    iconName={'md-navigate'}
                    onChangeText={onAccountTextInputChange} />

                <View style={{marginTop: 10}} />


                <MaterialTextInput placeholder={'Amount'} 
                    iconName={'md-cash'}
                    onChangeText={onAmountTextInputChange}/>
                <View style={{marginTop: 10}} />
                <MaterialTextInput placeholder={'Note'} 
                    iconName={'md-clipboard'}
                    onChangeText={onNoteTextInputChange}/>
                <View style={{marginTop: 20}} />
                
            </View>
        )
    }
}

const Button = (props) => {
    return (
        <TouchableOpacity 
            style={{
                flex :1,
                margin: 2
            }}
            onPress={props.onPress || (() => alert('button preessed'))}>
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
        marginTop: 1
    },
    buttonContainer: {
        backgroundColor: 'rgba(124,179,66 ,1)',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        flex: 1
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '400',
        color: 'white'
    }
})

