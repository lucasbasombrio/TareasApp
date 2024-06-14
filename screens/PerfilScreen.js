import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { TareasContext } from "../context/TareasContext";

export const PerfilScreen = () => {
  const image = require("../assets/blue-and-white.jpg");
  const navigation = useNavigation();
  const { devolverTareasCompletadas, RehacerTarea } = useContext(TareasContext);
  const { status, user } = useContext(AuthContext);

  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      navigation.navigate("Login");
    } else {
      const fetchTareas = async () => {
        const tareasCompletadas = await devolverTareasCompletadas();
        setTareas(tareasCompletadas);
      };
      fetchTareas();
    }
  }, [status, user.id, navigation]);

  const handleRehacerTarea = async (tareaId) => {
    await RehacerTarea(tareaId);
    const tareasCompletadasActualizadas = await devolverTareasCompletadas();
    setTareas(tareasCompletadasActualizadas);
  };

  return (
    <View style={styles.container1}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>Hola {user.username}!</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.tareasCompletas}>Tareas completadas:</Text>
          </View>
          <FlatList
            data={tareas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tareaContainer}>
                <Text style={styles.tareaText}>{item.nombre}</Text>
                <Button
                  title="Rehacer tarea"
                  onPress={() => handleRehacerTarea(item.id)}
                  color="green"
                />
              </View>
            )}
            contentContainerStyle={styles.scrollContainer}
          />
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    textAlign: "center",
  },
  tareaText: {
    fontSize: 18,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "rgba(128, 128, 128, 0.8)",
  },
  userInfoContainer: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  tareasCompletas: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "darkgreen",
    padding: 10,
  },
});

export default PerfilScreen;
