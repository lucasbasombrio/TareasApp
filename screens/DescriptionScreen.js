import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const HomeScreen = () => {
    return (
      <View styles={styles.container}>
          <Text styles={styles.texto}>HomeScreen</Text>
      </View>
      
    )
  }
  
  
  const styles = StyleSheet.create ({
      container: {
          flex: 1,
          padding: 10,
          justifyContent: 'center'
      },
      texto: {
          fontSize: 24,
          fontWeight: 'bold'
      } 
  })