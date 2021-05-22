import React from "react";
import PieChart from "../charts/Pie";

class PiePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: '',
            keywords: ['---', 'mask', 'covid', 'pandemic', 'lockdown'],
            areas: ['---', 'all', 'victoria', 'new south wales', 'queensland', 'tasmania',
            'western australia', 'northern territories', 'south australia'],
        };
        this.showChart = this.showChart.bind(this);
    }

    getValueKeyword = (event) => {
        //获取被选中的值
        console.log('keyword: ' + event.target.value);
        this.setState({
            //默认值改变
            selectKeyword: event.target.value
        })
    }

    getValueArea = (event) => {
        //获取被选中的值
        console.log('Area: ' + event.target.value);
        this.setState({
            //默认值改变
            selectArea: event.target.value
        })
    }

    showChart() {
        this.setState({
            show: true,
            params:{
                keyword: this.state.selectKeyword,
                area: this.state.selectArea
            }
        });
    }

    render() {
        return (
            <>
                <div style={{
                    padding: '50px',
                    margin: 'auto',
                }}>
                    <div style={{
                        display: 'flex',
                        paddingLeft: '20%',
                        paddingRight: '20%',
                        justifyContent: 'center',
                        margin: 'auto',
                    }}>
                        keyword: <select style={{
                        marginRight: '10%',
                    }} value={this.state.selectKeyword} onChange={(e) => this.getValueKeyword(e)}>
                        {
                            this.state.keywords.map((ele, index) => {
                                return (
                                    <option key={index}>{ele}</option>
                                )
                            })
                        }
                    </select>
                        area: <select style={{
                        marginRight: '10%',
                    }} value={this.state.selectArea} onChange={(e) => this.getValueArea(e)}>
                        {
                            this.state.areas.map((ele, index) => {
                                return (
                                    <option key={index}>{ele}</option>
                                )
                            })
                        }
                    </select>
                        <button onClick={this.showChart}>click to submit</button>

                    </div>
                    {
                        this.state.show ? (

                            <div style={{
                                height: '50%',
                                width: '50%',
                                margin: 'auto',
                                top: '20px',
                            }}>
                                <div>
                                    <PieChart param={this.state.params}/>
                                </div>
                            </div>

                        ) : null
                    }
                </div>
            </>
        );
    }
}

export default PiePage;