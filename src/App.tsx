import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {RootNavigator} from 'navigation/RootNavigator';
import {Box} from 'shared/components/Box';
import {theme} from 'shared/theme';
import {EventBusContainer} from 'shared/util/EventBus';

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
      <EventBusContainer>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </EventBusContainer>
    </Box>
  );
};

export default StyledApp;
