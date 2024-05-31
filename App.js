import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterLoginScreen from './screens/RegisterLoginScreen';
import { HomeScreen } from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="RegisterLogin" component={RegisterLoginScreen}/>
    <Stack.Screen name="Home" component={HomeScreen}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
}