import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '@/constants/theme';

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <Text style={styles.subtitle}>Your notes will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.normal,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 96,
  },
  title: {
    ...Typography.h2,
    color: Colors.fonts.heading,
    marginBottom: 16,
  },
  subtitle: {
    ...Typography.b1,
    color: Colors.fonts.body,
  },
});
