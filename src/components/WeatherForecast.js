import React, { Component } from "react";
import ReactDOM from "react-dom";
import Location from "./Location.js";
import ForecastResult from "./ForecastResult.js";

const appid = "8a548118fb12d8549d52d4d6887f9937";

export class WeatherForecast extends Component {
  state = {
    temperature: "",
    city: "",
    humidity: "",
    description: "",
    day: ""
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`
    );
    const response = await api_call.json();
    if (response) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: response.weather[0].icon
      });
    }
  };

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.city = this.root.querySelector("#city").value;
  }

  getDay = () => {
    console.log(this.city);
  };

  render() {
    const weatherInfo = {
      temperature: this.state.temperature,
      city: this.state.city,
      humidity: this.state.humidity,
      description: this.state.description,
      icon: this.state.icon
    };
    return (
      <div>
        <Location getWeather={this.getWeather} />
        <ForecastResult weatherInfo={weatherInfo} getDay={this.getDay} />
      </div>
    );
  }
}

export default WeatherForecast;
