import React, { Component, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polygon, Circle } from 'react-google-maps';
import mapStyles from "./mystyle"
import { stateLatLngs } from '../data/stateLatLong';
import { Button } from 'react-bootstrap';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {stateAbr} from '../data/stateAbr';
import Regions from './regions';

class MapContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state =
    {
      regions: null,
      loading: false,
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,
      longitude: -98.583333,
      latitude: 39.833333,
      zoom: 4.46,
      isClicked: false,
      displayChoice: "Water Consumption",
      viewByChoice: "States",
      isFacilitySelected:false,
      index:0,
      jsonDataforChart:undefined,
      ismodalOpen:false,
      prevState:"",
      regionClick:false,
      items:this.props.tabledata,
      regionLoaded:false,
    }
    this.backButton=this.backButton.bind(this);
    // this.renderRegions = this.renderRegions.bind(this);
    this.arrayForParent = [];
    this.displayItem = this.displayItem.bind(this);
    this.viewByItem = this.viewByItem.bind(this);
    this.onClickFacility=this.onClickFacility.bind(this);
    this.facilityChart=this.facilityChart.bind(this);
    this.formHandler=this.formHandler.bind(this);
    this.modalOpen=this.modalOpen.bind(this);
    this.formHandlerforFacility=this.formHandlerforFacility.bind(this);
  }
  formHandler(changeEvent){
    console.log("formhandler from mapcontent",changeEvent);
    if(changeEvent[0]=="all us")
    {
      this.props.formHandler(changeEvent);  
    }
    else
    {
      // this.setState({
      //   regionClick:true,
      // })
      //california(state)
      this.props.formHandler(changeEvent)
    }
    
    
  }
  formHandlerforFacility(changeEvent){
    console.log("formhandlerforfacility from mapcontent",changeEvent);
    // this.setState({
    //   regionClick:true,
    // })
    this.props.formHandlerforFacility(changeEvent)  
  }

  onClickFacility(facilityObject){
    //console.log("");("")("")("clicked in paarticular facility");
    if(!this.state.isFacilitySelected)
    {
      this.setState({
        isFacilitySelected:true,
        lat:facilityObject.facility.LATITUDE83,
        lng:facilityObject.facility.LONGITUDE83,
        index:facilityObject.index,
        jsonDataforChart:facilityObject.jsonDataforChart,
      })
    }
    else
    {
      //console.log("");("")("")("second facility selected");
      this.setState({
        lat:facilityObject.facility.LATITUDE83,
        lng:facilityObject.facility.LONGITUDE83,
        index:facilityObject.index,
        jsonDataforChart:facilityObject.jsonDataforChart,
      })
      
    }
    
  }
  facilityChart(facilityData){
    //console.log("");("")("")("facilitychart data");
    //console.log("");("")("")(facilityData);
    this.setState({
      ismodalOpen:true
    })
  }
  backButton()
  {
    //console.log("");("")("")("backbutton");
  }
  modalOpen()
  {
   
    this.setState({
      ismodalOpen:true,
    })
  }
  displayItem(event) {
    //console.log("");("")("")("inside display radio function")
    this.setState({
      displayChoice: event.target.value
    })
  }
  viewByItem(event) {
    
    this.setState({
      loading:false,
      viewByChoice: event.target.value,
      
    })
    if (event.target.value == "States") {
      this.setState({
        isClicked: true,
      })
      
    }
    else if (event.target.value == "Counties") {
      this.setState({
        isClicked: true,
      })
    }
    else if (event.target.value == "Facilities") {
      
      this.setState({
        isClicked: true,
      })
    }
    else if (event.target.value == "Watersheds") {
      this.setState({
        isClicked: true,
      })
    }
  }
  //Component->onClick(e,key){
    //activeIndex:key
  

  async componentDidMount() {
    let startDate = this.props.historicStartDate;
    let endDate = this.props.historicEndDate;
    let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
    let startYear = parseInt(startDate.split(" ")[3])
    let endYear = parseInt(endDate.split(" ")[3])
    let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
    try{
      var response= await fetch('https://ewed.org:3004/all-states');
      var json = await response.json()
      this.setState({
          regions: json["features"],
          loading: true,
          items:this.props.tabledata,
        })
    }
    
    catch(e) { console.log(e) };
    
  }
  // shouldComponentUpdate(nextProps,nextState)
  // {
  //   console.log("should componentupdate of mapcontent");
  //   console.log("nextProps of tabledata");
  //   console.log(nextProps.tabledata);
  //   console.log("this.props.tabledata")
  //   console.log(this.props.tabledata);
  //   console.log((nextProps.tabledata!==this.props.tabledata)||!this.state.loading);
  //   console.log("nextState.regions")
  //   console.log(nextState.regions);
  //   console.log("this.state.regions");
  //   console.log(this.state.regions);
  //   console.log("loading..");
  //   console.log(nextState.loading)
  //   // if(nextState.regions!==this.state.regions)
  //   // {
  //   //   return true;
  //   // }
  //   console.log("check");
  //   console.log(nextState.regions===this.state.regions)
    
    
  //     return true;
    
    
  // }
  async componentDidUpdate(pP, pS, snap) {
    
    let startDate = this.props.historicStartDate;
    let endDate = this.props.historicEndDate;
    let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
    let startYear = parseInt(startDate.split(" ")[3])
    let endYear = parseInt(endDate.split(" ")[3])
    let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
    console.log("component did update of mapcontent"+this.props.historicInputState); 
    if (pP.historicInputState === this.props.historicInputState && pP.historicStartDate === this.props.historicStartDate && pP.historicEndDate === this.props.historicEndDate) 
    {

      console.log("component did update of mapcontent and everything is same:"+this.props.historicInputState+":"+this.state.regionClick);
      console.log(this.props.tabledata);
      if (this.state.viewByChoice == "Counties" && this.state.isClicked) {
        var stateName = this.props.historicInputState.split(" (")
        stateName = stateName[0].split(" ");
        var state = "";
        for (let i = 0; i < stateName.length; i++) 
        {
          state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
        }
        stateName = state.trim();
        
        
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        var url = "https://ewed.org:3004/counties-in-state/" + stateName
        try {
          var response = await fetch(url)
          var json = await response.json()
          await this.setState({
            regions: json["features"],
            loading: true,
            longitude: long,
            latitude: lat,
            zoom: 6,
            isClicked: false,
            prevState:pP.historicInputState,
            
          })
          var obj={viewByChoice:"Counties",state:this.props.historicInputState} 
        this.props.viewByButtonClicked(obj);
          
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (this.state.viewByChoice == "Watersheds" && this.state.isClicked) {
        var stateName = this.props.historicInputState.split(" (")
        stateName = stateName[0].split(" ");
        var state = "";
        for (let i = 0; i < stateName.length; i++) {
          state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
        }
        stateName = state.trim();
        
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        var url = "https://ewed.org:3004/hucs-in-state/" + stateName
        try {
          var response = await fetch(url)
          var json = await response.json()
          
          await this.setState({
            regions: json["features"],
            loading: true,
            longitude: long,
            latitude: lat,
            zoom: 6,
            viewByChoice: "Watersheds",
            isClicked: false,
            prevState:pP.historicInputState
          })
         
        }
        catch (e) {
          console.log(e);
        }
        var obj={viewByChoice:"Watersheds",state:this.props.historicInputState} 
        this.props.viewByButtonClicked(obj);
      }
      else if (this.state.viewByChoice == "Facilities" && this.state.isClicked)
      {
        
        var name=this.props.historicInputState;
        name=name.split(" (")[0];
        let startDate = this.props.historicStartDate;
        let endDate = this.props.historicEndDate;
        let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
        let startYear = parseInt(startDate.split(" ")[3])
        let endYear = parseInt(endDate.split(" ")[3])
        let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
        let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
        
        var url = "https://ewed.org:28469/ewedService/getFacilityData/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all";
        try {
          var response = await fetch(url)
          var json = await response.json()
          await this.setState({
            regions:json,
            zoom: 5.5,
            isClicked: false,
            loading: true,
            prevState:pP.historicInputState,
            viewByChoice:"Facilities"
          })
       }
        catch (e) {
          console.log("");
        }
        var obj={viewByChoice:"Facilities",state:this.props.historicInputState} 
        this.props.viewByButtonClicked(obj);

        
      }
      else if (this.state.viewByChoice == "States" && this.state.isClicked)
      {
        
        var url = "https://ewed.org:3004/all-states";
        this.arrayForParent[0] = "all us";
        
        try {
          var response = await fetch(url)
          var json = await response.json()
          //this.updateState(json,pP);
          await this.setState({
            regions: json["features"],
            loading: true,
            lattitude: 39.833333,
            longitude: -98.583333,
            zoom: 4.46,
            isClicked: false,
            prevState:"",
      
          })
          this.formHandler(this.arrayForParent);
        }
        catch (e) {
          console.log(e);
        }
      }
      // else if(this.props.historicInputState.toLowerCase().includes("state") && pS.regions!==this.state.regions)
      // {
      //   console.log("state with false regionclick");
      //   console.log(this.props.tabledata);
      //   var stateName = this.props.historicInputState.split(" (")
      //   stateName = stateName[0].split(" ");
      //   var state = "";
      //   for (let i = 0; i < stateName.length; i++) {
      //     state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
      //   }
      //   stateName = state.trim();
      //   let long = stateLatLngs[stateName]["longitude"];
      //   let lat = stateLatLngs[stateName]["latitude"];
      //   var url = "https://ewed.org:3004/hucs-in-state/" + stateName
      //   try {
      //     var response = await fetch(url)
      //     var json = await response.json()
      //     await this.setState({
      //       regions: json["features"],
      //       loading: true,
      //       longitude: long,
      //       latitude: lat,
      //       zoom: 6,
      //       viewByChoice: "Watersheds",
      //       prevState:"all us",
      //       items:this.props.tabledata,
      //       startDateProps: this.props.historicStartDate,
      //       endDateProps: this.props.historicEndDate,
      //       nameOfState: this.props.historicInputState,
            
      //     })
      //     console.log("regions for geojson");
      //     console.log(json);

      //   }
      //   catch (e) {
      //     console.log(e);
      //   }
      // }
      // else if(!this.state.regionClick && this.props.historicInputState.toLowerCase().includes("watershed") && !this.state.regionLoaded)
      // {
      //   var hucName = this.props.historicInputState.toLowerCase();
      //   var stateNamefromWatershed=hucName.split(" (");
      //   stateNamefromWatershed=stateNamefromWatershed[1].substr(0,stateNamefromWatershed[1].length-1);
        
      //   if(stateNamefromWatershed.includes(","))
      //   {
      //     stateNamefromWatershed=stateNamefromWatershed.split(",")[0].toUpperCase();
      //   }
      //   else
      //   {
      //     stateNamefromWatershed=stateNamefromWatershed.toUpperCase();
      //   }
        
      //   var lat=stateLatLngs[stateAbr[stateNamefromWatershed]].latitude;
      //   var long=stateLatLngs[stateAbr[stateNamefromWatershed]].longitude;
        
      //   var url = "https://ewed.org:41513/ewedService/getFacilityData/HUC8Name/" + hucName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/all"
      //   try {
      //     var response = await fetch(url)
      //     var json = await response.json()
      //     await this.setState({
      //       regions: json,
      //       loading: true,
      //       viewByChoice: "Facilities",
      //       zoom: 7.0,
      //       latitude:lat,
      //       longitude:long,
      //       prevState:stateAbr[stateNamefromWatershed]+" (state)",
      //       items:this.props.tabledata,
      //       startDateProps: this.props.historicStartDate,
      //       endDateProps: this.props.historicEndDate,
      //       nameOfState: this.props.historicInputState,
      //       regionLoaded:true,
      //     })
      //   }
      //   catch (e) {
      //     console.log(e);
      //   }
      // }
      
      
    }
    else {
      
        
      console.log("component didupdate of mapcontent and everything is not same");
      if (this.props.historicInputState.toLowerCase().includes("all us")) {
        var url = "https://ewed.org:3004/all-states"
        var url2="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        try {
             
          var response = await fetch(url)
          var json = await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions: json["features"],
            loading: true,
            lattitude: 39.833333,
            longitude: -98.583333,
            zoom: 4.46,
            prevState:"",
            items:this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (this.props.historicInputState.toLowerCase().includes("state")) {
        
        var stateName = this.props.historicInputState.split(" (")
        stateName = stateName[0].split(" ");
        var state = "";
        for (let i = 0; i < stateName.length; i++) {
          state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
        }
        stateName = state.trim();
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        var url = "https://ewed.org:3004/hucs-in-state/" + stateName
        try {
          var response = await fetch(url)
          var json = await response.json()
          await this.setState({
            regions: json["features"],
            loading: true,
            longitude: long,
            latitude: lat,
            zoom: 6,
            viewByChoice: "Watersheds",
            prevState:"all us",
            items:this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (this.props.historicInputState.toLowerCase().includes("county")) {
        var countyName = this.props.historicInputState;
        
        var url = "https://ewed.org:41513/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all"
        var stateNamefromCounty=countyName.split(" (");
        stateNamefromCounty=stateNamefromCounty[1].substr(0,stateNamefromCounty[1].length-1);
        
        let arr=stateNamefromCounty.split(" ");
        stateNamefromCounty=""
        for(let k=0;k<arr.length;k++)
        {
          stateNamefromCounty+=arr[k].substr(0,1).toUpperCase()+arr[k].substr(1,arr[k].length)+" ";
        }
        stateNamefromCounty= stateNamefromCounty.trim();
        
        let lat=stateLatLngs[stateNamefromCounty].latitude;
        let long=stateLatLngs[stateNamefromCounty].longitude;
        try {
          var response = await fetch(url)
          var json = await response.json()

          //this.updateState(json,pP);
          await this.setState({
            regions: json,
            loading: true,
            viewByChoice: "Facilities",
            zoom:8.0,
            latitude:lat,
            longitude:long,
            prevState:stateNamefromCounty+" (state)",
            items:this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          })
        }
        catch (e) {
          console.log(e);
        }

      }
      else if (this.props.historicInputState.toLowerCase().includes("watershed")) 
      {
        var hucName = this.props.historicInputState.toLowerCase();
        var stateNamefromWatershed=hucName.split(" (");
        stateNamefromWatershed=stateNamefromWatershed[1].substr(0,stateNamefromWatershed[1].length-1);
        
        if(stateNamefromWatershed.includes(","))
        {
          stateNamefromWatershed=stateNamefromWatershed.split(",")[0].toUpperCase();
        }
        else
        {
          stateNamefromWatershed=stateNamefromWatershed.toUpperCase();
        }
        
        var lat=stateLatLngs[stateAbr[stateNamefromWatershed]].latitude;
        var long=stateLatLngs[stateAbr[stateNamefromWatershed]].longitude;
        
        var url = "https://ewed.org:41513/ewedService/getFacilityData/HUC8Name/" + hucName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/all"
        try {
          var response = await fetch(url)
          var json = await response.json()
          await this.setState({
            regions: json,
            loading: true,
            viewByChoice: "Facilities",
            zoom: 7.0,
            latitude:lat,
            longitude:long,
            prevState:stateAbr[stateNamefromWatershed]+" (state)",
            items:this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if(this.state.viewByChoice=="Facilities" && this.props.notReload)
      {
        
        var name=this.props.historicInputState;
        name=name.split(" (")[0];
      
        let startDate = this.props.historicStartDate;
        let endDate = this.props.historicEndDate;
        let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
        let startYear = parseInt(startDate.split(" ")[3])
        let endYear = parseInt(endDate.split(" ")[3])
        let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
        let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
        var url = "https://ewed.org:28469/ewedService/getFacilityData/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/all";
        try {
          var response = await fetch(url)
          var json = await response.json()
          await this.setState({
            regions:json,
            zoom: 5.5,
            isClicked: false,
            loading: true,
            prevState:pP.historicInputState,
            viewByChoice:"Facilities",
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          })
          
       }
        catch (e) {
          console.log("");
        }

      }

    }
  }
  render() {
    let GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.state.latitude, lng: this.state.longitude } }
        defaultZoom = { this.state.zoom }
        defaultOptions={{ styles: mapStyles }} 
      >
        {this.state.regions!== null ?
        <Regions regions={this.state.regions} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate} 
        historicInputState={this.props.historicInputState} displayChoice={this.state.displayChoice} viewByChoice={this.state.viewByChoice}
        formHandler={(e)=>this.formHandler(e)} formHandlerforFacility={(e)=>this.formHandlerforFacility(e)}tabledata={this.props.tabledata} modalOpen={(e)=>this.modalOpen(e)}
        />:console.log("do nothing")}
      </GoogleMap>));
    
    if (!this.state.loading) {
      
      return (
        <div>Loading...!</div>
      )
    }
    else {
      
      return (
        <div>
          <div>
        
        </div>
        <div>
            <div style={{position:"absolute",zIndex:1}} >  
            <form style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              
              <div className="filterForm">
              <b style={{ marginRight: "20px" }}>Display :</b>
                <div>
                <input type="radio" name="Options" className="radioButtonDisplay" value="Water Consumption" onChange={this.displayItem} checked={this.state.displayChoice === "Water Consumption"} style={{ marginRight: "5px" }} />Water Consumption
                </div>
                <div style={{ marginLeft: "10px" }}>
                <input type="radio" name="Options" className="radioButtonDisplay" value="Water Withdrawal" onChange={this.displayItem} checked={this.state.displayChoice === "Water Withdrawal"} style={{ marginRight: "5px" }} />Water Withdrawal
                </div>
                <div style={{ marginLeft: "10px" }}>
                <input type="radio" name="Options" className="radioButtonDisplay" value="Water Emission" onChange={this.displayItem} checked={this.state.displayChoice === "Water Emission"} style={{ marginRight: "5px" }} />Water Emission
                </div>
              </div>
              
            </form>
            <form style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              <div className="filterForm">
              <b style={{ marginRight: "15px" }}>View By :</b>
              <div>
                <input type="radio" name="Options" className="radioButtonViewBy" value="States" onChange={this.viewByItem} checked={this.props.historicInputState.toLowerCase().includes("all us")} style={{ marginRight: "5px" }} />States
                  </div>
              <div style={{ marginLeft: "10px" }}>
                <input type="radio" name="Options" className="radioButtonViewBy" value="Watersheds" onChange={this.viewByItem} checked={this.state.viewByChoice === "Watersheds" && this.props.historicInputState.toLowerCase().includes("state")} disabled={this.props.historicInputState.toLowerCase().includes("all us") || this.props.historicInputState.toLowerCase().includes("county") || this.props.historicInputState.toLowerCase().includes("watershed")} style={{ marginRight: "5px" }} />Watersheds
                  </div>
              <div style={{ marginLeft: "10px" }}>
                <input type="radio" name="Options" className="radioButtonViewBy" value="Counties" onChange={this.viewByItem} checked={this.state.viewByChoice === "Counties"} disabled={this.props.historicInputState.toLowerCase().includes("all us") || this.props.historicInputState.toLowerCase().includes("county") || this.props.historicInputState.toLowerCase().includes("watershed")} style={{ marginRight: "5px" }} />Counties
                  </div>
              <div style={{ marginLeft: "10px" }}>
                <input type="radio" name="Options" className="radioButtonViewBy" value="Facilities" onChange={this.viewByItem} checked={this.state.viewByChoice === "Facilities" || this.props.historicInputState.toLowerCase().includes("watershed")} disabled={this.props.historicInputState.toLowerCase().includes("all us")} style={{ marginRight: "5px" }} />Facilities
                  </div>
              
              </div>
              <div style={{ marginLeft: "50px" }}>
              <Button style={{ width: "200px", height: "40px" }} onClick={()=>
                {            
                }}>
                Up to {this.state.prevState} View
              </Button>
              </div>
                           
            </form>
          </div>
          <div style={{position:"absolute", top:"0"}}>
          <GoogleMapExample
            containerElement=
            {
              <div style={{ height: `950px`, width: '880px' }}></div>
            }
            mapElement={<div style={{ height: `95%` }} > </div>}
            />
          </div>
        </div>
        
        </div>
        );
    }}}
export default MapContent;