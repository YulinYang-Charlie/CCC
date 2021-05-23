import React from 'react';
import ReactECharts from 'echarts-for-react';

export class EmotionBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      chartData: {
        angleAxis: {
          type: 'category',
          data: ['Victoria', 'New South Wales', 'Queensland', 'Tasmania', 'South Australia']
        },
        radiusAxis: {},
        polar: {},
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4, 3],
          coordinateSystem: 'polar',
          name: 'positive',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }, {
          type: 'bar',
          data: [2, 4, 6, 1, 3],
          coordinateSystem: 'polar',
          name: 'neutral',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }, {
          type: 'bar',
          data: [1, 2, 3, 4, 1],
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
  }


  render() {
    const datas = this.state.chartData
    console.log('start rendering')
    // if (this.state.loading) return (
    //   <div>
    //     Loading...
    //   </div>
    // )
    return (
      <>
        <div>
          <ReactECharts option={this.state.chartData} style={{
            paddingTop: '20pt',
            height: '700pt'
          }}/>
        </div>
      </>
    )
  }
}

export default EmotionBar




