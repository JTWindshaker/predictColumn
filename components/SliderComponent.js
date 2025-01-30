import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

export default function SliderComponent({ label, value, onChange, min, max }) {
    return (
        <View style={styles.sliderContainer}>
            <Text>{label}</Text>
            <Slider
                minimumValue={min}
                maximumValue={max}
                step={1}
                value={value}
                onValueChange={onChange}
            />
            <Text>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        marginBottom: 20,
    },
});
