import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as reactRedux from 'react-redux';

import { HeaderContainer } from '@/containers/HeaderContainer';
import { Header } from '@/components/Header';
import configureStore from '@/state';
import { BrowserRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });
const initialState = (window as any).initialReduxState;
const { Provider } = reactRedux;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('container <HeaderContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderContainer />
        </Provider>
      </BrowserRouter>,
    );
    container = wrapper.find(HeaderContainer);
    component = container.find(Header);
    wrapper.unmount();
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['username', 'isLoggedIn'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['logout'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });
});
