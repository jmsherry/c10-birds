import { useState, useEffect } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Routes,
} from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";

import history from "./utils/history";
import { getConfig } from "./config";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/auth0provideroptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

// Contexts
import { AuthProvider } from "../contexts/auth.context";
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

// Components
import Auth0Wrapper from "./components/Auth0Wrapper";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <Auth0Provider {...providerConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <BirdsProvider>
              <SpotsProvider>
                <Auth0Wrapper>
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
                </Auth0Wrapper>
              </SpotsProvider>
            </BirdsProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Auth0Provider>
    </Router>
  );
}

export default App;
