import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {enablePromise, DEBUG as debugSQLite} from 'react-native-sqlite-storage';

debugSQLite(__DEV__);
enablePromise(true);

AppRegistry.registerComponent(appName, () => App);
