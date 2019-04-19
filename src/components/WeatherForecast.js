import React, { Component } from "react";
import ReactDOM from "react-dom";
import Location from "./Location.js";
import ForecastResult from "./ForecastResult.js";

const appid = "8a548118fb12d8549d52d4d6887f9937";

export class WeatherForecast extends Component {
  constructor(props) {
    super(props);
    this.lat = "";
    this.long = "";
  }
  state = {
    temperature: "",
    city: "",
    humidity: "",
    description: "",
    day: ""
  };
  getWeather = e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const isGetCurrentPosition = e.target.elements.currentPosition.checked;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`;
    if (isGetCurrentPosition) {
      this.getCurrentPosition();
    } else {
      this.getWeatherData(url);
    }
  };

  getWeatherData = async url => {
    const api_call = await fetch(url);
    const response = await api_call.json();
    if (response) {
      this.todayData = {
        temperature: response.main.temp,
        city: response.name,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: response.weather[0].icon
      };
      this.setState(this.todayData);
    }
  };

  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getLocation);
    } else {
      console.log("Geolocation is not supported");
    }
  };

  getLocation = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const url = `http://api.openweathermap.org/data/2.5/weather?&appid=${appid}&lat=${lat}&lon=${long}&units=metric`;
    this.getWeatherData(url);
  };

  componentDidUpdate() {
    this.root = ReactDOM.findDOMNode(this);
    this.city = this.root.querySelector("#city").value;
  }

  getDay = async day => {
    const city = this.city;
    // Nếu là ngày hôm nay thì trả lại dữ liệu đã lấy trước đó.
    if (day === "0") {
      this.setState(this.todayData);
      return;
    }
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${appid}&units=metric&cnt=${day}`
    );
    const response = await api_call.json();
    if (response) {
      const wantedDay = response.list.slice(-1)[0];
      const wantedDayData = {
        temperature: wantedDay.temp.day,
        city: response.city.name,
        humidity: wantedDay.humidity,
        description: wantedDay.weather[0].description,
        icon: wantedDay.weather[0].icon
      };
      this.setState(wantedDayData);
    }
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
