import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MapPin, ArrowRight, Package } from 'lucide-react-native';
import type { UserAddress } from '@/types/database';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState<UserAddress | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_addresses')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_default', true)
          .maybeSingle();

        if (data) {
          setAddress(data);
        }
      }
    };

    fetchAddress();
  }, [user]);

  const suggestions = [
    'Prepare items for birthday',
    'Prepare items for birthday',
    'Prepare items for birthday',
    'Prepare items for birthday',
  ];

  const offers = [
    {
      id: 1,
      image: 'https://leaf-loaf.reelstudio.app/Offer-Image1.png',
      text: "Get 10% off on\nAunt Mary's\nartisnal breads",
    },
    {
      id: 2,
      image: 'https://leaf-loaf.reelstudio.app/Offer-Image2.png',
      text: "Get 10% off on\nAunt Mary's\nartisnal breads",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.addressContainer}>
          <View style={styles.locationIcon}>
            <MapPin size={16} color={Colors.fonts.heading} />
          </View>
          <View style={styles.addressText}>
            <Text style={styles.deliverTo}>Deliver to {address?.address_type || 'Home'}</Text>
            <Text style={styles.address} numberOfLines={1}>
              {address ? `${address.flat_house_building}, ${address.area_street_block}...` : 'Loading address...'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeMessage}>
          Hi {user?.user_metadata?.name || 'there'}, How can I assist with your groceries today?
        </Text>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => router.push('/product-item-demo')}
        >
          <Package size={20} color={Colors.accent.orange[200]} />
          <Text style={styles.demoButtonText}>View ProductItem Demo</Text>
          <ArrowRight size={20} color={Colors.accent.orange[200]} />
        </TouchableOpacity>

        <LinearGradient
          colors={Colors.backgrounds.gradient}
          style={styles.quickActionsContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={styles.quickActionsTitle}>Order extra letters</Text>

          <View style={styles.quickActionsGrid}>
            <View style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Talk to order</Text>
              <Image
                source={{ uri: 'https://leaf-loaf.reelstudio.app/talk-to-order.png' }}
                style={styles.quickActionImage}
                resizeMode="contain"
              />
              <TouchableOpacity style={styles.quickActionButton}>
                <ArrowRight size={20} color={Colors.fonts.buttonPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.quickActionCard}>
              <Text style={styles.quickActionTitle}>Scan to order</Text>
              <Image
                source={{ uri: 'https://leaf-loaf.reelstudio.app/scan-to-order.png' }}
                style={styles.quickActionImage}
                resizeMode="contain"
              />
              <TouchableOpacity style={styles.quickActionButton}>
                <ArrowRight size={20} color={Colors.fonts.buttonPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What would you like to do today?</Text>
          <View style={styles.tagsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsRow}>
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{suggestion}</Text>
                </View>
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsRow}>
              {suggestions.slice(2, 4).map((suggestion, index) => (
                <View key={index + 2} style={styles.tag}>
                  <Text style={styles.tagText}>{suggestion}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.petBanner}>
          <View style={styles.petBannerContent}>
            <Text style={styles.petBannerTitle}>Want to order food for your pet?</Text>
            <Text style={styles.petBannerDescription}>body copy</Text>
          </View>
          <Image
            source={{ uri: 'https://leaf-loaf.reelstudio.app/Pet-Food-Image.png' }}
            style={styles.petBannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll}>
            {offers.map((offer) => (
              <View key={offer.id} style={styles.offerCard}>
                <Text style={styles.offerText}>{offer.text}</Text>
                <Image
                  source={{ uri: offer.image }}
                  style={styles.offerImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.normal,
  },
  scrollContent: {
    paddingTop: 72,
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background.cream[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    flex: 1,
  },
  deliverTo: {
    ...Typography.b3,
    color: Colors.fonts.heading,
  },
  address: {
    ...Typography.b1,
    color: Colors.fonts.heading,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  welcomeMessage: {
    ...Typography.h5,
    color: Colors.fonts.heading,
    marginTop: 10,
    marginBottom: 20,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.cream[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.accent.orange[200],
  },
  demoButtonText: {
    ...Typography.b1,
    color: Colors.accent.orange[200],
    flex: 1,
    textAlign: 'center',
  },
  quickActionsContainer: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 24,
    height: 206,
  },
  quickActionsTitle: {
    ...Typography.h5,
    color: Colors.fonts.heading,
    marginBottom: 8,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 4,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Colors.background.cream[100],
    borderRadius: 12,
    minHeight: 166,
    position: 'relative',
  },
  quickActionTitle: {
    ...Typography.h5,
    color: Colors.fonts.blue,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  quickActionImage: {
    width: 107,
    height: 103,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  quickActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.components.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    bottom: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h5,
    color: Colors.fonts.heading,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  tagsRow: {
    flexGrow: 0,
  },
  tag: {
    backgroundColor: Colors.background.cream[100],
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tagText: {
    ...Typography.b1,
    color: Colors.fonts.heading,
  },
  petBanner: {
    backgroundColor: Colors.background.blue[100],
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 24,

  },
  petBannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  petBannerTitle: {
    ...Typography.h5,
    color: Colors.fonts.heading,
    marginBottom: 8,
  },
  petBannerDescription: {
    ...Typography.b3,
    color: Colors.fonts.heading,
  },
  petBannerImage: {
    width: 140,
    height: 140,
  },
  offersScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  offerCard: {
    backgroundColor: Colors.background.cream[100],
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    width: 160,
    height: 180,
    position: 'relative',
  },
  offerText: {
    ...Typography.b2,
    color: Colors.fonts.brown,
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
  },
  offerImage: {
    width: 148,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginLeft: 12,
  },
});
