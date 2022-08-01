import React, { createContext, useState, useCallback, useContext } from "react";
// import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

let headers = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

import { AuthContext } from "./auth.context";

export const SpotsContext = createContext({
  fetchSpots: () => [],
  addSpot: () => {},
  updateSpot: () => {},
  deleteSpot: () => {},
  loaded: false,
  loading: false,
  error: null,
  spots: [],
});

export const SpotsProvider = (props) => {

  const { token } = useContext(AuthContext);

  console.log("🚀 ~ file: spots.context.jsx ~ line 21 ~ SpotsProvider ~ token", token)


  const [spots, setSpots] = useState(() => {
    return JSON.parse(localStorage.getItem("spots")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  // const { addToast } = useToasts();

  const SPOTS_ENDPOINT = `${window.location.origin}/api/v1/spots/`;

  const fetchSpots = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(SPOTS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem("spots", JSON.stringify(data));
      setSpots(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  const addSpot = useCallback(
    async (formData) => {
      console.log("about to add", formData);
      try {
        // debugger;
        const response = await fetch(SPOTS_ENDPOINT, {
          method: "POST",
          headers: token
          ? { ...headers, Authorization: `Bearer ${token}` }
          : headers,
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedSpot = await response.json();
        console.log("got data", savedSpot);
        const newSpots = [...spots, savedSpot];
        localStorage.setItem("spots", JSON.stringify(newSpots));
        setSpots(newSpots);
        // addToast(`Saved ${savedSpot.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        // addToast(`Error ${err.message || err.statusText}`, {
        //   appearance: "error",
        // });
      }
    },
    [spots, token, headers]
  );

  const updateSpot = useCallback(
    async (id, formData) => {
      console.log("updating", id, formData);
      let updatedSpot = null;
      // Get index
      const index = spots.findIndex((spot) => spot._id === id);
      console.log(index);
      if (index === -1) throw new Error(`Spot with index ${id} not found`);
      // Get actual spot
      const oldSpot = spots[index];
      console.log("oldSpot", oldSpot);

      // Send the differences, not the whole update
      const updates = {};

      for (const key of Object.keys(oldSpot)) {
        if (key === "_id") continue;
        if (oldSpot[key] !== formData[key]) {
          updates[key] = formData[key];
        }
      }

      try {
        const response = await fetch(`${SPOTS_ENDPOINT}${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updates),
        });

        if (response.status !== 200) {
          throw response;
        }

        // Merge with formData
        updatedSpot = {
          ...oldSpot,
          ...formData, // order here is important for the override!!
        };
        console.log("updatedSpot", updatedSpot);
        // recreate the spots array
        const updatedSpots = [
          ...spots.slice(0, index),
          updatedSpot,
          ...spots.slice(index + 1),
        ];
        localStorage.setItem("spots", JSON.stringify(updatedSpots));
        // addToast(`Updated ${updatedSpot.name}`, {
        //   appearance: "success",
        // });
        setSpots(updatedSpots);
      } catch (err) {
        console.log(err);
      }
    },
    [spots]
  );

  const deleteSpot = useCallback(
    async (id) => {
      let deletedSpot = null;
      try {
        const response = await fetch(`${SPOTS_ENDPOINT}${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = spots.findIndex((spot) => spot._id === id);
        deletedSpot = spots[index];
        // recreate the spots array without that spot
        const updatedSpots = [...spots.slice(0, index), ...spots.slice(index + 1)];
        localStorage.setItem("spots", JSON.stringify(updatedSpots));
        setSpots(updatedSpots);
        console.log(`Deleted ${deletedSpot.name}`);
        // addToast(`Deleted ${deletedSpot.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
      }
    },
    [spots]
  );

  return (
    <SpotsContext.Provider
      value={{
        spots,
        loading,
        error,
        fetchSpots,
        addSpot,
        updateSpot,
        deleteSpot,
      }}
    >
      {props.children}
    </SpotsContext.Provider>
  );
};