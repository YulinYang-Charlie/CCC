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

  loadGeoJson = async(map)=>{
      let outerCoords = [];
      const outerCoord = [[108.3142,28.9984],[108.3252,29.0039],[108.3801,29.0479],[108.4021,29.0533],[108.4131,29.0533],[108.4351,29.0698],[108.457,29.0698],[108.468,29.0863],[108.479,29.0863],[108.49,29.0918],[108.512,29.0973],[108.5339,29.1248],[108.5559,29.1412],[108.5999,29.1083],[108.5889,29.0973],[108.5889,29.0918],[108.5999,29.0863],[108.5999,29.1083],[108.6108,29.1028],[108.6218,29.0753],[108.6438,29.0808],[108.6658,29.0698],[108.6658,29.0918],[108.6658,29.0973],[108.6658,29.1028],[108.6658,29.1083],[108.6877,29.1083],[108.7097,29.0918],[108.7317,29.0808],[108.7427,29.0863],[108.7537,29.1083],[108.7756,29.1083],[108.7756,29.1248],[108.7976,29.1302],[108.8416,29.1083],[108.8525,29.1083],[108.8525,29.1357],[108.8965,29.2072],[108.9294,29.2236],[108.9514,29.2676],[108.9075,29.295],[108.9185,29.328],[108.9844,29.3335],[109.0063,29.361],[109.0393,29.3665],[109.0503,29.3939],[109.0613,29.4049],[109.1052,29.3719],[109.1162,29.3555],[109.1052,29.295],[109.1162,29.2841],[109.1382,29.2676],[109.1162,29.2181],[109.1272,29.1907],[109.1382,29.1687],[109.1602,29.1797],[109.2151,29.1467],[109.2371,29.1248],[109.2261,29.1138],[109.2371,29.0863],[109.314,29.0698],[109.325,29.0369],[109.292,29.0149],[109.292,28.9984],[109.292,28.9764],[109.27,28.9709],[109.259,28.9545],[109.259,28.9105],[109.2371,28.8831],[109.2151,28.8831],[109.1711,28.8501],[109.1492,28.8501],[109.1492,28.8391],[109.0942,28.8226],[109.0942,28.8116],[109.1052,28.8116],[109.1052,28.8062],[109.0613,28.7677],[109.0613,28.7402],[109.0393,28.7183],[109.0173,28.6908],[108.9954,28.7018],[108.9954,28.6798],[108.9844,28.6798],[108.9514,28.6084],[108.9185,28.6194],[108.8965,28.6139],[108.8855,28.6194],[108.8196,28.6029],[108.7976,28.5864],[108.7866,28.548],[108.7646,28.548],[108.7427,28.5205],[108.7317,28.5205],[108.7207,28.4985],[108.7097,28.4985],[108.6987,28.4821],[108.6548,28.4766],[108.6438,28.4601],[108.6877,28.4216],[108.6987,28.4052],[108.6877,28.3942],[108.6658,28.3832],[108.6548,28.3667],[108.6548,28.3502],[108.6658,28.3557],[108.6768,28.3502],[108.6658,28.3337],[108.6108,28.3228],[108.5999,28.3392],[108.5779,28.3447],[108.5889,28.3667],[108.5779,28.3887],[108.5889,28.4052],[108.6108,28.4052],[108.6108,28.4326],[108.5889,28.4601],[108.5779,28.526],[108.5779,28.537],[108.6108,28.5425],[108.5999,28.5919],[108.6328,28.6194],[108.6328,28.6359],[108.6328,28.6414],[108.6108,28.6359],[108.5889,28.6414],[108.5889,28.6469],[108.5669,28.6633],[108.5559,28.6469],[108.5339,28.6523],[108.501,28.6249],[108.479,28.6249],[108.3911,28.6523],[108.3582,28.6743],[108.3362,28.6743],[108.3472,28.7073],[108.3472,28.7347],[108.3801,28.7732],[108.3911,28.7952],[108.3801,28.8062],[108.3582,28.8171],[108.3472,28.8556],[108.3582,28.894],[108.3472,28.9105],[108.3582,28.9325],[108.3472,28.949],[108.3252,28.96],[108.3142,28.9984]]
      outerCoord.forEach(element =>{
        let va = { 
          lng : element[0],
          lat : element[1],
        }
        outerCoords.push(va);
      })
      // console.log(outerCoords)
      map.data.add({
        geometry: new this.props.google.maps.Data.Polygon([
          outerCoords
        ]),
      });
      map.data.setStyle({
        fillColor: 'red',
        strokeWeight: 0.5,
        fillOpacity: 0.12,
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