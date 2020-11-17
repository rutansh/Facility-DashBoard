import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

// Bar component is used from chartjs to render the bar charts
// data1 is used for Generation data, data will be updated once new data will be received from the API endpoint
const data1 = {
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
  datasets: [
    {
    data: [300, 50, 100,200, 20, 10,30, 70, 90, 20,60,100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
    '#FFCE56',
    '#FF0000',
    '#A0522D',
    '#CCA617',
    '#20772A',
    '#98A5D8',
    '#BE367A',
    '#EB4D1B',
    '#SB4DE1',
    '#C0L1F2',
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
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
      ],
    label: 'Generation',
    borderWidth: 1,
    }
  ]
};

//data2 is used for Emission data, data will be updated once new data will be received from the API endpoint
const data2 = {
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
  datasets: [
    {
    data: [300, 50, 100,200, 20, 10,30, 70, 90, 20,60,100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#FF0000',
        '#A0522D',
        '#CCA617',
        '#20772A',
        '#98A5D8',
        '#BE367A',
        '#EB4D1B',
        '#SB4DE1',
        '#C0L1F2',
        
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
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',

		],  

    label: 'Emission',
    borderWidth: 1,
    }
  ]
};

//data3 is used for Consumption data, data will be updated once new data will be received from the API endpoint
const data3 = {
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
  datasets: [
    {
    data: [300, 50, 100,200, 20, 10,30, 70, 90, 20,60,100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#FF0000',
        '#A0522D',
        '#CCA617',
        '#20772A',
        '#98A5D8',
        '#BE367A',
        '#EB4D1B',
        '#SB4DE1',
        '#C0L1F2',
        
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
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',
		],  
      label: 'Consumption',
      borderWidth: 1,
    }
  ]
};

//data4 is used for Withdrawal data, data will be updated once new data will be received from the API endpoint
const data4 = {
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
  datasets: [
    {
    data: [300, 50, 100,200, 20, 10,30, 70, 90, 20,60,100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
        '#FFCE56',
        '#FF0000',
        '#A0522D',
        '#CCA617',
        '#20772A',
        '#98A5D8',
        '#BE367A',
        '#EB4D1B',
        '#SB4DE1',
        '#C0L1F2',
        
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
        '#CSFE56',
        '#CSFE56',
        '#CSFE56',

		],  
      label: 'Withdrawal',
      borderWidth: 1,
      
    }
  ]
};

// To render the bar chart data based on the region requested by the user
class BarChart extends Component{
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
    }
  }

  //While initial rendering, to fetch the bar chart data from differnt API endpoints
  async componentDidMount()
  {
    var startDate=this.state.startDateProps;
    var endDate=this.state.endDateProps;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);

    //Changing api endpoints If historic form is selected
    if(localStorage.getItem("form")=="Historic")
    {
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:41513/ewedService/defaultViewData/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        var url="https://ewed.org:41513/ewedService/getSummaryWithin/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
        var countyName=this.props.historicInputState.toLowerCase();
        var url="https://ewed.org:41513/ewedService/getSummaryWithin/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        var url="https://ewed.org:41513/ewedService/getSummaryWithin/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr 
      }
      
      //Making request
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
    //Changing api endpoints If projected form is selected
    else if(localStorage.getItem("form")=="Projected")
    {
      if(this.props.historicInputState.toLowerCase().includes("all us"))
        {
          var url="https://ewed.org:41513/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        }
        else if(this.props.historicInputState.toLowerCase().includes("state"))
        {
          var stateName=this.props.historicInputState.toLowerCase().split("(")[0].trim(" ");  
          var url="https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        }
        else if(this.props.historicInputState.toLowerCase().includes("county"))
        {
          var countyName=this.props.historicInputState.toLowerCase();
          var url="https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        }
        else if(this.props.historicInputState.toLowerCase().includes("watershed"))
        {
          var url="https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        }
        //Making request
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
  async componentDidUpdate(pP,pS,snap)
  {
    //Changing api endpoints If historic form is selected
    if(this.props.form=="Historic")
    {
        if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&this.props.filterstr==pP.filterstr)
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
            var url="https://ewed.org:41513/ewedService/defaultViewData/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          }
          else if(this.props.historicInputState.toLowerCase().includes("state"))
          {
            var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
            var url="https://ewed.org:41513/ewedService/getSummaryWithin/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          }
          else if(this.props.historicInputState.toLowerCase().includes("county"))
          {
            var countyName=this.props.historicInputState.toLowerCase();
            var url="https://ewed.org:41513/ewedService/getSummaryWithin/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          }
          else if(this.props.historicInputState.toLowerCase().includes("watershed"))
          {
            var url="https://ewed.org:41513/ewedService/getSummaryWithin/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr 
          }

          //Making request
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            setTimeout(() => {this.setState({
              items:json["Summary"],
              },() => { });}, 0);
          }
          catch(e){
            console.log(e);
          }
        }
    }
    //Changing api endpoints If projected form is selected
    else if(this.props.form=="Projected")
    {
      if(this.props.energyScenario===pP.energyScenario&&this.state.projectedDidmount&&pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&this.props.filterstr===pP.filterstr)
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
          var url="https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        }
        else if(this.props.historicInputState.toLowerCase().includes("county"))
        {
          var countyName=this.props.historicInputState.toLowerCase();
          var url="https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/CountyState1/"+countyName+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        }
        else if(this.props.historicInputState.toLowerCase().includes("watershed"))
        {
          
          var url="https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          
        }

        //Making request
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

  //This will render bar chart based on the data present in the local state of "items" 
  render() {

    //Changing URL
    const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
    
    // If data is not loaded
    if(!this.state.isLoaded )
    {
      return <div>Loading...</div>
    }

    // If no data is present
    else if(this.state.items===undefined)
    {
      return <div>No Data to show</div>
    }

    // If data is present
    else
    {
      // To get the labels, set datastructure is used
      let myset=new Set();
      data1.datasets[0]["data"]=[]
      data2.datasets[0]["data"]=[]
      data3.datasets[0]["data"]=[]
      data4.datasets[0]["data"]=[]
      this.state.items.map(item=>{
      if(item["filterName"]!==null)
      {
        //adding data for the bar chart
        myset.add(item.filterName);
        data1.datasets[0]["data"].push(item["generation"])
        data2.datasets[0]["data"].push(item["emission"])
        data3.datasets[0]["data"].push(item["waterConsumption"])
        data4.datasets[0]["data"].push(item["waterWithdrawal"])
      }
    }
    )

    //Assigining labels 
    data1.labels=Array.from(myset);
    data2.labels=Array.from(myset);
    data3.labels=Array.from(myset);
    data4.labels=Array.from(myset);
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
    if ((typeof this.state.items) !== "undefined")
    {

      // This will render Bar chart with the values received from API endpoints 
      return (
        <div style={{ height:"800px",overflowY: "scroll"}}>
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
            <div style={{ width: '50%', height: '70%'}}>
            <br></br>
            <center><h4>Generation(MWh)</h4></center>
            <Bar
            data={data1}
            width={80}
            height={80}
  
          />
            </div>
            <div style={{ width: '50%', height: '70%' }}>
            <br></br>
            <center><h4>Emissions(MtCO2e)</h4></center>
            <Bar
            data={data2}
            width={80}
            height={80}
  
          />
            </div>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
            <div  style={{width: '50%', height: '70%' }}>
            <br></br>
            <center><h4>Consumption(MGal)</h4></center>
            <Bar
            data={data3}
            width={80}
            height={80}
  
          />
            </div>
            <div style={{ width: '50%', height: '70%'  }}>
            <br></br>
            <center><h4>Withdrawal(MGal)</h4></center>
            <Bar
            data={data4}
            width={80}
            height={80}
          />
            </div>
            </div>
        </div>
      );
    }
    }
  }
}
export default BarChart;