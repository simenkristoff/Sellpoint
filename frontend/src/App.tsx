import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { LoginContainer } from '@/containers/LoginContainer';
import { RegisterContainer } from './containers/RegisterContainer';
import { ProductListContainer } from './containers/ProductListContainer';
import { ProductSingleContainer } from './containers/ProductSingleContainer';

export const App: React.FC = () => {
  return (
    <div id='app'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <MainLayout>
              <ProductListContainer favourites={false} />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/favoritter'
          render={() => (
            <MainLayout>
              <ProductListContainer favourites={true} />
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
          path='/annonser/:productId'
          render={() => (
            <MainLayout>
              <ProductSingleContainer />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};
