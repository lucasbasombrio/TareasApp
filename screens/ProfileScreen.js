import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { userId, status } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (status === 'authenticated' && userId) { 
          const response = await fetch(`https://6657b1355c361705264597cb.mockapi.io/Usuario/${userId}`);
          const jsonData = await response.json();
          setUserData(jsonData);
        } else {
          console.warn('No active user found or not authenticated.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [status, userId]);

  if (isLoading) {
    return <Text>Loading user data...</Text>;
  }

  if (!userData) {
    return <Text>No active user found. Please log in.</Text>;
  }

    return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Datos del Usuario</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Nombre de usuario:</Text>
        <TextInput style={styles.textInput} value={userData.username} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Correo electrónico:</Text>
        <TextInput style={styles.textInput} value={userData.email} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>ID:</Text>
        <TextInput style={styles.textInput} value={userData.id} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
};

export default ProfileScreen;