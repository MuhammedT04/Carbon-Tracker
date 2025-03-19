import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Layout from '../src/components/Layout';
import CarbonCalculator from './components/CarbonCalculator';
import CarbonResult from './components/CarbonResult';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <CarbonCalculator />
        <CarbonResult />
      </Layout>
    </Provider>
  );
};

export default App;