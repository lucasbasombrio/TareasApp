import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import SoloRegister from './screens/SoloRegister';
import { HomeScreen } from './screens/HomeScreen';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();


function AppNavigator(){
  const { status } = useContext(AuthContext)

return (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: 'white'
      }
    }}
  >
   
   {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SoloRegister" component={SoloRegister} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
        
      )}
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
 
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

    </AuthProvider>
  );
}




/* export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName='RegisterLogin'>
    <Stack.Screen name="RegisterLogin" component={RegisterLoginScreen}/>
    <Stack.Screen name="Home" component={HomeScreen}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
} */