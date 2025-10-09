import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function HomeScreen(Props) {
  const { navigation } = Props;

  return (
    <View style={styles.container}>
      <Text>الصفحة الرئيسية</Text>
      <Button title="صفحة الاطباء" onPress={() => navigation.navigate('Doctors')} />
      <Button title="صفحة تسجيل مستخدم جديد" onPress={() => navigation.navigate('SignUp')} />
      <Button title="صفحة تسجيل الدخول" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
