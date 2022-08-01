import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth.context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Profile() {
  const { accessToken, user, error, isAuthenticated, isLoading, logout } =
    useContext(AuthContext);

  // useEffect(() => {
  //   fetchBirds();
  // }, []);

  return (
    <>
      <h1>User</h1>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && <p>{JSON.stringify(user, null, 2)}</p>}
    </>
  );
}

export default Profile;
