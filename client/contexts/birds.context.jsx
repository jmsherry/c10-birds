import React, { createContext, useState, useCallback } from "react";
// import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const BirdsContext = createContext({
  fetchBirds: () => [],
  addBird: () => {},
  updateBird: () => {},
  deleteBird: () => {},
  loaded: false,
  loading: false,
  error: null,
  birds: [],
});

export const BirdsProvider = (props) => {
  const [birds, setBirds] = useState(() => {
    return JSON.parse(localStorage.getItem("birds")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  // const { addToast } = useToasts();

  const BIRDS_ENDPOINT = `${window.location.origin}/api/v1/birds/`;

  const fetchBirds = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(BIRDS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem("birds", JSON.stringify(data));
      setBirds(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  const addBird = useCallback(
    async (formData) => {
      console.log("about to add", formData);
      try {
        const response = await fetch(BIRDS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedBird = await response.json();
        console.log("got data", savedBird);
        const newBirds = [...birds, savedBird];
        localStorage.setItem("birds", JSON.stringify(newBirds));
        setBirds(newBirds);
        // addToast(`Saved ${savedBird.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        // addToast(`Error ${err.message || err.statusText}`, {
        //   appearance: "error",
        // });
      }
    },
    [birds]
  );

  const updateBird = useCallback(
    async (id, formData) => {
      console.log("updating", id, formData);
      let updatedBird = null;
      // Get index
      const index = birds.findIndex((bird) => bird._id === id);
      console.log(index);
      if (index === -1) throw new Error(`Bird with index ${id} not found`);
      // Get actual bird
      const oldBird = birds[index];
      console.log("oldBird", oldBird);

      // Send the differences, not the whole update
      const updates = {};

      for (const key of Object.keys(oldBird)) {
        if (key === "_id") continue;
        if (oldBird[key] !== formData[key]) {
          updates[key] = formData[key];
        }
      }

      try {
        const response = await fetch(`${BIRDS_ENDPOINT}${id}`, {
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
        updatedBird = {
          ...oldBird,
          ...formData, // order here is important for the override!!
        };
        console.log("updatedBird", updatedBird);
        // recreate the birds array
        const updatedBirds = [
          ...birds.slice(0, index),
          updatedBird,
          ...birds.slice(index + 1),
        ];
        localStorage.setItem("birds", JSON.stringify(updatedBirds));
        // addToast(`Updated ${updatedBird.name}`, {
        //   appearance: "success",
        // });
        setBirds(updatedBirds);
      } catch (err) {
        console.log(err);
      }
    },
    [birds]
  );

  const deleteBird = useCallback(
    async (id) => {
      let deletedBird = null;
      try {
        const response = await fetch(`${BIRDS_ENDPOINT}${id}`, {
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
        const index = birds.findIndex((bird) => bird._id === id);
        deletedBird = birds[index];
        // recreate the birds array without that bird
        const updatedBirds = [...birds.slice(0, index), ...birds.slice(index + 1)];
        localStorage.setItem("birds", JSON.stringify(updatedBirds));
        setBirds(updatedBirds);
        console.log(`Deleted ${deletedBird.name}`);
        // addToast(`Deleted ${deletedBird.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
      }
    },
    [birds]
  );

  return (
    <BirdsContext.Provider
      value={{
        birds,
        loading,
        error,
        fetchBirds,
        addBird,
        updateBird,
        deleteBird,
      }}
    >
      {props.children}
    </BirdsContext.Provider>
  );
};