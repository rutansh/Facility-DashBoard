import React,{Component,useState} from 'react';
import '../styles/mainContent.css';
import NavBar from './navBar';
import MapContent from './mapContent';
import Loader from 'react-loader-spinner';

class MapControl extends Component {
  constructor(props)
  {
      super(props);
      this.state=
      {
        regions:null,
        loading:false,
        mapViewByCalled:false,
        viewByChoice:"States",
        regionClick:false,
        regionLoaded:false,

      }
      this.formHandler=this.formHandler.bind(this);
      this.tableDataHandler=this.tableDataHandler.bind(this);
      this.viewByButtonClicked=this.viewByButtonClicked.bind(this);
      this.formHandlerforFacility=this.formHandlerforFacility.bind(this);
  }
  viewByButtonClicked(obj)
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
      
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Watersheds",  
      });
    }
    //county of a state
    
    else if(obj.viewByChoice=="Counties")
    {
      
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
    console.log("formhandler from mapcontrol");
    
    this.props.mapHandler(changeEvent[0])
  }
  formHandlerforFacility(changeEvent){
    this.props.mapHandler(changeEvent[0])
  }
  tableDataHandler(e)
  {
    
  }
  async componentDidMount()
  {
    console.log("Didmount of mapcontrol")
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
  // shouldComponentUpdate(nextProps,nextState)
  // {
  //   // console.log("mapcontrol should component update");
  //   // console.log("this.state.regions");
  //   // console.log(this.state.regions);
  //   // console.log("nextState.regions");
  //   // console.log(nextState.regions);
  //   return true;
  // }
  async componentDidUpdate(pP,state,snap)
  {
    console.log("component didupdate of mapcontrol"+this.props.historicInputState);
    
    var startDate=this.props.historicStartDate;
    var endDate=this.props.historicEndDate;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    //watershed of state url
    var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
    if(pP.historicInputState==this.props.historicInputState&&pP.historicStartDate==this.props.historicStartDate&&pP.historicEndDate==this.props.historicEndDate)
    {
      console.log("component didupdate of mapcontrol and everything same :"+this.props.historicInputState);
      if(this.state.mapViewByCalled && this.state.viewByChoice=="Facilities")
      {
        
      var url="https://ewed.org:41513/ewedService/getFacilityData/stateName/California/2015/1/2015/12/fuelTypes/all";
      var response=await fetch(url);
      var json=await response.json();
      
      
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
      // else if(!this.state.regionClick&&this.props.historicInputState.toLowerCase().includes("state")&&!this.state.regionLoaded)
      // {
      //   console.log("else if condition in mapcontrol")
      //   var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
      //   var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
      //   try{
      //     var response=await fetch(url)
      //     var json=await response.json()
      //     //this.updateState(json,pP);
      //     this.setState({
      //       regions:json,
      //       regionLoaded:true,
      //       });
      //   }
        
      //   catch(e)
      //   {
      //     console.log(e);
      //   }
      // }
      
    }
    else
    {
      console.log("component didupdate of mapcontrol and everything not same :"+this.props.historicInputState);
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
            regionClick:false,
            });
            console.log("this is region data from state mapcontrol");
            console.log(json);
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
            regionClick:false,
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
            regionClick:false,
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
      {console.log("render of mapcontrol");}
      return (
        <div>
          <div className="main_content_container">        
            <div style={{display:'flex',flexDirection:'row',width:'100%',marginTop:0}}>
              
              <div style={{  width: '47vw', height: "890px" }}>
              <MapContent  tabledata={this.state.regions} 
                notReload={this.state.mapViewByCalled} viewByButtonClicked={(e)=>this.viewByButtonClicked(e)} 
                formHandler={(e)=>this.formHandler(e)} formHandlerforFacility={(e)=>this.formHandlerforFacility(e)}historicInputState={this.props.historicInputState} 
                historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
                
              </div>
              <div style={{ marginLeft:20,width: '50vw', height: "890px" }}>
                <NavBar tabledata={this.state.regions}
                tableDataHandler={(e)=>{this.tableDataHandler(e)}}
                historicInputState={this.props.historicInputState} 
                historicStartDate={this.props.historicStartDate} 
                historicEndDate={this.props.historicEndDate}/>
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}
export default MapControl;