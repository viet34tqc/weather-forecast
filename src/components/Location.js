import React, { Component } from "react";

export class Location extends Component {
  render() {
    return (
      <form onSubmit={this.props.getWeather}>
        <label htmlFor="location">Enter the location: </label>
        <input type="text" name="location" id="location" />
        &nbsp; or &nbsp;
        <label htmlFor="current-postition">Choose current position: </label>
        <input type="checkbox" name="currentPosition" id="current-position" />
        <button type="submit">Get weather</button>
      </form>
    );
  }
}

export default Location;
