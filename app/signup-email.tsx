import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressDots } from '@/components/ProgressDots';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, MoreHorizontal, SquareCheck, Square } from 'lucide-react-native';

export default function SignUpEmailScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "What's your email?",
      placeholder: 'Enter your email address',
    },
    {
      title: 'Password',
      placeholder: 'Enter your password',
    },
    {
      title: 'What should we call you?',
      placeholder: 'Enter your name',
    },
  ];

  const handleNext = async () => {
    if (step === 0) {
      if (!email) {
        Alert.alert('Error', 'Please enter your email');
        return;
      }
      if (!agreedToTerms) {
        Alert.alert('Error', 'Please agree to Terms of service and Privacy policy');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      if (!password) {
        Alert.alert('Error', 'Please enter your password');
        return;
      }
      if (!agreedToTerms) {
        Alert.alert('Error', 'Please agree to Terms of service and Privacy policy');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }

      setLoading(true);
      const { error } = await signUp(email, password, name);
      setLoading(false);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.push('/pincode-check');
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const getValue = () => {
    if (step === 0) return email;
    if (step === 1) return password;
    return name;
  };

  const setValue = (value: string) => {
    if (step === 0) setEmail(value);
    else if (step === 1) setPassword(value);
    else setName(value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <View style={styles.iconCircle}>
              <ChevronLeft size={12} color={Colors.fonts.buttonPrimary} />
            </View>
          </TouchableOpacity>

          <ProgressDots total={3} current={step} />

          <View style={styles.menuButton}>
            <MoreHorizontal size={0} color={Colors.fonts.heading} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{steps[step].title}</Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder={steps[step].placeholder}
              value={getValue()}
              onChangeText={setValue}
              keyboardType={step === 0 ? 'email-address' : 'default'}
              autoCapitalize={step === 2 ? 'words' : 'none'}
              secureTextEntry={step === 1}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Next"
            onPress={handleNext}
            loading={loading}
            disabled={step < 2 && !agreedToTerms}
          />

          {step < 2 && (
          <TouchableOpacity
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            style={styles.checkboxContainer}
            activeOpacity={0.8}
          >
            {agreedToTerms ? (
              <SquareCheck
                size={20}
                color={Colors.cta.black[500] + '80'}
                strokeWidth={2}
              />
            ) : (
              <Square
                size={20}
                color={Colors.cta.black[500] + '80'}
                strokeWidth={2}
              />
            )}
        
            <Text style={styles.checkboxText}>
              By continuing, I agree to Terms of service and acknowledge the Privacy policy
            </Text>
          </TouchableOpacity>
        )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.normal,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  backButton: {
    width: 40,
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: 16,
    backgroundColor: Colors.components.activeInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.h3,
    color: Colors.fonts.heading,
    marginBottom: 32,
  },
  inputContainer: {
    marginTop: 8,
  },
  footer: {
    gap: 16,
    paddingTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 26,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.fonts.body,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    borderColor: Colors.components.activeInput,
    backgroundColor: Colors.components.activeInput,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.backgrounds.normal,
  },
  checkboxText: {
    ...Typography.b2,
    color: Colors.fonts.body,
    flex: 1,
  },
});
