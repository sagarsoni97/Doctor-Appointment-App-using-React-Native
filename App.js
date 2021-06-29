import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import Providers from './src/Navigation/Index';

const App = () => {

  return (
    <>
      <Providers />
      <FlashMessage />
    </>
  );
};

export default App;