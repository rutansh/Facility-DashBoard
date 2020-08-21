import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Modal from 'react-modal';
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
  scales:{
    yAxes: [{
      display: true,
      type: 'logarithmic',
      ticks:{
          //  min: 100, //minimum tick
          //  max: 10000000, //maximum tick
          callback: function (value, index, values) 
          {
            return ""+Number(value.toString());
          }    
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
      console.log(this.state.facilityData["MonthlyData"])
      var data=this.state.facilityData["MonthlyData"];
      console.log("line chart data for facility");
      for(let i=0;i<data.length;i++)
      {
          lineChartData.gen.push(data[i].generation);
          lineChartData.ww.push(data[i].waterWithdrawal);
          lineChartData.wc.push(data[i].waterConsumption);
          lineChartData.em.push(data[i].emissions);
          lineChartData.labels.push(data[i].year+"-"+data[i].month);
      }
      console.log("dict of facilities in chart")
      console.log(lineChartData);
      chartdata["datasets"][0]["data"]=lineChartData.gen;
      chartdata["datasets"][1]["data"]=lineChartData.em;
      chartdata["datasets"][2]["data"]=lineChartData.ww;
      chartdata["datasets"][3]["data"]=lineChartData.wc;
      chartdata.labels=lineChartData.labels;
      let startDate=this.props.startDate;
      let endDate=this.props.endDate;
      return(
        <div>
        {console.log("this.props.startDate")}
        {console.log(this.props.startDate)}
          <b>{this.state.facilityData["Facility"][0]["PRIMARY_NAME"]} - Facility Trends</b>
          <b><p>({startDate.split(" ")[1]} {startDate.split(" ")[3]} - {endDate.split(" ")[1]} {endDate.split(" ")[3]})</p></b>
          <div style={{height:"450px"}}>
          <Line data={chartdata} options={options} redraw />
        </div>
        </div>
      ); 
    }
  }
}
export default FacilityChart;