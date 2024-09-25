import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const nameValue = await AsyncStorage.getItem('name');
      const cityValue = await AsyncStorage.getItem('city');
      setName(nameValue || "");
      setCity(cityValue || "");
    };

    loadData();
  }, []);

  const handlePress = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('city', city);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.text}>City: {city}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});