import React from 'react';
import { Map, GoogleApiWrapper, Circle, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '80%',
};

const locations = {
  'Victoria': {
    center: {lat: -37.840935, lng: 144.9631}
  },
  'New south wales': {
    center: {lat: -33.8688, lng: 151.2093}
  },
  'Queensland': {
    center: {lat: -27.4705, lng: 153.0260}
  },
  'Tasmania': {
    center: {lat: -42.8826 ,lng: 147.3257}
  },
  'South australia': {
    center: {lat: -34.9285, lng: 138.6007}
  },
  'Western australia': {
    center: {lat: -27.6728, lng: 121.6283}
  },
  'Northern territory': {
    center: {lat: -12.4637, lng: 130.8444}
  }
}

export class MapContainer extends React.Component {

  constructor(props){
    super(props)
    this.state={
      showingInfoWindow: false,
      selectedPlace:{
        name:'',
        count: ''
      },
      locations:{
        Victoria: {
          center: {lat: -37.840935, lng: 144.9631},
        },
        'New south wales': {
          center: {lat: -33.8688, lng: 151.2093},
        },
        'Queensland': {
          center: {lat: -27.4705, lng: 153.0260},
        },
        'Tasmania': {
          center: {lat: -42.8826 ,lng: 147.3257},
        },
        'South australia': {
          center: {lat: -34.9285, lng: 138.6007},
        },
        'Western australia': {
          center: {lat: -27.6728, lng: 121.6283},
        },
        'Northern territory': {
          center: {lat: -12.4637, lng: 130.8444},
        }
      }
    }
    this.loadCircles = this.loadCircles.bind(this);
    this.showTasmania = this.showTasmania.bind(this);
    this.showVictoria = this.showVictoria.bind(this);
    this.showNewSouthWales = this.showNewSouthWales.bind(this);
    this.showQueensland = this.showQueensland.bind(this);
    this.showSouthAustralia = this.showSouthAustralia.bind(this);
  }

  autoCenterMap = ( { google } , map)=>{
    this.loadCircles(map);
  }

  loadCircles = async(map)=>{
    fetch("http://172.26.133.151:8080/charts/getTweetCountByLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        location: ''
      }),
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach(element => {
          locations[element.name].count = element.total;
          locations[element.name].percentage = element.percentage;
        })
      })
      .then(() => {
        this.setState({
          locations: locations
        })
        console.log(this.state.locations)
      })
  }

  showTasmania = () => {
    this.setState({
      showingInfoWindow: true,
      selectedPlace: {
        count: this.state.locations.Tasmania.count,
        name: 'Tasmania',
        center: this.state.locations.Tasmania.center,
      }
    })
  }

  showVictoria = () => {
    this.setState({
      showingInfoWindow: true,
      selectedPlace: {
        count: this.state.locations.Victoria.count,
        name: 'Victoria',
        center: this.state.locations.Victoria.center,
      }
    })
  }

  showNewSouthWales = () => {
    this.setState({
      showingInfoWindow: true,
      selectedPlace: {
        count: this.state.locations['New south wales'].count,
        name: 'New South Wales',
        center: this.state.locations['New south wales'].center,
      }
    })
  }

  showSouthAustralia = () => {
    this.setState({
      showingInfoWindow: true,
      selectedPlace: {
        count: this.state.locations['South australia'].count,
        name: 'South Australia',
        center: this.state.locations['South australia'].center,
      }
    })
  }

  showQueensland = () => {
    this.setState({
      showingInfoWindow: true,
      selectedPlace: {
        count: this.state.locations.Queensland.count,
        name: 'Queensland',
        center: this.state.locations.Queensland.center,
      }
    })
  }
  
  render() {
    return (
      <div style={{
        display:'flex',
      }}>
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={
          {
            lat: -32,
            lng: 137,
          }
        }
        onReady={this.loadCircles}
      >
        <InfoWindow
          visible={this.state.showingInfoWindow}
          position={this.state.selectedPlace.center}>
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
              <h6>Tweet counts: {this.state.selectedPlace.count}</h6>
            </div>
        </InfoWindow>
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations.Victoria.percentage + 0.15}
          onClick= {this.showVictoria}
          center= {this.state.locations.Victoria.center}
          radius= {Math.sqrt(this.state.locations.Victoria.count) * 500}
          />
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations['New south wales'].percentage + 0.15}
          onClick={this.showNewSouthWales}
          center= {this.state.locations['New south wales'].center}
          radius= {Math.sqrt(this.state.locations['New south wales'].count) * 500}
          />
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations['Northern territory'].percentage + 0.15}
          center= {this.state.locations['Northern territory'].center}
          radius= {Math.sqrt(this.state.locations['Northern territory'].count) * 500}
          />
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations.Queensland.percentage + 0.15}
          onClick={this.showQueensland}
          center= {this.state.locations.Queensland.center}
          radius= {Math.sqrt(this.state.locations.Queensland.count) * 500}
          />
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations['South australia'].percentage + 0.15}
          onClick={this.showSouthAustralia}
          center= {this.state.locations['South australia'].center}
          radius= {Math.sqrt(this.state.locations['South australia'].count) * 500}
          />
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations.Tasmania.percentage + 0.15}
          onClick= {this.showTasmania}
          center= {this.state.locations.Tasmania.center}
          radius= {Math.sqrt(this.state.locations.Tasmania.count) * 500}
          />
        <Circle 
          strokeColor= "#330066"
          strokeOpacity= {0.8}
          strokeWeight= {1}
          fillColor= "#330066"
          fillOpacity= {this.state.locations['Western australia'].percentage + 0.15}
          center= {this.state.locations['Western australia'].center}
          radius= {Math.sqrt(this.state.locations['Western australia'].count) * 500}
          />
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDTYedyVJ6NMogwRS3mm3O89P_Y10wIyG4'
})(MapContainer);