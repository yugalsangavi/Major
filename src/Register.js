import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!userType) {
      alert('Please select a user type.');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        `${phoneNumber}@dummy.com`,
        password
      );
      const user = userCredential.user;
      const userId = user.uid;

      await firestore()
        .collection(userType === 'Customer' ? 'customers' : 'vendors')
        .doc(userId)
        .set({
          phoneNumber,
          password,
          userType,
        });

      alert('Registration successful! Please add your details.');
      navigation.navigate('Detail', { uid: userId, userType });
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'Customer' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('Customer')}
        >
          <Text style={styles.userTypeText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'Vendor' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('Vendor')}
        >
          <Text style={styles.userTypeText}>Vendor</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FC', 
        padding: 20,
      },
 userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#E5E7EB', // Grey background for unselected buttons
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userTypeButtonActive: {
    backgroundColor: '#4F46E5', // Highlight color for active buttons
  },
  userTypeText: {
    color: '#333',
    fontWeight: '600',
  },
  userTypeTextActive: {
    color: '#FFF',
  },
  input: {
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
