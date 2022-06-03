import React, { Component } from 'react';
import settingsCat from '../settingsCat.jpg';

class Settings extends Component {
  render() {
    return (
      <section className="bg-amber-300 h-screen flex flex-col items-center justify-between p-10">
        <h1
          data-testid="settings-title"
          className="text-purple-400 hidden"
        >
          Settings
        </h1>
        <h2 className="text-purple-400 text-7xl font-bold">
          Ops...
        </h2>
        <img src={ settingsCat } alt="cat constructor" className=" h-80 w-96 shadow-2xl" />
        <h2 className="text-purple-400 text-7xl font-bold">
          Under Construction
        </h2>
      </section>
    );
  }
}

export default Settings;
