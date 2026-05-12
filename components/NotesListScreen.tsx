import { Colors } from '@/constants/colors';
import { useResponsive } from '@/hooks/useResponsive';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Project Planning',
    content: 'Plan the new feature for next sprint. Include wireframes and user stories...',
    date: 'Today',
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: 'Discussed project timeline and deliverables. Action items assigned to team members...',
    date: 'Yesterday',
  },
  {
    id: '3',
    title: 'Ideas',
    content: 'New app concept for productivity. Could integrate with existing tools...',
    date: '3 days ago',
  },
  {
    id: '4',
    title: 'Learning Resources',
    content: 'React Native optimization tips. Check out performance monitoring tools...',
    date: '1 week ago',
  },
  {
    id: '5',
    title: 'Travel Plans',
    content: 'Summer trip itinerary. Book flights and accommodations for the family vacation...',
    date: '2 weeks ago',
  },
];

interface NotesListScreenProps {
  onNoteSelect?: (note: Note) => void;
}

export function NotesListScreen({ onNoteSelect }: NotesListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const colorScheme = useColorScheme();
  const { containerPadding, spacing } = useResponsive();

  const colors = isDarkMode ? Colors.dark : Colors.light;

  const filteredNotes = useMemo(() => {
    return sampleNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const NoteCard = ({ note }: { note: Note }) => (
    <Pressable
      onPress={() => onNoteSelect?.(note)}
      style={({ pressed }) => [
        styles.noteCard,
        {
          backgroundColor: colors.backgroundSecondary,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.noteHeader}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.noteTitleText,
              { color: colors.text },
            ]}
          >
            {note.title}
          </Text>
          <Text
            style={[
              styles.noteDate,
              { color: colors.textSecondary },
            ]}
          >
            {note.date}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.notePreview,
          { color: colors.textSecondary },
        ]}
        numberOfLines={2}
      >
        {note.content}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingHorizontal: containerPadding }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Notes
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {filteredNotes.length} notes
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#ccc', true: '#555' }}
        />
      </View>

      <View style={[styles.searchContainer, { paddingHorizontal: containerPadding }]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.backgroundSecondary,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Search notes..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={(item) => item.id}
        scrollIndicatorInsets={{ right: 1 }}
        contentContainerStyle={{
          paddingHorizontal: containerPadding,
          paddingVertical: spacing,
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No notes found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    paddingVertical: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  noteCard: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noteTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  noteDate: {
    fontSize: 13,
    marginTop: 4,
  },
  notePreview: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  emptyText: {
    fontSize: 16,
  },
});

const styles = StyleSheet.compose(
  baseStyles,
  StyleSheet.create({
    noteCard: {
      ...baseStyles.noteCard,
      borderRadius: 12,
    },
  })
);
