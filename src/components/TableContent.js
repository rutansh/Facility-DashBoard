import React,{Component} from 'react';
import * as ReactBootstrap from "react-bootstrap";

class TableContent extends Component 
{
  constructor(props)
  {
      super(props);
      this.state={
          items:[],
          isLoaded:false,
          startDateProps:this.props.historicStartDate,
          endDateProps:this.props.historicEndDate,
          nameOfState:this.props.historicInputState,
          counter:1,
        }     
        this.updateState=this.updateState.bind(this);
  }
  updateState = (json,pP) => {
    
     this.setState({
       items: json,
     },() => {})
   }
  componentDidMount()
  {
    var startDate=this.state.startDateProps;
    var endDate=this.state.endDateProps;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        fetch(url)
        .then(res=>res.json())
        .then(json=>{
        this.setState({
            isLoaded:true,
            items:json,    
        })
        }).catch(e=>{
          console.log(e);
        })  
  }
  async componentDidUpdate(pP,state,snap)
  {
    if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate)
    {

    }
    else
    {
      setTimeout(() => {this.setState({
            startDateProps:this.props.historicStartDate,
            endDateProps:this.props.historicEndDate,
            nameOfState:this.props.historicInputState, },() => {});}, 0);

      var startDate=this.props.historicStartDate;
      var endDate=this.props.historicEndDate;
      var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};
      var startYear=parseInt(startDate.split(" ")[3])
      var endYear=parseInt(endDate.split(" ")[3])
      var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
      var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          setTimeout(() => {this.setState({
            items:json,
             },() => {});}, 0);
        }
        catch(e)
        {
          console.log(e);
        }
      }
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          setTimeout(() => {this.setState({
            items:json,
             },() => {});}, 0);
        }
        
        catch(e)
        {
          console.log(e);
        }
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {

        
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        try{
          var response=await fetch(url)
          var json=await response.json()

          this.setState({
            items:json,
          })
        }
        
        catch(e)
        {
          console.log(e);
        }
          
    }
    else if(this.props.historicInputState.toLowerCase().includes("watershed"))
    {
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          setTimeout(() => {this.setState({
            items:json,
             },() => {});}, 0);
        }
        catch(e)
        {
          console.log(e);
        }
    }
    }
   }


  render()
  {
      
      var startDate=this.state.startDateProps;
      var endDate=this.state.endDateProps;
      var formatstartDate=startDate.split(" ")[1]+"-"+startDate.split(" ")[3]+"  ";
      var formatendDate="  "+endDate.split(" ")[1]+"-"+endDate.split(" ")[3];
      var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};
      var nameOfState=this.props.historicInputState.toUpperCase();
      if(!this.state.isLoaded)
      {
          return <div>Loading...</div>
      }
      else
      {
        if((typeof this.state.items["Total Summary"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("all us"))
        {
          
          return(
          
            <div style={{ height: "885px",overflowY: "scroll"}} >
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
            </div>
            <p><b>({formatstartDate} to {formatendDate}) </b>
            </p>
                <ReactBootstrap.Table striped bordered hover wrapperClasses="table-responsive">
            <thead>
              <tr>
                <th>StateName</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody className="scrollit">   
              <tr>
                
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["Summary"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.filterName}</td>
                  <td>{item.generation}</td>
                  <td>{item.emission}</td>
                  <td>{item.waterConsumption}</td>
                  <td>{item.waterWithdrawal}</td>
              </tr>  
              ))}            
                  
            </tbody>
          </ReactBootstrap.Table>
  
  
            </div>
            );


        }
        else if((typeof this.state.items["Total Summary"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("state"))
        {
          
          nameOfState="This is state: "+this.props.historicInputState;
  
          
          return(
          
            <div style={{ height: "885px",overflowY: "scroll"}}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
            </div>
            <p><b>({formatstartDate} to {formatendDate}) </b>
            </p>
                <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>StateName</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["Summary"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.filterName}</td>
                  <td>{item.generation}</td>
                  <td>{item.emission}</td>
                  <td>{item.waterConsumption}</td>
                  <td>{item.waterWithdrawal}</td>
              </tr>  
              ))}            
                  
            </tbody>
          </ReactBootstrap.Table>
  
  
            </div>
            );
        }
        else if((typeof this.state.items["All Facilities"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("county"))
        {
          return(
          
            <div style={{ height: "885px",overflowY: "scroll"}}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
            </div>
            
  
            <p><b>({formatstartDate} to {formatendDate}) </b>
            </p>
            
          {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
                <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["All Facilities"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.PRIMARY_NAME}</td>
                  <td>{item.GenerationSummary}</td>
                  <td>{item.EmissionSummary}</td>
                  <td>{item.WaterConsumptionSummary}</td>
                  <td>{item.WaterWithdrawalSummary}</td>
              </tr>  
              ))}               
            </tbody>
          </ReactBootstrap.Table>
      </div>
            );
        }
        else if((typeof this.state.items["All Facilities"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("watershed"))
        {
          nameOfState="This is watershed: "+this.props.historicInputState;
          return(
          
            <div style={{height: "885px",overflowY: "scroll"}}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
            </div>
  
            <p><b>({formatstartDate} to {formatendDate}) </b>
            </p>
            
          {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
                <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["All Facilities"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.PRIMARY_NAME}</td>
                  <td>{item.GenerationSummary}</td>
                  <td>{item.EmissionSummary}</td>
                  <td>{item.WaterConsumptionSummary}</td>
                  <td>{item.WaterWithdrawalSummary}</td>
              </tr>  
              ))}        
            </tbody>
          </ReactBootstrap.Table>
        </div>
            );
        }
        else{
          return <div>Loading...</div>
        }
      }   
  }
}
export default TableContent;