import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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
    },
  ],
};

class DoughnutChart extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:{},
      labels:[],
      datasets:[],
      arr:[],
    }
  }
  componentDidMount(){
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
       console.log(data)  
       this.setState({
         data:data
       },function(){
         console.log(this.state.data)
        //  let com = this.state.data.retBody.map((item,index)=>{
        //    console.log(item.id)
        //    return <li key={index}>{item.name}</li>
        //  })
        //  this.setState({
        //    arr : com
        //  },function(){
        //    console.log(this.state.arr)
        //  })
       })
     }) 
  }

  render(){
    return (
      <>
      <div className='header'>
        <h1 className='title'>Doughnut Chart</h1>
      </div>
      <Doughnut data={data} />
    </>
    )
  }
}

export default DoughnutChart;
