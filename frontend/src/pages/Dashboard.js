import GoogleApiWrapper from "../charts/Map";
import React from 'react';
import LineChart from '../charts/Line';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.loadSample();
    this.loadResult();
    this.state={
      sampledata:{},
      sampleresult:{}
    }
  }

  loadSample() {
    fetch("./sample.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((data) => { 
        this.setState({
          sampledata: data
        })
    });
  }

  loadResult() { 
    fetch("./result.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((data) => { 
        this.setState({
          sampleresult: data
        })
    });
  }

  render() {
    return (
      <div className='home'>
        <div style={{
          display: 'grid',
          height: '100%',
          width: '100%',
        }}>
          <div style={{
            padding: '8%'
          }}>
            <LineChart />
          </div>
          <div>
            <GoogleApiWrapper />
          </div>
        </div>
      </div>
    );
        }
};

export default Dashboard;
