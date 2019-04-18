import React, { Component } from "react";

class ForecastResult extends Component {
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
        <div className="weather__city">{city}</div>
        <div className="weather__temp">{temperature}</div>
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
    );
  }
}

export default ForecastResult;
