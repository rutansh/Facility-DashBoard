import React, { Component, useState } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import mapStyles from "./mystyle"
import { stateLatLngs } from '../data/stateLatLong';
import { Button } from 'react-bootstrap';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {stateAbr} from '../data/stateAbr';
import Regions from './regions';

class CustomMarker extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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

    // this.renderRegions = this.renderRegions.bind(this);
    this.objectForParent = {};
    this.onClickFacility=this.onClickFacility.bind(this);
    this.facilityChart=this.facilityChart.bind(this);

  }

onClickFacility(facilityIndex){
    //console.log("");("")("")("clicked in paarticular facility");
    //   this.props.onClickFacility(facilityIndex);  
    console.log("facility clicked..!")
}
  facilityChart(facilityData){
   console.log("display chart");
  }

  
  componentDidMount() {
    
    this.setState({
        loading:true,
    })
  }
  shouldComponentUpdate(pS,pP)
  {
      if(this.state.loading&&this.props.index!==this.state.index)
      {
          return false;
      }
      return true;
  }
  render() {
    if (!this.state.loading) {
      
      return (
        <div>Loading...!</div>
      )
    }
    else {

    
    //component-N facility-props=>title,lat,lng,onClick(e,index),isActive:(index==)
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
                  scale: 1
                }}
                onClick={
                    (async ()=>{
                        console.log("facility clicked...!");
                        let startDate = this.props.historicStartDate;
                        let endDate = this.props.historicEndDate;
                        let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
                        let startYear = parseInt(startDate.split(" ")[3])
                        let endYear = parseInt(endDate.split(" ")[3])
                        let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
                        let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
                        let fetchFacility="https://ewed.org:31567/ewedService/getFacility/pgmSysId/"+this.state.facility.PGM_SYS_ID+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt;
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
                    <button onClick={(e)=>{
                      this.props.modalOpen(e)
                    }}>Show Details</button>
                  </div>
                </InfoWindow>)}  
                    
            </Marker>
          </div>
          );           
    }}}
export default CustomMarker;
//componentDidUpdate or shouldComponentUpdate..!