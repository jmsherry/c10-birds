import React, { useContext, useEffect } from "react";
import { SpotsContext } from "../../../contexts/spots.context";
import { AuthContext } from "../../../contexts/auth.context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function SpotsList() {
  const { spots, loading, error, fetchSpots, deleteSpot } =
    useContext(SpotsContext);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetchSpots();
  }, []);

  return (
    <>
      <h1>{user.nickname}'s SpotList</h1>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {spots.map(({ _id, bird, datetime }) => (
            <li key={_id}>{bird.name} at {new Date(datetime).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: 'numeric' })}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SpotsList;
