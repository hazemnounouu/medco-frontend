import { useContext } from "react";

import { Box, Button, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

import InputBase from "@mui/material/InputBase";

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../shared/context/AuthContext";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { token, logout } = useContext(AuthContext)

  return (
    <Box display="flex" justifyContent="end" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >

        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>

      </Box>


      {/* LOGOUTBUTTON */}
      <Box display="flex">
        {token && (
          <Button
            sx={{ fontSize: '0.9rem' }}
            onClick={logout}
            fullWidth
            variant="filled"
            startIcon={<LogoutOutlinedIcon />}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;






