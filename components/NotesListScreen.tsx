import { useResponsive } from '@/hooks/useResponsive';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
  onCreate?: () => void;
}

export function NotesListScreen({ onNoteSelect, onCreate }: NotesListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();
  const { containerPadding, spacing } = useResponsive();

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
          backgroundColor: colors.surface ?? colors.backgroundSecondary,
          opacity: pressed ? 0.96 : 1,
          shadowColor: colors.cardShadow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 14,
          elevation: 6,
          transform: pressed ? [{ scale: 0.997 }] : [{ scale: 1 }],
        },
      ]}
    >
      <View style={styles.noteHeader}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, { color: colors.background }]}>{note.title.charAt(0)}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[styles.noteTitleText, { color: colors.text }]}>{note.title}</Text>
          <Text style={[styles.noteDate, { color: colors.textSecondary }]}>{note.date}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
      <Text style={[styles.notePreview, { color: colors.textSecondary }]} numberOfLines={2}>
        {note.content}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingHorizontal: containerPadding }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Notes</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {filteredNotes.length} notes
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.headerSmall, { color: colors.textSecondary }]}>Search</Text>
        </View>
      </View>

      <View style={[styles.searchContainer, { paddingHorizontal: containerPadding }]}>
          <View style={[styles.searchBox, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
            <Ionicons name="search" size={18} color={colors.textSecondary} style={{ marginLeft: 12 }} />
            <TextInput
              style={[
                styles.searchInput,
                {
                  color: colors.text,
                },
              ]}
              placeholder="Search notes..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
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
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={() => onCreate?.()}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
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
  headerRight: {
    alignItems: 'flex-end',
  },
  headerSmall: {
    fontSize: 12,
    opacity: 0.9,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    paddingVertical: 8,
  },
  noteCard: {
    borderRadius: 14,
    padding: 18,
    marginVertical: 6,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

// Use baseStyles directly
const styles = baseStyles;
