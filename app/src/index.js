import  './public/css/style.less';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

import React from 'react';
import { render } from 'react-dom';
import { connect } from 'redux';
import { Provider } from 'react-redux';

import AppComponent from './components/App';

import configureStore from './store/configureStore';
const store = configureStore();


render(
  <Provider store={store}>
    <AppComponent />
  </Provider>
  , document.getElementById('app'));

window.firebase = firebase;
