import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, View,Text, Button,  StyleSheet,TextInput, Switch, tab} from "react-native";
import { useNavigation, NavigationContainer} from "@react-navigation/native";
import { AuthContext, validarEmail } from '../context/AuthContext';
import {emailjs} from "@emailjs/browser"
import { send, EmailJSResponseStatus } from '@emailjs/react-native';


export default function SoloRegister() {


  
  const image = require('../assets/graphic-2d-colorful-wallpaper-with-grainy-gradients.jpg');

  const {status, login, register, validarEmail} = useContext(AuthContext)

  const [esLogin, setEsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    if(esLogin){
      login(username, password)
    }else{
      if (validarEmail (email)){
        register(username, email, password)
        navigation.navigate('Login')
        return true
      }
      return false
    }
  }

  useEffect( () => {
    if( status === 'authenticated'){
      navigation.navigate('Home')
    }
  }, [status, navigation])

  const onSubmit = async (email) => {
    try {
      await send(
        "service_zm6njvv",
        "template_8vgjonh",
        {
          email,
          message:`${email},\n Se ha registrado correctamente`
        },
        {
          publicKey: "2U72Hx1uyrdY-U1rv",
          privateKey:"0xjvh0Qxkq_kmcRtnJmDc"
        }
      );

      console.log("SUCCESS!");
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log("EmailJS Request Failed...", err);
      }

      console.log("ERROR", err);
    }
  };

  const IrALogin = () => {
    setEsLogin(true);
  };
 
  return (
    <View style={styles.container1}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

    <View style={styles.container}>
      <Text style={styles.title}>{'Registrarse'}</Text>
      
      {
        !esLogin && (
            <TextInput 
        style={ styles.input}
        placeholder='Ingrese su Email'
        value={email}
        onChangeText={setEmail}
        />
        )
      }
      <TextInput 
        style={ styles.input}
        placeholder='Ingrese su Username'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput 
        style={ styles.input}
        placeholder='Ingrese su Password'
        keyboardType='password'
        value={password}
        onChangeText={setPassword}
      />
      <Button title={ esLogin ? 'Login' : 'Registrate'}  onPress={() => {
              if (handleSubmit()){
                 onSubmit(email)
              }else {
                console.log('No envio el mail')
                console.error('Cuenta de email no valida');
              }
               
            }}
            type="submit"
            value="Send"
          />

    </View>

    
</ImageBackground>
</View>  
  );
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  register: {
    flexDirection: "colum",
    justifyContent: "center",
    gap: 5,
  },
  text1: {
    textAlign: "center",
    color: "blue"
  }
});
