import React from "react";
import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import * as nameData from "../../data/facilityNames.json";
import CustomSearch from "./customSearch";
import FilterModalforHistoric from "./filterModalforHistoric";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ClimateModel from "./ClimateModel";
import ProjectedContext from "../Context/projectedFormContext";
import StateContext from "../Context/inputStatecontext";
import FormControl from "@material-ui/core/FormControl";
import dateFormat from '../GlobalState/dateFormat';

//This component handles Projected Form

class ProjectedForm extends React.Component {
  
  //Initializing the state

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(localStorage.getItem("projectedStart")),
      endDate: new Date(localStorage.getItem("projectedEnd")),
      inputState: "ALL US",
      modalIsOpen: false,
      filterstr: "all",
    };

    //Binding methods of Projected form

    this.formControl = this.formControl.bind(this);
    this.resetControl = this.resetControl.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.filterByFuel = this.filterByFuel.bind(this);
    this.saveOrcloseModal = this.saveOrcloseModal.bind(this);
    this.arrayForParent = [];
    this.filters = this.props.filters;
  }

  // While user clicks on search button in projected form 

  formControl() {

    // Date validation before submit

    if(this.state.startDate<this.state.endDate)
    {
    
    const {startMonth,startYear,endMonth,endYear}=dateFormat(String(this.state.startDate),String(this.state.endDate));
    var formatstart = startYear+"/"+startMonth;
    var formatend = endYear+"/"+endMonth;

    // Updating dates in localstorage for url

    localStorage.setItem("projectedStart",String(formatstart));
    localStorage.setItem("projectedEnd",String(formatend));

    // Updating viewBy type for map 
    if(this.props.inputstate.name.toLowerCase().includes("all us"))
    {
      localStorage.setItem("viewBy","States");
    }
    else if(this.props.inputstate.name.toLowerCase().includes("state"))
    {
      localStorage.setItem("viewBy","Watersheds");
    }
    else
    {
      localStorage.setItem("viewBy","Facilities");
    }

    localStorage.setItem("name", this.props.inputstate.name);
    localStorage.setItem("climateScenario",this.props.climateScenario);
    localStorage.setItem("climateModel",this.props.climateModel);
    localStorage.setItem("energyScenario",this.props.energyScenario);
    
    // Storing all the values which will be pass to the parent component
    this.arrayForParent[0] = this.props.inputstate.name;
    this.arrayForParent[1] = this.state.startDate;
    this.arrayForParent[2] = this.state.endDate;
    this.arrayForParent[3] = this.props.energyScenario;
    this.arrayForParent[4] = this.props.filterstr;
    this.arrayForParent[5] = this.props.climateScenario;
    this.arrayForParent[6] = this.props.climateModel;

    // Calling parent component formControl to take all the inputs given by user and update the state of an application
    this.props.projectedFormHandler(this.arrayForParent);

    }
    
  }

  // When reset is called on projected form

  resetControl (e){
    // If Display by is changed then display is set back to Water Consumption
    // Settling value of reload 
    if(localStorage.getItem("displayBy")!=="Water Consumption" && localStorage.getItem("name").toLowerCase().includes("all us"))
    {
      localStorage.setItem("reload","true");
      localStorage.setItem("reloadformapcontent","true");
    }
    // If reload is already true
    else
    {
      localStorage.setItem("reload","false"); 
    }

    // Storing values in localstorage for URL
    localStorage.setItem("resetView", "true");
    localStorage.setItem("p_resetViewforLastLayer", "true");
    localStorage.setItem("reset", "true");
    let date=new Date("2049/01");
    let enddate=new Date("2050/12");
    localStorage.setItem("projectedStart","2049/01");
    localStorage.setItem("projectedEnd","2050/12");

    // Storing values in array which will be pass to parent component to update an application
    this.arrayForParent[0] = "all us";
    this.arrayForParent[1] = date;
    this.arrayForParent[2] = enddate;
    this.arrayForParent[3] = "REF2019";
    this.arrayForParent[4] = "all";
    this.arrayForParent[5] = "RCP45";
    this.arrayForParent[6] = "AVG45";

    // Calling form context to store the inputstate as a all us
    this.props.setInputState("all us")
    localStorage.setItem("selfreset", "true");
    localStorage.setItem("filterstr", "all");

    // To check all the filters
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].isChecked = true;
    }

    // Calling form context to store the filterstr
    this.props.setFilterStr("all");

    // Calling form context to store the checked filters

    this.props.setFilters(this.filters);
    
    // Update all the values for the URL
    localStorage.setItem("name", this.props.inputstate.name);
    localStorage.setItem("viewBy", "States");
    localStorage.setItem("displayBy","Water Consumption");
    localStorage.setItem("filterstr", "all");
    localStorage.setItem("projectedStart","2049/1");
    localStorage.setItem("projectedEnd","2050/12");
    localStorage.setItem("climateScenario","RCP45");
    localStorage.setItem("climateModel","AVG45");
    localStorage.setItem("energyScenario","REF2019");
    localStorage.setItem("filterstr","all");
    localStorage.setItem("form","Projected");

    // Call projectedform context to set new value of different cases (i.e. Energy Scenario, Climate scenario and Climate model)
    this.props.setenergyScenario("REF2019");
    // Calling parent component formcontrol to update the state of an application
    this.props.projectedFormHandler(this.arrayForParent);

    // Updating state of this component
    this.setState({
      startDate:new Date("2049/01"),
      endDate:new Date("2050/12"),
      inputState: "ALL US",
      modalIsOpen: false,
      filterstr: "all",
    })
  }
  

  // This method will be called when user clicks on new region 

  handleOnSubmit(term) {

    // updating the state 
    this.setState({
      inputState: this.props.inputstate.name,
    });
  }

  // This method will be called when user

  saveOrcloseModal(e) {
    // If user has selected close
    if(e=="Close")
    {
      this.setState({
        modalIsOpen: false,
      });
    }

    // If user selected all the filters
    else if (e.length == 10) {
      localStorage.setItem("filterstr", "all");
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].isChecked = true;
      }
      this.props.setFilterStr("all");
      this.props.setFilters(this.filters);
      this.setState({
        modalIsOpen: false,
      });
    } 
    
    // If user selected some of the filters
    else {
      let str = "";
      for (let i = 0; i < e.length - 1; i++) {
        str = str + e[i] + ",";
      }
      str = str + e[e.length - 1];
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].isChecked = false;
      }
      for (let i = 0; i < e.length; i++) {
        for (let j = 0; j < this.filters.length; j++) {
          if (this.filters[j].value.toLowerCase() == e[i]) {
            this.filters[j].isChecked = true;
          }
        }
      }
      // Updating global context with newly selected filters
      this.props.setFilterStr(str);
      this.props.setFilters(this.filters);

      // Updating component state
      this.setState({
        modalIsOpen: false,
        filterstr: str,
      });
    }
  }

  // This was used to provide styling in projected form
  useStyles = makeStyles((theme) => ({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  // When clicks on filter by fuel type button
  filterByFuel(e) {
    this.setState({
      modalIsOpen: true,
    });
  }

  // Rendering projected form
  render() {
    const {startMonth,startYear,endMonth,endYear}=dateFormat(String(this.state.startDate),String(this.state.endDate));

    var formatstart = startYear+"/"+startMonth;
    var formatend = endYear+"/"+endMonth;

    // Storing updated dates in local Storage for URL
    localStorage.setItem("projectedStart",String(formatstart));
    localStorage.setItem("projectedEnd",String(formatend));
    const recentSearches = nameData["Names"];
    const inputPosition = "center";
    const minimumLen = 3;
    

    // return method will have design for projected form

    return (
      <div className="queryForm_container__projected queryForm_container__inner">
        <div>
          <form>
            <div className="projected-form__input">
              {localStorage.getItem("energyScenario")=="na"?localStorage.setItem("energyScenario","REF2019"):console.log("energy Scenario exist")}
              <InputLabel>Select Energy Scenario</InputLabel>
              
              {localStorage.getItem("selfreset") =="true"?
              <div>
                <Select
                defaultValue={localStorage.getItem("energyScenario")=="na"?"REF2019":localStorage.getItem("energyScenario")}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                onClick={(e) => {
                  // updating energy scenario
                  
                  if (this.props.energyScenario !== e.target.value && e.target.value) {
                    localStorage.setItem("energyScenario",e.target.value);
                    this.props.setenergyScenario(e.target.value);
                  } else {
                    console.log();
                  }
                }}
              >
                <MenuItem value={"REF2019"}>Reference</MenuItem>
                <MenuItem value={"HIGHMACRO"}>High Growth</MenuItem>
                <MenuItem value={"LOWMACRO"}>Low Growth</MenuItem>
                <MenuItem value={"HIGHPRICE"}>High Price</MenuItem>
                <MenuItem value={"LOWPRICE"}>Low Price</MenuItem>
                <MenuItem value={"HIGHRT"}>High Resource</MenuItem>
                <MenuItem value={"LOWRT"}>Low Resource</MenuItem>
                <MenuItem value={"AEO2018NO"}>AEO2018, no CPP</MenuItem>
              </Select>
              </div>
              :<Select
              defaultValue={localStorage.getItem("energyScenario")=="na"?"REF2019":localStorage.getItem("energyScenario")}
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              onClick={(e) => {
                if (this.props.energyScenario !== e.target.value && e.target.value) {
                  localStorage.setItem("energyScenario",e.target.value);
                  this.props.setenergyScenario(e.target.value);
                } else {
                  console.log();
                }
              }}
            >
              <MenuItem value={"REF2019"}>Reference</MenuItem>
              <MenuItem value={"HIGHMACRO"}>High Growth</MenuItem>
              <MenuItem value={"LOWMACRO"}>Low Growth</MenuItem>
              <MenuItem value={"HIGHPRICE"}>High Price</MenuItem>
              <MenuItem value={"LOWPRICE"}>Low Price</MenuItem>
              <MenuItem value={"HIGHRT"}>High Resource</MenuItem>
              <MenuItem value={"LOWRT"}>Low Resource</MenuItem>
              <MenuItem value={"AEO2018NO"}>AEO2018, no CPP</MenuItem>
            </Select>}
              
            </div>
            
            {localStorage.getItem("fromurl") == "true"?localStorage.setItem("fromurl","false"):console.log("url reset for energy")}
            
            {localStorage.getItem("selfreset")=="true"?localStorage.setItem("selfreset","false"):console.log("self reset")}
            
            {!this.props.inputstate.name.toLowerCase().includes("all us") ? (
              <div className="scenario-model-forms">
                <div className="projected-form__input">
                  <InputLabel>Select Climate Scenario</InputLabel>
                  {localStorage.getItem("climateScenario")=="na"?localStorage.setItem("climateScenario","RCP45"):console.log("")}
                  <Select
                    defaultValue={localStorage.getItem("climateScenario")=="na"?"RCP45":localStorage.getItem("climateScenario")}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    onClick={(e) => {
                      
                      // updating climate scenario
                      if(e.target.value!=="undefined" && e.target.value&&e.target.value!==0)
                      {
                        this.props.setclimateScenario(e.target.value);
                      }
                      
                    }}
                  >
                    <MenuItem value={"RCP45"}>
                      RCP 4.5 (Low emissions scenario)
                    </MenuItem>
                    <MenuItem value={"RCP85"}>
                      RCP 8.5 (High emissions scenario)
                    </MenuItem>
                  </Select>
                </div>
                <div className="projected-form__input climate-model_container">
                  <ClimateModel />
                </div>
              </div>
            ) : (
              console.log()
            )}
            
            <div className="projected-form__input">
              <InputLabel>Search for State, HUC or County</InputLabel>
              <CustomSearch />
            </div>
            
            <div className="projected-form__input">
              <InputLabel>Select month and year from </InputLabel>
              <DatePicker
                selected={new Date(localStorage.getItem("projectedStart"))}
                onChange={(date) =>
                  this.setState({
                    startDate: date,
                  })
                }
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </div>
            
            <div className="projected-form__input">
              <InputLabel>Select month and year to</InputLabel>
              <DatePicker
                selected={new Date(localStorage.getItem("projectedEnd"))}
                onChange={(date) =>
                  this.setState({
                    endDate: date,
                  })
                }
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </div>
            
            <div>
              <Button variant="contained" color="primary" onClick={this.filterByFuel} >
                Filter By Fuel Type
              </Button>
              {this.state.modalIsOpen ? (
                <FilterModalforHistoric
                  saveOrcloseModal={(e) => {

                    this.saveOrcloseModal(e);
                  }}
                  modalIsOpen={this.state.modalIsOpen}
                  filters={this.props.filters}
                />
              ) : (
                console.log()
              )}
            </div>
            
            <div>
              <Button variant="contained" color="primary"onClick={this.formControl}>
                Search
              </Button>
            </div>
            
            <div>
              <Button onClick={this.resetControl} variant="contained" color="primary" >
                Reset View
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default (props) => {
  
  // Getting data from projected form context

  return (
    <ProjectedContext.Consumer>
      {(context1) => {
        return (
          <StateContext.Consumer>
            {(context) => {
              return <ProjectedForm {...props} {...context} {...context1} />;
            }}
          </StateContext.Consumer>
        );
      }}
    </ProjectedContext.Consumer>
  );
};
