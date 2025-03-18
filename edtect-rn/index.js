/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import tw from './tailwind';

globalThis.tw = tw;
AppRegistry.registerComponent(appName, () => App);
