import React from "react";
import { withGoogleMap, GoogleMap, MapTypeControlStyle, ControlPosition } from "react-google-maps";
import { stateLatLngs } from "../data/stateLatLong";
import Button from "@material-ui/core/Button";
import { stateAbr } from "../data/stateAbr";
import Regions from "./regions";
import { Radio, InputLabel } from "@material-ui/core";
import Loader from 'react-loader-spinner';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

// This component is used to render google map and all the different regions 
// This component will call different API endpoints to fetch the geojson data of requested region

class MapContent extends React.PureComponent {

  // Initializing the default state with default latitude and logitude for all us
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
      displayChoice: localStorage.getItem("displayBy"),
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

    // binding methods
    this.arrayForParent = [];
    this.displayItem = this.displayItem.bind(this);
    this.viewByItem = this.viewByItem.bind(this);
    this.onClickFacility = this.onClickFacility.bind(this);
    this.facilityChart = this.facilityChart.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.formHandlerforFacility = this.formHandlerforFacility.bind(this);
  }

  // If all us is selected from Regions component
  formHandler(changeEvent) {
    if (changeEvent[0] == "all us") {
      this.props.formHandler(changeEvent);
    } else {
      this.props.formHandler(changeEvent);
    }
  }

  // If Facility is selected from Regions component
  formHandlerforFacility(changeEvent) {
    this.props.formHandlerforFacility(changeEvent);
  }

  //When particular facility is clicked on 3rd layer of the map
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
      
      this.setState({
        lat: facilityObject.facility.LATITUDE83,
        lng: facilityObject.facility.LONGITUDE83,
        index: facilityObject.index,
        jsonDataforChart: facilityObject.jsonDataforChart,
      });
    }
  }

  // If on 3rd layer chart data is requested
  facilityChart(facilityData) {
    this.setState({
      ismodalOpen: true,
    });
  }

  // If on 3rd layer view more information is selected
  modalOpen() {
    this.setState({
      ismodalOpen: true,
    });
  }

  // If user changes display by filter
  displayItem(event) {
    localStorage.setItem("displayBy",event.target.value)
    const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
    this.setState({
      displayChoice: event.target.value,
    });
  }

  // If user changes view by filter
  viewByItem(event) {
     
    // If view by is states then update the URL
    if (event.target.value == "States")
    {
      localStorage.setItem("viewBy","States");
      const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
      urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
    }

    // Update component's local state
    this.setState({
      loading: false,
      viewByChoice: event.target.value,
    });

    // If clicked on states of view form
    if (event.target.value == "States") {
      this.setState({
        isClicked: true,
      });
    } 

    // If clicked on Counties of view form
    else if (event.target.value == "Counties") {
      localStorage.setItem("viewBy","Counties");
      const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
      urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
      this.setState({
        isClicked: true,
      });

    } 

    // If clicked on Faclities of view form
    else if (event.target.value == "Facilities") {
      localStorage.setItem("viewBy","Facilities");
      const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
      urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
      this.setState({
        isClicked: true,
      });
    } 

    // If clicked on watersheds of view form
    else if (event.target.value == "Watersheds") {
      localStorage.setItem("viewBy","Watersheds");
      const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
      urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
      this.setState({
        isClicked: true,
      });
    }
  }

  // To fetch the geojson data for requested region during component's initial rendering
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

    // For all us
    if(this.props.historicInputState.toLowerCase().includes("all us")){
      
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

    // For State
    else if(this.props.historicInputState.toLowerCase().includes("state"))
    {
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
        
        // If view by is watersheds
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          url = "https://ewed.org:3004/hucs-in-state/" + stateName;
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
              isClicked: false,
            });
          } catch (e) {
            console.log(e);
          }
        }

        // If view by is counties
        else if(localStorage.getItem("viewBy")=="Counties")
        {
          url = "https://ewed.org:3004/counties-in-state/" + stateName;
          try {
            var response = await fetch(url);
            var json = await response.json();
            await this.setState({
              regions: json["features"],
              loading: true,
              longitude: long,
              latitude: lat,
              zoom: 6,
              viewByChoice: "Counties",
              prevState: "all us",
              isClicked: false,
            });
          } catch (e) {
            console.log(e);
          }
        }

        // If view by is facilities
        else if(localStorage.getItem("viewBy")=="Facilities")
        {
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
        
        // If historic form
        if (this.props.form == "Historic") {
          url =
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
        } 

        // If projected form
        else if (this.props.form == "Projected") {
          url =
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
            longitude: long,
            latitude: lat,
            viewByChoice: "Facilities",
          });
        } catch (e) {
          console.log("");
        }
        }
      }

      // If watershed
      else if (
        this.props.historicInputState.toLowerCase().includes("watershed")
      ) {
        var hucName = this.props.historicInputState.toLowerCase();
        var stateNamefromWatershed = hucName.split(" (");
        stateNamefromWatershed = stateNamefromWatershed[1].substr(0,stateNamefromWatershed[1].length - 1);
        if (stateNamefromWatershed.includes(",")) {
          stateNamefromWatershed = stateNamefromWatershed
            .split(",")[0]
            .toUpperCase();
        } else {
          stateNamefromWatershed = stateNamefromWatershed.toUpperCase();
        }

        var lat = stateLatLngs[stateAbr[stateNamefromWatershed]].latitude;
        var long = stateLatLngs[stateAbr[stateNamefromWatershed]].longitude;

        // Updating URL based on the form selected
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
      }

      // If county is requested
      else if (this.props.historicInputState.toLowerCase().includes("county") || 
      (this.props.historicInputState.toLowerCase().search(",") < 0 &&
      this.props.historicInputState.split("(")[1].split(")")[0].length > 2))
      {
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
        
        // Updating URL based on the form selected
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
        
      }

    
  }


  //This method gets called everytime on component's rerendering phase and will fetch the region specific geojson data
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

    
    // If props are same as before then this condition will provide optimization by not calling same api calls again
    
    if (
      pP.historicInputState === this.props.historicInputState &&
      pP.historicStartDate === this.props.historicStartDate &&
      pP.historicEndDate === this.props.historicEndDate
    ) {

      // If reset is called 
      if(localStorage.getItem("reloadformapcontent")=="true")
      {
        localStorage.setItem("reloadformapcontent","false");
        this.setState({
          displayChoice:"Water Consumption",
        })
      }

      // If viewby "counties" is selected from view by form
      else if (this.state.viewByChoice == "Counties" && this.state.isClicked) {
        localStorage.setItem("isClicked","true");
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
            viewByChoice: "Counties",
          });
          var obj = {
            viewByChoice: "Counties",
            state: this.props.historicInputState,
          };
          this.props.viewByButtonClicked(obj);
        } catch (e) {
          console.log(e);
        }
      } 
      
      // If viewby "watersheds" is selected from view by form
      else if (
        this.state.viewByChoice == "Watersheds" &&
        this.state.isClicked
      ) {
        localStorage.setItem("isClicked","true");
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
      } 
      
      // If viewby "Facilities" is selected from view by form
      else if (
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
      } 
      
      // If viewby "States" is selected from view by form
      else if (this.state.viewByChoice == "States" && this.state.isClicked) {
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
    } 
    
    // If something has changed from parent components or in state
    else {
      
      // calling api for all us geo json data
      if (this.props.historicInputState.toLowerCase().includes("all us")) {
        var url = "https://ewed.org:3004/all-states";
        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
        urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
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
              viewByChoice:"States",
              displayChoice:localStorage.getItem("displayBy")

            });
          } catch (e) {
            console.log(e);
          }
  } 

  // calling api for state's geo json data based on different view by values
  else if (
        this.props.historicInputState.toLowerCase().includes("state")
      ) {

        // If view by is watersheds
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
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
        }

        // If view by is Counties
        else if(localStorage.getItem("viewBy")=="Counties")
        {
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
              prevState: "all us",
              items: this.props.tabledata,
              startDateProps: this.props.historicStartDate,
              endDateProps: this.props.historicEndDate,
              nameOfState: this.props.historicInputState,
              viewByChoice: "Counties",
            });
            
          } catch (e) {
            console.log(e);
          } 
        }
      } 
      
        // If view by is Counties (special case i.e alaska )
        else if (
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

        // Updating the URL endopint based on the selected form
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

        // fetching data
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
      } 
      
      // To fetch geo json of particular watershed
      else if (
        this.props.historicInputState.toLowerCase().includes("watershed")
      ) 
      {
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
      } 
      
      // To fetch geo json for facilities
      else if (
        this.state.viewByChoice == "Facilities" &&
        this.props.notReload
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
  
  // This render method will render child component Regions and has view by and display by forms
  // In regions, all the props recieved from the parent component and is used to display diffrent colors on the map layer
  render() {

    // To fetch google map using 3rd party component
      // Pass all the necessary props required by the component
      let GoogleMapExample = withGoogleMap((props) => (

      // This is a higher order component that is why it is taking other customized components as a children
      <GoogleMap
        defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
        defaultZoom={this.state.zoom}
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
            filterstr={this.props.filterstr}
          />
        ) : (
            console.log("")
          )}
      </GoogleMap>
    ));
    

    // If geo json data is not yet being loaded
    if (!this.state.loading) {
      return <div>
        <div style={{ marginTop: "600px" }}>
          <div style={{ marginTop: "-300px" }} >
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
    } 
    
    // If geojson data is loaded    
    else {
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
                        checked={localStorage.getItem("displayBy") === "Water Consumption"}
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
                        checked={localStorage.getItem("displayBy") === "Water Withdrawal"}
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
                        checked={localStorage.getItem("displayBy") === "Water Emission"}
                        style={{ marginRight: "5px" }}
                      />
                    </div>
                    <div>
                      Emission
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
                          localStorage.getItem("viewBy") === "Watersheds" &&
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
                        checked={localStorage.getItem("viewBy") === "Counties"}
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
                          localStorage.getItem("viewBy") === "Facilities" &&
                          (this.props.historicInputState
                            .toLowerCase()
                            .includes("watershed") ||this.props.historicInputState
                            .toLowerCase()
                            .includes("county")||this.props.historicInputState
                            .toLowerCase()
                            .includes("state"))
                        }
                        unchecked={this.state.viewByChoice==="Facilities"&&this.props.historicInputState.toLowerCase().includes("all us")}
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

                // To check whether prevstate is exist or not to display back button
                <Button
                  color="primary"
                  variant="contained"
                  style={{ width: "200px", height: "40px" }}
                  onClick={() => {


                    // If prev state is all us then will update the view by button
                    if (this.state.prevState.length > 0) {
                      if (
                        this.state.prevState
                          .toLowerCase()
                          .includes("all us")
                      ) {
                        localStorage.setItem("viewBy","States");
                        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                        urlchange("/"+this.props.form+"/"+this.state.prevState.toLowerCase()+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
                        this.setState({
                          loading: false,
                          viewByChoice: "States",
                          isClicked: true,
                        });
                        this.arrayForParent[0] = this.state.prevState.toLowerCase();
                        this.props.formHandler(this.arrayForParent);
                      } 
                      
                      // If prev state is some state region then will update the view by button
                      else {
                        localStorage.setItem("viewBy","Watersheds");
                        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                        urlchange("/"+this.props.form+"/"+this.state.prevState.toLowerCase()+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
                        this.setState({
                          loading: false,
                          viewByChoice: "Watershed",
                          isClicked: true,
                        });
                        this.arrayForParent[0] = this.state.prevState.toLowerCase();
                        this.props.formHandler3(this.arrayForParent);
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