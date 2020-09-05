import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';

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
    if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate)
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
      else
      {
        //watershed
      }
      try{
        var response=await fetch(url)
        var json=await response.json()
        //this.updateState(json,pP);
        setTimeout(() => {this.setState({
          items:json["Summary"],
           },() => { });}, 0);
      }
      catch(e)
      {
        console.log(e);
      }
    }
  }
  render() {
    if(!this.state.isLoaded || this.state.items===undefined)
    {
      return <div>Loading...</div>
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
        data2.datasets[0]["data"].push(item["emission"])
        data3.datasets[0]["data"].push(item["waterConsumption"])
        data4.datasets[0]["data"].push(item["waterWithdrawal"])
      }
    }
    )

    if ((typeof this.state.items) !== "undefined")
    {
      return (
        <div style={{ height:"800px",overflowY: "scroll"}}>
            <br></br>
            <br></br>
            <br></br>
            <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{ width: '50%', height: '70%'}}>
            <br></br>
            <center><h4>Genration(MWh)</h4></center>
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