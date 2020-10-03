import React, { Component } from 'react';
import { Line,Chart } from 'react-chartjs-2';
import Modal from 'react-modal';
let minTick = Infinity,maxTick=-Infinity;
let minPow=0,maxPow=0;
var chartdata = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',"Aug","Sep","Oct","Nov","Dec"],
  datasets: [
    {
      label: 'Generation',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#ffa600',
      borderColor: '#ffa600',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'Emission',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#ff6361',
      borderColor: '#ff6361',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'Water Withdrawal',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#bc5090',
      borderColor: '#bc5090',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'Water Consumption',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#58508d',
      borderColor: '#58508d',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'Water Availablility',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#003f5c',
      borderColor: '#003f5c',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};
var options = {

  legend: {
    position: 'top',
    labels: {
      boxWidth: 50,
      fontColor: 'brown'
    }
  },
  scales: {
    yAxes: [{

      type: "logarithmic",
      scaleLabel: {
        display: true,
      },
      ticks: {

        // autoSkip: true,
        callback: (value, index) => {       
          return value.toLocaleString();
        },
      },
      afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need

        chartObj.ticks = [];
        console.log(minPow-1);
        for(let i=minPow;i<=maxPow;i++)
        {
          chartObj.ticks.push(Math.pow(10,i));  
        }
        console.log("ChartObj")
        console.log(chartObj.ticks)
      }

    }]
  }
  
}

class FacilityChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      facilityData:this.props.facilityData,
      startDateProps:this.props.startDate,
      endDateProps:this.props.endDate,
    }
  }
  componentDidMount(){
    console.log("componentDidMount");
    this.setState({
        isLoaded: true,
    })
  }
  render() {
    if (!this.state.isLoaded || this.state.items === undefined) {
      return <div>Loading...

      </div>
    }
    else{
      var lineChartData = {}
      lineChartData.gen = []
      lineChartData.ww = []
      lineChartData.wc = []
      lineChartData.em = []
      lineChartData.labels = []
      
      var data=this.state.facilityData["MonthlyData"];
      
      for(let i=0;i<data.length;i++)
      {
          lineChartData.gen.push(data[i].generation);
          lineChartData.ww.push(data[i].waterWithdrawal);
          lineChartData.wc.push(data[i].waterConsumption);
          lineChartData.em.push(data[i].emissions);
          lineChartData.labels.push(data[i].year+"-"+data[i].month);
      }
      chartdata["datasets"][0]["data"]=lineChartData.gen;
      chartdata["datasets"][1]["data"]=lineChartData.em;
      chartdata["datasets"][2]["data"]=lineChartData.ww;
      chartdata["datasets"][3]["data"]=lineChartData.wc;
      chartdata.labels=lineChartData.labels;
      let startDate=this.props.startDate;
      let endDate=this.props.endDate;
      maxTick=Math.max(maxTick,...chartdata["datasets"][0]["data"],...chartdata["datasets"][1]["data"],...chartdata["datasets"][2]["data"],...chartdata["datasets"][3]["data"]);
      minTick=Math.min(minTick,...chartdata["datasets"][0]["data"],...chartdata["datasets"][1]["data"],...chartdata["datasets"][2]["data"],...chartdata["datasets"][3]["data"]);
      minPow=minTick.toExponential(0).split("+")[1]
      maxPow=maxTick.toExponential(0).split("+")[1]
      return(
        <div>
          <b>{this.state.facilityData["Facility"][0]["PRIMARY_NAME"]} - Facility Trends</b>
          <b><p>({startDate.split(" ")[1]} {startDate.split(" ")[3]} - {endDate.split(" ")[1]} {endDate.split(" ")[3]})</p></b>
          <div>
          <Line data={chartdata} options={options} redraw />
        </div>
        </div>
      ); 
    }
  }
}
export default FacilityChart;