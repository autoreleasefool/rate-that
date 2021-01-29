import React, {useContext, useEffect, useState} from 'react';
import {buildRequestUrl} from '../api';

interface Configuration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export const useFetchConfiguration = (): Configuration | undefined => {
  const url = buildRequestUrl({path: 'configuration'});
  const [configuration, setConfiguration] = useState<Configuration>();

  useEffect(() => {
    const performQuery = async () => {
      try {
        const results = await fetch(url);
        const json = await results.json();
        setConfiguration(json);
      } catch (err) {
        console.error(`Error fetching TMDb configuration: ${err}`);
      }
    };

    performQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return configuration;
};

const TMDbConfigurationContext = React.createContext<Configuration | undefined>(undefined);

export const TMDbConfigurationContainer = ({children}: {children: React.ReactElement}) => {
  const configuration = useFetchConfiguration();
  return <TMDbConfigurationContext.Provider value={configuration}>{children}</TMDbConfigurationContext.Provider>;
};

export const useConfiguration = () => {
  const context = useContext(TMDbConfigurationContext);
  return context;
};
