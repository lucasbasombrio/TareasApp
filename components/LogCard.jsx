import React from "react";
import {
  ImageBackground,
  Image,
  Text,
  Button,
  Switch,
  tab,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { TareasContext } from "../context/TareasContext";
import CheckBox from "@react-native-community/checkbox";

export const LogCard = ({ name, pass }) => {
  // console.log(title);
  const { status, login, register } = useContext(AuthContext);

  const [esLogin, setEsLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <View styles={styles.card}>
      <View style={styles.container1}>
        <Image
          source={require("../assets/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: "rgba(255, 255, 255, 0.50)" },
          ]}
          placeholder="Ingrese su Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    bordercolor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: "80%",
    height: 200,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
