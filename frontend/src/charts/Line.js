import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Loader } from 'rsuite'

class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      refresh: '0',
      chartdata: {
        title: {
          text: 'Tweets'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Sunday',
          stack: 'a',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Monday',
          stack: 'a',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Tuesday',
          stack: 'a',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Wednesday',
          stack: 'a',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Thursday',
          stack: 'a',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Friday',
          stack: 'a',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Saturday',
          stack: 'a',
        }],
        legend: {
          show: true,
          data: ['Sunday','Monday', 'Tuesday',
          'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
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
    this.setState({
      loading: true
    });
    fetch("http://172.26.133.151:8080/charts/getRealTimeTweetsCountByWeekdays", {
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
        console.log(data)
        let result = this.setChartData(data);
        console.log(result);
        this.setState({
          data: data,
          chartdata: result,
          loading: false
        });
      });
  }

  setChartData(data) {
    let dateslist = [];
    for (let i= 0; i < 24; i++) {
      dateslist.push((i < 10 ? '0' + i : i) + ':00');
    }
    let chartdata = {
      title: {
        text: 'Tweets'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateslist,
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [{
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Sunday',
        stack: 'a',
        smooth: true,
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Monday',
        stack: 'a',
        smooth: true,
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Tuesday',
        stack: 'a',
        smooth: true,
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Wednesday',
        stack: 'a',
        smooth: true,
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Thursday',
        stack: 'a',
        smooth: true,
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Friday',
        stack: 'a',
        smooth: true,
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Saturday',
        stack: 'a',
        smooth: true,
      }],
      legend: {
        show: true,
        data: ['Sunday','Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    };

    if (data !== {}) {
      const dates = ['Sunday','Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 7; j++) {
          if (i < 10) {
            chartdata['series'][j]['data'][i] = data[dates[j]]['0' + i];
          } else {
            chartdata['series'][j]['data'][i] = data[dates[j]][i];
          }
        }
      }
    }
    return chartdata;
  }

  render() {
    return (
      <>
        <div className='header'>
          <h1 className='title'>Tweet counts distribution of times</h1>
        </div>
        <div style={{
          paddingLeft: '60pt',
          paddingRight: '60pt',
          paddingTop: '10pt',
          paddingBottom:'80pt'
        }}>
          {this.state.loading?(
            <Loader content="Loading..." center='true'/>
          ):null}
          <ReactECharts option={this.state.chartdata}
          style={{
            paddingTop: '20pt',
            height: '600pt',
          }}
            />
        </div>
      </>
    )
  }
}

export default LineChart;
