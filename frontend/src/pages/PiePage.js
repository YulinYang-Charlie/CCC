import React from "react";
import PieChart from "../charts/Pie";
import {Button, SelectPicker} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {areas, keywords} from '../lib/Selections'

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


    getValueKeyword = (item) => {
        //获取被选中的值
        console.log('keyword: ' + item.value);
        this.setState({
            //默认值改变
            selectKeyword: item.value
        })
    }

    getValueArea = (item) => {
        //获取被选中的值
        console.log('Area: ' + item.value);
        this.setState({
            //默认值改变
            selectArea: item.value
        })
    }

    showChart() {
        this.setState({
            show: true,
            params: {
                keyword: this.state.selectKeyword,
                area: this.state.selectArea
            }
        });
    }


    render() {


        return (
            <>
                <div style={{
                    padding: '30px',
                    margin: 'auto',
                }}>
                    <div style={{
                        display: 'flex',
                        paddingLeft: '20%',
                        paddingRight: '20%',
                        justifyContent: 'center',
                        margin: 'auto',
                    }}>
                        <SelectPicker data={areas} style={{width: 224}} onSelect={(v, i, e) => this.getValueArea(i)}/>
                        <SelectPicker data={keywords} style={{width: 224, marginLeft: '5%'}}
                                      onSelect={(v, i, e) => this.getValueKeyword(i)}/>
                        <Button appearance="primary" color="cyan" style={{width: 150, marginLeft: '5%'}}
                                onClick={this.showChart}
                                onChange={(e) => this.getValueKeyword(e)}> show result </Button>

                    </div>
                    {
                        this.state.show ? (

                            <div style={{
                                height: '50%',
                                width: '50%',
                                margin: 'auto',
                                paddingTop: '40px',
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