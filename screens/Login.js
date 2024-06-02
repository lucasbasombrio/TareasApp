import React, { useContext, useEffect, useState } from 'react';
import { View,Text, Button,  StyleSheet,TextInput, Switch, tab} from "react-native";
import { useNavigation, NavigationContainer} from "@react-navigation/native";
import { AuthContext } from '../context/AuthContext';

export default function RegisterLoginScreen() {

  const {status, login, register} = useContext(AuthContext)

  const [esLogin, setEsLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();


  const handleSubmit = () => {
  
        const loginResult =  login(username, password);
        if (loginResult === 'success') {
            navigation.navigate('Home');
        }
    
};

  useEffect( () => {
    if( status === 'authenticated'){
      navigation.navigate('Home')
    }
  }, [status, navigation])



/*   const HandleRegister = () => {
    if (email === "admin" && password === "admin") {
      alert(`${nombre} se ha registrado correctamente`);
      navigation.navigate("Home");
    } else {
      alert("Login Fallado");
    }
  }; */


  const IrALogin = () => {
    setEsLogin(true);
  };
 
  return (
    <View style={styles.container}>
{/*       <Text style={styles.title}>{ esLogin ? 'Login' : 'Registrarse'}</Text> */}
<Text style={styles.title}>Login</Text> 
   {/*    {
        !esLogin && (
            <TextInput 
        style={ styles.input}
        placeholder='Ingrese su Email'
        value={email}
        onChangeText={setEmail}
        />
        )
      } */}

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
      <Button title={'Iniciar sesion'} onPress={handleSubmit}/>

{/* Finalidad espaciadora */}
<View style={{ height: 5}} />
<View style={styles.inputContainer}>
</View>
      <Text style={styles.text1}> ¿Olvidaste tu contraseña? </Text>

{/* Finalidad espaciadora */}
<View style={{ height: 20 }} />
<View style={styles.inputContainer}>
</View>
   
      <View>
        <Button title='Crear cuenta' onPress={() => navigation.navigate('SoloRegister')} color="#28a745" />
      </View>

     

   {/*  <View>
        <Text>{esLogin ? 'Cambia a Registro' : 'Cambia a Login'}</Text>
        <Switch value={esLogin} onValueChange={setEsLogin}/>
        </View> */}

    </View>
   
  );
}


const styles = StyleSheet.create({
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
