import React, { Component, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polygon, Circle } from 'react-google-maps';
import mapStyles from "./mystyle"
import { stateLatLngs } from './vars';
import { Button } from 'react-bootstrap';


class MapContent extends Component {
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
    }
    this.renderRegions = this.renderRegions.bind(this);
    this.arrayForParent = [];
    this.displayItem = this.displayItem.bind(this);
    this.viewByItem = this.viewByItem.bind(this);
    let lng=0.0;
    let lat=0.0;
  }
  displayItem(event) {
    console.log("inside display radio function")
    this.setState({
      displayChoice: event.target.value
    })
  }
  viewByItem(event) {
    console.log("inside viewBy radio function")
    this.setState({
      viewByChoice: event.target.value
    })
    if (event.target.value == "States") {
      this.arrayForParent[0] = "all us";
      this.props.formHandler(this.arrayForParent);
    }
    else if (event.target.value == "Counties") {
      this.setState({
        isClicked: true,
      })
    }
    else if (event.target.value == "Facilities") {
      console.log("Facility Radio Button")
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
  renderRegions(props) {
    console.log("This is props from renderRegions()");
    console.log(props);

    if (this.state.viewByChoice == "Facilities") {
      console.log("3rd Layer of Map");
      console.log(this.state.regions);
      return this.state.regions["All Facilities"].map((facility, index) => {
      
       return  (
        <div>
       <Circle
          center={
            {
              lat: parseFloat(facility.LATITUDE83),
              lng: parseFloat(facility.LONGITUDE83),
            }
          }
          radius={10000}
          options={{
            fillColor: "purple",
            strokeWeight: 0.5,
            
          }}
          onClick={(async ()=>{
            console.log("clicked..!");
            console.log(facility.PGM_SYS_ID);
            let fetchFacility="https://ewed.org:31567/ewedService/getFacility/pgmSysId/"+facility.PGM_SYS_ID+"/2015/1/2015/12";
            var res = await fetch(fetchFacility)
            var jsondata = await res.json()
            console.log(jsondata);
            if(!this.state.isFacilitySelected)
            {
              this.setState({
                isFacilitySelected:true,
              })
              this.lat=facility.LATITUDE83;
              this.lng=facility.LONGITUDE83;
            }
            })}>
        </Circle>
        
          
        </div>
        
        )
            
        

      }
      );
      
      // if(this.state.isFacilitySelected)
      //   {
          
      //   
      //   }
    }
    else {
      if(this.state.regions.length>0)
      {
        return this.state.regions.map(regionJ => {
          let region = regionJ["geometry"];
          let type = region["type"];
          var coordinates;
          if (type === "MultiPolygon") {
            var tempArr = []
            var coord = region["coordinates"]
            coord.map(coordinate => {
              coordinate.map(temp => {
                temp.map(t => {
                  tempArr.push(t)
                })
              })
            })
            coordinates = tempArr
  
          }
          else {
            coordinates = region["coordinates"][0]
          }
          let coordArr = []
          coordinates.map(coordinate => coordArr.push({ lat: coordinate[1], lng: coordinate[0] }))
          return (
            <Polygon
              ref={this.polygonRef}
              path={coordArr}
              options={{
                strokeColor: 'rgba(0,0,0,0.5)',
                strokeOpacity: 0.2,
                strokeWeight: 0.5,
                fillColor: "green"
              }}
              onClick={async () => {
                if (props.toLowerCase().includes("all us")) {
                  this.arrayForParent[0] = regionJ["properties"]["NAME"].toLowerCase() + " (state)";
                  // console.log(this.arrayForParent[0]);
                  this.props.formHandler(this.arrayForParent);
                }
                else if (props.toLowerCase().includes("state")) {
  
                  if (this.state.viewByChoice == "Watersheds" && regionJ.properties.SUBBASIN.toLowerCase().includes("watershed")) {
                    console.log("this is inside watershed")
                    console.log(regionJ.properties)
                    this.arrayForParent[0] = regionJ.properties.SUBBASIN;
                    this.props.formHandler(this.arrayForParent);
                  }
                  else if (this.state.viewByChoice == "Counties") {
                    console.log("sadasdasd:", regionJ);
                    this.arrayForParent[0] = regionJ.properties.CountyState1;
                    this.props.formHandler(this.arrayForParent);
                  }
                  console.log("see this subbasin:")
                  console.log(regionJ.properties.SUBBASIN);
                  console.log("see this HU_8_STATE:")
                  console.log(regionJ.properties.HU_8_STATE);
                }
              }
              }
            />
          )
        })  
      }
    }
  }
  async componentDidMount() {
    console.log("Component DidMount..!")
    await fetch('https://ewed.org:3004/all-states')
      .then(res => res.json())
      .then((resJson) => {
        this.setState({
          regions: resJson["features"],
          loading: true,
        })
      }).catch(e => { console.log(e) });
    console.log("This is regions..!")
    console.log(this.state.regions)
  }
  async componentDidUpdate(pP, pS, snap) {
    console.log("componentDidupdate..!")
    var startDate = this.props.historicStartDate;
    var endDate = this.props.historicEndDate;
    var mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
    var startYear = parseInt(startDate.split(" ")[3])
    var endYear = parseInt(endDate.split(" ")[3])
    var startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
    if (pP.historicInputState === this.props.historicInputState && pP.historicStartDate === this.props.historicStartDate && pP.historicEndDate === this.props.historicEndDate) 
    {
      console.log("props are same");
      // console.log(this.state.viewByChoice);
      if (this.state.viewByChoice == "Counties" && this.state.isClicked) {
        console.log("Counties selected..!")
        var stateName = this.props.historicInputState.split(" (")
        stateName = stateName[0].split(" ");
        var state = "";
        console.log("This is state: " + stateName);
        console.log("This is from radio button form", this.state.viewByChoice);
        for (let i = 0; i < stateName.length; i++) {
          console.log("i:" + i);
          state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
        }
        stateName = state.trim();
        console.log("This is state name:" + stateName);
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        console.log(stateLatLngs[stateName]);
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
            isClicked: false
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (this.state.viewByChoice == "Watersheds" && this.state.isClicked) {
        console.log("Watershed selected..!");
        var stateName = this.props.historicInputState.split(" (")
        stateName = stateName[0].split(" ");
        var state = "";
        console.log("This is state: " + stateName);
        console.log("This is from radio button form", this.state.viewByChoice);
        for (let i = 0; i < stateName.length; i++) {
          console.log("i:" + i);
          state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
        }
        stateName = state.trim();
        console.log("This is state name:" + stateName);
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        console.log(stateLatLngs[stateName]);
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
            isClicked: false
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (this.state.viewByChoice == "States" && this.state.isClicked)
      {
        var url = "https://ewed.org:3004/all-states"
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
            isClicked: false
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (this.state.viewByChoice == "Facilities" && this.state.isClicked)
      {
        var url = "https://ewed.org:3004/all-states"
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
            isClicked: false
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      
    }
    else {
      console.log("searching from form...!1")
      setTimeout(() => {
        this.setState({
          startDateProps: this.props.historicStartDate,
          endDateProps: this.props.historicEndDate,
          nameOfState: this.props.historicInputState,
        }, () => { });
      }, 0);

      if (this.props.historicInputState.toLowerCase().includes("all us")) {
        var url = "https://ewed.org:3004/all-states"
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
        console.log("This is state: " + stateName);
        console.log("This is from radio button form", this.state.viewByChoice);
        for (let i = 0; i < stateName.length; i++) {
          console.log("i:" + i);
          state = state + ((stateName[i].substr(0, 1).toUpperCase() + stateName[i].substr(1)) + " ");
        }
        stateName = state.trim();
        console.log("This is state name:" + stateName);
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        console.log(stateLatLngs[stateName]);
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
            viewByChoice: "Watersheds"
          })
        }

        catch (e) {
          console.log(e);
        }
      }
      else if (this.props.historicInputState.toLowerCase().includes("county")) {
        var countyName = this.props.historicInputState;
        console.log("County data fetch");
        console.log(countyName);
        var url = "https://ewed.org:3004/county/" + countyName;
        try {
          var response = await fetch(url)
          var json = await response.json()
          //this.updateState(json,pP);
          await this.setState({
            regions: json["features"],
            loading: true,
            viewByChoice: "Facilities"
          })
        }
        catch (e) {
          console.log(e);
        }

      }
      else if (this.props.historicInputState.toLowerCase().includes("watershed")) 
      {
        var hucName = this.props.historicInputState.toLowerCase()
        var url = "https://ewed.org:41513/ewedService/getFacilityData/HUC8Name/" + hucName + "/" + startYear + "/" + startmonthinInt + "/" + endYear + "/" + endmonthinInt + "/fuelTypes/all"
        try {
          var response = await fetch(url)
          var json = await response.json()
          await this.setState({
            regions: json,
            loading: true,
            viewByChoice: "Facilities",
            zoom: 8.0,
            
          })
        }
        catch (e) {
          console.log(e);
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
        {this.state.regions !== null ? this.renderRegions(this.state.nameOfState) : console.log("do nothing")}   

        
      </GoogleMap>));
    if (!this.state.loading) {
      return (
        <div>Loading...!</div>
      )
    }
    else {
      return (
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
                <Button style={{ width: "200px", height: "40px" }}>Up to ALL US View</Button>
              </div>             
            </form>
          </div>
          <div style={{position:"absolute", top:"0"}}>
          <GoogleMapExample
            containerElement=
            {
              <div style={{ height: `950px`, width: '880px' }}></div>
            }
            mapElement={<div style={{ height: `95%` }} > </div>}/>
                
  }
          </div>
          
        </div>
        );
    }}}
export default MapContent;