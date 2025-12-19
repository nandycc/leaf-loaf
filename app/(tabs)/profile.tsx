import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { TopNavbar } from '@/components/TopNavbar';
import {
  ChevronLeft,
  Package,
  User,
  MapPin,
  Users,
  Percent,
  Bell,
  Info,
  Phone,
  HelpCircle,
  LockOpen,
  ChevronRight,
} from 'lucide-react-native';

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
};

const MenuItem = ({ icon, label, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.menuItemText}>{label}</Text>
    </View>
    <ChevronRight size={20} color={Colors.accent.orange[300]} />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  const userName = user?.user_metadata?.name || 'User';

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TopNavbar style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color={Colors.fonts.heading} />
            </TouchableOpacity>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </TopNavbar>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Your Information</Text>
          <View style={styles.sectionContainer}>
            <MenuItem
              icon={<Package size={12} color={Colors.accent.orange[300]} />}
              label="Your orders"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<User size={12} color={Colors.accent.orange[300]} />}
              label="Profile Information"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<MapPin size={12} color={Colors.accent.orange[300]} />}
              label="Address Book"
              onPress={() => router.push('/add-address')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Users size={12} color={Colors.accent.orange[300]} />}
              label="Referrals"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Percent size={12} color={Colors.accent.orange[300]} />}
              label="Coupons"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Bell size={12} color={Colors.accent.orange[300]} />}
              label="Notification Preferences"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Support & Help center</Text>
          <View style={styles.sectionContainer}>
            <MenuItem
              icon={<Info size={12} color={Colors.accent.orange[300]} />}
              label="About us"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Phone size={12} color={Colors.accent.orange[300]} />}
              label="Contact Us"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<HelpCircle size={12} color={Colors.accent.orange[300]} />}
              label="Help & Feedback"
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<LockOpen size={12} color={Colors.accent.orange[300]} />}
              label="Privacy Policy"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.normal,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 180,
  },
  header: {},
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  userName: {
    ...Typography.h5,
    color: Colors.fonts.heading,
  },
  section: {
    marginTop: 24,
  },
  sectionHeading: {
    ...Typography.b2Regular,
    color: `${Colors.fonts.heading}80`,
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionContainer: {
    backgroundColor: Colors.background.cream[100],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accent.orange[300] + '1A',
    paddingVertical: 24,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: Colors.accent.orange[300] + '1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    ...Typography.b2Regular,
    color: Colors.fonts.heading,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.fonts.heading}1A`,
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.semantic.red[200],
    borderRadius: 4,
    width: 210,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoutText: {
    ...Typography.b2,
    color: Colors.semantic.red[200],
  },
});
