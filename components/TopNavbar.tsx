import React from 'react';
import { View, StyleSheet, ImageBackground, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

type TopNavbarProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function TopNavbar({ children, style }: TopNavbarProps) {
  return (
    <ImageBackground
      source={{ uri: 'https://leaf-loaf.reelstudio.app/Navbar%20BG.png' }}
      style={[styles.navbar, style]}
      imageStyle={styles.navbarBackground}
    >
      <BlurView intensity={20} style={styles.blurLayer} />
      <View style={styles.darkOverlay} />
      <View style={styles.contentWrapper}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  navbar: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(245, 239, 232, 0.3)',
  },
  navbarBackground: {
    ...StyleSheet.absoluteFillObject,
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
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },
});
