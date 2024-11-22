import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        `${phoneNumber}@dummy.com`,
        password
      );
      const user = userCredential.user;
      const userId = user.uid;

      let userType = '';
      const customerDoc = await firestore().collection('customers').doc(userId).get();
      if (customerDoc.exists) {
        userType = 'Customer';
      } else {
        const vendorDoc = await firestore().collection('vendors').doc(userId).get();
        if (vendorDoc.exists) {
          userType = 'Vendor';
        }
      }

      if (!userType) {
        alert('User type not found. Please register first.');
        return;
      }

      navigation.navigate('Dashboard', { userType, userId });
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC', // Light background color for a modern feel
    padding: 20,
  },input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFF',
    borderColor: '#D1D5DB', // Light grey border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Light shadow effect
  },
  button: {
    width: '90%',
    backgroundColor: '#4F46E5', // Modern blue
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Slight elevation for depth
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
