import React from "react";
import GroupedBar from '../charts/GroupedBar'
import { Button, SelectPicker } from "rsuite";
import { areas, keywords } from "../lib/Selections";

const tmpData = {
    labels: [],
    datasets: [
        {
        label: '# of Red Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
        },
        {
        label: '# of Blue Votes',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)',
        },
        {
        label: '# of Green Votes',
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
}

class GroupedBarPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            show:false,
            params: {
                keyword: "",
                area: "",
                startDate: "",
                endDate: ""
            },
        };
        this.show = this.show.bind(this);
    }

    show() {
        this.setState({
          show: true,
        });
        let params = this.state.params;
        // alert("params: " + params.keyword);
        fetch("http://172.26.133.151:8080//charts/getTweetsCountByStartEndDateAndKeyword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            keyword: params.keyword,
            area: params.area,
            startDate: "20210515",
            endDate: "20210518"
          }),
          mode: "cors",
          cache: "default",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.setState(
              {
                data: data,
              },
              function () {
                  for (const date in this.state.data) {
                    tmpData.labels.push(date);
                    for (const area in this.state.data[date]){
                        const areaData = {
                            label: area,
                        }
                    }
                  }
              }
            );
          });
      }

    getValueKeyword = (item) => {
        console.log("keyword: " + item.value);
        this.setState({
          params: {
            keyword: item.value,
            area: this.state.params.area,
          },
        });
    };
    
    getValueArea = (item) => {
        console.log("Area: " + item.value);
        this.setState({
          params: {
            keyword: this.state.params.keyword,
            area: item.value,
          },
        });
    };

    render(){
        return (
            <>
                <SelectPicker
                    data={areas}
                    style={{ width: 224 }}
                    onSelect={(v, i, e) => this.getValueArea(i)}
                />
                <SelectPicker
                    data={keywords}
                    style={{ width: 224, marginLeft: "5%" }}
                    onSelect={(v, i, e) => this.getValueKeyword(i)}
                />
                <Button
                    appearance="primary"
                    color="cyan"
                    style={{ width: 150, marginLeft: "5%" }}
                    onClick={this.show}
                    onChange={(e) => this.getValueKeyword(e)}
                >
                    {" "}
                    show result{" "}
                </Button>
                <GroupedBar />
            </>
        )
    }
}

export default GroupedBarPage