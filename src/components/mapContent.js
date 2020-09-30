import React from "react";
import { withGoogleMap, GoogleMap, MapTypeControlStyle, ControlPosition } from "react-google-maps";
import mapStyles from "./mystyle";
import { stateLatLngs } from "../data/stateLatLong";
import Button  from "@material-ui/core/Button";
import { stateAbr } from "../data/stateAbr";
import Regions from "./regions";
import { Radio, InputLabel } from "@material-ui/core";
import Loader from 'react-loader-spinner';

class MapContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      regions: null,
      loading: false,
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,
      longitude: -98.583333,
      latitude: 39.833333,
      zoom: 4.30,
      isClicked: false,
      displayChoice: "Water Consumption",
      viewByChoice: "States",
      isFacilitySelected: false,
      index: 0,
      jsonDataforChart: undefined,
      ismodalOpen: false,
      prevState: "",
      regionClick: false,
      items: this.props.tabledata,
      regionLoaded: false,
    };

    // this.renderRegions = this.renderRegions.bind(this);
    this.arrayForParent = [];
    this.displayItem = this.displayItem.bind(this);
    this.viewByItem = this.viewByItem.bind(this);
    this.onClickFacility = this.onClickFacility.bind(this);
    this.facilityChart = this.facilityChart.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.formHandlerforFacility = this.formHandlerforFacility.bind(this);
  }
  formHandler(changeEvent) {
    if (changeEvent[0] == "all us") {
      this.props.formHandler(changeEvent);
    } else {
      this.props.formHandler(changeEvent);
    }
  }
  formHandlerforFacility(changeEvent) {
    this.props.formHandlerforFacility(changeEvent);
  }

  onClickFacility(facilityObject) {
    if (!this.state.isFacilitySelected) {
      this.setState({
        isFacilitySelected: true,
        lat: facilityObject.facility.LATITUDE83,
        lng: facilityObject.facility.LONGITUDE83,
        index: facilityObject.index,
        jsonDataforChart: facilityObject.jsonDataforChart,
      });
    } else {
      //console.log("");("")("")("second facility selected");
      this.setState({
        lat: facilityObject.facility.LATITUDE83,
        lng: facilityObject.facility.LONGITUDE83,
        index: facilityObject.index,
        jsonDataforChart: facilityObject.jsonDataforChart,
      });
    }
  }
  facilityChart(facilityData) {
    this.setState({
      ismodalOpen: true,
    });
  }

  modalOpen() {
    this.setState({
      ismodalOpen: true,
    });
  }
  displayItem(event) {
    this.setState({
      displayChoice: event.target.value,
    });
  }
  viewByItem(event) {
    this.setState({
      loading: false,
      viewByChoice: event.target.value,
    });
    if (event.target.value == "States") {
      this.setState({
        isClicked: true,
      });
    } else if (event.target.value == "Counties") {
      this.setState({
        isClicked: true,
      });
    } else if (event.target.value == "Facilities") {
      this.setState({
        isClicked: true,
      });
    } else if (event.target.value == "Watersheds") {
      this.setState({
        isClicked: true,
      });
    }
  }

  async componentDidMount() {
    let startDate = this.props.historicStartDate;
    let endDate = this.props.historicEndDate;
    let mapping = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    let startYear = parseInt(startDate.split(" ")[3]);
    let endYear = parseInt(endDate.split(" ")[3]);
    let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
    try {
      var response = await fetch("https://ewed.org:3004/all-states");
      var json = await response.json();
      this.setState({
        regions: json["features"],
        loading: true,
        items: this.props.tabledata,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidUpdate(pP, pS, snap) {
    let startDate = this.props.historicStartDate;
    let endDate = this.props.historicEndDate;
    let mapping = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    let startYear = parseInt(startDate.split(" ")[3]);
    let endYear = parseInt(endDate.split(" ")[3]);
    let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
    let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);

    if (
      pP.historicInputState === this.props.historicInputState &&
      pP.historicStartDate === this.props.historicStartDate &&
      pP.historicEndDate === this.props.historicEndDate
    ) {
      if (this.state.viewByChoice == "Counties" && this.state.isClicked) {
        var stateName = this.props.historicInputState.split(" (");
        stateName = stateName[0].split(" ");
        var state = "";
        if (stateName.length > 1) {
          for (let i = 0; i < stateName.length; i++) {
            state =
              state +
              (stateName[i].substr(0, 1).toUpperCase() +
                stateName[i].substr(1) +
                " ");
          }
        } else if (stateName.length == 1) {
          state =
            stateName[0].substr(0, 1).toUpperCase() + stateName[0].substr(1);
        }

        stateName = state.trim();
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        var url = "https://ewed.org:3004/counties-in-state/" + stateName;
        try {
          var response = await fetch(url);
          var json = await response.json();
          await this.setState({
            regions: json["features"],
            loading: true,
            longitude: long,
            latitude: lat,
            zoom: 6,
            isClicked: false,
          });
          var obj = {
            viewByChoice: "Counties",
            state: this.props.historicInputState,
          };
          this.props.viewByButtonClicked(obj);
        } catch (e) {
          console.log(e);
        }
      } else if (
        this.state.viewByChoice == "Watersheds" &&
        this.state.isClicked
      ) {
        var stateName = this.props.historicInputState.split(" (");
        stateName = stateName[0].split(" ");
        var state = "";
        for (let i = 0; i < stateName.length; i++) {
          state =
            state +
            (stateName[i].substr(0, 1).toUpperCase() +
              stateName[i].substr(1) +
              " ");
        }
        stateName = state.trim();

        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        var url = "https://ewed.org:3004/hucs-in-state/" + stateName;
        try {
          var response = await fetch(url);
          var json = await response.json();
          await this.setState({
            regions: json["features"],
            loading: true,
            longitude: long,
            latitude: lat,
            zoom: 6,
            viewByChoice: "Watersheds",
            isClicked: false,
          });
        } catch (e) {
          console.log(e);
        }
        var obj = {
          viewByChoice: "Watersheds",
          state: this.props.historicInputState,
        };
        this.props.viewByButtonClicked(obj);
      } else if (
        this.state.viewByChoice == "Facilities" &&
        this.state.isClicked
      ) {
        var name = this.props.historicInputState;
        name = name.split(" (")[0];
        let startDate = this.props.historicStartDate;
        let endDate = this.props.historicEndDate;
        let mapping = {
          Jan: "1",
          Feb: "2",
          Mar: "3",
          Apr: "4",
          May: "5",
          Jun: "6",
          Jul: "7",
          Aug: "8",
          Sep: "9",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        };
        let startYear = parseInt(startDate.split(" ")[3]);
        let endYear = parseInt(endDate.split(" ")[3]);
        let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
        let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
        if (this.props.form == "Historic") {
          var url =
            "https://ewed.org:28469/ewedService/getFacilityData/stateName/" +
            name +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/" +
            this.props.filterstr;
        } else if (this.props.form == "Projected") {
          //"https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          var url =
            "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/" +
            this.props.energyScenario +
            "/stateName/" +
            name +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/" +
            this.props.filterstr;
        }
        try {
          var response = await fetch(url);
          var json = await response.json();
          await this.setState({
            regions: json,
            zoom: 5.5,
            isClicked: false,
            loading: true,
            viewByChoice: "Facilities",
          });
        } catch (e) {
          console.log("");
        }
        var obj = {
          viewByChoice: "Facilities",
          state: this.props.historicInputState,
        };
        this.props.viewByButtonClicked(obj);
      } else if (this.state.viewByChoice == "States" && this.state.isClicked) {
        var url = "https://ewed.org:3004/all-states";
        this.arrayForParent[0] = "all us";
        try {
          var response = await fetch(url);
          var json = await response.json();
          //this.updateState(json,pP);
          await this.setState({
            regions: json["features"],
            loading: true,
            lattitude: 39.833333,
            longitude: -98.583333,
            zoom: 4.46,
            isClicked: false,
            prevState: "",
          });
          this.formHandler(this.arrayForParent);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      if (this.props.historicInputState.toLowerCase().includes("all us")) {
        var url = "https://ewed.org:3004/all-states";
        try {
          var response = await fetch(url);
          var json = await response.json();
          //this.updateState(json,pP);
          this.setState({
            regions: json["features"],
            loading: true,
            lattitude: 39.833333,
            longitude: -98.583333,
            zoom: 4.46,
            prevState: "",
            items: this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          });
        } catch (e) {
          console.log(e);
        }
      } else if (
        this.props.historicInputState.toLowerCase().includes("state")
      ) {
        var stateName = this.props.historicInputState.split(" (");
        stateName = stateName[0].split(" ");
        var state = "";
        for (let i = 0; i < stateName.length; i++) {
          state =
            state +
            (stateName[i].substr(0, 1).toUpperCase() +
              stateName[i].substr(1) +
              " ");
        }
        stateName = state.trim();
        let long = stateLatLngs[stateName]["longitude"];
        let lat = stateLatLngs[stateName]["latitude"];
        var url = "https://ewed.org:3004/hucs-in-state/" + stateName;
        try {
          var response = await fetch(url);
          var json = await response.json();
          await this.setState({
            regions: json["features"],
            loading: true,
            longitude: long,
            latitude: lat,
            zoom: 6,
            viewByChoice: "Watersheds",
            prevState: "all us",
            items: this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          });
        } catch (e) {
          console.log(e);
        }
      } else if (
        this.props.historicInputState.toLowerCase().includes("county") ||
        (this.props.historicInputState.toLowerCase().search(",") < 0 &&
          this.props.historicInputState.split("(")[1].split(")")[0].length > 2)
      ) {
        var countyName = this.props.historicInputState;
        var stateNamefromCounty = countyName.split(" (");
        stateNamefromCounty = stateNamefromCounty[1].substr(
          0,
          stateNamefromCounty[1].length - 1
        );
        let arr = stateNamefromCounty.split(" ");
        stateNamefromCounty = "";
        for (let k = 0; k < arr.length; k++) {
          stateNamefromCounty +=
            arr[k].substr(0, 1).toUpperCase() +
            arr[k].substr(1, arr[k].length) +
            " ";
        }
        stateNamefromCounty = stateNamefromCounty.trim();

        let lat = stateLatLngs[stateNamefromCounty].latitude;
        let long = stateLatLngs[stateNamefromCounty].longitude;
        if (this.props.form == "Historic") {
          var url =
            "https://ewed.org:41513/ewedService/getFacilityData/CountyState1/" +
            countyName +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/all";
        } else if (this.props.form == "Projected") {
          var url =
            "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/" +
            this.props.energyScenario +
            "/CountyState1/" +
            countyName +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/" +
            this.props.filterstr;
        }
        try {
          var response = await fetch(url);
          var json = await response.json();

          //this.updateState(json,pP);
          await this.setState({
            regions: json,
            loading: true,
            viewByChoice: "Facilities",
            zoom: 8.0,
            latitude: lat,
            longitude: long,
            prevState: stateNamefromCounty + " (state)",
            items: this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          });
        } catch (e) {
          console.log(e);
        }
      } else if (
        this.props.historicInputState.toLowerCase().includes("watershed")
      ) {
        var hucName = this.props.historicInputState.toLowerCase();
        var stateNamefromWatershed = hucName.split(" (");
        stateNamefromWatershed = stateNamefromWatershed[1].substr(
          0,
          stateNamefromWatershed[1].length - 1
        );

        if (stateNamefromWatershed.includes(",")) {
          stateNamefromWatershed = stateNamefromWatershed
            .split(",")[0]
            .toUpperCase();
        } else {
          stateNamefromWatershed = stateNamefromWatershed.toUpperCase();
        }

        var lat = stateLatLngs[stateAbr[stateNamefromWatershed]].latitude;
        var long = stateLatLngs[stateAbr[stateNamefromWatershed]].longitude;

        if (this.props.form == "Historic") {
          var url =
            "https://ewed.org:41513/ewedService/getFacilityData/HUC8Name/" +
            hucName +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/all";
        } else if (this.props.form == "Projected") {
          var url =
            "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/" +
            this.props.energyScenario +
            "/HUC8Name/" +
            hucName +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/" +
            this.props.filterstr;
        }
        try {
          var response = await fetch(url);
          var json = await response.json();
          await this.setState({
            regions: json,
            loading: true,
            viewByChoice: "Facilities",
            zoom: 7.0,
            latitude: lat,
            longitude: long,
            prevState: stateAbr[stateNamefromWatershed] + " (state)",
            items: this.props.tabledata,
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          });
        } catch (e) {
          console.log(e);
        }
      } else if (
        this.state.viewByChoice == "Facilities" &&
        this.props.notReload
      ) {
        console.log("Facility data....");
        var name = this.props.historicInputState;
        name = name.split(" (")[0];
        let startDate = this.props.historicStartDate;
        let endDate = this.props.historicEndDate;
        let mapping = {
          Jan: "1",
          Feb: "2",
          Mar: "3",
          Apr: "4",
          May: "5",
          Jun: "6",
          Jul: "7",
          Aug: "8",
          Sep: "9",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        };
        let startYear = parseInt(startDate.split(" ")[3]);
        let endYear = parseInt(endDate.split(" ")[3]);
        let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
        let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
        if (this.props.form == "Historic") {
          var url =
            "https://ewed.org:28469/ewedService/getFacilityData/stateName/" +
            name +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/all";
        } else if (this.props.form == "Projected") {
          var url =
            "https://ewed.org:28469/ewedService/getFacilityData/stateName/" +
            name +
            "/" +
            startYear +
            "/" +
            startmonthinInt +
            "/" +
            endYear +
            "/" +
            endmonthinInt +
            "/fuelTypes/all";
        }
        try {
          var response = await fetch(url);
          var json = await response.json();
          await this.setState({
            regions: json,
            zoom: 5.5,
            isClicked: false,
            loading: true,
            prevState: pP.historicInputState,
            viewByChoice: "Facilities",
            startDateProps: this.props.historicStartDate,
            endDateProps: this.props.historicEndDate,
            nameOfState: this.props.historicInputState,
          });
        } catch (e) {
          console.log("");
        }
      }
    }
  }
  render() {
    let GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
        defaultZoom={this.state.zoom}
        defaultOptions={{ styles: mapStyles }}
        options={{
          mapTypeControlOptions: {
            style: 1,
            position: 3
          },
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {this.state.regions !== null ? (
          <Regions
            form={this.props.form}
            energyScenario={this.props.energyScenario}
            regions={this.state.regions}
            historicStartDate={this.props.historicStartDate}
            historicEndDate={this.props.historicEndDate}
            historicInputState={this.props.historicInputState}
            displayChoice={this.state.displayChoice}
            viewByChoice={this.state.viewByChoice}
            formHandler={(e) => this.formHandler(e)}
            formHandlerforFacility={(e) => this.formHandlerforFacility(e)}
            tabledata={this.props.tabledata}
            modalOpen={(e) => this.modalOpen(e)}
          />
        ) : (
          console.log("do nothing")
        )}
      </GoogleMap>
    ));

    if (!this.state.loading) {
      return <div>
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
      </div>;
    } else {
      return (
        <div>
          <div>
            <div className="map-form-container">
              <form
              className="display-form-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "10px",
                }}
              >
                <div className="filterForm">
                  <b>Display :</b>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonDisplay"
                      value="Water Consumption"
                      onChange={this.displayItem}
                      checked={this.state.displayChoice === "Water Consumption"}
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    Water Consumption
                    </div>
                    
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonDisplay"
                      value="Water Withdrawal"
                      onChange={this.displayItem}
                      checked={this.state.displayChoice === "Water Withdrawal"}
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    Water Withdrawal
                    </div>
                    
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonDisplay"
                      value="Water Emission"
                      onChange={this.displayItem}
                      checked={this.state.displayChoice === "Water Emission"}
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    Water Emission
                    </div>
                    
                  </div>
                </div>
              </form>
              <form
                className="view-by-form-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "10px",
                }}
              >
                <div className="filterForm">
                  <b>View By :</b>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonViewBy"
                      value="States"
                      onChange={this.viewByItem}
                      checked={this.props.historicInputState
                        .toLowerCase()
                        .includes("all us")}
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    States
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonViewBy"
                      value="Watersheds"
                      onChange={this.viewByItem}
                      checked={
                        this.state.viewByChoice === "Watersheds" &&
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("state")
                      }
                      disabled={
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("all us") ||
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("county") ||
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("watershed")
                      }
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    Watersheds  
                    </div>
                    
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonViewBy"
                      value="Counties"
                      onChange={this.viewByItem}
                      checked={this.state.viewByChoice === "Counties"}
                      disabled={
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("all us") ||
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("county") ||
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("watershed")
                      }
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    Counties
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                    <Radio
                      name="Options"
                      className="radioButtonViewBy"
                      value="Facilities"
                      onChange={this.viewByItem}
                      checked={
                        this.state.viewByChoice === "Facilities" ||
                        this.props.historicInputState
                          .toLowerCase()
                          .includes("watershed")
                      }
                      disabled={this.props.historicInputState
                        .toLowerCase()
                        .includes("all us")}
                      style={{ marginRight: "5px" }}
                    />
                    </div>
                    <div>
                    Facilities
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="up-to-btn" style={{ marginLeft: "50px" }}>
                  {this.state.prevState ? (
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ width: "200px", height: "40px" }}
                      onClick={() => {
                        if (this.state.prevState.length > 0) {
                          if (
                            this.state.prevState
                              .toLowerCase()
                              .includes("all us")
                          ) {
                            this.setState({
                              loading: false,
                              viewByChoice: "States",
                              isClicked: true,
                            });
                            this.arrayForParent[0] = this.state.prevState.toLowerCase();
                            this.props.formHandler(this.arrayForParent);
                          } else {
                            this.setState({
                              loading: false,
                              viewByChoice: "Watershed",
                              isClicked: true,
                            });
                            this.arrayForParent[0] = this.state.prevState.toLowerCase();
                            this.props.formHandler(this.arrayForParent);
                          }
                        }
                      }}
                    >
                      ← Up to {this.state.prevState} View
                    </Button>
                  ) : (
                    console.log("")
                  )}
                </div>
              
            <div>
              <GoogleMapExample
                containerElement={<div></div>}
                mapElement={<div style={{ height: `650px` }}> </div>}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default MapContent;