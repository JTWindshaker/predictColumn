import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
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

  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredictionDone, setIsPredictionDone] = useState(false);

  useEffect(() => {
    const loadIp = async () => {
      const storedIp = await AsyncStorage.getItem('serverIp');
      if (storedIp) setSavedIp(storedIp);
    };
    loadIp();
  }, []);

  const saveIp = async () => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (ipRegex.test(ip)) {
      await AsyncStorage.setItem('serverIp', ip);
      setSavedIp(ip);
    } else {
      Alert.alert("Error", "El formato de la IP es incorrecto. Por favor ingresa una IP válida.");
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
      setLoading(true);

      try {
        const response = await getPrediction(savedIp, sliders);

        if (response.prediccion === 0) {
          setPredictionResult({
            message: "¡Atención!",
            description: "El sistema predijo que tienes problemas de columna.",
            image: require('./assets/problem_image.png'),
          });
        } else {
          setPredictionResult({
            message: "Todo normal",
            description: "Tu estado se encuentra normal.",
            image: require('./assets/normal_image.png'),
          });
        }
        setIsPredictionDone(true);
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al obtener la predicción. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Error", "Por favor ingresa la IP del servidor.");
    }
  };

  const handleBackToPrediction = () => {
    setIsPredictionDone(false);
    setPredictionResult(null);
    resetSliders();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Predict Column</Text>
      </View>

      {!isPredictionDone ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {!savedIp ? (
            <Card style={styles.cardHome}>
              <Card.Content>
                <Image source={require('./assets/homeImage.jpg')} style={styles.imageHome} />
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
                <View style={styles.ipContainer}>
                  <Text style={[styles.titleHome]}>
                    IP Guardada: <Text style={styles.savedIpText}>{savedIp}</Text>
                  </Text>
                  <Button
                    mode="outlined"
                    onPress={changeIp}
                    style={styles.changeIpButton}
                    contentStyle={styles.changeIpButtonContent}
                  >
                    <Icon name="pencil" size={20} color="#FF8C00" />
                  </Button>
                </View>

                <Text style={styles.subtitleFeatures}>Características:</Text>

                {Object.keys(sliders).map((key) => (
                  <View key={key} style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>

                    <Slider
                      minimumValue={key === 'incidenciaPelvica' ? 0 : key === 'inclinacionPelvica' ? -10 : 0}
                      maximumValue={key === 'incidenciaPelvica' ? 100 : key === 'inclinacionPelvica' ? 60 : key === 'gradoEspondilolistesis' ? 160 : 180}
                      step={1}
                      value={sliders[key] || 0}
                      onValueChange={(value) => setSliders({ ...sliders, [key]: value })}
                      minimumTrackTintColor="#ff8c00"
                      maximumTrackTintColor="#e1e1e1"
                      thumbTintColor="#ff8c00"
                    />
                    <Text style={styles.sliderValue}>{sliders[key] || 0}</Text>
                  </View>
                ))}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.button}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator animating={true} color="#ffffff" /> : 'Predecir'}
                </Button>
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      ) : (
        <View style={styles.resultView}>
          <Image source={predictionResult?.image} style={styles.resultImage} />
          <Text style={styles.resultMessage}>{predictionResult?.message}</Text>
          <Text style={styles.resultDescription}>{predictionResult?.description}</Text>
          <Button mode="contained" onPress={handleBackToPrediction} style={styles.button}>Volver a predecir</Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 40,
  },
  topBar: {
    backgroundColor: '#FF8C00',
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 0,
    padding: 0,
    margin: 0,
    backgroundColor: '#ffffff',
    shadowColor: '#FFF',
    elevation: 0,
  },
  cardHome: {
    justifyContent: 'center',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    backgroundColor: '#ffffff',
    shadowColor: '#FFF',
    elevation: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  titleHome: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
    margin: 0,
  },
  savedIpText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  ipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  changeIpButton: {
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  changeIpButtonContent: {
    margin: 0,
    padding: 0,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  subtitleFeatures: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
    marginTop: 20,
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
    backgroundColor: '#FF8C00',
    height: "auto",
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#333',
  },
  sliderValue: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    fontWeight: '500',
    marginTop: 5,
  },
  resultView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  resultMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  resultDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  imageHome: {
    objectFit: 'cover',
    width: 250,
    height: 250,
    borderRadius: 100,
    marginBottom: 10,
    marginHorizontal: 'auto',
    borderWidth: 5,
    borderColor: '#fff',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});