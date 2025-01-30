import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card } from 'react-native-paper';
import { getPrediction } from './utils/api';

export default function App() {
  const [ip, setIp] = useState('');
  const [savedIp, setSavedIp] = useState(null);
  const [sliders, setSliders] = useState({
    incidenciaPelvica: 60,
    inclinacionPelvica: 20,
    anguloLordosisLumbar: 55,
    pendienteSacra: 45,
    radioPelvico: 100,
    gradoEspondilolistesis: 25,
  });

  useEffect(() => {
    const loadIp = async () => {
      const storedIp = await AsyncStorage.getItem('serverIp');
      if (storedIp) setSavedIp(storedIp);
    };
    loadIp();
  }, []);

  const saveIp = async () => {
    if (ip) {
      await AsyncStorage.setItem('serverIp', ip);
      setSavedIp(ip);
    }
  };

  const changeIp = () => {
    setSavedIp(null);
    setIp('');
  };

  const resetSliders = () => {
    setSliders({
      incidenciaPelvica: 60,
      inclinacionPelvica: 20,
      anguloLordosisLumbar: 55,
      pendienteSacra: 45,
      radioPelvico: 100,
      gradoEspondilolistesis: 25,
    });
  };

  const handleSubmit = async () => {
    if (savedIp) {
      try {
        const response = await getPrediction(savedIp, sliders);
        if (response.prediccion === 0) {
          Alert.alert("¡Atención!", "El sistema predijo que tienes problemas de columna.", [
            { text: "Aceptar", onPress: resetSliders }
          ]);
        } else {
          Alert.alert("Todo normal", "Tu estado se encuentra normal.", [
            { text: "Aceptar", onPress: resetSliders }
          ]);
        }
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al obtener la predicción. Intenta nuevamente.");
      }
    } else {
      Alert.alert("Error", "Por favor ingresa la IP del servidor.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {!savedIp ? (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>¡Bienvenido!</Text>
              <Text style={styles.subtitle}>Ingresa la IP del servidor:</Text>
              <TextInput
                style={styles.input}
                placeholder="IP del servidor"
                value={ip}
                onChangeText={setIp}
                keyboardType="numeric"
              />
              <Button mode="contained" onPress={saveIp} style={styles.button}>Guardar IP</Button>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>IP Guardada: {savedIp}</Text>
              <Button mode="outlined" onPress={changeIp} style={styles.changeIpButton}>Cambiar IP</Button>
              <Text style={styles.subtitleFeatures}>Características:</Text>

              {Object.keys(sliders).map((key) => (
                <View key={key} style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
                  <Slider
                    minimumValue={key === 'incidenciaPelvica' ? 0 : key === 'inclinacionPelvica' ? -10 : 0}
                    maximumValue={key === 'incidenciaPelvica' ? 100 : key === 'inclinacionPelvica' ? 60 : key === 'gradoEspondilolistesis' ? 160 : 180}
                    step={1}
                    value={sliders[key] || 60}  // Asegúrate de que el valor nunca sea undefined o null
                    onValueChange={(value) => setSliders({ ...sliders, [key]: value })}
                    minimumTrackTintColor="#ff8c00"
                    maximumTrackTintColor="#e1e1e1"
                    thumbTintColor="#ff8c00"
                  />
                  <Text style={styles.sliderValue}>{sliders[key] || 60}</Text>
                </View>
              ))}

              <Button mode="contained" onPress={handleSubmit} style={styles.button}>Predecir</Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 50,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  subtitleFeatures: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    marginTop:30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 10,
    height: "auto",
  },
  changeIpButton: {
    marginTop: 10,
    height: "auto",
    alignSelf: 'flex',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#333',
  },
  sliderValue: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});
