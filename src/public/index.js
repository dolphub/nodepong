/* eslint-disable no-unused-vars */
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import TestComponent from './components/TestComponent';

import 'jquery/dist/jquery.js'

// TODO: Fix these imports
// import 'bootstrap/dist/js/bootstrap.js';
//
// import 'bootstrap/dist/css/bootstrap.css';



render(
    <TestComponent />,
    document.getElementById('app')
);
