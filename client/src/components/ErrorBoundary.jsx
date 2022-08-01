import React from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function UI({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // onReset={() => setExplode(false)}
      // resetKeys={[explode]}
    >
      {children}
    </ErrorBoundary>
  );
}

export default UI;
