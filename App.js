//Learning redux fundamentals, not using redux tool kit
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import MyStack from './StackNavigation';

function App() {
  return (
    // <StrictMode>
    <Provider store={store}>
      <MyStack />
    </Provider>
    // </StrictMode>
  );
}

import './database.native';

// const styles = StyleSheet.create({
//   input: {
//     padding: 10,
//     borderWidth: 2,
//   },
// });

export default App;
