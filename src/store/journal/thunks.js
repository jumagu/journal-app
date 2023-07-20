import { FirebaseDB } from "../../firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";

import { fileUpload, fileDelete, loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setCurrentNote,
  setImageUrlsToCurrentNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startCreatingNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setCurrentNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User ID doesn't exists");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    if (!uid) throw new Error("User ID doesn't exists");

    const { currentNote } = getState().journal;

    const noteToFirestore = { ...currentNote };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${currentNote.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(currentNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const cloudinaryUrls = await Promise.all(fileUploadPromises);

    dispatch(setImageUrlsToCurrentNote(cloudinaryUrls));

    dispatch(startSavingNote());
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { currentNote } = getState().journal;

    const publicIdsArray = currentNote.imageUrls.map((url) => {
      const imgId = "journal-app/" + url.split("/").pop().split(".")[0];

      return imgId;
    });

    const fileDeletePromises = [];

    for (const id of publicIdsArray) {
      fileDeletePromises.push(fileDelete(id));
    }

    await Promise.all(fileDeletePromises);

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${currentNote.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(currentNote.id));
  };
};
