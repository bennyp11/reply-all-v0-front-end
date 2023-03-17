import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
