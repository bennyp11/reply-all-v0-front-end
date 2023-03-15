import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/system';

const Nav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const theme = useTheme();

  const StyledAppBar = styled(AppBar)({
    zIndex: theme.zIndex.drawer + 1,
  });

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
    },
  }));

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'About' },
    { id: 3, text: 'Contact' },
    // Add more menu items here
  ];

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Your App Name</Typography>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.id}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default Nav;
