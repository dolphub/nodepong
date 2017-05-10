/* eslint-disable no-unused-vars */
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import TestComponent from './components/TestComponent';

import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';


console.debug(`Socket PORT: ${SOCKET_PORT}`);
render(
    <TestComponent />,
    document.getElementById('app')
);
