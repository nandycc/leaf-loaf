import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function OpeningScreen() {
  const router = useRouter();
  const { session, loading, user } = useAuth();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const checkUserAddress = async () => {
      if (!loading && session && user) {
        setChecking(true);
        const { data, error } = await supabase
          .from('user_addresses')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        setChecking(false);

        if (data) {
          router.replace('/(tabs)');
        } else {
          router.replace('/pincode-check');
        }
      } else if (!loading && !session) {
        const timer = setTimeout(() => {
          router.push('/signup');
        }, 2500);
        return () => clearTimeout(timer);
      }
    };

    checkUserAddress();
  }, [session, loading, user]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://leaf-loaf.reelstudio.app/logo1.svg' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Weekly Essentials. Delivered.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.welcome,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  logo: {
    width: 98,
    height: 118,
  },
  subtitle: {
    ...Typography.h5,
    color: Colors.backgrounds.normal,
  },
});
