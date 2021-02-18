import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Frontpage } from './components/Frontpage';
import { MainLayout } from './layout/MainLayout';
import { Register } from '@/components/Register';
import { LoginContainer } from '@/containers/LoginContainer';
import { RegisterContainer } from './containers/RegisterContainer';
import { ProductListing } from './components/ProductListing/ProductListing';

export const App: React.FC = () => {
  return (
    <div id='app'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <MainLayout>
              <Frontpage />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/registrer'
          render={() => (
            <MainLayout>
              <RegisterContainer />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/logg_inn'
          render={() => (
            <MainLayout>
              <LoginContainer />
            </MainLayout>
          )}
        />
        <Route
          path='/annonser/:id'
          render={() => (
            <MainLayout>
              <ProductListing />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};
