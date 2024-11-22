import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { uid, userType } = route.params;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const saveDetails = async () => {
    try {
      const collection = userType === 'Customer' ? 'customers' : 'vendors';
      await firestore().collection(collection).doc(uid).set(
        { name, address },
        { merge: true }
      );

      alert('Details saved successfully!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving details:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TouchableOpacity onPress={saveDetails} style={styles.button}>
        <Text style={styles.buttonText}>Save Details</Text>
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
