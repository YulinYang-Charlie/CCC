import React from "react";
import PieChart from "../charts/Pie";
import { Button, SelectPicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { areas, keywords } from "../lib/Selections";

let params = {};
let chartData = {
  labels: [],
  datasets: [
    {
      label: "# of tweets",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

class PiePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: "",
      keywords: ["---", "mask", "covid", "pandemic", "lockdown"],
      areas: [
        "---",
        "all",
        "victoria",
        "new south wales",
        "queensland",
        "tasmania",
        "western australia",
        "northern territories",
        "south australia",
      ],
      params: {
        keyword: "",
        area: "",
      },
      data: {},
      update: false,
    };
    this.show = this.show.bind(this);
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

  show() {
    this.setState({
      show: true,
    });
    params = this.state.params;
    // alert("params: " + params.keyword);
    fetch("http://172.26.133.151:8080/charts/getTweetsByKeyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        keyword: params.keyword,
      }),
      mode: "cors",
      cache: "default",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        chartData = {
          labels: [],
          datasets: [
            {
              label: "# of tweets",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
        this.setState(
          {
            data: data,
          },
          function () {
            for (const region in this.state.data) {
              chartData.labels.push(region);
              chartData.datasets[0].data.push(this.state.data[region].count);
            }
          }
        );
        this.setState({
          chartData: chartData,
          update: !this.state.update
        });
      });
  }

  render() {
    console.log(this.state.chartData)
    return (
      <>
        <div
          style={{
            padding: "30px",
            margin: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingLeft: "20%",
              paddingRight: "20%",
              justifyContent: "center",
              margin: "auto",
            }}
          >
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
          </div>
          {this.state.show ? (
            <div
              style={{
                height: "50%",
                width: "50%",
                margin: "auto",
                paddingTop: "40px",
              }}
            >
              <div>
                <PieChart chartData={this.state.chartData} show={this.state.update}/>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default PiePage;
