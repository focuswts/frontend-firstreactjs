import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserApp from './component/UserApp';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <UserApp></UserApp>
      </div>
    )
  }
}

export default App;
