import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

import { startCreatingNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, currentNote } = useSelector((state) => state.journal);

  const onNewNote = () => {
    dispatch(startCreatingNewNote());
  };

  return (
    <>
      <JournalLayout>
        {currentNote ? <NoteView /> : <NothingSelectedView />}

        <IconButton
          size="large"
          sx={{
            color: "white",
            backgroundColor: "error.main",
            ":hover": { backgroundColor: "#bc1030", transform: "scale(1.1)" },
            transition: "transform .2s ease-in-out, background-color .2s ease-in-out",
            position: "fixed",
            right: { xs: 24, md: 48 },
            bottom: { xs: 24, md: 48 },
          }}
          onClick={onNewNote}
          disabled={isSaving}
        >
          <AddOutlined
            sx={{
              fontSize: 30,
            }}
          />
        </IconButton>
      </JournalLayout>
    </>
  );
};