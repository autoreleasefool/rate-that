import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {useColorScheme} from 'react-native';
import {RootNavigator} from 'navigation/RootNavigator';
import {Box} from 'shared/components';
import {theme, darkTheme} from 'shared/theme';
import {EventBusContainer} from 'shared/util/EventBus';
import {TMDbConfigurationContainer} from 'shared/data/tmdb/hooks/useConfiguration';
import {DatabaseContainer} from 'shared/data/local/hooks/useDatabase';

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
        <DatabaseContainer>
          <TMDbConfigurationContainer>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </TMDbConfigurationContainer>
        </DatabaseContainer>
      </EventBusContainer>
    </Box>
  );
};

export default StyledApp;
