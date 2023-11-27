import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';

export default function App() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [classification, setClassification] = useState(null);

  const handleWeight = (value) => {
    if (value.length > 0)
      setWeight(Number(value))
  }

  const handleHeight = (value) => {
    if (value.length > 0)
      setHeight(Number(value))
  }

  const calculateBmi = () => {
    if (weight && height) {
      const result = (weight / (height * height)) * 10000
      setBmi(result)
    }
  }

  const toRank = () => {
    if (bmi < 18.5)
      setClassification('Underweight');
    else if (bmi < 25)
      setClassification('Normal');
    else if (bmi < 30)
      setClassification('Overweight');
    else if (bmi < 35)
      setClassification('Obese class 1');
    else if (bmi < 40)
      setClassification('Obese calss 2');
    else
      setClassification('Obese class 3')
  }

  useEffect(() => {
    toRank();
  }, [bmi])

  const clear = () => {
    setWeight(null);
    setHeight(null);
    setBmi(null);
    setClassification(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BMI Calculator</Text>
      </View>
      <View style={styles.inputArea}>
        <View style={styles.icon}>
          <FontAwesome5 name='weight' size={36} color='black' />
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder='kg'
            keyboardType='numeric'
            onChangeText={(value) => handleWeight(value)}
          />
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='human-male-height' size={36} color='black' />
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder='cm'
            keyboardType='numeric'
            onChangeText={(value) => handleHeight(value)}
          />
        </View>
      </View>
      <View style={styles.result}>
        {bmi == null ? (
          <TouchableOpacity style={styles.button} onPress={calculateBmi} disabled={(weight == null || height == null) ? true : false}>
            <Text style={styles.btnText}>Calculate</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={clear}>
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>
        )}
        {(bmi != null && classification != '') && (
          <View style={styles.resultArea}>
            <Text style={styles.resultTextTitle}>Your BMI</Text>
            <Text style={styles.resultText}>{bmi.toFixed(2)}</Text>
            <Text style={styles.resultTextTitle}>Classification</Text>
            <Text style={styles.resultText}>{classification}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  inputArea: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    top: 8
  },
  icon: {
    flex: 0.5,
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    top: 24
  },
  input: {
    top: 48,
    width: 100,
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 1
  },
  result: {
    flex: 0.4,
    alignItems: 'center',
    top: 16
  },
  button: {
    width: 150,
    backgroundColor: '#3DDC84',
    borderRadius: 25,
    padding: 8
  },
  btnText: {
    fontSize: 24,
    textAlign: 'center'
  },
  resultArea: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    top: 36
  },
  resultTextTitle: {
    fontSize: 24,
    top: 36,
    fontWeight: 'bold'
  }
});