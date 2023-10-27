import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import MainBar from './MainBar';
import Navigation from './Navigation';
import MainContent from './MainContent';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const toggleNavigation = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', position: 'fixed', width: '100%' }}>
      <MainBar
        isOpen={isOpen}
        toggleNavigation={toggleNavigation}
        headerTitle={headerTitle}
      />
      <Navigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      <MainContent>
        <Outlet context={{ setHeaderTitle }} />
      </MainContent>
    </Box>
  );
};

export default DashboardLayout;
