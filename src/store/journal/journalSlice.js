import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    saveMessage: "",
    notes: [],
    currentNote: null,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
      state.saveMessage = "";
    },

    setImageUrlsToCurrentNote: (state, action) => {
      state.currentNote.imageUrls = [
        ...state.currentNote.imageUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.saveMessage = "";
    },

    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.saveMessage = `${
        action.payload.title.length === 0
          ? "(Untitled note)"
          : action.payload.title
      } successfully updated`;
    },

    deleteNoteById: (state, action) => {
      state.isSaving = false;
      state.currentNote = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.saveMessage = "";
      state.notes = [];
      state.currentNote = null;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setCurrentNote,
  setImageUrlsToCurrentNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
