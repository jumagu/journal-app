import { useMemo } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentNote } from "../../store/journal/journalSlice";

import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";

export const SideBarItem = ({
  title = "",
  body,
  id,
  date,
  imageUrls,
  onCollapse,
}) => {
  const dispatch = useDispatch();
  const { currentNote } = useSelector((state) => state.journal);

  const newTitle = useMemo(() => {
    if (title.length === 0) {
      return "Untitled";
    }

    return title;
  }, [title]);

  const newBody = useMemo(() => {
    if (body.length === 0) {
      return "(Blank note)";
    }

    return body;
  }, [body]);

  const handleSelectNote = () => {
    dispatch(setCurrentNote({ id, title, body, date, imageUrls }));
    onCollapse();
  };

  return (
    <ListItem
      selected={currentNote && currentNote.id === id}
      disablePadding
      onClick={handleSelectNote}
    >
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: "unset", paddingRight: "15px" }}>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column" sx={{ width: "calc(100% - 39px)" }}>
          <ListItemText
            primary={newTitle}
            sx={{
              width: "100%",
              ".MuiListItemText-primary": {
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            }}
          />
          <ListItemText
            secondary={newBody}
            sx={{
              width: "100%",
              ".MuiListItemText-secondary": {
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            }}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  imageUrls: PropTypes.array,
  onCollapse: PropTypes.func.isRequired,
};
