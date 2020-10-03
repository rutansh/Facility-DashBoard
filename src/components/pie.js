import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

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
const options = {

    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 50,
        fontColor: 'brown'
      }
    }
  }

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
  async componentDidMount()
  {
    var startDate=this.state.startDateProps;
    var endDate=this.state.endDateProps;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    ////https://ewed.org:41513/ewedService/getFutureData/defaultViewData/REF2019/fuelType/2049/1/2050/12/fuelTypes/all
    var url="https://ewed.org:31567/ewedService/defaultViewData/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
  async componentDidUpdate(pP,pS,snap)
  {
    
    //https://ewed.org:41513/ewedService/getFutureData/getSummaryWithin/REF2019/stateName/california/fuelType/2049/1/2050/12/fuelTypes/all
    if(this.props.form=="Historic")
    {
      if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&this.props.filterstr==pP.filterstr)
      {
      //do nothing
      }
      else
      {
        console.log("pie chart for watershed"+this.props.historicInputState);
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
        console.log("pie chart data for watershed")
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/HUC8Name/"+this.props.historicInputState.toLowerCase()+"/fuelType/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        console.log(url)
      }
      try{
        var response=await fetch(url)
        var json=await response.json()
        //this.updateState(json,pP);
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
  else if(this.props.form=="Projected")
  {
    if(this.props.energyScenario===pP.energyScenario&&this.state.projectedDidmount&&pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&this.props.filterstr===pP.filterstr)
    {
      
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
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
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
        //this.updateState(json,pP);
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
  
  
  
  render() {
    
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

      data1.datasets[0]["data"]=[]
      data2.datasets[0]["data"]=[]
      data3.datasets[0]["data"]=[]
      data4.datasets[0]["data"]=[]
      this.state.items.map(item=>{
      if(item["filterName"]!==null)
      {
        data1.datasets[0]["data"].push(item["generation"])
      }
      if(item["filterName"]==="Biomass"||item["filterName"]==="Coal"||item["filterName"]==="Natural Gas"||item["filterName"]==="Other"||item["filterName"]==="Petroleum")
      {
        data2.datasets[0]["data"].push(item["emission"])
      }
      if(item["filterName"]==="Biomass"||item["filterName"]==="Coal"||item["filterName"]==="Natural Gas"||item["filterName"]==="Geothermal"||item["filterName"]==="Nuclear"||item["filterName"]==="Other"||item["filterName"]==="Water")
      {
        data3.datasets[0]["data"].push(item["waterConsumption"])
      }
      if(item["filterName"]==="Biomass"||item["filterName"]==="Coal"||item["filterName"]==="Natural Gas"||item["filterName"]==="Nuclear"||item["filterName"]==="Other"||item["filterName"]==="Petroleum"||item["filterName"]==="Water")
      {
        data4.datasets[0]["data"].push(item["waterWithdrawal"])
      }
      
    })
    if ((typeof this.state.items) !== "undefined")
    {
      return (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{ width: '40%', height: '70%'}}>
          <br></br>
          <center><h4>Genration(MWh)</h4></center>
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
//https://ewed.org:28469/ewedService/getFutureData/getSummaryWithin/REF2019/HUC8Name/upper%20tuolumne%20watershed%20(ca)/fuelType/2049/1/2050/12/fuelTypes/all