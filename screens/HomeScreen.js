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
//import CheckBox from "@react-native-community/checkbox";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { agregarTarea1, completarTarea, devolverTareasActivas } = useContext(TareasContext);
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
        <Button title="Agregar Tarea" onPress={handleSubmit} />
        <View style={{ height: 20 }} />
        <View style={styles.containerBottons}>
          <Button
            title="Perfil"
            onPress={() => navigation.navigate("PerfilScreen")}
          />
          {/* <View style={{ height: 20 }} /> */}
          <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
      </View>
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
  },
  tareaContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    textAlign: "center",
  },
  tareaText: {
    fontSize: 18,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "green",
  },
  inputContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    height: 40,
    borderColor: "green",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: "center",
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
});

export default HomeScreen;
