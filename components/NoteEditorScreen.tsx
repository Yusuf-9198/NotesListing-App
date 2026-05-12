import { Colors } from '@/constants/colors';
import { useResponsive } from '@/hooks/useResponsive';
import React, { useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
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
  const colorScheme = useColorScheme();
  const { containerPadding } = useResponsive();

  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

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
        <ImageBackground
          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' }}
          style={[styles.header, { backgroundColor: colors.primary }]}
        >
          <View style={[styles.headerContent, { paddingHorizontal: containerPadding }]}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                styles.headerButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                ← Back
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.headerButton,
                styles.saveButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={[styles.buttonText, { color: colors.background }]}>
                Save
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

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
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    paddingHorizontal: 16,
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
    minHeight: 400,
  },
});

const styles = StyleSheet.flatten([baseStyles]);
