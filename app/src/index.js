import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import React from 'react';
import { render } from 'react-dom';
import AppComponent from './components/app';


import './auth/github';

render(<AppComponent />, document.getElementById('app'));


window.firebase = firebase;
