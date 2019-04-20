import React, { Component } from "react";
import ReactDOM from "react-dom";

class ForecastResult extends Component {
  state = {
    scale: "celcius"
  };

  handleChange = e => {
    const day = e.target.value;
    this.props.getDay(day);
  };

  handleCelcius = () => {
    const temperature = this.props.weatherInfo.temperature + "°C";
    this.weatherTemp.innerHTML = temperature;
  };

  handleFarenheit = () => {
    const temperature = this.props.weatherInfo.temperature * 1.8 + 32 + "°F";
    this.weatherTemp.innerHTML = temperature;
  };

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.weatherTemp = this.root.querySelector(".weather__temp");
  }

  render() {
    const {
      temperature,
      city,
      humidity,
      description,
      icon
    } = this.props.weatherInfo;
    return (
      <div className="weather-info">
        <form className="info__header">
          <select name="day" onChange={this.handleChange}>
            <option value="0">Today</option>
            <option value="1">Next 1 day</option>
            <option value="2">Next 2 day</option>
            <option value="3">Next 3 day</option>
            <option value="4">Next 4 day</option>
          </select>
          <div>
            <span
              className={`scale ${
                this.state.scale === "farenheit" ? "active" : ""
              }`}
              onClick={this.handleFarenheit}
            >
              °F
            </span>
            <span
              className={`scale ${
                this.state.scale === "celcius" ? "active" : ""
              }`}
              onClick={this.handleCelcius}
            >
              °C
            </span>
          </div>
        </form>
        <div className="info__content">
          <div className="weather__city">{city}</div>
          <div className="weather__temp">{temperature}°C</div>
          <div className="weather__icon">
            {icon && (
              <img
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="icon"
              />
            )}
          </div>
          <div className="weather__humidity">{humidity}</div>
          <div className="weather__desc">{description}</div>
        </div>
      </div>
    );
  }
}

export default ForecastResult;
