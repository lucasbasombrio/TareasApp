import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state for better UX

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const activeUserId = await getActiveUserId();

        if (activeUserId) {
          const response = await fetch(`https://6657b1355c361705264597cb.mockapi.io/Usuario/${activeUserId}`);
          const jsonData = await response.json();
          setUserData(jsonData);
        } else {
          // Handle case where no active user is found (e.g., not logged in)
          console.warn('No active user found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <Text>Loading user data...</Text>;
  }

  if (!userData) {
    return <Text>No active user found. Please log in.</Text>; // Informative message
  }

  return (
    <View>
      <Text>Nombre de usuario: {userData.username}</Text>
      <Text>Correo electrónico: {userData.email}</Text>
      {/* Display other user data as needed */}
    </View>
  );
};

const getActiveUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('activeUserId');
    return userId;
  } catch (error) {
    console.error('Error retrieving active user ID:', error);
    return null;
  }
};



export default ProfileScreen;