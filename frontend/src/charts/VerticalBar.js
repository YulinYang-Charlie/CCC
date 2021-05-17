import React from 'react';
import { Bar } from 'react-chartjs-2';


class BarChart extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loading:true,
      data:{},
      chartData:{
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
      arr:[],
    }
  }
  componentWillMount(){
    console.log('willMount called')
    this.getData()
  }

  getData(){
    fetch('./testdata.json',{
      method:'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      mode:'cors',
      cache:'default'
    })
     .then(res =>res.json())
     .then((data) => {
       console.log('fetch data received')
       this.setState({
         data:data
       },function(){
        console.log('start setting states')
         this.state.data.forEach(element => {
           this.state.chartData.labels.push(element.name)
           this.state.chartData.datasets[0].data.push(element.total)
           this.setState({
             loading:false
           })
         });
       })
     }) 
    }

  render(){
    const datas = this.state.chartData
    console.log('start rendering')
    if (this.state.loading) return (
      <div>
        Loading...
      </div>
    )
    else return (
      <>
      <div className='header'>
        <h1 className='title'>Bar Chart</h1>
      </div>
      <Bar data={datas} />
    </>
    )
  }
}

export default BarChart;
