import React, { Component, useState } from 'react';
import { Marker, InfoWindow, Polygon } from 'react-google-maps';
import CustomMarker from './customMarker';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {geostats} from './geostats';
import {mapColorPaletteHex} from './colorsforRegion';
import UserContext from './Context/updateContext';
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
    this.regionColor=this.regionColor.bind(this);
    this.strokeColor=this.strokeColor.bind(this);
    this.strokeWeight=this.strokeWeight.bind(this);
    this.strokeOpacity=this.strokeOpacity.bind(this);
    this.arrayForParent = [];
}
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
regionColor(regionName,map,g)
  {
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
  render()
  {
    
    return (
      <Polygon
        ref={this.polygonRef}
        path={this.props.coordArr}
        options={{
          strokeColor: this.strokeColor(this.props.regionJ,this.props.historicInputState.toLowerCase(),this.props.viewByChoice,this.props.region),
          strokeOpacity: this.state.strokeOpacity,
          strokeWeight: this.strokeWeight(this.props.regionJ,this.props.historicInputState.toLowerCase(),this.props.viewByChoice,this.props.region),
          fillColor: this.regionColor(this.props.regionJ.properties,this.props.objforstate,this.props.g),
          fillOpacity:0.55,
        }}
        onClick={async () => {
          if (this.props.historicInputState.toLowerCase().includes("all us")) {
            this.arrayForParent[0] = this.props.regionJ["properties"]["NAME"].toLowerCase() + " (state)";
            this.props.formHandler(this.arrayForParent);          
          }
          else if (this.props.historicInputState.toLowerCase().includes("state")) {
            if (this.props.viewByChoice == "Watersheds" && this.props.regionJ.properties.SUBBASIN.toLowerCase().includes("watershed")) {
              this.arrayForParent[0] = this.props.regionJ.properties.SUBBASIN;
              this.props.formHandlerforFacility(this.arrayForParent);
            }
            else if (this.props.viewByChoice == "Counties") {
              this.arrayForParent[0] = this.props.regionJ.properties.CountyState1;
              this.props.formHandlerforFacility(this.arrayForParent); 
            }
          }
        }
        }
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
export default (props)=>{
  return(
    <UserContext.Consumer>
    {(context)=>{
      return <StateLayer {...props}{...context}/>
    }} 
  </UserContext.Consumer>
  )
}