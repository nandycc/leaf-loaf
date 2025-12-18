import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async () => {
    if (!showEmailForm) {
      setShowEmailForm(true);
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      const { data: addressData } = await supabase
        .from('user_addresses')
        .select('id')
        .eq('user_id', session.session.user.id)
        .maybeSingle();

      setLoading(false);

      if (addressData) {
        router.replace('/(tabs)');
      } else {
        router.replace('/pincode-check');
      }
    } else {
      setLoading(false);
      router.replace('/(tabs)');
    }
  };

  const handleAppleSignIn = () => {
    console.log('Sign in with Apple');
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  };

  const handleSignUp = () => {
    router.back();
  };

  if (showEmailForm) {
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
            <Text style={styles.title}>Welcome back</Text>

            <View style={styles.inputGroup}>
              <Input
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Button
                title="Sign in"
                onPress={handleEmailSignIn}
                loading={loading}
              />
            </View>

            <TouchableOpacity onPress={handleSignUp} style={styles.signUpLink}>
              <Text style={styles.signUpText}>
                Don't have an account? <Text style={styles.signUpTextBold}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

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
          <Text style={styles.title}>Welcome back</Text>

          <View style={styles.buttonGroup}>
            <Button
              title="Sign in with Email"
              onPress={handleEmailSignIn}
              variant="primary"
            />

            <Button
              title="Sign in with Apple"
              onPress={handleAppleSignIn}
              variant="secondary"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Sign in with Google"
              onPress={handleGoogleSignIn}
              variant="secondary"
            />
          </View>

          <TouchableOpacity onPress={handleSignUp} style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpTextBold}>Sign up</Text>
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
  inputGroup: {
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
  signUpLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  signUpText: {
    ...Typography.b1,
    color: Colors.fonts.body,
  },
  signUpTextBold: {
    ...Typography.b1,
    color: Colors.fonts.heading,
    fontFamily: 'Poppins-Medium',
  },
});
