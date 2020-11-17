import React, { Component, useState } from 'react';
import { Marker, InfoWindow, Polygon } from 'react-google-maps';
import CustomMarker from './customMarker';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {geostats} from './geostats';
import {mapColorPaletteHex} from './colorsforRegion';
import UserContext from './Context/updateContext';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

// This component is used to provide different colors for state layer
class StateLayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.props = props;
    this.state =
    {
      strokeColor:'rgba(0,0,0,0.5)',
      strokeOpacity:1,
      strokeWeight:0.2,
      name:this.props.regionJ["properties"]["NAME"]
    }
    var g=new geostats();

    //Binding events
    this.regionColor=this.regionColor.bind(this);
    this.strokeColor=this.strokeColor.bind(this);
    this.strokeWeight=this.strokeWeight.bind(this);
    this.strokeOpacity=this.strokeOpacity.bind(this);
    this.arrayForParent = [];
}

// To provide stroke opacity on each region
strokeOpacity(region,inputstate)
{
  if(region["properties"]["NAME"]==this.props.region)
  {
    return 0.2;
  }
  else 
  {
    return 3;
  }
}

// To provide stroke weight on each region, based on the view by selected on map control
strokeWeight(region,inputstate,viewByChoice,context)
{
  if(inputstate.includes("all us"))
  {
    
    if(region["properties"]["NAME"]==context)
    {
      return 3.0;
    }
    else 
    {
      return 0.2;
    }
  }
  else if(inputstate.includes("state"))
  {
    if(viewByChoice=="Watersheds")
    {
      
      if(region.properties.SUBBASIN==context)
      {
        return 3.0;
      }
      else 
      {
        return 0.2;
      }
    }
    else if(viewByChoice=="Counties")
    {
   
      if(region.properties.CountyState1==context)
      {
        return 3.0;
      }
      else 
      {
        return 0.2;
      }
    }
  }
  

}

//stroke color will render the border with green color when user hovers mouse on any region
strokeColor(region,inputstate,viewByChoice,context)
{
  if(inputstate.includes("all us"))
  {
    if(region["properties"]["NAME"]==context)
    {
      return "green"
    }
    else 
    {
      return 'rgba(0,0,0,0.5)';
    }
  }
  else if(inputstate.includes("state"))
  {
    if(viewByChoice=="Watersheds")
    {
      if(region.properties.SUBBASIN==context)
      {
        return "green"
      }
      else 
      {
        return 'rgba(0,0,0,0.5)';
      }
    }
    else if(viewByChoice=="Counties")
    {
      if(region.properties.CountyState1==context)
      {
        return "green"
      }
      else 
      {
        return 'rgba(0,0,0,0.5)';
      }
    }
  }
}

//This method will fill the region with different colors based on the type selected on display form 
regionColor(regionName,map,g)
  {
    //getRangeNum method will return numrics based on the integer value provided it will then used to render different colors on the map layer
    // mapColorPetteHex is used to generate different hexacodes for colors
    if(map[regionName.NAME])
    {
      if(this.props.displayChoice=="Water Consumption")
      {
        
        return mapColorPaletteHex[g.getRangeNum(map[regionName.NAME].waterConsumption)];
      }
      else if(this.props.displayChoice=="Water Withdrawal")
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.NAME].waterWithdrawal)];
      }
      else
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.NAME].emission)];
      }
    }
    else if(map[regionName.SUBBASIN])
    {
      if(this.props.displayChoice=="Water Consumption")
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.SUBBASIN].waterConsumption)];
      }
      else if(this.props.displayChoice=="Water Withdrawal")
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.SUBBASIN].waterWithdrawal)];
      }
      else
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.SUBBASIN].emission)];
      }
    }
    else if(map[regionName.CountyState1])
    {
      if(this.props.displayChoice=="Water Consumption")
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.CountyState1].waterConsumption)];
      }
      else if(this.props.displayChoice=="Water Withdrawal")
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.CountyState1].waterWithdrawal)];
      }
      else
      {
        return mapColorPaletteHex[g.getRangeNum(map[regionName.CountyState1].emission)];
      }
      
    }
    else
    {
      return "rgba(0,0,0,0)"
    }
  }

  //This method is used to achieve optimization and will not render component if user has selected same region
  // It is implemented to stop infinite loop
  shouldComponentUpdate(nextProps,nextState)
  {

    if(this.props.viewByChoice=="States")
    {
      if(this.props.regionJ["properties"]["NAME"]===this.props.region)
      {
        return true;
      }
      if(this.props.regionJ["properties"]["NAME"]!==nextProps.region)
      {
        return false;
      }
      return true;
    }
    else if(this.props.viewByChoice=="Watersheds")
    {
      
      if(this.props.regionJ.properties.SUBBASIN===this.props.region)
      {
  
        return true;
      }
      if(this.props.regionJ.properties.SUBBASIN!==nextProps.region)
      {
        return false;
      }
      return true;
       
    }
    else if(this.props.viewByChoice=="Counties")
    {
     
      if(this.props.regionJ.properties.CountyState1===this.props.region)
      {
        return true;
      }
      if(this.props.regionJ.properties.CountyState1!==nextProps.region)
      {
        return false;
      }
      return true;
    }
    
  }
  
  //It will render the regions for all us and different states
  //<Polygon> is a component provided by google-map library where in options property, all the designing configuration is provided
  render()
  {
    return (
      <Polygon
        ref={this.polygonRef}
        path={this.props.coordArr}
        options={{

          //All design configurations
          strokeColor: this.strokeColor(this.props.regionJ,this.props.historicInputState.toLowerCase(),this.props.viewByChoice,this.props.region),
          strokeOpacity: this.state.strokeOpacity,
          strokeWeight: this.strokeWeight(this.props.regionJ,this.props.historicInputState.toLowerCase(),this.props.viewByChoice,this.props.region),
          fillColor: this.regionColor(this.props.regionJ.properties,this.props.objforstate,this.props.g),
          fillOpacity:0.90,
        }}
        onClick={async () => {

          // If user clicks on all us region
          if (this.props.historicInputState.toLowerCase().includes("all us")) {
            localStorage.setItem("viewBy","Watersheds");
            const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
            localStorage.setItem("name",this.props.regionJ["properties"]["NAME"].toLowerCase() + " (state)");
            //To update URL 
            
            urlchange("/"+this.props.form+"/"+this.props.regionJ["properties"]["NAME"].toLowerCase() + " (state)"+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
            this.arrayForParent[0] = this.props.regionJ["properties"]["NAME"].toLowerCase() + " (state)";
            this.props.formHandler(this.arrayForParent);          
          }
          // If user has clicked on particular state
          else if (this.props.historicInputState.toLowerCase().includes("state")) {
            
            localStorage.setItem("viewBy","Facilities");
            
            
            
            // URL change based on the viewby choice selected from map component
            if (this.props.viewByChoice == "Watersheds" && this.props.regionJ.properties.SUBBASIN.toLowerCase().includes("watershed")) {
              const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
              urlchange("/"+this.props.form+"/"+this.props.regionJ.properties.SUBBASIN+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
              localStorage.setItem("name",this.props.regionJ.properties.SUBBASIN);
              this.arrayForParent[0] = this.props.regionJ.properties.SUBBASIN;
              this.props.formHandlerforFacility(this.arrayForParent);
            }
            else if (this.props.viewByChoice == "Counties") {
              const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
              urlchange("/"+this.props.form+"/"+this.props.regionJ.properties.CountyState1+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
              localStorage.setItem("name",this.props.regionJ.properties.CountyState1);
              this.arrayForParent[0] = this.props.regionJ.properties.CountyState1;
              this.props.formHandlerforFacility(this.arrayForParent); 
            }
          }
        }
        }
        // When mouse gets hovered on the component then global context gets updated and it will display green color on that particular
        // region's border
        onMouseOver={()=>{
          if(this.props.viewByChoice=="States")
          {
           this.props.setRegion(this.props.regionJ["properties"]["NAME"])
          } 
          else if(this.props.viewByChoice=="Watersheds")
          {
            this.props.setRegion(this.props.regionJ.properties.SUBBASIN)
          }
          else if(this.props.viewByChoice=="Counties")
          {
             this.props.setRegion(this.props.regionJ.properties.CountyState1)
          }
        }}
        onMouseOut={()=>{
          this.props.setRegion("")
          }}
      />
    )
  }
}

//Global context is used to provide synchronization between table and state region to heighlight borders on the map
export default (props)=>{
  return(
    <UserContext.Consumer>
    {(context)=>{
      return <StateLayer {...props}{...context}/>
    }} 
  </UserContext.Consumer>
  )
}