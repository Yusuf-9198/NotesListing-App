import { useState } from 'react';
import { View } from 'react-native';
import { NoteEditorScreen } from './NoteEditorScreen';
import { NotesListScreen } from './NotesListScreen';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export function AppContainer() {
  const [currentScreen, setCurrentScreen] = useState<'list' | 'editor'>('list');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setCurrentScreen('editor');
  };

  const handleSave = (title: string, content: string) => {
    setCurrentScreen('list');
    setSelectedNote(null);
  };

  const handleBack = () => {
    setCurrentScreen('list');
    setSelectedNote(null);
  };

  const handleCreate = () => {
    setSelectedNote(null);
    setCurrentScreen('editor');
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'list' ? (
        <NotesListScreen onNoteSelect={handleNoteSelect} onCreate={handleCreate} />
      ) : (
        <NoteEditorScreen
          onSave={handleSave}
          onBack={handleBack}
          initialTitle={selectedNote?.title}
          initialContent={selectedNote?.content}
        />
      )}
    </View>
  );
}
