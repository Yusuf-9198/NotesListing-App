import { useResponsive } from '@/hooks/useResponsive';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface NoteEditorScreenProps {
  onSave?: (title: string, content: string) => void;
  onBack?: () => void;
  initialTitle?: string;
  initialContent?: string;
}

export function NoteEditorScreen({
  onSave,
  onBack,
  initialTitle = '',
  initialContent = '',
}: NoteEditorScreenProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { colors } = useTheme();
  const { containerPadding } = useResponsive();

  const handleSave = () => {
    onSave?.(title, content);
  };

  const handleBack = () => {
    onBack?.();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={[styles.headerContent, { paddingHorizontal: containerPadding }]}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                styles.iconButton,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </Pressable>
            <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Edit Note</Text>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.savePill,
                { opacity: pressed ? 0.95 : 1, backgroundColor: colors.background },
              ]}
            >
              <Text style={[styles.saveText, { color: colors.primary }]}>Save</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.content, { paddingHorizontal: containerPadding }]}>
            <TextInput
              style={[
                styles.titleInput,
                {
                  color: colors.text,
                  borderBottomColor: colors.border,
                },
              ]}
              placeholder="Note Title"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <TextInput
              style={[
                styles.contentInput,
                {
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Write your note here..."
              placeholderTextColor={colors.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
              scrollEnabled={false}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const baseStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingVertical: 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 64,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  savePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 320,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
});

const styles = StyleSheet.flatten([baseStyles]);
