import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import {
  Chip,
  List,
  Drawer,
  Divider,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { Close, AccountCircle } from "@mui/icons-material";

import { SideBarItem } from "./";

export const SideBar = ({ onCollapse, collapse }) => {
  const { displayName, email } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  return (
    <Drawer
      variant="temporary"
      open={collapse}
      onClose={onCollapse}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "300px",
          maxWidth: "calc(100vw - 48px)",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        style={{ paddingLeft: "16px", paddingRight: "16px" }}
      >
        <Tooltip title={email} arrow>
          <Chip
            icon={<AccountCircle color="inherit" />}
            label={
              <Typography variant="h6" noWrap component="div">
                {displayName}
              </Typography>
            }
            variant="outlined"
            onClick={() => {}}
            sx={{ border: "none" }}
          />
        </Tooltip>
        <IconButton color="inherit" onClick={onCollapse}>
          <Close />
        </IconButton>
      </Toolbar>

      <Divider />

      <List sx={{ padding: 0 }}>
        {notes.map((note) => (
          <SideBarItem key={note.id} {...note} onCollapse={onCollapse} />
        ))}
      </List>
    </Drawer>
  );
};

SideBar.propTypes = {
  onCollapse: PropTypes.func.isRequired,
  collapse: PropTypes.bool.isRequired,
};
