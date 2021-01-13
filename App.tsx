import React, {useEffect} from "react";
import {Container} from "./src/navigation/NavigationContainer";
import {store} from "./src/store/store";
import {Provider} from "react-redux";
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    // Hide SplashScreen after 3secs or Make an async task
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 2000);
  }, []);
  return(
    <Provider store = {store}>
        <Container/>
    </Provider>
  );
};


export default App;