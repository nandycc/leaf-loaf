import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '@/constants/theme';
import { Button } from '@/components/Button';

export default function SignUpScreen() {
  const router = useRouter();

  const handleEmailSignUp = () => {
    router.push('/signup-email');
  };

  const handleAppleSignUp = () => {
    console.log('Sign up with Apple');
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <LinearGradient
      colors={Colors.backgrounds.gradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://leaf-loaf.reelstudio.app/logo2.svg' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Let's get started</Text>

          <View style={styles.buttonGroup}>
            <Button
              title="Continue with email"
              onPress={handleEmailSignUp}
              variant="primary"
            />

            <Button
              title="Continue with Apple"
              onPress={handleAppleSignUp}
              variant="secondary"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Continue with Google"
              onPress={handleGoogleSignUp}
              variant="secondary"
            />
          </View>

          <TouchableOpacity onPress={handleSignIn} style={styles.signInLink}>
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInTextBold}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 87,
    height: 45,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.h3,
    color: Colors.fonts.heading,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonGroup: {
    gap: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.text.brown[300] + '33',
  },
  dividerText: {
    ...Typography.b2,
    color: Colors.fonts.body,
    marginHorizontal: 16,
  },
  signInLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  signInText: {
    ...Typography.b1,
    color: Colors.fonts.body,
  },
  signInTextBold: {
    ...Typography.b1,
    color: Colors.fonts.heading,
    fontFamily: 'Poppins-Medium',
  },
});
