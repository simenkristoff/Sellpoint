import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Frontpage } from './components/Frontpage';
import { MainLayout } from './layout/MainLayout';
import { Register } from '@/components/Register';
import { LoginContainer } from '@/containers/LoginContainer';
import { RegisterContainer } from './containers/RegisterContainer';

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
      </Switch>
    </div>
  );
};
