import React, { Component } from "react";
import Location from "./Location.js";
import ForecastResult from "./ForecastResult.js";

export class WeatherForecast extends Component {
  getWeather = async e => {
    e.preventDefault();
    const api_call = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=8a548118fb12d8549d52d4d6887f9937"
    );
    const response = await api_call.json();
    console.log(response);
  };
  render() {
    return (
      <div>
        <Location getWeather={this.getWeather} />
        <ForecastResult />
      </div>
    );
  }
}

export default WeatherForecast;
