import React, { Component } from 'react';
import './App.css';
import { Border, Helicopter } from './components';

export default class App extends Component {
  render() {
    return (
      <div className="icopter-container">
        <Border />
        <Helicopter />
        <Border bottom />
      </div>
    );
  }
}
