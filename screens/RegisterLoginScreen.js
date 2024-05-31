import React, { useState } from "react";
import "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RegisterLoginScreen() {
  const [esLogin, setEsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const navigation = useNavigation();

  const HandleRegister = () => {
    if (email === "admin" && password === "admin") {
      alert(`${nombre} se ha registrado correctamente`);
      navigation.navigate("Home");
    } else {
      alert("Login Fallado");
    }
  };

  const IrALogin = () => {
    setEsLogin(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esLogin ? "Login" : "Registrarse"}</Text>
      {
        !esLogin && (
            <TextInput 
        style={ styles.input}
        placeholder='Ingrese su nombre'
        value={nombre}
        onChangeText={setNombre}
        />
        )
      }
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.register}>
        {esLogin ? (
          <Button title="Iniciar Sesion" onPress={HandleRegister} />
        ) : (
          <>
            <Button
              title={esLogin ? "Login" : "Registrate"}
              onPress={HandleRegister}
            />
            <Button title="Iniciar Sesion" onPress={IrALogin} />
          </>
        )}
      </View>

      <View>
        {/* <Text>{esLogin ? 'Cambia a Registro' : 'Cambia a Login'}</Text> */}
        {/* <Switch value={esLogin} onValueChange={setEsLogin}/> */}
      </View>
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
});
