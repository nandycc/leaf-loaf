import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressDots } from '@/components/ProgressDots';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, MoreHorizontal } from 'lucide-react-native';

export default function PincodeCheckScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);

  const handleCheckDelivery = async () => {
    if (!pincode) {
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('available_pincodes')
      .select('*')
      .eq('pincode', pincode)
      .maybeSingle();

    setLoading(false);

    if (data) {
      router.push({
        pathname: '/add-address',
        params: { pincode: pincode, city: data.city },
      });
    } else {
      setShowUnavailableModal(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleTryAnotherPincode = () => {
    setShowUnavailableModal(false);
    setPincode('');
  };

  const handleGoToSignup = async () => {
    await signOut();
    router.replace('/signup');
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

          <ProgressDots total={3} current={2} />

          <View style={styles.menuButton}>
            <MoreHorizontal size={20} color={Colors.fonts.heading} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            We're only delivering at selected pincodes right now
          </Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Enter pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={5}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Check delivery"
            onPress={handleCheckDelivery}
            loading={loading}
            disabled={!pincode}
          />
          <TouchableOpacity onPress={handleGoToSignup} style={styles.debugButton}>
            <Text style={styles.debugButtonText}>Go to signup page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showUnavailableModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUnavailableModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalImageContainer}>
              <Image
                source={{ uri: 'https://leaf-loaf.reelstudio.app/Image%20Placeholder.png' }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.modalTitle}>
              We're working hard to come to your doorstep
            </Text>

            <Text style={styles.modalSubtitle}>
              We haven't reached your doorstep yet, but the first to get notified when we start delivering here!
            </Text>

            <View style={styles.modalButtons}>
              <Button
                title="Use another pincode"
                onPress={handleTryAnotherPincode}
                variant="primary"
              />

              <TouchableOpacity
                onPress={() => setShowUnavailableModal(false)}
                style={styles.exitButton}
              >
                <Text style={styles.exitButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: 0,
    opacity: 0,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.h4,
    color: Colors.fonts.heading,
    marginBottom: 32,
  },
  inputContainer: {
    marginTop: 8,
  },
  footer: {
    paddingTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.neutrals[200],
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalImageContainer: {
    marginBottom: 24,
    width: 150,
    height: 150,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalTitle: {
    ...Typography.h4,
    color: Colors.fonts.heading,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalSubtitle: {
    ...Typography.b1,
    color: Colors.fonts.body,
    textAlign: 'center',
    marginBottom: 32,
  },
  modalButtons: {
    width: '100%',
    gap: 12,
  },
  exitButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  exitButtonText: {
    ...Typography.b1,
    color: Colors.fonts.heading,
  },
  debugButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  debugButtonText: {
    ...Typography.b2,
    color: Colors.fonts.body,
    textDecorationLine: 'underline',
  },
});
