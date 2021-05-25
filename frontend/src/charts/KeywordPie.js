import React from 'react';
import ReactECharts from 'echarts-for-react';
import {areas, keywords} from "../lib/Selections";
import {Button, Loader, SelectPicker} from "rsuite";

let area
let dataSet = [
  {value: 0, name: 'mask'},
  {value: 0, name: 'covid'},
  {value: 0, name: 'lockdown'},
  {value: 0, name: 'quarantine'},
  {value: 0, name: 'international'},
  {value: 0, name: 'vaccine'},
  {value: 0, name: 'migration'},
]

let fetchCount = 0

export class KeywordPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: {
        title: {
          text: 'Tweet keywords',
          left: 'center',
          top: 200,
          textStyle: {
            color: '#6f6e6e',
            fontSize: 37
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Keyword',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 0, name: 'mask'},
              {value: 0, name: 'covid'},
              {value: 0, name: 'lockdown'},
              {value: 0, name: 'quarantine'},
              {value: 0, name: 'international'},
              {value: 0, name: 'vaccine'},
              {value: 0, name: 'migration'},
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(0,0,0,0.54)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0.54)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#5497c7',
              shadowBlur: 200,
              shadowColor: 'rgba(36,36,36,0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      }
    }
    this.fetchData = this.fetchData.bind(this);
  }

  setArea(item) {
    console.log("area: " + item.value);
    area = item.value
  }

  fetchData() {
    if (!area) {
      console.log('missing area')
      return
    }
    fetchCount = 0
    let option = {
      title: {
        text: 'Tweet keywords',
        left: 'center',
        top: 200,
        textStyle: {
          color: '#6f6e6e',
          fontSize: 37
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 100,
        max: 3000,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Keyword',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            {value: 0, name: 'mask'},
            {value: 0, name: 'covid'},
            {value: 0, name: 'lockdown'},
            {value: 0, name: 'quarantine'},
            {value: 0, name: 'international'},
            {value: 0, name: 'vaccine'},
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(0,0,0,0.54)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0.54)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#5fafd7',
            shadowBlur: 200,
            shadowColor: 'rgba(36,36,36,0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    }
    this.setState({loading: true})
    keywords.forEach((value => {
      let k = value[['value']]
      console.log("k: " + k)
      fetch("http://172.26.133.151:8080/charts/getTweetsByKeyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          keyword: k,
          location: area,
        }),
        mode: "cors",
        cache: "default",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data[area]) dataSet[k] = data[area]['count']
        }).then(() => {
        fetchCount++
        if (fetchCount > 6) {
          option['series'][0]['data'][0]['value'] = dataSet['mask']
          option['series'][0]['data'][1]['value'] = dataSet['covid']
          option['series'][0]['data'][2]['value'] = dataSet['lockdown']
          option['series'][0]['data'][3]['value'] = dataSet['quarantine']
          option['series'][0]['data'][4]['value'] = dataSet['international']
          option['series'][0]['data'][5]['value'] = dataSet['vaccine']
          option['series'][0]['data'].sort(function (a, b) {
            return a.value - b.value;
          })

          // let dMax = Math.max[dataSet['mask'], dataSet['covid'], dataSet['lockdown'], dataSet['quarantine'], dataSet['international'], dataSet['vaccine']]

          let dMax = option['series'][0]['data'][5].value
          console.log('dMax: '+dMax)
          option['visualMap']['max'] = dMax*1.2

          console.log(option)
          this.setState({
            options: option,
            loading: false
          });
        }
      })
    }))

  }

  render() {
    return (
      <>
        <div style={{
          paddingTop: '20pt',
          display: 'flex',
          margin: 'auto',
          justifyContent: "center",
        }}>
          <SelectPicker
            data={areas}
            style={{width: 224, marginLeft: '2%'}}
            onSelect={(v, i, e) => this.setArea(i)}
          />
          <Button
            appearance="primary"
            color="cyan"
            style={{width: 150, marginLeft: "5%", zIndex: 10,}}
            onClick={this.fetchData}
          >
            show result
          </Button>
        </div>
        <div>
          {this.state.loading ? (
            <Loader content="Loading..." center='true' size='lg'/>
          ) : null}
          <ReactECharts option={this.state.options} style={{
            marginTop: '-120pt',
            marginLeft: "20%",
            marginRight: "20%",
            height: '900pt',
          }}/>
        </div>
      </>
    )
  }
}

export default KeywordPie