import React, { useContext } from "react";
import { BirdsContext } from "../../../contexts/birds.context";
import { AuthContext } from "../../../contexts/auth.context";
import { SpotsContext } from "../../../contexts/spots.context";

function AddSpot() {
  const { birds } = useContext(BirdsContext);
  const { user, token } = useContext(AuthContext);
  const { addSpot } = useContext(SpotsContext);
  /*
    bird id
    user id
  */

  const onChange = ($e) => {
    const val = $e.target.value;
    if(val === '') return;
    console.log(val);
    addSpot({
      bird: val,
      user: user.sub,
    });
  };

  return (
    <>
      <h1>AddSpot</h1>
      <p>{token}</p>
      <select onChange={onChange} required>
        <option value="">Select a bird</option>
        {birds.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
}

export default AddSpot;
