/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import momentDurationFormatSetup from 'moment-duration-format';
import moment from 'moment';
momentDurationFormatSetup(moment);
LogBox.ignoreAllLogs();

import { name as appName } from './app.json';
import App from './App/Containers/App';

AppRegistry.registerComponent(appName, () => App);
