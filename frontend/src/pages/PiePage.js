import React from "react";
import { Pie } from "react-chartjs-2";

class PiePage extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            loading:true,
            value: '',
            keywords: ['mask', 'covid', 'pandemic', 'lockdown'],
            areas: ['all', 'victoria', 'new south wales', 'queensland', 'tasmania', 
            'western australia', 'northern territories', 'south australia'],
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
        };
    }
    
    getValueKeyword=(event)=>{
        //获取被选中的值
        console.log('keyword: ' + event.target.value);
        this.setState({
          //默认值改变
          selectKeyword:event.target.value
        })
    }

    getValueArea=(event)=>{
        //获取被选中的值
        console.log('Area: ' + event.target.value);
        this.setState({
          //默认值改变
          selectArea:event.target.value
        })
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

    render() {
        return (
        <>
        <div style={{
            display: 'flex',
            marginLeft: '10%',
        }}>
          keyword: <select style={{
                marginRight: '10%',
            }} value={this.state.selectKeyword} onChange={(e)=>this.getValueKeyword(e)}>
          {
            this.state.keywords.map((ele,index)=>{
              return(
                <option key={index}>{ele}</option>
              )
            })
          }
          </select>
          area: <select style={{
                marginRight: '10%',
            }} value={this.state.selectArea} onChange={(e)=>this.getValueArea(e)}>
          {
            this.state.areas.map((ele,index)=>{
              return(
                <option key={index}>{ele}</option>
              )
            })
          }
          </select>
          <button onClick={this.getData()}>click to submit</button>
        </div>
        <div>
            <Pie data={this.state.data}/>
        </div>
        </>
        );
    }
}

export default PiePage;