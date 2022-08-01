import { useState, useEffect } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Routes,
} from "react-router-dom";

// Contexts
import { BirdsProvider } from "../contexts/birds.context";
import { SpotsProvider } from "../contexts/spots.context";

// Layouts
import PageLayout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

// Birds
import BirdList from "./pages/Birds/BirdList";
import AddBird from "./pages/Birds/AddBird";
import UpdateBird from "./pages/Birds/UpdateBird";

// Spots
import SpotsList from "./pages/Spots/SpotsList";
import AddSpot from "./pages/Spots/AddSpot";
import UpdateSpot from "./pages/Spots/UpdateSpot";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <BirdsProvider>
        <Routes>
          <Route>
            <Route element={<PageLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/birds">
                <Route index element={<BirdList />} />
                <Route path="add" element={<AddBird />} />
                <Route path="update/:id" element={<UpdateBird />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/spots">
                <Route index element={<SpotsList />} />
                <Route path="add" element={<AddSpot />} />
                <Route path="update/:id" element={<UpdateSpot />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BirdsProvider>
    </Router>
  );
}

export default App;
