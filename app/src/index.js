import  './css/style.less';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

import React from 'react';
import { render } from 'react-dom';

// import { connect } from 'redux';
// import { Provider } from 'react-redux';

import AppComponent from './components/App';

import './auth/github';

render(<AppComponent />, document.getElementById('app'));

window.firebase = firebase;
