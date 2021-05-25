import React from 'react';
import { Pie } from 'react-chartjs-2';


class PieChart extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loading:true,
      data:{},
      chartData: props.chartData,
      area: '',
      keyword: '',
      show: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      chartData: props.chartData
    };
  }

  render(){
    const datas = this.state.chartData;
    if (!this.state.chartData) return (
      <div>
        Loading...
      </div>
    )
    else return (
      <>
      <div className='header'>
        <h1 className='title'>
          <h1 style={{
            fontSize: '100%',
              margin: 'auto'
          }}>Tweet counts about {this.props.keyword}
          </h1>
        </h1>
      </div>
      <div style={{
        height: '80%',
        width: '80%',
        paddingLeft: '18%',
      }}>
        <Pie data={datas} />
      </div>
    </>
    )
  }
}

export default PieChart;
