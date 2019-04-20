import React, { Component } from "react";

class ForecastResult extends Component {
  handleChange = e => {
    const day = e.target.value;
    this.props.getDay(day);
  };
  render() {
    if (!this.props.weatherInfo.temperature) return null;
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
            <label htmlFor="farenheit">F</label>
            <input type="radio" name="temperature_type" id="farenheit" />
            <label htmlFor="celcius">C</label>
            <input type="radio" name="temperature_type" id="celcius" />
          </div>
        </form>
        <div className="info__content">
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
      </div>
    );
  }
}

export default ForecastResult;
