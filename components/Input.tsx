import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Typography } from '@/constants/theme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        {...props}
        style={[
          styles.input,
          style,
          isFocused && styles.inputFocused,
          error && styles.inputError, // error wins
        ]}
        underlineColorAndroid="transparent" // ✅ FIX
        placeholderTextColor={Colors.fonts.body}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...Typography.b2,
    color: Colors.fonts.heading,
    marginBottom: 8,
  },
  input: {
    ...Typography.b1,
    color: Colors.fonts.body,
    backgroundColor: Colors.backgrounds.normal,
    borderWidth: 1,
    borderColor: Colors.text.brown[300] + '33',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  inputFocused: {
    borderColor: Colors.components.activeInput,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.semantic.red[200],
    borderWidth: 2,
  },
  errorText: {
    ...Typography.b3,
    color: Colors.semantic.red[200],
    marginTop: 4,
  },
});
