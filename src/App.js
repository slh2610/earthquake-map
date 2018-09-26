import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import axios from 'axios';
import './App.css';
import MagnitudeSelector from './components/MagnitudeSelector';
import DateRangeSelector from './components/DateRangeSelector';

class App extends Component {
  state = {
    earthquakes: [],
    magnitude: 0,
    startTime: '2018-09-25',
    endTime: '2018-09-26'
  }
  render() {
    return (
      <div className="App">
        <h1>Earthquake Map</h1>
        <Map center={[0, 0]} zoom={2} id="mapid">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.state.earthquakes.map(earthquake => {
            const [long, lat] = earthquake.geometry.coordinates
            const { mag, place } = earthquake.properties
            return (
              <Marker position={[lat, long]}>
                <Popup>magnitude: {mag} <br /> place: {place} </Popup>
              </Marker>
            )
          })}
        </Map>
        <DateRangeSelector startTime={this.state.startTime} endTime={this.state.endTime} setDateRange={this.setDateRange} />
        <MagnitudeSelector setMagnitude={this.setMagnitude} />
      </div>
    );
  }

  componentDidMount = () => {
    this.fetchData()
  }

  fetchData = () => {
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.state.startTime}&endtime=${this.state.endTime}&limit=1000&minmagnitude=${this.state.magnitude}`)
      .then(({ data }) => {
        this.setState({
          earthquakes: data.features
        })
      })
  }

  setMagnitude = (magnitude) => {
    this.setState({
      magnitude
    }, this.fetchData)
  }

  setDateRange = (event) => {
    if (event.target.id === "startTime") {
      this.setState({
        startTime: event.target.value
      }, this.fetchData)
    } else {
      this.setState({
        endTime: event.target.value
      }, this.fetchData)
    }
  }
}


export default App;
