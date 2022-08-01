import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const {
    // user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            sx={{ my: 2, color: "white", display: "block" }}
            component={NavLink}
            to="/"
          >
            BirdsApp
          </Button>
          <NavLink to="/birds">Birds</NavLink>
          <NavLink to="/spots">Spots</NavLink>
          <NavLink to="/spots/add">Spot something</NavLink>
          {!isAuthenticated ? (
            <Button
              edge="start"
    
              color="inherit"
              aria-label="log in"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          ) : (
            <Button
              edge="start"

              color="inherit"
              aria-label="log out"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
