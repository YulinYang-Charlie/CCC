import React from 'react';
import ReactECharts from 'echarts-for-react';
import {keywords} from "../lib/Selections";
import {Button, Loader, SelectPicker, DateRangePicker} from "rsuite";


let keyword
let startDate = '20210521'
let endDate = '20210525'

// let sum = function (x, y) {
//   return x + y;
// };
// let square = function (x) {
//   return x * x;
// };


export class SingleAxis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loading: false,
      options: {
        tooltip: {
          position: 'top'
        },
        title: [],
        singleAxis: [],
        series: []
      },
    }
    this.fetchData = this.fetchData.bind(this);
  }

  setValueKeyword = (item) => {
    console.log("keyword: " + item.value);
    keyword = item.value
  };

  fetchData() {
    if (!keyword) {
      console.log('missing keyword')
      return
    }
    this.setState({loading: true})
    console.log('start fetch data')
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
        this.setState({
          options: this.getAxisData(data),
          loading: false
        });
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
    let allMax = 0
    for (let i = 0; i < 5 * len; i++) {
      countsData.push([]);
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < len; j++) {
        let num = data[days[j]][areas[i]]['total']
        if (num === 0){
          console.log(areas[i] + 'is 0')
          num = 1
        }
        num = num/populations[i]
        if (num > allMax) allMax = num
      }
    }
    console.log('allMax: ' + allMax)
    let t = 33 / allMax

    for (let i = 0; i < 5; i++) {
      // let dataS = []
      for (let j = 0; j < len; j++) {
        countsData[i * len + j][0] = i
        countsData[i * len + j][1] = j
        countsData[i * len + j][2] = data[days[j]][areas[i]]['total'] / populations[i] * t
        // dataS.push(data[days[j]][areas[i]]['total'] / populations[i]*10000)
      }

      // let mean = dataS.reduce(sum)/dataS.length;
      // let deviations = dataS.map(function(x){return x-mean;});
      // let stddev = Math.sqrt(deviations.map(square).reduce(sum)/(dataS.length-1));
      // console.log("dataS: " + dataS);
      // let min = dataS[0]
      // let max = dataS[0]
      //
      // dataS.forEach(value=>{
      //   if (value < min) min = value
      //   if (value > max) max = value
      // })
      //
      // console.log("max: " + max);
      // console.log("min: " + min);
      //
      // for (let j = 0; j < len; j++) countsData[i * len + j][2] = dataS[j]
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

  dateToString(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    return year + month + day;
  }

  setDate(dates) {
    startDate = this.dateToString(dates[0])
    endDate = this.dateToString(dates[1])
    console.log('startDate: ' + startDate)
    console.log('endDate: ' + endDate)
  }

  render() {
    console.log('start rendering')
    let day1 = new Date();
    const {
      allowedRange,
    } = DateRangePicker;
    day1.setDate(day1.getDate() - 1);
    return (
      <>
        <div style={{
          paddingTop: '20pt',
          display: 'flex',
          margin: 'auto',
          justifyContent: "center",
        }}>
          <div>
            <DateRangePicker disabledDate={allowedRange('2021-5-11', day1)} onOk={(dates) => this.setDate(dates)}/>
          </div>
          <SelectPicker
            data={keywords}
            style={{width: 224, marginLeft: '2%'}}
            onSelect={(v, i, e) => this.setValueKeyword(i)}
          />
          <Button
            appearance="primary"
            color="cyan"
            style={{width: 150, marginLeft: "5%"}}
            onClick={this.fetchData}
          >
            show result
          </Button>
        </div>
        <div style={{
          display: "flex",

          paddingTop: '1%',
          justifyContent: "center",
          margin: "auto",
        }}>
          <h2>Everyday tweet counts</h2>
        </div>
        <div>
          {this.state.loading ? (
            <Loader content="Loading..." center='true' size='lg'/>
          ) : null}
          <ReactECharts option={this.state.options} style={{
            paddingTop: '20pt',
            paddingLeft: "20%",
            paddingRight: "20%",
            height: '500pt'
          }}/>
        </div>
      </>
    )
  }
}

export default SingleAxis