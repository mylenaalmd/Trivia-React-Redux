import React from 'react';
import logo from '../trivia.png';

class Settings extends React.Component {
  render() {
    return (
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <h1 data-testid="settings-title">SETTINGS</h1>
      </div>
    );
  }
}
export default Settings;
