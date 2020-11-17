import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';


// Line component from chartjs is used to render the line chart


// minTick ,maxTick is used to styling in linechart to define the range
let minTick = Infinity,maxTick=-Infinity;
let minPow=0,maxPow=0;

// Initializing chartdata, this will be updated once user has got the data from the API endpoint
var chartdata = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"],
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

// Optons is for styling in the line chart
var options = {
  maintainAspectRatio:false,
  legend: {
    position: 'bottom',
    labels: {
      boxWidth: 40,
      fontColor: 'brown'
    }
  },
  layout: {
    padding: {
      top: 50,
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
        if(minPow>0)
        {
          for(let i=minPow;i<=maxPow;i++)
          {
            chartObj.ticks.push(Math.pow(10,i));  
          }
        }
        else
        {
          for(let i=minPow+3;i<=maxPow;i++)
          {
            chartObj.ticks.push(Math.pow(10,i));  
          }
        }
        
      }

    }]
  }
}

// Linechart will be rendered based on the data present in the local state of items
// It will provide month wise summary 
// Line chart will now rendered for all us view
class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,
      projectedDidmount: false,

    }
  }

  //While initial rendering to fetch line chart data from differnt API endpoints
  async componentDidMount() {
    
    //Url change when line chart is rendered
    var {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    urlchange("/"+localStorage.getItem("form")+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
    var startDate = this.props.historicStartDate;
    var endDate = this.props.historicEndDate;
    var mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
    var startYear = parseInt(startDate.split(" ")[3])
    var endYear = parseInt(endDate.split(" ")[3])
    var startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);

     //If state region is requested
    if (this.props.historicInputState.toLowerCase().includes("state")) {
      console.log("this is componentDidmount for linechart in state");
      var stateName = this.props.historicInputState.toLowerCase().split(" (")[0]
      var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/stateName/"+ stateName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
    }

    //If county is requested
    else if (this.props.historicInputState.toLowerCase().includes("county")) {
      var countyName = this.props.historicInputState.toLowerCase();
      console.log("this is componentDidmount for linechart");
      var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/CountyState1/" + countyName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/all"
    }

    //If watershed is requested
    else {
      var url = "https://ewed.org:28469/ewedService/getMonthWiseSummary/HUC8Name/" + this.props.historicInputState.toLowerCase() + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
    }
    console.log(url);
    try {
      var response = await fetch(url)
      var json = await response.json()
      //this.updateState(json,pP);
      this.setState({
          items: json,
          isLoaded: true,
        });
      }
    catch (e) {
      console.log(e);
    }
  }

  // This method gets called everytime component gets rerendered
  async componentDidUpdate(pP, pS, snap) {

    // To get data for historic form 
    if (this.props.form == "Historic") {
      if (pP.historicInputState === this.props.historicInputState && pP.historicStartDate === this.props.historicStartDate && pP.historicEndDate === this.props.historicEndDate && this.props.filterstr == pP.filterstr) {
        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
        console.log("Historic Url change from line didupdate",localStorage.getItem("viewBy"));
        urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
      }
      else {

        var startDate = this.props.historicStartDate;
        var endDate = this.props.historicEndDate;
        var mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
        var startYear = parseInt(startDate.split(" ")[3])
        var endYear = parseInt(endDate.split(" ")[3])
        var startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
        var endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);

        // For State url endpoint
        if (this.props.historicInputState.toLowerCase().includes("state")) {
          var stateName = this.props.historicInputState.toLowerCase().split(" (")[0]
          stateName = stateName.trim();
          console.log("historic state");
          var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/stateName/" + stateName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
        }

        // For county url endpoint
        else if (this.props.historicInputState.toLowerCase().includes("county")) {
          var countyName = this.props.historicInputState.toLowerCase();
          var url = "https://ewed.org:31567/ewedService/getMonthWiseSummary/CountyState1/" + countyName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
        }
        // For county url endpoint
        else if (this.props.historicInputState.toLowerCase().includes("watershed")) {
          
          var url = "https://ewed.org:28469/ewedService/getMonthWiseSummary/HUC8Name/" + this.props.historicInputState.toLowerCase() + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          
        }
        else
        {
          //facility
          var url = "https://ewed.org:28469/ewedService/getMonthWiseSummary/HUC8Name/" + this.props.historicInputState.toLowerCase() + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr

        }
        try {
          
          var response = await fetch(url)
          var json = await response.json()

          // To update the state of the compoent with the new received data
          this.setState({
              items: json,
            })
        }
        
        catch (e) {
          console.log(e);
        }
      }
    }

    //If projected form is selected
    else if (this.props.form == "Projected") {
      if (this.props.climateModel === pP.climateModel && this.props.climateScenario === pP.climateScenario && this.props.energyScenario === pP.energyScenario && this.state.projectedDidmount && pP.historicInputState === this.props.historicInputState && pP.historicStartDate === this.props.historicStartDate && pP.historicEndDate === this.props.historicEndDate && this.props.filterstr === pP.filterstr) {
        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
        console.log("Historic Url change from line didupdate",localStorage.getItem("viewBy"));
        urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
      }
      else {


        var startDate = this.props.historicStartDate;
        var endDate = this.props.historicEndDate;
        var mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
        var startYear = parseInt(startDate.split(" ")[3])
        var endYear = parseInt(endDate.split(" ")[3])
        var startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
        var endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
        
        // Getting data for state region
        if (this.props.historicInputState.toLowerCase().includes("state")) {
          
          var stateName = this.props.historicInputState.toLowerCase().split("(")[0]
          stateName = stateName.trim();
          if (this.props.climateModel == "AVG45" || this.props.climateModel == "AVG85") {
            var url = "https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/" + this.props.energyScenario + "/" + this.props.climateModel + "/stateName/" + stateName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          }
          else {
            var url = "https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/" + this.props.energyScenario + "/" + this.props.climateModel + "_" + this.props.climateScenario + "/stateName/" + stateName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          }


        }

        // Getting data for county region
        else if (this.props.historicInputState.toLowerCase().includes("county")) {
          var countyName = this.props.historicInputState.toLowerCase();
          if (this.props.climateModel == "AVG45" || this.props.climateModel == "AVG85") {
            var url = "https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/" + this.props.energyScenario + "/" + this.props.climateModel + "/CountyState1/" + countyName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          }
          else {
            var url = "https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/" + this.props.energyScenario + "/" + this.props.climateModel + "_" + this.props.climateScenario + "/CountyState1/" + countyName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          }

        }

        // Getting data for watershed region
        else if (this.props.historicInputState.toLowerCase().includes("watershed")) {
          var countyName = this.props.historicInputState.toLowerCase();
          if (this.props.climateModel == "AVG45" || this.props.climateModel == "AVG85") {
            var url = "https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/" + this.props.energyScenario + "/" + this.props.climateModel + "/HUC8Name/" + this.props.historicInputState.toLowerCase() + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          }
          else {
            var url = "https://ewed.org:28469/ewedService/getFutureData/getMonthWiseSummary/" + this.props.energyScenario + "/" + this.props.climateModel + "_" + this.props.climateScenario + "/HUC8Name/" + this.props.historicInputState.toLowerCase() + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/" + this.props.filterstr
          }
        }
        try {
          var response = await fetch(url)
          var json = await response.json()
          //this.updateState(json,pP);
          this.setState({
            items: json,
            projectedDidmount: true,
          });
        }

        catch (e) {
          console.log(e);
        }
      }

    }

  }

  //This method will render the line chart for with month wise data
  render() {
    const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    console.log("Historic Url change from line",localStorage.getItem("viewBy"));
    urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }
    else if (this.state.items === undefined) {
      return <div>No Data to show {this.props}</div>
    }
    else {
      
      minTick=Infinity;
      maxTick=-Infinity;

      //It has all the data received from the API endpoint
      var lineChartData = {}
      lineChartData.gen = []
      lineChartData.ww = []
      lineChartData.wc = []
      lineChartData.wa = []
      lineChartData.em = []
      lineChartData.labels = []

      var years = [];
      var data = this.state.items;

      var mapping = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
      
      //formatting start date and end date
      var startDate = this.props.historicStartDate;
      var endDate = this.props.historicEndDate;
      var formatstartDate =startDate.split(" ")[1] + "-" + startDate.split(" ")[3] + "  ";
      var formatendDate =
        "  " + endDate.split(" ")[1] + "-" + endDate.split(" ")[3];
      var mapping2 = {
        Jan: "1",
        Feb: "2",
        Mar: "3",
        Apr: "4",
        May: "5",
        Jun: "6",
        Jul: "7",
        Aug: "8",
        Sep: "9",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      var nameOfState = this.props.historicInputState.toUpperCase();
      // If no data present
      if (!data.MonthWiseSummary) {
        return (
          <div>No Data to show</div>
        );
      }
      // If data present
      else {
        
        years = Object.keys(data.MonthWiseSummary);
        var i, j, months;

        //Getting data for each month and store that into the variable with key value
        for (i in years) {
          months = [];
          months = data.MonthWiseSummary[Object.keys(data.MonthWiseSummary)[i]];
          for (j in months) {
            lineChartData.gen.push(data.MonthWiseSummary[years[i]][j].generation);
            lineChartData.ww.push(data.MonthWiseSummary[years[i]][j].waterWithdrawal);
            lineChartData.wc.push(data.MonthWiseSummary[years[i]][j].waterConsumption);
            lineChartData.em.push(data.MonthWiseSummary[years[i]][j].emission);
            lineChartData.wa.push(data.MonthWiseSummary[years[i]][j].waterAvailability);
            lineChartData.labels.push(years[i] + "-" + j);
          }
        }
        chartdata["datasets"][0]["data"] = lineChartData.gen;
        chartdata["datasets"][1]["data"] = lineChartData.em;
        chartdata["datasets"][2]["data"] = lineChartData.ww;
        chartdata["datasets"][3]["data"] = lineChartData.wc;
        chartdata["datasets"][4]["data"] = lineChartData.wa;
        
        maxTick=Math.max(maxTick,...chartdata["datasets"][0]["data"],...chartdata["datasets"][1]["data"],...chartdata["datasets"][2]["data"],...chartdata["datasets"][3]["data"],...chartdata["datasets"][4]["data"]);
        minTick=Math.min(minTick,...chartdata["datasets"][0]["data"],...chartdata["datasets"][1]["data"],...chartdata["datasets"][2]["data"],...chartdata["datasets"][3]["data"],...chartdata["datasets"][4]["data"]);
        minPow=minTick.toExponential(0).split("+")[1]
        maxPow=maxTick.toExponential(0).split("+")[1]
        console.log("max:"+maxPow);
        console.log("min:"+minPow);
        
        //Labels for line chart
        chartdata.labels = lineChartData.labels;

        // This will return the line chart with the assigned values
        return (
          <div>
            <div className="table-top-bar-container">
              <div className="activity-container">
                <b>Activity for {nameOfState}</b>
                <b>
                  ({formatstartDate} to {formatendDate}){" "}
                </b>
              </div>
            </div>
            <div style={{height:"300px",width:"600px"}}>
              <Line height={300} width={600} data={chartdata} options={options} redraw />
            </div>
          </div>
          
        );

      }

    }

  }
}
export default LineChart;
