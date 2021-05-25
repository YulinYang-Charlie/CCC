import React from 'react';
import ReactECharts from 'echarts-for-react';
import {areas, keywords, keywordsNoMig} from "../lib/Selections";
import {Button, DateRangePicker, Loader, SelectPicker} from "rsuite";
import EmotionBar from "./EmotionBar";

let option = {
  title: {
    text: 'Tweet keywords',
    left: 'center',
    top: 200,
    textStyle: {
      color: '#6f6e6e',
      fontSize:40
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
        {value: 335, name: 'Mask'},
        {value: 310, name: 'Covid'},
        {value: 235, name: 'Lockdown'},
        {value: 400, name: 'Quarantine'},
        {value: 235, name: 'International'},
        {value: 400, name: 'Vaccine'},
        {value: 274, name: 'Migration'},
      ].sort(function (a, b) { return a.value - b.value; }),
      roseType: 'radius',
      label: {
        color: 'rgb(0,0,0)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgb(0,0,0)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#efba34',
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
};

export class KeywordPie extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options:  {
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
              {value: 0, name: 'Mask'},
              {value: 0, name: 'Covid'},
              {value: 0, name: 'Lockdown'},
              {value: 0, name: 'Quarantine'},
              {value: 0, name: 'International'},
              {value: 0, name: 'Vaccine'},
              {value: 0, name: 'Migration'},
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              color: 'rgb(0,0,0)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgb(0,0,0)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#f7ce3e',
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
            // onSelect={(v, i, e) => this.setValueKeyword(i)}
          />
          <Button
            appearance="primary"
            color="cyan"
            style={{width: 150, marginLeft: "5%"}}
            // onClick={this.fetchData}
          >
            show result
          </Button>
        </div>
        <div>
          {this.state.loading ? (
            <Loader content="Loading..." center='true' size='lg'/>
          ) : null}
          <ReactECharts option={option} style={{
            marginTop: '-120pt',
            // paddingLeft: "20%",
            // paddingRight: "20%",
            height: '900pt',
            // width:'900pt'
          }}/>
        </div>
      </>
    )
  }
}

export default KeywordPie