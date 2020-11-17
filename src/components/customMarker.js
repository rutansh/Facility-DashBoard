import React, { Component, useState } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import {geostats} from './geostats';
import {facilityHax} from './facilityHax';
import Button from '@material-ui/core/Button'; 

// This component will render all the facilities present in requested watersheds, counties or statas
class CustomMarker extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    
    // Initializing local states with the data received from props
    this.state =
    {
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,
      facility:this.props.facility,
      zoom: 8,
      jsonDataforChart:undefined,
      ismodalOpen:false,
      prevState:"",
      index:this.props.arrIndex,
    }
    
    this.objectForParent = {};

    // To set radius based on the values received
    this.setRadius=this.setRadius.bind(this);
  }
  
  //This method will set the radius of marker based on the filter selected on display by form from the map layer
  // facilityhax method will return the hex color based on the values
  setRadius(g,facility,map)
  {
    
    if(this.props.displayChoice=="Water Consumption")
    {
      return facilityHax[g.getRangeNum(Number(map[facility.PRIMARY_NAME].WaterConsumptionSummary))];
    }
    else if(this.props.displayChoice=="Water Withdrawal")
    {
      return facilityHax[g.getRangeNum(Number(map[facility.PRIMARY_NAME].WaterWithdrawalSummary))];
    }
    else
    {
      return facilityHax[g.getRangeNum(Number(map[facility.PRIMARY_NAME].EmissionSummary))];
    }
    
  }

  // This method is used when facility is loaded,it will update the state of loading to true
  componentDidMount() {
    this.setState({
        loading:true,
    })
  }

  // When user clicks on particular facility
  shouldComponentUpdate(nextState,nextProps)
  {
      if(this.state.loading&&this.props.index!==this.state.index)
      {
          return false;
      }
      return true;
  }


  // It will render facilities using <Marker> component if someone clicks on Marker then, <InfoWindow> component is rendered
  // Both <Marker> and <InfoWindow> are present in reactjs-google library 
  render() {

    // When initially this component gets rendered
    if (!this.state.loading) {
      
      return (
        <div>Loading...!</div>
      )
    }

    // Returning facilities as markers using <Marker> component

    else {
          return(
            <div>
            <Marker key={this.props.arrIndex}
            title={this.state.facility.LOCATION_ADDRESS}
            position={
              {
                lat: parseFloat(this.state.facility.LATITUDE83),
                lng: parseFloat(this.state.facility.LONGITUDE83),
              }
            }
            icon={ {
                  path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                  fillColor: "#8B008B",
                  strokeColor: "#800080",
                  fillOpacity: 0.4,
                  anchor: {x:0,y:0},
                  strokeWeight: 0,
                  scale: this.setRadius(this.props.g,this.props.facility,this.props.objforstate)
                }}
                onClick={
                    (async ()=>{
                        
                        let startDate = this.props.historicStartDate;
                        let endDate = this.props.historicEndDate;
                        let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
                        let startYear = parseInt(startDate.split(" ")[3])
                        let endYear = parseInt(endDate.split(" ")[3])
                        let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
                        let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
                        let fetchFacility=""
                        if(this.props.form=="Historic")
                        {
                          fetchFacility="https://ewed.org:31567/ewedService/getFacility/pgmSysId/"+this.state.facility.PGM_SYS_ID+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt;
                        }
                        else if(this.props.form=="Projected")
                        {
                          fetchFacility="https://ewed.org:31567/ewedService/getFutureData/getFacility/"+this.props.energyScenario+"/pgmSysId/"+this.state.facility.PGM_SYS_ID+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt;
                        }
                        var res = await fetch(fetchFacility);
                        var jsondata = await res.json();
                        this.objectForParent.data = jsondata;
                        this.objectForParent.index = this.props.arrIndex;
                        this.props.markerClick(this.objectForParent);
                    })}    
                >
                {this.state.loading&&this.props.arrIndex===this.props.index&&
                (<InfoWindow>
                  <div style={{display: 'flex', flexDirection: 'column',height:"200px",width:"200px",zIndex:10}}>
                    
                    <b>{this.props.data.Facility[0]["PRIMARY_NAME"]} - Trends</b>
                    <br></br>
                    <div><b>Plant Code: </b>{this.state.facility.PGM_SYS_ID}</div>
                    <div style={{display: 'flex', flexDirection: 'row',marginBottom:"-15px"}}><b>Fuel Type: </b>{this.props.data["FacilityDataSummary"][0].fuelType?<p>{this.props.data.FacilityDataSummary[0].fuelType}</p>:"N/A"}</div>
                    <div style={{display: 'flex', flexDirection: 'row',marginBottom:"-15px"}}><b>Plant Type: </b>{this.props.data.FacilityDataSummary[0].plantType?<p>{this.props.data.FacilityDataSummary[0].plantType}</p>:"N/A"}</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}><b>Cooling System Type: </b>{this.props.data.FacilityDataSummary[0].coolingSystemType?<p>{this.props.data.FacilityDataSummary[0].coolingSystemType}</p>:"N/A"}</div>
                    <div style={{display: 'flex', flexDirection: 'row',marginBottom:"-15px"}}><b>Water Type: </b>{this.props.data.FacilityDataSummary[0].waterType?<p>{this.props.data.FacilityDataSummary[0].waterType}</p>:"N/A"}</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}><b>Generation: </b>{this.props.data.FacilityDataSummary[0].generationSummary}</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}><b>Emissions: </b>{this.props.data.FacilityDataSummary[0].emissionSummary}</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}><b>Water Withdrawal: </b>{this.props.data.FacilityDataSummary[0].waterWithdrawalSummary}</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}><b>Water Consumption: </b>{this.props.data.FacilityDataSummary[0].waterConsumptionSummary}</div>
                    <br></br>
                    <Button variant="contained" color="primary" onClick={(e)=>{
                      this.props.modalOpen(e)
                    }}>Show Details</Button>
                  </div>
                </InfoWindow>)}  
            </Marker>
          </div>
          );           
    }}}
export default CustomMarker;
