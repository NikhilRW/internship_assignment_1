import React from 'react';
import Root from 'shared/navigation/routes/Root';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './shared/theme/ThemeProvider';

const Index = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Index;