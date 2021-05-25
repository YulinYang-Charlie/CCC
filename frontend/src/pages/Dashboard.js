import GoogleApiWrapper from "../charts/Map";
import React from 'react';
import LineChart from '../charts/Line';
import EmotionBar from "../charts/EmotionBar";
import SingleAxis from "../charts/SingleAxis";
import KeywordPie from "../charts/KeywordPie";
import PiePage from "./PiePage";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={{marginTop: '20pt'}}>
        <LineChart style={{}}/>
        <EmotionBar style={{}}/>
        <SingleAxis style={{}}/>
        <KeywordPie style={{}}/>
        <PiePage style={{}}/>
      </div>
    );
  }
};

export default Dashboard;
