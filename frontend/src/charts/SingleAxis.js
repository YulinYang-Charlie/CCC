import React from 'react';
import ReactECharts from 'echarts-for-react';
import {keywords} from "../lib/Selections";
import {SelectPicker} from "rsuite";


let keyword
let startDate = '20210515'
let endDate = '20210523'

let sum = function (x, y) {
  return x + y;
};
let square = function (x) {
  return x * x;
};


export class SingleAxis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loading: true,
      options: {
        tooltip: {
          position: 'top'
        },
        title: [],
        singleAxis: [],
        series: []
      },
    }
  }

  setValueKeyword = (item) => {
    console.log("keyword: " + item.value);
    keyword = item.value
    this.fetchData()
  };

  fetchData() {
    this.setState({
      show: true,
    });
    fetch("http://172.26.133.151:8080/charts/getTweetsCountByStartEndDateAndKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
        startDate: startDate,
        endDate: endDate,
      }),
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({options: this.getAxisData(data)});
        console.log(this.state.options);
      });
  }

  getAxisData(data) {
    const days = [] // [20210520, 20212521, 20210522...]
    console.log("days: " + days);
    for (let d in data) days.push(d);
    const len = days.length
    if (len === 0) return
    const areas = ['Victoria', 'New south wales', 'Queensland', 'Tasmania', 'South australia'];
    const populations = [6680648, 8166369, 5184847, 541071, 1770591]

    let countsData = []
    for (let i = 0; i < 5 * len; i++) {
      countsData.push([]);
    }

    for (let i = 0; i < 5; i++) {
      let dataS = []
      for (let j = 0; j < len; j++) {
        countsData[i * len + j][0] = i
        countsData[i * len + j][1] = j
        countsData[i * len + j][2] = data[days[j]][areas[i]]['total'] / populations[i] * 4000
        dataS.push(data[days[j]][areas[i]]['total'] / populations[i]*8000)
      }

      let mean = dataS.reduce(sum)/dataS.length;
      let deviations = dataS.map(function(x){return x-mean;});
      let stddev = Math.sqrt(deviations.map(square).reduce(sum)/(dataS.length-1));
      console.log("dataS: " + dataS);
      let min = dataS[0]
      let max = dataS[0]

      dataS.forEach(value=>{
        if (value < min) min = value
        if (value > max) max = value
      })

      console.log("max: " + max);
      console.log("min: " + min);

      for (let j = 0; j < len; j++) countsData[i * len + j][2] = dataS[j]
    }


    let option = {
      tooltip: {
        position: 'top'
      },
      title: [],
      singleAxis: [],
      series: []
    };

    areas.forEach(function (day, idx) {
      option.title.push({
        textBaseline: 'middle',
        top: (idx + 0.5) * 100 / 5 + '%',
        text: day
      });
      option.singleAxis.push({
        left: 150,
        type: 'category',
        boundaryGap: false,
        data: days,
        top: (idx * 100 / 5 + 5) + '%',
        height: (100 / 5 - 10) + '%',
        axisLabel: {
          interval: 2
        }
      });
      option.series.push({
        singleAxisIndex: idx,
        coordinateSystem: 'singleAxis',
        type: 'scatter',
        data: [],
        symbolSize: function (dataItem) {
          return dataItem[1] * 4;
        }
      });
    });

    countsData.forEach(function (dataItem) {
      option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
    });

    return option
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
          <h2>Everyday tweet counts</h2>
          <SelectPicker
            data={keywords}
            style={{width: 224, marginLeft: '3%', marginTop: '1.5%'}}
            onSelect={(v, i, e) => this.setValueKeyword(i)}
          />
        </div>
        <div>
          <ReactECharts option={this.state.options} style={{
            paddingTop: '20pt',
            paddingLeft: '150pt',
            paddingRight: '150pt',
            height: '500pt'
          }}/>
        </div>
      </>
    )
  }
}

export default SingleAxis