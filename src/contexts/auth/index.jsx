import React, { createContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [company, setCompany] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ company, setCompany, token, setToken, loading, setLoading, toast }}>
      <Backdrop
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box sx={{ display: 'grid', justifyContent: 'center', gap: 1 }}>
          <CircularProgress sx={{ ml: '8px' }}/>
          <strong style={{ color: '#fff' }}>{loading}</strong>
        </Box>
      </Backdrop>
      <Toaster position="bottom-right" reverseOrder={false} />
      {props.children}
    </AuthContext.Provider>
  );
};
