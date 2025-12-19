import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { Home, StickyNote, User } from 'lucide-react-native';
import { Colors, Typography } from '@/constants/theme';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const icons = {
    index: Home,
    notes: StickyNote,
    profile: User,
  };

  const labels = {
    index: 'Home',
    notes: 'Notes',
    profile: 'Profile',
  };

  return (
    <View style={styles.tabBarContainer}>
      <ImageBackground
        source={{ uri: 'https://leaf-loaf.reelstudio.app/Navbar%20BG.png' }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <BlurView intensity={20} style={styles.blurLayer} />
        <View style={styles.darkOverlay} />
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const Icon = icons[route.name as keyof typeof icons];
            const label = labels[route.name as keyof typeof labels];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                style={styles.tabItem}
              >
                <View style={styles.tabContent}>
                  <Icon
                    size={24}
                    color={isFocused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}
                    strokeWidth={isFocused ? 2.5 : 2}
                  />
                  {isFocused && (
                    <Text style={styles.tabLabel}>{label}</Text>
                  )}
                  {isFocused && <View style={styles.activeIndicator} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 66,
    left: 16,
    right: 16,
    height: 82,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245, 239, 232, 0.3)',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    opacity: 1,
  },
  blurLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
    paddingBottom: 8,
  },
  tabLabel: {
    ...Typography.b2,
    color: '#FFFFFF',
    marginTop: 2,
  },
  activeIndicator: {
    width: 12,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: 'absolute',
    bottom: 0,
  },
});