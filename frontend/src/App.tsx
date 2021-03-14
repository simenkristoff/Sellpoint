import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { LoginContainer } from './containers/LoginContainer';
import { RegisterContainer } from './containers/RegisterContainer';
import { ProductListContainer } from './containers/ProductListContainer';
import { ProductSingleContainer } from './containers/ProductSingleContainer';
import { AdvertManagerContainer } from './containers/AdvertManagerContainer';

export const App: React.FC = () => {
  return (
    <div id='app'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <MainLayout>
              <ProductListContainer />
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
        <Route
          path='/mine_reklamer'
          render={() => (
            <MainLayout>
              <AdvertManagerContainer />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};
