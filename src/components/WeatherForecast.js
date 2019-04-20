import React, { Component } from "react";
import ReactDOM from "react-dom";
import Location from "./Location.js";
import ForecastResult from "./ForecastResult.js";

const appid = "8a548118fb12d8549d52d4d6887f9937";

export class WeatherForecast extends Component {
  constructor(props) {
    super(props);
    this.url = "";
    this.state = {
      temperature: "",
      city: "",
      humidity: "",
      description: "",
      day: "",
      lat: "",
      long: ""
    };
  }

  getTodayWeather = e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const isGetCurrentPosition = e.target.elements.currentPosition.checked;
    if (!city && !isGetCurrentPosition) {
      alert("Please enter your city or choose your current location");
      return;
    }
    this.url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`;
    if (isGetCurrentPosition) {
      this.getCurrentPosition();
    } else {
      // Set lại lat long về 0 để tránh trường hợp choose current position rồi bỏ đi thì nó vẫn lưu giá trị.
      this.setState({
        lat: "",
        long: ""
      });
      this.getTodayWeatherData(this.url);
    }
  };

  getTodayWeatherData = async url => {
    const api_call = await fetch(url);
    const response = await api_call.json();
    if (response) {
      this.todayData = {
        temperature: Math.round( response.main.temp ),
        city: response.name,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: response.weather[0].icon
      };
      this.setState(this.todayData);
    }
  };

  getDaysWeatherData = async url => {
    const api_call = await fetch(url);
    const response = await api_call.json();
    if (response) {
      const wantedDay = response.list.slice(-1)[0];
      const wantedDayData = {
        temperature: Math.round( wantedDay.temp.day ),
        city: response.city.name,
        humidity: wantedDay.humidity,
        description: wantedDay.weather[0].description,
        icon: wantedDay.weather[0].icon
      };
      this.setState(wantedDayData);
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
    this.setState({
      lat,
      long
    });
    this.url = `http://api.openweathermap.org/data/2.5/weather?&appid=${appid}&lat=${lat}&lon=${long}&units=metric`;
    this.getTodayWeatherData(this.url);
  };

  componentDidUpdate() {
    this.root = ReactDOM.findDOMNode(this);
    this.city = this.root.querySelector("#city").value;
  }

  getWeatherByDays = async day => {
    const city = this.city;
    this.url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${appid}&units=metric&cnt=${day}`;
    if (this.state.lat && this.state.long) {
      this.url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${
        this.state.lat
      }&lon=${this.state.long}&appid=${appid}&units=metric&cnt=${day}`;
    }
    // Nếu là ngày hôm nay thì trả lại dữ liệu đã lấy trước đó.
    if (day === "0") {
      this.setState(this.todayData);
      return;
    }
    this.getDaysWeatherData(this.url);
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
        <Location getWeather={this.getTodayWeather} />
        <ForecastResult
          weatherInfo={weatherInfo}
          getDay={this.getWeatherByDays}
        />
      </div>
    );
  }
}

export default WeatherForecast;
