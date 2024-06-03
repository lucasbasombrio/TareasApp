import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, Text,TextInput, View, Button,FlatList} from "react-native";
import { AuthContext, nombreUsuario } from '../context/AuthContext';
import { useNavigation, NavigationContainer} from "@react-navigation/native";
/* import { TareasContext } from '../context/TareasContext'; */

export const HomeScreen = () => {

  const navigation = useNavigation();
  /* const {agregarTarea1} = useContext(TareasContext) */ 

  const { status, logout, nombreUsuario } = useContext(AuthContext)
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const handleLogout = () => {
  logout();
  };

  useEffect( () => {
    if( status === 'unauthenticated'){
      navigation.navigate('Login')
    }
  }, [status, navigation])

  const agregarTarea = () => {
    if (tarea.trim()) {
      setTareas([...tareas, { id: Date.now().toString(), text: tarea }]);
      setTarea("");
    }
  };

  return (

    <View style={styles.container}>
      <Text></Text>
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
<Button title="Agregar Tarea" onPress={agregarTarea} />
{/* Finalidad espaciadora */}
<View style={{ height: 50 }} />
<View style={styles.inputContainer}>
</View>

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

