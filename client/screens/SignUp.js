import { ScrollView, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Input, Text, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/authStyles';
import ProfileForm from '../components/ProfileForm';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function SignUpScreen(Props) {
  const { navigation } = Props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      };

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleSignUp = async (values) => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      isDoctor: values.isDoctor,
      specialization: values.specialization,
      workHours: values.workHours,
      phone: values.phone,
      address: values.address,
      location: {
        latitude: location ? location.latitude : null,
        longitude: location ? location.longitude : null
      }
    };

    try {
      const response = await axios.post(SIGNUP_URL, body);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Icon
          raised
          name="user"
          type="font-awesome"
          color="#f50"
          size={50}
        />
        <Text h4>انشاء حساب جديد</Text>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.container}>
            <ProfileForm submit={handleSignUp} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};