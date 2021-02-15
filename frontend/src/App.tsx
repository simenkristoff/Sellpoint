import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Frontpage } from './components/Frontpage';
import { MainLayout } from './layout/MainLayout';
import { Register } from '@/components/Register';
import { Login } from './components/Login';

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
              <Register />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/logg_inn'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};
