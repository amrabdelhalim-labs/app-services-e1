import { StyleSheet, Text, View } from 'react-native';

export default function DoctorsScreen() {
  return (
    <View style={styles.container}>
      <Text>صفحة الأطباء</Text>
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
