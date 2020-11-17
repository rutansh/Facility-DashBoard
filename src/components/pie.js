import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

// This component is used to render pie chart in the application
// Pie component from chartjs is used to render the line chart

// Initailizing the chart with default colors and labels

//data1 is for Generation, it will be updated with the new values after fetching request from the API endpoint
let data1 = {
	labels: [
		'Biomass',
		'Coal',
    'Geothermal',
    'Natural Gas',
    'Nuclear',
    'Other',
    'Petroleium',
    'Solar',
    'Water',
    'Wind'
	],
	datasets: [{
		data: [300, 50, 100,200, 20, 10,30, 70, 90, 20],
		backgroundColor: [
		'#FF6384',
		'#36A21B',
        '#FFCE56',
        '#FF0000',
        '#A0522D',
        '#CCA617',
        '#20772A',
        '#98A5D8',
        '#BE367A',
    		],
		hoverBackgroundColor: [
		'#CSFE56',
		'#CSFE56',
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
        '#CQFE56',
        ],
    }],
    
    
};

//data2 is for Emission, it will be updated with the new values after fetching request from the API endpoint
let data2 = {
	labels: [
    'Biomass',
    'Coal',
    'Natural Gas',
    'Other',
    'Petroleum',
    'Other'    
	],
	datasets: [{
		data: [],
		backgroundColor: [
      '#FF6384',
      '#36A21B',
          '#FFCE56',
          '#FF0000',
          '#A0522D',
          '#CCA617',
    		],
		hoverBackgroundColor: [
		'#CSFE56',
		'#CSFE56',
        '#CSFE56',
        '#CSFE56',
		'#CSFE56',
        '#CSFE56',
        ],
        
    }],
    
};

//data3 is for consumption, it will be updated with the new values after fetching request from the API endpoint
let data3 = {
	labels: [
		'Biomass',
        'Coal',
        'Geothermal',
        'Natural Gas',
        'Nuclear',
        'Other',
        'Water',

        
	],
	datasets: [{
		data: [300, 50, 100,60,80,30,40],
		backgroundColor: [
      '#FF6384',
      '#36A21B',
          '#FFCE56',
          '#FF0000',
          '#A0522D',
          '#CCA617',
          '#20772A',
        
    		],
		hoverBackgroundColor: [
		'#CSFE56',
		'#CSFE56',
    '#CSFE56',
    '#CSFE56',
    '#CSFE56',
    '#CSFE56',
		'#CSFE56',
        ],
        
    }],
    
};

//data4 is for withdrawal, it will be updated with the new values after fetching request from the API endpoint 
let data4 = {
	labels: [
        'Biomass',
        'Coal',
        'Natural Gas',
        'Nuclear',
        'Other',
        'Petroleum',
        'Water'        
        
	],
	datasets: [{
		data: [300, 50, 100,70,10,50,120],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#FF0000',
        '#A0522D',
        '#CCA617',
        '#20772A',
    		],
		hoverBackgroundColor: [
		'#CSFE56',
		'#CSFE56',
        '#CSFE56',
        '#CSFE56',
		'#CSFE56',
        '#CSFE56',
        '#CSFE56',
        ],
        
    }],
    
};

//Styling in pie chart
const options = {

    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 50,
        fontColor: 'brown'
      }
    }
  }

// Pie chart is rendered with the different fuel types for the specific time frame
class PieChart extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      items:[],
      isLoaded:false,
      startDateProps:this.props.historicStartDate,
      endDateProps:this.props.historicEndDate,
      nameOfState:this.props.historicInputState,
      projectedDidmount:false,
      energyScenario:this.props.enegyScenario,
    }
  }

  //While initial rendering to fetch pie chart data from differnt API endpoints
  async componentDidMount()
  {
    var startDate=this.state.startDateProps;
    var endDate=this.state.endDateProps;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    
    //If historic form is selected then making API requests based on the selected region for historic data
    if(localStorage.getItem("form")=="Historic")
    {
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:31567/ewedService/defaultViewData/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
        var countyName=this.props.historicInputState.toLowerCase();
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        
      }
      try{
        var response=await fetch(url)
        var json=await response.json()
        setTimeout(() => {this.setState({
          items:json["Summary"],
          isLoaded:true,
          },() => {});}, 0);}
      catch(e)
      {
        console.log(e);
      }

    }

    //If projected form is selected then making API requests for projected data
    else if(localStorage.getItem('form')=="Projected")
    {
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:41513/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
      }
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0].trim(" ");
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
        var countyName=this.props.historicInputState.toLowerCase();
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      try{
        var response=await fetch(url)
        var json=await response.json()
        setTimeout(() => {this.setState({
          items:json["Summary"],
          isLoaded:true,
          },() => {});}, 0);}
      catch(e)
      {
        console.log(e);
      }

    }
    
  }

  //This method is used during component's rerendering phase 
  async componentDidUpdate(pP,pS,snap)
  {
    // To call api endpoint when historic form is selected 
    if(this.props.form=="Historic")
    {
      if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&this.props.filterstr==pP.filterstr)
      {
      //do nothing
      }
      else
      {
        
      var startDate=this.props.historicStartDate;
      var endDate=this.props.historicEndDate;
      var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};
      var startYear=parseInt(startDate.split(" ")[3])
      var endYear=parseInt(endDate.split(" ")[3])
      var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
      var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:31567/ewedService/defaultViewData/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
        var countyName=this.props.historicInputState.toLowerCase();
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        
      }
      try{
        var response=await fetch(url)
        var json=await response.json()
        await this.setState({
          items:json["Summary"],
           });
          }
      
      catch(e)
      {
        console.log(e);
      }
    }
  }

  // To call api endpoint when historic form is selected
  else if(this.props.form=="Projected")
  {
    if((this.props.energyScenario===pP.energyScenario&&this.state.projectedDidmount&&pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&this.props.filterstr===pP.filterstr))
    {
      const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
      
      urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
    }
    else
    {
      var startDate=this.props.historicStartDate;
      var endDate=this.props.historicEndDate;
      var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};
      var startYear=parseInt(startDate.split(" ")[3])
      var endYear=parseInt(endDate.split(" ")[3])
      var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
      var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:41513/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        
      }
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0].trim(" ");
        //https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/REF2019/stateName/california/fuelType/2049/1/2050/12/fuelTypes/"+this.props.filterstr
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
        var countyName=this.props.historicInputState.toLowerCase();
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      
      try{
        var response=await fetch(url)
        var json=await response.json()
        this.setState({
          items:json["Summary"],
          projectedDidmount:true,   
        });
          }
      
      catch(e)
      {
        console.log(e);
      }
    }
  } 
  }

  // To render the pie chart based on the value preset in component's items state
  render() {

    //Url change method to update the URL
    const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    
    urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
      
    var startDate = this.props.historicStartDate;
    var endDate = this.props.historicEndDate;
    var formatstartDate =
    startDate.split(" ")[1] + "-" + startDate.split(" ")[3] + "  ";
    var formatendDate =
      "  " + endDate.split(" ")[1] + "-" + endDate.split(" ")[3];
    var mapping = {
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
    if(!this.state.isLoaded)
    {
      return <div>Loading...</div>
    }
    else if(this.state.items===undefined)
    {
      return <div>No Data to show</div>
    }
    else
    {
      //If data is present then to create datasets for each graph list is being used.
      data1.datasets[0]["data"]=[]
      data2.datasets[0]["data"]=[]
      data3.datasets[0]["data"]=[]
      data4.datasets[0]["data"]=[]

      //To get the filters present in the data set is used
      let myset = new Set();
      let myset2 = new Set();
      let myset3 = new Set();
      let myset4 = new Set();
      this.state.items.map(item=>{
      let otherdata={emission:0,consumption:0,withdrawal:0};
      
      //Creating datasets for each type (Generation, Emission, Consumption and withdrawal)
      if(item["filterName"]!==null)
      {
        myset.add(item.filterName);
        data1.datasets[0]["data"].push(item["generation"])
      }
      if(item["filterName"]==="Biomass"||item["filterName"]==="Coal"||item["filterName"]==="Natural Gas"||item["filterName"]==="Other"||item["filterName"]==="Petroleum")
      {
        myset2.add(item.filterName);
        data2.datasets[0]["data"].push(item["emission"])
      }
      if(item["filterName"]==="Biomass"||item["filterName"]==="Coal"||item["filterName"]==="Natural Gas"||item["filterName"]==="Geothermal"||item["filterName"]==="Nuclear"||item["filterName"]==="Other"||item["filterName"]==="Water")
      {
        myset3.add(item.filterName);
        data3.datasets[0]["data"].push(item["waterConsumption"])
      }
      if(item["filterName"]==="Biomass"||item["filterName"]==="Coal"||item["filterName"]==="Natural Gas"||item["filterName"]==="Nuclear"||item["filterName"]==="Other"||item["filterName"]==="Petroleum"||item["filterName"]==="Water")
      {
        myset4.add(item.filterName);
        data4.datasets[0]["data"].push(item["waterWithdrawal"])
      }
    })
    data1.labels=Array.from(myset);
    data2.labels=Array.from(myset2);
    data3.labels=Array.from(myset3);
    data4.labels=Array.from(myset4);
    
    // Performing checks before processing data
    if ((typeof this.state.items) !== "undefined")
    {
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
          <br></br>
          <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{ width: '40%', height: '70%'}}>
          <br></br>
          <center><h4>Generation(MWh)</h4></center>
          <Pie data={data1} options={options} height={10} width={10}/>
          </div>
          <div style={{ width: '35%', height: '55%' }}>
          <br></br>
          <center><h4>Emissions(MtCO2e)</h4></center>
          <Pie data={data2} options={options} height={10} width={10}  />
          </div>
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
          <div  style={{width: '40%', height: '60%' }}>
          <br></br>
          <center><h4>Consumption(MGal)</h4></center>
          <Pie data={data3} options={options} height={50} width={60}  />
          </div>
          <div style={{ width: '40%', height: '60%'  }}>
          <br></br>
          <center><h4>Withdrawal(MGal)</h4></center>
          <Pie data={data4} options={options} height={50} width={60}  />
          </div>
          </div>
      </div>
      );
    } 
    } 
  }
}
export default PieChart;
