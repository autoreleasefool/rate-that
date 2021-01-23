import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {useColorScheme} from 'react-native';
import {RootNavigator} from 'navigation/RootNavigator';
import {Box} from 'shared/components/Box';
import {theme, darkTheme} from 'shared/theme';
import {EventBusContainer} from 'shared/util/EventBus';

const StyledApp = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : theme}>
      <App />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Box flex={1} backgroundColor="background">
      <EventBusContainer>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </EventBusContainer>
    </Box>
  );
};

export default StyledApp;
