import React, { useContext, useEffect, useState } from 'react'
import {StyleSheet, Text,TextInput, View, Button,FlatList} from "react-native";
import { AuthContext, nombreUsuario } from '../context/AuthContext';
import { useNavigation, NavigationContainer} from "@react-navigation/native";
import {TareasContext}  from '../context/TareasContext'; 

export const HomeScreen = () => {

  const navigation = useNavigation()

  const {agregarTarea1, devolverTareasActivas  } = useContext(TareasContext)  

  const { status, logout, userId, nombreUsuario } = useContext(AuthContext)
  const [tareas, setTareas] = useState(devolverTareasActivas);
  const {tareas1, setTareas1} =  useContext(TareasContext)
  
  const [nombreTarea, setNombreTarea] = useState("");

  const handleLogout = () => {
  logout();
  };

  const handleSubmit = () => {
    console.log(userId)
    const nuevaTarea = {
      nombre: nombreTarea,
      descripcion: "Esto es una descripcion",
      idUsuario: userId
  }
        console.log("Se ha agregado una tarea: ", nuevaTarea)
        agregarTarea1(nuevaTarea)
    }
;

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
  console.log("Datos de tareas:", devolverTareasActivas[0]);

  return ( 

    <View style={styles.container}>
      <View style={styles.inputContainer}>

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
 


        <TextInput
          style={styles.input}
          placeholder="Tarea"
          value={nombreTarea}
          onChangeText={setNombreTarea}
        />
<Button title="Agregar Tarea" onPress={handleSubmit} />
{/* Finalidad espaciadora */}
<View style={{ height: 20}} />
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

