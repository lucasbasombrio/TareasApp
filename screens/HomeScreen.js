import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { TareasContext } from "../context/TareasContext";


export const HomeScreen = () => {
  const image = require("../assets/blue-and-white.jpg");
  const navigation = useNavigation();
  const { agregarTarea1, completarTarea, devolverTareasActivas } =
    useContext(TareasContext);
  const { status, logout, userId } = useContext(AuthContext);
  const [tareas, setTareas] = useState([]);
  const [nombreTarea, setNombreTarea] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      navigation.navigate("Login");
    } else {
      const fetchTareas = async () => {
        const tareasActivas = await devolverTareasActivas();
        console.log("Tareas activas obtenidas en HomeScreen:", tareasActivas);
        setTareas(tareasActivas);
      };
      fetchTareas();
    }
  }, [status, userId, navigation]);

  // useFocusEffect refresca las tareas
  useFocusEffect(
    React.useCallback(() => {
      const fetchTareas = async () => {
        const tareasActivas = await devolverTareasActivas();
        setTareas(tareasActivas);
      };
      fetchTareas();
    }, [userId])
  );

  const handleLogout = () => {
    logout();
  };

  const eliminarTarea = async (tareaId) => {
    await completarTarea(tareaId);
    const tareasActualizadas = await devolverTareasActivas();
    setTareas(tareasActualizadas);
    setNombreTarea("");
  };

  const handleSubmit = async () => {
    const nuevaTarea = {
      nombre: nombreTarea,
      descripcion: "Esto es una descripcion",
      idUsuario: userId,
      estaActiva: true,
    };
    await agregarTarea1(nuevaTarea);
    const tareasActualizadas = await devolverTareasActivas();
    setTareas(tareasActualizadas);
    setNombreTarea("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
        <View style={styles.bienvenidaContainer}>
            <Text style={styles.textBienvenidaContainer}>Tareas a completar: </Text>
          </View>
          <FlatList
            data={tareas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tareaContainer}>
                <Text style={styles.tareaText}>{item.nombre}</Text>
                <Button
                  title="Completar tarea"
                  onPress={() => eliminarTarea(item.id)}
                  color="green"
                />
              </View>
            )}
            contentContainerStyle={styles.scrollContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escriba su tarea..."
              value={nombreTarea}
              onChangeText={setNombreTarea}
            />
            <Button title="Agregar Tarea" onPress={handleSubmit} color="blue" />
            <View style={{ height: 20 }} />
            <View style={styles.containerBottons}>
              <Button
                title="Perfil"
                onPress={() => navigation.navigate("PerfilScreen")}
                color="blue"
              />
              {/* <View style={{ height: 20 }} /> */}
              <Button title="Logout" onPress={handleLogout} color="red" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    flex: 1,
    padding: 2,
    marginTop: 15,
   
    
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  tareaContainer: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    textAlign: "center",
  },
  tareaText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "rgba(128, 128, 128, 0.8)",
  },
  inputContainer: {
    // left: 0,
    // right: 0,
    // bottom: 0,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    fontWeight: "bold",
    height: 40,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    backgroundColor: "rgba(128, 128, 128, 0.7)",
  },
  boton: {
    width: 1,
    height: 2040215,
    color: "red",
  },
  containerBottons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 50,
  },
  bienvenidaContainer: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    marginBottom: 10,
  },
  textBienvenidaContainer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor:"blue",
    padding: 10,
  },
});

export default HomeScreen;
