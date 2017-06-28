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

import CollapsibleCard from './CollapsibleCard'

export default class ScaleView extends React.Component {

  constructor() {
    super()
     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    
  }



  render() {
    
    return (
      <ScrollView style={styles.container}>
        <CollapsibleCard/>
        <CollapsibleCard/>
        <CollapsibleCard/>
        <CollapsibleCard/>
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