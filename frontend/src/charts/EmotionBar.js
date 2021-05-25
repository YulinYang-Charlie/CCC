import React from 'react';
import ReactECharts from 'echarts-for-react';
import {keywords} from "../lib/Selections";
import {Button, SelectPicker} from "rsuite";

export class EmotionBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      params: {
        keyword: "",
        area: "",
      },
      chartData: {
        angleAxis: {
          type: 'category',
          data: ['Victoria', 'New South Wales', 'Queensland', 'Tasmania', 'South Australia']
        },
        radiusAxis: {},
        polar: {},
        series: [{
          type: 'bar',
          data: [0, 0, 0, 0, 0],
          coordinateSystem: 'polar',
          name: 'positive',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }, {
          type: 'bar',
          data: [0, 0, 0, 0, 0],
          coordinateSystem: 'polar',
          name: 'neutral',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }, {
          type: 'bar',
          data: [0, 0, 0, 0, 0],
          coordinateSystem: 'polar',
          name: 'negative',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }],
        legend: {
          show: true,
          data: ['positive', 'neutral', 'negative']
        }
      }
    }
    this.show = this.show.bind(this);
  }

  getValueKeyword = (item) => {
    console.log("keyword: " + item.value);
    this.setState({
      params: {
        keyword: item.value
      },
    });
  };

  show() {
    this.setState({
      loading:true
    });
    fetch("http://172.26.133.151:8080/charts/getTweetsByKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        keyword: this.state.params.keyword,
      }),
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({loading:true, chartData: this.setChartData(data)});
        console.log(this.state.chartData);
      });
  }

  setChartData(data) {
    let chartdata = {
      angleAxis: {
        type: 'category',
        data: ['Victoria', 'New South Wales', 'Queensland', 'Tasmania', 'South Australia']
      },
      radiusAxis: {},
      color: {
        0: '#f7ce3e',
        1: '#c5c1c0',
        2: '#1a2930',
      },
      polar: {},
      series: [{
        type: 'bar',
        data: [100, 100, 100, 100, 100],
        coordinateSystem: 'polar',
        name: 'positive',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      }, {
        type: 'bar',
        data: [100, 100, 100, 100, 100],
        coordinateSystem: 'polar',
        name: 'neutral',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      }, {
        type: 'bar',
        data: [100, 100, 100, 100, 100],
        coordinateSystem: 'polar',
        name: 'negative',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      }],
      legend: {
        show: true,
        data: ['positive', 'neutral', 'negative']
      }
    }

    // "New South Wales": "8166369",
    // "Victoria": "6680648",
    // "Queensland": "5184847",
    // "South Australia": "1770591",
    // "Western Australia": "2667130",
    // "Tasmania": "541071",
    // "Northern Territory": "246500",
    // "Australia": "25693059"

    if (data !== {}) {
      const locations = ['Victoria', 'New south wales', 'Queensland', 'Tasmania', 'South australia']
      const populations = [6680648, 8166369, 5184847, 541071, 1770591]
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 3; i++) {
          chartdata['series'][i]['data'][j] = data[locations[j]]['emotions'][i] / populations[j] * 1000
        }
      }

    }

    return chartdata
  }

  render() {
    console.log('start rendering')
    // if (this.state.loading) return (
    //   <div>
    //     Loading...
    //   </div>
    // )
    return (
      <>
        <div style={{
          paddingTop: '20pt'
        }}>

        </div>
        <div style={{
          display: "flex",
          paddingLeft: "20%",
          paddingRight: "20%",
          justifyContent: "center",
          margin: "auto",

        }}>
          <h1>Tweet emotions about</h1>
          <SelectPicker
            data={keywords}
            style={{width: 224, marginLeft: '3%', marginTop: '1.5%'}}
            onSelect={(v, i, e) => this.getValueKeyword(i)}
          />
          <Button
            appearance="primary"
            color="cyan"
            style={{width: 100, marginLeft: '1%', marginTop: '1.5%',marginBottom:'1.5%'}}
            onClick={this.show}
          >
            show result
          </Button>
        </div>
        <div>
          <ReactECharts option={this.state.chartData} style={{
            paddingTop: '20pt',
            height: '600pt'
          }}/>
        </div>
      </>
    )
  }
}

export default EmotionBar




