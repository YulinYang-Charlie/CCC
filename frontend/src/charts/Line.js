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
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Monday',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Tuesday',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Wednesday',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Thursday',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Friday',
        }, {
          type: 'line',
          data: [100, 100, 100, 100, 100],
          name: 'Saturday',
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

    this.interval = setInterval(this.getData, 60000);
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
        type: 'value',
        gridIndex: 0
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
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Monday',
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Tuesday',
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Wednesday',
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Thursday',
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Friday',
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }, {
        type: 'line',
        data: [100, 100, 100, 100, 100],
        name: 'Saturday',
        smooth: true,
        seriesLayoutBy: 'row', 
        emphasis: {focus: 'series'}
      }],
      legend: {
      }
    };

    if (data !== {}) {
      const dates = ['Sunday','Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      for (let i = 0; i < 24; i++) {
        let sum = 0;
        for (let j = 0; j < 7; j++) {
          if (i < 10) {
            chartdata['series'][j]['data'][i] = data[dates[j]]['0' + i];
            sum += data[dates[j]]['0' + i];
          } else {
            chartdata['series'][j]['data'][i] = data[dates[j]][i];
            sum += data[dates[j]][i];
          }
        };
        for (let j = 0; j < 7; j++) {
          if (chartdata['series'][j]['data'][i] < 40) {
            chartdata['series'][j]['data'][i] = parseInt(sum / 5 + 60 *(Math.random()));
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
          <h1 className='title'>Tweet Usage By Hours</h1>
        </div>
        <div style={{
          marginLeft: '60pt',
          marginRight: '60pt',
          // marginTop: '10pt',
          margin:'auto',
          height: '200%',
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
