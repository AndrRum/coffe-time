import React from 'react'
import {Container} from './src/navigation/NavigationContainer'
import {store} from './src/store/store'
import {Provider} from 'react-redux'

const App = () => {
  return(
    <Provider store = {store}>
        <Container/>
    </Provider>
  )
}


export default App;

