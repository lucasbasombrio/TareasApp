import React, { createContext, useEffect, useState, useContext  } from 'react'
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TareasContext = createContext()

export const TareaProvider = ({ children }) => {

const {userId} = useContext(AuthContext)

    const [tareas, setTareas] = useState([])
    const [tareasActivas, setTareasActivas] = useState([])

    const fetchTareas = async () => {
        try {

            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Tarea')
            const data = await respuesta.json();
            setTareas(data)
        } catch (error) {
            console.error('Error en el fetch de tareas: ', error)
        }
    }
    useEffect(() => {
        fetchTareas()
    }, [])


    const agregarTarea1 =  async (nuevaTarea) => {
        try {
            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Tarea', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(nuevaTarea)
            })
            console.log('Nueva Tarea: ', nuevaTarea);

            if(respuesta.ok){
                const tareaCreada = await respuesta.json()
                setTareas(( prevTarea) => [...prevTarea, tareaCreada]) 
            
            }else{
                alert('Error al agregar la tarea')
            }
        } catch (error) {
            console.error('Error en la carga de la tarea: ', error)

        }
    }

    const devolverTareasActivas = async () => {
        try {
            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Tarea');
            if (!respuesta.ok) {
                throw new Error('Error al obtener las tareas');
            }
            
            const tareas = await respuesta.json();
            const tareasFiltradas = tareas.filter(item => item.idUsuario === userId);
            setTareas(tareasFiltradas);
            return tareasFiltradas;
        } catch (error) {
            console.error('Error al obtener las tareas: ', error);
            return [];
        }
    };


    const completarTarea = (tareaId) => {
        setTareasActivas((prevItems) => prevItems.filter(item =>item.id !== tareaId))
    }

  
 return (
    <TareasContext.Provider value={{tareas, TareaProvider, devolverTareasActivas, agregarTarea1, completarTarea, fetchTareas}}>
        { children }
    </TareasContext.Provider>
 )
}