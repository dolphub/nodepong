/* eslint-disable no-unused-vars */
// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import TestComponent from './components/TestComponent';

import 'socket.io';

import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';



render(
    <TestComponent />,
    document.getElementById('app')
);
