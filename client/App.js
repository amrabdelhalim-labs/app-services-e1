import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import DoctorsScreen from './screens/Doctors';
import SignUpScreen from './screens/SignUp';
import SignInScreen from './screens/SignIn';
import ProfileScreen from './screens/Profile';
import useScript from './hooks/useScript';
import UpdateProfileScreen from './screens/UpdateProfile';
import { GOOGLE_API_KEY } from '@env';

const Stack = createNativeStackNavigator();

export default function App() {
  if (Platform.OS == "web") {
    useScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`)
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976D2'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'right'
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Doctors"
          component={DoctorsScreen}
          options={{ title: 'الاطباء' }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'تسجيل مستخدم جديد' }}
        />

        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'تسجيل الدخول' }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'الملف الشخصي' }}
        />

        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
          options={{ title: 'تعديل الملف الشخصي' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
