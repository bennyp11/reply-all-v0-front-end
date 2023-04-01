import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Nav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { id: 1, text: 'Start A New Game' },
    { id: 2, text: 'Join A Game' },
    // Add more menu items here
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="error"
            aria-label="menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: theme.spacing(2) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.id}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Nav;
