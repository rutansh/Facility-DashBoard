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
        filterstr:this.props.filterstr
      }
      this.formHandler=this.formHandler.bind(this);
      this.viewByButtonClicked=this.viewByButtonClicked.bind(this);
      this.formHandlerforFacility=this.formHandlerforFacility.bind(this);
      this.formHandler2=this.formHandler2.bind(this);
  }
  viewByButtonClicked(obj)
  {
    if(obj.viewByChoice=="Watersheds")
    {
      
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Watersheds",  
      });
    }
    else if(obj.viewByChoice=="Counties")
    {
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Counties",
       });
    }
    else
    {
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Facilities",
      });
    }
  }
    //facilities of a state
  
  formHandler(changeEvent){
    
    this.props.mapHandler(changeEvent[0])
  }
  formHandler2(e)
  {
    
    this.props.mapHandler(e);
  }
  formHandlerforFacility(changeEvent){
    
    this.props.mapHandler(changeEvent[0])
  }
  shouldComponentUpdate(nextProps,nextState)
  {
    return true;
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
    //https://ewed.org:31567/ewedService/getFutureData/defaultViewData/REF2019/stateName/2049/1/2050/12/fuelTypes/all
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
    if(this.props.form=="Projected")
    {
      if(pP.historicInputState == this.props.historicInputState &&
          pP.historicStartDate == this.props.historicStartDate && 
          pP.historicEndDate == this.props.historicEndDate)
      {
        if(this.state.mapViewByCalled && this.state.viewByChoice=="Facilities")
        {
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
            
            var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
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
        //https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/REF2019/stateName/california/HUC8Name/2049/1/2050/12/fuelTypes/all
        
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        var response=await fetch(url);
        var json=await response.json();
        this.setState({
          mapViewByCalled:false,
          loading:true,
          regions:json,
        })
      }
      else if((pP.filterstr !== this.props.filterstr || pP.energyScenario !== this.props.energyScenario) && 
        this.props.historicInputState.toLowerCase().includes("all us"))
      {
        
        var url="https://ewed.org:31567/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
      else if((pP.filterstr!==this.props.filterstr || pP.energyScenario!==this.props.energyScenario) &&
       this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
      else if((pP.filterstr!==this.props.filterstr||pP.energyScenario!==this.props.energyScenario) && 
        (this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 
        && this.props.historicInputState.split("(")[1].split(")")[0].length > 2)))
      {
        
        //https://ewed.org:31567/ewedService/getFutureData/getFacilityData/REF2019/CountyState1/umatilla%20county%20(oregon)/2049/1/2050/12/fuelTypes/all
        var countyName=this.props.historicInputState.toLowerCase()
        var url = "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
          })
          
        }
        catch(e)
        {
          console.log(e);
        }

      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed")
        &&(pP.filterstr!==this.props.filterstr||pP.energyScenario!==this.props.energyScenario))
      {
        //https://ewed.org:31567/ewedService/getFutureData/getFacilityData/REF2019/HUC8Name/umatilla%20watershed%20(or)/2049/1/2050/12/fuelTypes/all
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
    }
    else
    {
     
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        
        var url="https://ewed.org:31567/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
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
        var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
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
      else if(this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2))
      {
        var countyName=this.props.historicInputState.toLowerCase()
        var url = "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
       
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/"+this.props.energyScenario+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
        var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        
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
  else if(this.props.form=="Historic")
    {
      if(pP.historicInputState==this.props.historicInputState&&pP.historicStartDate==this.props.historicStartDate&&pP.historicEndDate==this.props.historicEndDate)
      {
      
        if(this.state.mapViewByCalled && this.state.viewByChoice=="Facilities")
        {
        //https://ewed.org:31567/ewedService/getFutureData/getFacilityData/HIGHMACRO/stateName/oregon//2049/1/2050/12/fuelTypes/all  
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:41513/ewedService/getFacilityData/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
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
            //https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/REF2019/stateName/california/CountyState1/2049/1/2050/12/fuelTypes/all
            var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
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
        //https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/REF2019/stateName/california/HUC8Name/2049/1/2050/12/fuelTypes/all
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        var response=await fetch(url);
        var json=await response.json();
        this.setState({
          mapViewByCalled:false,
          loading:true,
          regions:json,
        })
      }
      else if(pP.filterstr!==this.props.filterstr && this.props.historicInputState.toLowerCase().includes("all us"))
      {
        
        var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
      else if(pP.filterstr!==this.props.filterstr && this.props.historicInputState.toLowerCase().includes("state"))
      {
        
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
            });

        }
        
        catch(e)
        {
          console.log(e);
        }
        

      }
      else if(pP.filterstr!==this.props.filterstr && (this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2)))
      {
        
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
          })
        }
        catch(e)
        {
          console.log(e);
        }

      }
      else if(this.props.historicInputState.toLowerCase().includes("watershed")&&pP.filterstr!==this.props.filterstr)
      {
        //https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/REF2019/stateName/california/HUC8Name/2049/1/2050/12/fuelTypes/all
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
    }
    else
    { 
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        
        var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
        var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
      else if(this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2))
      {
  
        
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
        var url="https://ewed.org:31567/ewedService/getFacilityData/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
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
            <div className="main_content_inner">
              
              <div className="map-container">
              <MapContent  filterstr={this.props.filterstr}energyScenario={this.props.energyScenario}form={this.props.form} tabledata={this.state.regions} 
                notReload={this.state.mapViewByCalled} viewByButtonClicked={(e)=>this.viewByButtonClicked(e)} 
                formHandler={(e)=>this.formHandler(e)} formHandlerforFacility={(e)=>this.formHandlerforFacility(e)}
                historicInputState={this.props.historicInputState} 
                historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
              </div>
              
              <div className="table-container">
                <NavBar climateScenario={this.props.climateScenario} climateModel={this.props.climateModel} energyScenario={this.props.energyScenario} form={this.props.form} tabledata={this.state.regions}
                formHandler={(e)=>this.formHandler2(e)}
                tableDataHandler={(e)=>{this.tableDataHandler(e)}}
                historicInputState={this.props.historicInputState} 
                historicStartDate={this.props.historicStartDate} 
                historicEndDate={this.props.historicEndDate}
                filterstr={this.props.filterstr}/>
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}
export default MapControl;
