import PropTypes from "prop-types";

import { useState } from "react";

import { Box, Toolbar } from "@mui/material";

import { NavBar, SideBar } from "../components";

export const JournalLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapseNavbar = () => {
    setCollapse(!collapse);
  };

  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      sx={{ display: "flex" }}
    >
      <NavBar onCollapse={handleCollapseNavbar} />

      <SideBar onCollapse={handleCollapseNavbar} collapse={collapse} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

JournalLayout.propTypes = {
  children: PropTypes.node,
};
