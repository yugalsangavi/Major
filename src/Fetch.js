import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';

export default function Fetch() {
  const [userData, setUserData] = useState(null);
  const route = useRoute();
  const { userType } = route.params; // Get userType passed from Dashboard.js

  // Fetch user data from Firestore when the component is mounted
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser; // Get current user
        if (currentUser) {
          const collection = userType === "Vendor" ? "vendors" : "customers"; // Choose the correct collection
          const userDocument = await firestore()
            .collection(collection)
            .doc(currentUser.uid) // Use the user's UID to fetch their data
            .get();

          if (userDocument.exists) {
            setUserData(userDocument.data()); // Set the user data from Firestore
          } else {
            console.log("No user document found.");
          }
        } else {
          console.log("No current user logged in.");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, [userType]);

  // Display user details
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Details:</Text>
      {userData ? (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Name: {userData.name || "N/A"}</Text>
          <Text style={styles.subText}>Date of Birth: {userData.dob || "N/A"}</Text>
          <Text style={styles.subText}>Address: {userData.address || "N/A"}</Text>
          <Text style={styles.subText}>Phone Number: {userData.phoneNumber || "N/A"}</Text>
        </View>
      ) : (
        <Text style={styles.noDataText}>No user data available</Text>
      )}
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
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
