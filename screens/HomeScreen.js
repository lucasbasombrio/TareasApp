import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, Text,TextInput, View, Button,FlatList} from "react-native";
import { AuthContext } from '../context/AuthContext';

export const HomeScreen = () => {

  const { logout } = useContext(AuthContext)

  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (tarea.trim()) {
      setTareas([...tareas, { id: Date.now().toString(), text: tarea }]);
      setTarea("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tareaContainer}>
            <Text style={styles.tareaText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.scrollContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tarea"
          value={tarea}
          onChangeText={setTarea}
        />

<Button title="Logout" onPress={ () => logout()} color="red" />

        <Button title="Agregar Tarea" onPress={agregarTarea} />
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
    paddingBottom: 100, // Espacio extra para evitar solapamiento con el input
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

