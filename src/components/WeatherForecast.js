import React, { Component } from "react";
import Location from "./Location.js";
import ForecastResult from "./ForecastResult.js";

export class WeatherForecast extends Component {
  state = {
    temperature: "",
    city: "",
    humandity: "",
    description: ""
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const appid = "8a548118fb12d8549d52d4d6887f9937";
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},VN&appid=${appid}`
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
