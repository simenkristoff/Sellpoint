import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { LoginContainer } from './containers/LoginContainer';
import { RegisterContainer } from './containers/RegisterContainer';
import { ProductListContainer } from './containers/ProductListContainer';
import { ProductSingleContainer } from './containers/ProductSingleContainer';
import { ProfileContainer } from './containers/ProfileContainer';
import { AdminToolsContainer } from './containers/AdminToolsContainer';
import { AdvertManagerContainer } from './containers/AdvertManagerContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from './state/ducks/advert/actions';
import { IApplicationState } from './state/interface';
import { AdsProvider } from './context/adsContext';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ advert }: IApplicationState) => advert);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, []);

  return (
    <div id='app'>
      <AdsProvider value={data.filter(ad => ad.active === true)}>
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
          <Route
            path='/mine_reklamer'
            render={() => (
              <MainLayout>
                <AdvertManagerContainer />
              </MainLayout>
            )}
          />
          <Route
            path='/adminverktoy'
            render={() => (
              <MainLayout>
                <AdminToolsContainer />
              </MainLayout>
            )}
          />
          <Route
            //legger til min side, må også hente fra components
            path='/minside/:userId'
            render={() => (
              <MainLayout>
                <ProfileContainer />
              </MainLayout>
            )}
          />
        </Switch>
      </AdsProvider>
    </div>
  );
};
