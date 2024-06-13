import React, { useContext, useEffect, useState } from 'react';
import {  ImageBackground, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TareasContext } from '../context/TareasContext';

export const PerfilScreen = () => {

    /* const image = require('../assets/graphic-2d-colorful-wallpaper-with-grainy-gradients.jpg'); */
    
    const navigation = useNavigation();
    const { devolverTareasCompletadas, RehacerTarea } = useContext(TareasContext);
    const { status, userId } = useContext(AuthContext);
  
    const [tareas, setTareas] = useState([]);
    //const [nombreTarea, setNombreTarea] = useState("");
  
    useEffect(() => {  //useEffect cambiado
      if (status === 'unauthenticated') {
        navigation.navigate('Login');
      } else {
        const fetchTareas = async () => {
          const tareasCompletadas = await devolverTareasCompletadas();
          //console.log('Tareas completadas :', tareasCompletadas); 
          setTareas(tareasCompletadas);
        };
        fetchTareas();
      }
    }, [status, userId, navigation]);//agrego userID
  
    const handleRehacerTarea = async (tareaId) => {
      await RehacerTarea(tareaId);
      // Actualizar el estado local después de rehacer la tarea
      const tareasCompletadasActualizadas = await devolverTareasCompletadas();
      setTareas(tareasCompletadasActualizadas);
    };
  
       return (
   /* <View style={styles.container1}>
  <ImageBackground source={image} resizeMode="cover" style={styles.image}> */
  
  
  <View style={styles.container}>
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.tareaContainer}>
              <Text style={styles.tareaText}>{item.nombre}</Text>
              <Button title="Rehacer tarea" onPress={() => handleRehacerTarea(item.id)} color='green' />
            </View>
            
          )}
          contentContainerStyle={styles.scrollContainer}
          
        />
        </View>
  /* 
        </ImageBackground>
      </View> */
  
  
  
    );
  };


  const styles = StyleSheet.create({
    container1: {
       flex: 1,
      justifyContent: 'center', 
    },
    image: {
      flex: 1,
      justifyContent: 'center',
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
      textAlign: "center"
    },
    tareaText: {
      fontSize: 18,
      textAlign: "center",
      borderWidth: 1,
      borderColor: "green"
  
    },
    inputContainer: {
     /*  position: 'absolute', */
      left: 0,
      right: 0,
      bottom: 0,
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      backgroundColor: ""
     
    },
    input: {
      height: 40,
      borderColor: "green",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      textAlign: "center"
    },
    boton:  {
     width: 1, // Anchura del botón
    height: 2040215, // Altura del botón
    color: "red"
  }
  });
  
  export default PerfilScreen;