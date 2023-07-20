/* eslint-disable no-undef */

import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

import {
  addNewEmptyNote,
  savingNewNote,
  setCurrentNote,
} from "../../../src/store/journal/journalSlice";
import { startCreatingNewNote } from "../../../src/store/journal/thunks";

describe("Pruebas en los thunks del journal", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startCreatingNewNote() debe crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";

    getState.mockReturnValue({ auth: { uid } });

    await startCreatingNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setCurrentNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );

    // Borrar basura de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });
});
