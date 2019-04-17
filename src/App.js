import React, { Component } from "react";

import "./App.css";
import WeatherForecast from "./components/WeatherForecast.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>This is demo weather forecast</h1>
        </header>
        <WeatherForecast />
      </div>
    );
  }
}

export default App;
