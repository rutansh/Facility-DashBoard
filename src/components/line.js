import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

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

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,

    }
  }
  async componentDidMount() {
    //Request URL: https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/REF2019/AVG45/stateName/california/2049/1/2050/12/fuelTypes/all

    var startDate = this.props.historicStartDate;
    var endDate = this.props.historicEndDate;
    var mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
    var startYear = parseInt(startDate.split(" ")[3])
    var endYear = parseInt(endDate.split(" ")[3])
    var startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
    if (this.props.historicInputState.toLowerCase().includes("state")) {
      var stateName = this.props.historicInputState.toLowerCase().split("(")[0]
      var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/stateName/" + stateName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/"+this.props.filterstr
    }
    else if (this.props.historicInputState.toLowerCase().includes("county")) {
      var countyName = this.props.historicInputState.toLowerCase();
      var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/CountyState1/" + countyName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/all"
    }
    else {
      //watershed
    }
    try {
      var response = await fetch(url)
      var json = await response.json()
      //this.updateState(json,pP);

      setTimeout(() => {
        this.setState({
          items: json,
          isLoaded: true,
        }, () => { });
      }, 0);
    }
    catch (e) {
      console.log(e);
    }
  }
  async componentDidUpdate(pP, pS, snap) {
    if (pP.historicInputState === this.props.historicInputState && pP.historicStartDate === this.props.historicStartDate && pP.historicEndDate === this.props.historicEndDate&&this.props.filterstr==pP.filterstr) {
      //do nothing
    }
    else {
      
      var startDate = this.props.historicStartDate;
      var endDate = this.props.historicEndDate;
      var mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
      var startYear = parseInt(startDate.split(" ")[3])
      var endYear = parseInt(endDate.split(" ")[3])
      var startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
      var endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
      if (this.props.historicInputState.toLowerCase().includes("state")) {
        var stateName = this.props.historicInputState.toLowerCase().split("(")[0]
        var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/stateName/" + stateName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/"+this.props.filterstr
      }
      else if (this.props.historicInputState.toLowerCase().includes("county")) {
        var countyName = this.props.historicInputState.toLowerCase();
        var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/CountyState1/" + countyName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/"+this.props.filterstr
      }
      else {
        //watershed
      }
      try {
        var response = await fetch(url)
        var json = await response.json()
        //this.updateState(json,pP);

        setTimeout(() => {
          this.setState({
            items: json,
          }, () => { });
        }, 0);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    if (!this.state.isLoaded || this.state.items === undefined) {
      return <div>Loading...</div>
    }
    else {
      var lineChartData = {}
      lineChartData.gen = []
      lineChartData.ww = []
      lineChartData.wc = []
      lineChartData.wa = []
      lineChartData.em = []
      lineChartData.labels = []

      var years = [];
      var data=this.state.items;

      var mapping={1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    

      years = Object.keys(data.MonthWiseSummary);
      

      var i,j,months;
      for (i in years) {
        months = [];
        months = data.MonthWiseSummary[Object.keys(data.MonthWiseSummary)[i]];
        for (j in months) {
          lineChartData.gen.push(data.MonthWiseSummary[years[i]][j].generation);
          lineChartData.ww.push(data.MonthWiseSummary[years[i]][j].waterWithdrawal);
          lineChartData.wc.push(data.MonthWiseSummary[years[i]][j].waterConsumption);
          lineChartData.em.push(data.MonthWiseSummary[years[i]][j].emission);
          lineChartData.wa.push(data.MonthWiseSummary[years[i]][j].waterAvailability);
          lineChartData.labels.push(years[i]+"-"+j);
        }
       
        
      }

      //data: [{em:[]},{gen:[]},{ww:[]},{wc:[]},{wa:[]}]
      chartdata["datasets"][0]["data"]=lineChartData.gen;
      chartdata["datasets"][1]["data"]=lineChartData.em;
      chartdata["datasets"][2]["data"]=lineChartData.ww;
      chartdata["datasets"][3]["data"]=lineChartData.wc;
      chartdata["datasets"][4]["data"]=lineChartData.wa;
      chartdata.labels=lineChartData.labels;
      return (
        <div style={{height:"800px",overflowY:"scroll"}}>
          <p>Line chart</p>
          <Line data={chartdata} options={options} redraw />
        </div>
      );
    }

  }
}
export default LineChart;
//https://ewed.org:41513/ewedService/getFutureData/getMonthWiseSummary/REF2019/AVG45/HUC8Name/upper%20tuolumne%20watershed%20(ca)/2049/1/2050/12/fuelTypes/all