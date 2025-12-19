import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Colors, Typography } from '@/constants/theme';
import { TopNavbar } from '@/components/TopNavbar';
import { SquarePen, MoreVertical, ArrowRight } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Note } from '@/types/database';

const colorMap = {
  'brown-300': Colors.text.brown[300],
  'blue-200': Colors.accent.blue[200],
  'orange-300': Colors.accent.orange[300],
  'green-300': Colors.extended.green[300],
};

export default function OrdersScreen() {
  const { user } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const [notes, setNotes] = useState<Note[]>([]);

  const CARD_MIN_WIDTH = 102;
  const PADDING = 16 * 2;
  const GAP = 10;

  const calculateColumns = () => {
    const availableWidth = screenWidth - PADDING;
    const threeColWidth = (availableWidth - GAP * 2) / 3;
    return threeColWidth >= CARD_MIN_WIDTH ? 3 : 2;
  };

  const calculateCardWidth = () => {
    const availableWidth = screenWidth - PADDING;
    const columns = calculateColumns();
    return (availableWidth - GAP * (columns - 1)) / columns;
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setNotes(data);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TopNavbar style={styles.navbar}>
          <Text style={styles.navbarTitle}>Notepad</Text>
          <View style={styles.navbarSpacer} />
          <TouchableOpacity style={styles.editButton}>
            <SquarePen size={14} color={Colors.neutrals[100]} />
          </TouchableOpacity>
        </TopNavbar>

        <View style={styles.ongoingSection}>
          <Text style={styles.sectionTitle}>Ongoing List</Text>

          <View style={styles.listItem}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg' }}
              style={styles.listImage}
            />
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Lucy's Shopping List</Text>
              <Text style={styles.listAvailable}>Available for next 10h 13 mins</Text>
              <Text style={styles.listDate}>25 July 2025</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={20} color={Colors.cta.black[300]} />
            </TouchableOpacity>
          </View>

          <View style={styles.listItem}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg' }}
              style={styles.listImage}
            />
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Lucy's Shopping List</Text>
              <Text style={styles.listAvailable}>Available for next 10h 13 mins</Text>
              <Text style={styles.listDate}>25 July 2025</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={20} color={Colors.cta.black[300]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notesSection}>
          <View style={styles.notesSectionHeader}>
            <Text style={styles.sectionTitle}>My Notes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notesGrid}>
            {notes.map((note) => (
              <View key={note.id} style={[styles.noteCard, { width: calculateCardWidth() }]}>
                <View style={[styles.noteCardTop, { backgroundColor: colorMap[note.color] }]} />
                <View style={styles.noteCardContent}>
                  <View />
                  <View style={styles.noteCardBottom}>
                    <Text style={styles.noteCardTitle} numberOfLines={2}>
                      {note.name}
                    </Text>
                    <TouchableOpacity style={styles.noteIconButton}>
                      <ArrowRight size={8} color={Colors.neutrals[100]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgrounds.normal,
    paddingTop: 52,
    paddingBottom: 62,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  navbar: {

    marginBottom: 24,
  },
  navbarTitle: {
    ...Typography.b1,

  },
  navbarSpacer: {
    flex: 1,
  },
  editButton: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ongoingSection: {
    backgroundColor: Colors.background.cream[100],
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    gap: 8,
  },
  sectionTitle: {
    ...Typography.b1,
    color: Colors.fonts.heading,

  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutrals[100],
    borderRadius: 4,
    padding: 12,
  },
  listImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    ...Typography.b1,
    color: Colors.fonts.heading,
    marginBottom: 4,
  },
  listAvailable: {
    ...Typography.b2Regular,
    color: Colors.semantic.red[300],
    marginBottom: 2,
  },
  listDate: {
    ...Typography.b2Regular,
    color: Colors.fonts.body,
  },
  moreButton: {
    padding: 4,
  },
  notesSection: {
    marginBottom: 100,
  },
  notesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    ...Typography.b1,
    color: Colors.accent.orange[300],
  },
  notesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  noteCard: {
    height: 93,
    backgroundColor: Colors.background.cream[100],
    borderRadius: 8,
    overflow: 'hidden',
  },
  noteCardTop: {
    height: 8,
  },
  noteCardContent: {
    padding: 12,
    minHeight: 80,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  noteCardBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },
  noteCardTitle: {
    ...Typography.l2Medium,
    color: Colors.fonts.heading,
    flex: 1,
  },
  noteIconButton: {
    backgroundColor: Colors.text.brown[300],
    width: 12,
    height: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
