import React, { Component } from "react";

export class Location extends Component {
  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <label htmlFor="city">Enter the city: </label>
        <input type="text" name="city" id="city" />
        &nbsp; or &nbsp;
        <input type="checkbox" name="currentPosition" id="current-position" />
        <label htmlFor="current-position">Choose current position</label>
        <button type="submit">Get weather</button>
      </form>
    );
  }
}

export default Location;
