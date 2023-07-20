import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({ onCollapse }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onCollapse}>
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Journal App
          </Typography>
          <Tooltip title="Logout">
            <IconButton color="error" onClick={onLogout}>
              <LogoutOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  onCollapse: PropTypes.func.isRequired,
};