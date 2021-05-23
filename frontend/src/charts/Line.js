import React from 'react';
import {Line} from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
};

const tmpdata = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'number of Tweets',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      refresh: '0',
      timedata: {
        labels: [],
        datasets: [
          {
            label: 'number of Tweets',
            data: [],
            fill: false,
            backgroundColor: 'rgb(255,99,132)',
            borderColor: 'rgba(255,99,132,0.2)',
          },
        ],
      }
    }
  }

  componentDidMount() {
    this.getData();

    this.interval = setInterval(this.getData, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData = () => {
    console.log('fetching data')
    fetch("http://172.26.133.151:8080/charts/getRealTimeTweetsCount", {
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
          data: data
        }, function () {
          tmpdata.labels = [];
          tmpdata.datasets[0].data = [];
          for (const time in this.state.data) {
            tmpdata.labels.push(time);
            tmpdata.datasets[0].data.push(data[time]);
          }
        })
      })
      .then(() => {
        tmpdata.labels.reverse();
        tmpdata.datasets[0].data.reverse();
        this.setState({
          timedata: tmpdata,
          refresh: '1'
        })
      })
  }

  render() {
    console.log(this.state.timedata)
    return (
      <>
        <div className='header'>
          <h1 className='title'>Tweet counts in past 24 hours</h1>
        </div>
        <div style={{
          paddingLeft: '60pt',
          paddingRight: '60pt',
          paddingTop: '10pt',
          paddingBottom:'80pt'
        }}>
          <Line data={this.state.timedata} options={options}/>
        </div>
      </>
    )
  }
}

export default LineChart;
