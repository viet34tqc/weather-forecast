import React, { Component } from "react";

export class Location extends Component {
  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <label htmlFor="city">Enter the city: </label>
        <input type="text" name="city" id="city" />
        &nbsp; or &nbsp;
        <label htmlFor="current-postition">Choose current position: </label>
        <input type="checkbox" name="currentPosition" id="current-position" />
        <button type="submit">Get weather</button>
      </form>
    );
  }
}

export default Location;
