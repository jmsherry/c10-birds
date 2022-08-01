import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

import Header from "./Header";

function PageLayout() {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <main>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default PageLayout;
