import { ScrollView, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Input, Text, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/authStyles';
import ProfileForm from '../components/ProfileForm';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Alert from '../components/Alert';


export default function SignUpScreen(Props) {
  const { navigation } = Props;

  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({ type: '', title: '', message: '' });

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
    setLoading(true);
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
      setLoading(false);
      setAlert({
        type: 'question',
        title: 'تم انشاء الحساب',
        message: 'هل ترغب في تسجيل الدخول الآن؟'
      });
      setVisible(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert({
        type: 'alert',
        title: 'حدث خطأ',
        message: error.response?.data?.errors?.[0]?.message || error.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب'
      });
      setVisible(true);
    }
  };

  return (
    <ScrollView>
      <Loader loading={loading} title="جاري انشاء الحساب..." />
      <Alert
        visible={visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setVisible(false)}
        onClick={() => {
          navigation.navigate('SignIn');
        }}
      />

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