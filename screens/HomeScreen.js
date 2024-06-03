import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TareasContext } from '../context/TareasContext';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { agregarTarea1, devolverTareasActivas } = useContext(TareasContext);
  const { status, logout, userId } = useContext(AuthContext);

  const [tareas, setTareas] = useState([]);
  const [nombreTarea, setNombreTarea] = useState("");

  useEffect(() => {  //useEffect cambiado
    if (status === 'unauthenticated') {
      navigation.navigate('Login');
    } else {
      const fetchTareas = async () => {
        const tareasActivas = await devolverTareasActivas();
        console.log('Tareas activas obtenidas en HomeScreen:', tareasActivas);  // Debugging log
        setTareas(tareasActivas);
      };
      fetchTareas();
    }
  }, [status, userId, navigation]);//agrego userID

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async () => { //cambie el handleSubmit, async
    const nuevaTarea = {
      nombre: nombreTarea,
      descripcion: "Esto es una descripcion",
      idUsuario: userId
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tareaContainer}>
            <Text style={styles.tareaText}>{item.nombre}</Text>
            <Text style={styles.tareaText}>hola</Text>
          </View>
        )}
        contentContainerStyle={styles.scrollContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tarea"
          value={nombreTarea}
          onChangeText={setNombreTarea}
        />
        <Button title="Agregar Tarea" onPress={handleSubmit} />
        <View style={{ height: 20 }} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 200,
  },
  tareaContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tareaText: {
    fontSize: 18,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
