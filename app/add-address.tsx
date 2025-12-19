import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressDots } from '@/components/ProgressDots';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-react-native';

const ADDRESS_TYPES = ['Home', 'Work', 'Other'];

export default function AddAddressScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const pincode = params.pincode as string;
  const city = params.city as string;

  const [flatHouseBuilding, setFlatHouseBuilding] = useState('');
  const [areaStreetBlock, setAreaStreetBlock] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState('Home');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!flatHouseBuilding || !areaStreetBlock) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('user_addresses').insert({
      user_id: user.id,
      name: user.user_metadata?.name || '',
      flat_house_building: flatHouseBuilding,
      area_street_block: areaStreetBlock,
      pincode: pincode,
      city: city,
      address_type: selectedAddressType.toLowerCase(),
      is_default: true,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.title}>Just one step before you go</Text>

          <View style={styles.form}>
            <Input
              placeholder="Flat, House no, Building, Apartment"
              value={flatHouseBuilding}
              onChangeText={setFlatHouseBuilding}
            />

            <Input
              placeholder="Area, Street, Block"
              value={areaStreetBlock}
              onChangeText={setAreaStreetBlock}
            />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Input
                  placeholder="Pincode"
                  value={pincode}
                  editable={false}
                  style={styles.disabledInput}
                />
              </View>
              <View style={styles.halfInput}>
                <Input
                  placeholder="City"
                  value={city}
                  editable={false}
                  style={styles.disabledInput}
                />
              </View>
            </View>

            <View style={styles.addressTypeSection}>
              <Text style={styles.addressTypeLabel}>Enter address type ex: home, work</Text>
              <View style={styles.addressTypeButtons}>
                {ADDRESS_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setSelectedAddressType(type)}
                    style={[
                      styles.addressTypeButton,
                      selectedAddressType === type && styles.addressTypeButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.addressTypeButtonText,
                        selectedAddressType === type && styles.addressTypeButtonTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Save and continue"
            onPress={handleSave}
            loading={loading}
            disabled={!flatHouseBuilding || !areaStreetBlock}
          />
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
    borderRadius: 18,
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
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  disabledInput: {
    backgroundColor: Colors.text.brown[300] + '0D',
    color: Colors.fonts.body,
  },
  addressTypeSection: {
    marginTop: 8,
  },
  addressTypeLabel: {
    ...Typography.b2,
    color: Colors.fonts.body,
    marginBottom: 12,
  },
  addressTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addressTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.fonts.body,
  },
  addressTypeButtonActive: {
    backgroundColor: Colors.components.activeInput,
    borderColor: Colors.components.activeInput,
  },
  addressTypeButtonText: {
    ...Typography.b2,
    color: Colors.fonts.body,
  },
  addressTypeButtonTextActive: {
    color: Colors.backgrounds.normal,
  },
  footer: {
    paddingTop: 20,
  },
});
