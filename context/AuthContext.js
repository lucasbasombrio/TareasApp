import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [status, setStatus] = useState('checking');
    const [userId, setUserId] = useState(null);
    const [esLogin, setEsLogin] = useState(false);
    const [autenticadoHuella, setAutenticadoHuella] = useState('Autenticación fallida');

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

    function validarEmail  (email) {
    
        const emailValido = email.endsWith('@gmail.com') || email.endsWith('@hotmail.com') || email.endsWith('@yahoo.com.ar')

        return emailValido
    }

    const esLogeable = async (username, password) => {
        try {
            const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Usuario');
            const users = await respuesta.json()
            console.log('users: ', users);
            
            const user = users.find( element => element.username === username && element.password === password)
            const numeroId = user.id
            console.log('Numero de id: ', numeroId);
            console.log('user: ', user);
            if (user){
                return user
            }else{
                return undefined
            }
        } catch (error) {
            console.log(error)
           /*  console.error('Error en el fetch: ', error) */
          
        }
    }

    
    const login = async (username, password) => {
        try {
            const user = await esLogeable(username, password);
    
            if (user) {
                const autenticadoHuella = await iniciarConHuella();
                if (autenticadoHuella) {
                    await AsyncStorage.setItem('isAuthenticated', 'true');
                    setStatus('authenticated');
                    await AsyncStorage.setItem('userId', user.id);
                    setUserId(user.id);
                } else {
                    console.error('Autenticación por huella digital fallida');
                }
            } else {
                console.error('Usuario o contraseña incorrecta');
                setStatus('unauthenticated');
            }
        } catch (error) {
            console.error('Error en el login: ', error);
            alert('Error en el login');
        }
    };
  
    const register = async (username, email, password) => {
       
       if (validarEmail(email)){
        try {
            const esLogin = await esLogeable(username, email, password);
            if (!esLogin) {
                const respuesta = await fetch('https://6657b1355c361705264597cb.mockapi.io/Usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    })
                });
                if (respuesta.ok) {
                    alert('Registro Exitoso');
                    exitosoRegistro = true
                } else {
                    alert('Error en el registro');
                }
            } else {
                setStatus('unauthenticated');
                console.error('El usuario ya tiene una cuenta asociada');
             
            }
        } catch (error) {
            console.error('Fallo el registro: ', error);
            alert('Error al registrarse');
           
        }
    }
    return exitosoRegistro
    };


    const logout = async () => {
        await AsyncStorage.removeItem('isAuthenticated');
        setStatus('unauthenticated')
    }

    const iniciarConHuella = async () => {
        try{
          const resultado = await LocalAuthentication.authenticateAsync();
              if (resultado.success) {
                setAutenticadoHuella('Autenticación exitosa');
                return true
              } else {
                setAutenticadoHuella('Autenticación fallida');
              }
            } catch (error) {
              console.error('Error al autenticar:', error);
              setAutenticadoHuella('Error al autenticar');
              return false
            }
          };
   
 return (
    <AuthContext.Provider value={{userId, status, login, register, logout, validarEmail, iniciarConHuella}}>
        { children }
    </AuthContext.Provider>
 )
}

