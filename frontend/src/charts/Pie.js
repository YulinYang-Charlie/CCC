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

  // componentDidUpdate(nextProps) {
  //   const {show} = this.props;
  //   if (nextProps.show !== show){
  //     this.setState({
  //       chartData: nextProps.chartData
  //     })
  //   }
  // }

  getData(params){
    console.log("parameter: " + params.keyword)
    fetch('http://119.45.38.52:8080/charts/getTweetsByKeyword',{
      method:'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'keyword': params.keyword
      }),
      mode:'cors',
      cache:'default'
    })
     .then(res =>res.json())
     .then((data) => {
       this.setState({
         data:data,
         chartData: {
          labels:[],
          datasets:
          [
            {
            label: '# of tweets',
            data: [],
            backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            }
          ]
        },
       },function(){
         for (const region in this.state.data){
           this.state.chartData.labels.push(region);
           this.state.chartData.datasets[0].data.push(this.state.data[region].count);
           this.setState({
             loading: false
           })
         };
       })
     }) 
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
