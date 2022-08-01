import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function Wrapper({ children }) {
  const {
    isLoading,
    error,
  } = useAuth0();
  if (isLoading) {
    return (<CircularProgress />);
  }
  if (error) {
    return (<Alert severity="error">{error.message}</Alert>)
  }
  return <>{children}</>;
}
export default Wrapper;