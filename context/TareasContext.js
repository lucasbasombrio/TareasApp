import React, { createContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

export const TareasContext = createContext()
const {status, login, register, userId} = useContext(AuthContext)

export const TareaProvider = ({ children }) => {

    const [tareas, setTareas] = useState([])
    const [tareasActivas, setTareasActivas] = useState([])

    const fetchTareas = async () => {
        try {

            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Tarea')
            const data = await respuesta.json();
            setTarea(data)
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
                console.log('Tarea creada: ', tareaCreada);
                setTareas(( prevTarea) => [...prevTarea, productoCreado]) 
            }else{
                alert('Error al agregar la tarea')
            }
        } catch (error) {
            console.error('Error en la carga de la tarea: ', error)

        }
    }

    const devolverTareasActivas = (tarea) => {
       /*  const { userId } = useContext(AuthContext) */
       try{
        setTareasActivas((prevTareas) => {
            const tareasFiltradas = prevTareas.filter(item => {
                return userId === item.idUsuario;
            });
            return tareasFiltradas;
        });
    }
    catch (error) {
        console.error('Error al obtener las tareas: ', error)
    }
    };


    const completarTarea = (tareaId) => {
        setTareasActivas((prevItems) => prevItems.filter(item =>item.id !== tareaId))
    }

  
 return (
    <TareasContext.Provider value={{tareas, devolverTareasActivas, agregarTarea1, completarTarea, fetchTareas}}>
        { children }
    </TareasContext.Provider>
 )
}
