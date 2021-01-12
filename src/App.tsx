import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {RootNavigator} from 'navigation/RootNavigator';
import {theme} from 'shared/theme';
import {Box} from 'shared/components/Box';

const StyledApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Box flex={1}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Box>
  );
};

export default StyledApp;
