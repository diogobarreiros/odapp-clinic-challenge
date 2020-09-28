import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TabRoutes from './tab.routes';

import Home from '../pages/Home';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <App.Navigator initialRouteName="Home">
      <App.Screen
        options={{
          cardStyle: { backgroundColor: '#B0C4DE' },
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <App.Screen
        name="MainBottom"
        component={TabRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </App.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
