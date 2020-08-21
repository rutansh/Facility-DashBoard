import React,{Component,useState} from 'react';
import '../styles/mainContent.css';
import NavBar from './navBar';
import MapContent from './mapContent';
import Loader from 'react-loader-spinner';

class MapControl extends Component {
  constructor(props)
  {
      super(props);
      this.state={
        regions:null,
        loading:false,
        mapViewByCalled:false,
        viewByChoice:"States",
        isClicked:false,
        
      }
      this.formHandler=this.formHandler.bind(this);
      this.tableDataHandler=this.tableDataHandler.bind(this);
      this.viewByButtonClicked=this.viewByButtonClicked.bind(this);
  }
  async viewByButtonClicked(obj)
  {
    var startDate=this.props.historicStartDate;
    var endDate=this.props.historicEndDate;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    //watershed of state url
    var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
    
    if(obj.viewByChoice=="Watersheds")
    {
      console.log("watershed selected...!")
      
      this.setState({
        
        mapViewByCalled:true,
        viewByChoice:"Watersheds",
        
      });
    }
    //county of a state
    
    else if(obj.viewByChoice=="Counties")
    {
      console.log("county selected")
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Counties",
        
       });
    }
    else
    {
      //https://ewed.org:41513/ewedService/getFacilityData/stateName/California/2015/1/2015/12/fuelTypes/all
      
      this.setState({
      
        mapViewByCalled:true,
        
        viewByChoice:"Facilities",
      });
      
      //do nothing
    }
  }
    //facilities of a state
  
  formHandler(changeEvent){
    
    this.props.mapHandler(changeEvent[0])
  }
  tableDataHandler(e)
  {
    
  }
  async componentDidMount()
  {
    var startDate=this.props.historicStartDate;
    var endDate=this.props.historicEndDate;
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
            loading:true,
            regions:json,    
        })
        }).catch(e=>{
          console.log(e);
        })  
  }
  async componentDidUpdate(pP,state,snap)
  {
    var startDate=this.props.historicStartDate;
    var endDate=this.props.historicEndDate;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    //watershed of state url
    var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
    if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate)
    {
      if(this.state.mapViewByCalled && this.state.viewByChoice=="Facilities")
      {
        
      var url="https://ewed.org:41513/ewedService/getFacilityData/stateName/California/2015/1/2015/12/fuelTypes/all";
      var response=await fetch(url);
      var json=await response.json();
      
      console.log(json);
        this.setState({
          regions:json,
          mapViewByCalled:false,
          loading:true,
        })
      }
      else if(this.state.mapViewByCalled && this.state.viewByChoice=="Counties")
      {

        
        
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all";
        var response=await fetch(url);
        var json=await response.json();
        
        console.log("countydataL");
          console.log(json);
        this.setState({
          mapViewByCalled:false,
          loading:true,
          regions:json,
        })
      }
      else if(this.state.mapViewByCalled && this.state.viewByChoice=="Watersheds")
      {
        
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all";
        var response=await fetch(url);
        var json=await response.json();
        this.setState({
          mapViewByCalled:false,
          loading:true,
          regions:json,
        })
      }
    }
    else
    {
      
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            });
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
          this.setState({
            regions:json,
            });
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
            regions:json,
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
          this.setState({
            regions:json,
            });
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
    
    if(!this.state.loading){
      return(
        <div style={{marginTop:"600px"}}>
          <div style={{marginTop:"-300px"}} >
          <center>
          <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs
      />
          </center>
          </div>         
      </div>
      );
    }
    else{
      return (
        <div>
          <div className="main_content_container">        
            <div style={{display:'flex',flexDirection:'row',width:'100%',marginTop:0}}>
              {console.log("this is render mapcontrol:",this.state.notReload)}
              <div style={{  width: '47vw', height: "890px" }}>
                <MapContent  tabledata={this.state.regions} status={this.props.status} notReload={this.state.mapViewByCalled} viewByButtonClicked={(e)=>this.viewByButtonClicked(e)} formHandler={(e)=>this.formHandler(e)} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/> 
              </div>
              <div style={{ marginLeft:20,width: '50vw', height: "890px" }}>
                <NavBar tabledata={this.state.regions}tableDataHandler={(e)=>{this.tableDataHandler(e)}}historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/> 
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}
export default MapControl;