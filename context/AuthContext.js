import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [status, setStatus] = useState('checking');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const cargarEstadoAuth = async () => {
            const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');

            if (isAuthenticated === 'true') {
                setStatus('authenticated');
                const numerdoId = await AsyncStorage.getItem('userId');
                if (numerdoId) {
                    setUserId(numerdoId);
                    console.log('Numero de id: ', numerdoId);
                } else {
                    console.warn('No se encontro userId en AsyncStorage');
                }
            } else {
                setStatus('unauthenticated');
            }
        };

        cargarEstadoAuth();
    }, []);

    
const login = async (username, password) => {

        try {
            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Usuario');
            const users = await respuesta.json()
            console.log('users: ', users);
            
            const user = users.find( element => element.username === username && element.password === password)
            const numeroId = user.id
            console.log('Numero de id: ', numeroId);
            console.log('user: ', user);
            if (user){
                await AsyncStorage.setItem('isAuthenticated', 'true')
                setStatus('authenticated')
                await AsyncStorage.setItem('userId', numeroId)
                setUserId(numeroId)
               
            }else{
                setStatus('unauthenticated')
            }

        } catch (error) {
            console.error('Error en el fetch: ', error)
            alert('Error en login')
        }
        // https://6656578f9f970b3b36c51233.mockapi.io/api/v1/usuarios
    }

    const register = async (username, email, password) => {

        try {
            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Usuario',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            if(respuesta.ok){
                alert('Registro Exitoso')
            } else {
                alert('Error en el registro');
            }
        } catch (error) {
            console.error('Fallo el registro: ', error)
            alert('Error al registrarse')
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('isAuthenticated');
        setStatus('unauthenticated')
    }
   
 return (
    <AuthContext.Provider value={{userId, status, login, register, logout}}>
        { children }
    </AuthContext.Provider>
 )
}

