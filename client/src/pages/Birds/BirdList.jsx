import React, { useContext, useEffect } from "react";
import { BirdsContext } from "../../../contexts/birds.context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function BirdList() {
  const { birds, loading, error, fetchBirds, deleteBird } =
    useContext(BirdsContext);

  useEffect(() => {
    fetchBirds();
  }, []);

  return (
    <>
      <h1>BirdList</h1>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {birds.map(({ _id, name }) => (
            <li key={_id}>{name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default BirdList;
