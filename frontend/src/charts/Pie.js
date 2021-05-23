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
          }}>Tweet counts
          </h1>
        </h1>
      </div>
      <Pie data={datas} />
    </>
    )
  }
}

export default PieChart;
