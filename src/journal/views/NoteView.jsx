import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { DeleteOutline, SaveOutlined, UploadFile } from "@mui/icons-material";

import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks";

import { ImageGallery } from "../components";

import {
  setCurrentNote,
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { currentNote, saveMessage, isSaving } = useSelector(
    (state) => state.journal
  );

  const { title, body, date, onInputChange, formState } = useForm(currentNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return moment(newDate).format("dddd, MMMM Do YYYY");
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setCurrentNote(formState));
  }, [formState]);

  useEffect(() => {
    if (saveMessage.length > 0) {
      Swal.fire("Success", saveMessage, "success");
    }
  }, [saveMessage]);

  const handleSaveNote = () => {
    dispatch(startSavingNote());
  };

  const handleFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const handleDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <div style={{ margin: "24px" }}>
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent={{ xs: "center", md: "space-between" }}
        maxWidth={1600}
        margin="0 auto"
      >
        <Grid item>
          <Typography fontSize={39} fontWeight="light" textAlign="center">
            {dateString}
          </Typography>
        </Grid>

        <Grid
          item
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          marginTop={{ sm: 2, md: 0 }}
        >
          <input
            type="file"
            style={{ display: "none" }}
            multiple
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
          <Button
            color="info"
            sx={{ padding: 2, textTransform: "capitalize", mr: { sm: 1 } }}
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadFile sx={{ fontSize: 30, mr: 1 }} /> Upload Images
          </Button>

          <Button
            color="success"
            sx={{ padding: 2, textTransform: "capitalize", mr: { sm: 1 } }}
            onClick={handleSaveNote}
            disabled={isSaving}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Save
          </Button>

          <Button
            color="error"
            sx={{ padding: 2, textTransform: "capitalize" }}
            onClick={handleDeleteNote}
            disabled={isSaving}
          >
            <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
            Delete
          </Button>
        </Grid>

        <Grid container marginTop={2}>
          <TextField
            fullWidth
            type="text"
            name="title"
            value={title}
            label="Title"
            variant="filled"
            placeholder="Insert a title"
            sx={{ border: "none", mb: 1 }}
            onChange={onInputChange}
          />
          <TextField
            fullWidth
            multiline
            type="text"
            name="body"
            value={body}
            variant="filled"
            placeholder="What happened today?"
            minRows={5}
            onChange={onInputChange}
          />
        </Grid>

        <ImageGallery images={currentNote.imageUrls} />
      </Grid>
    </div>
  );
};
