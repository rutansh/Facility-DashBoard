import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import "react-datepicker/dist/react-datepicker.css";
import SuggestionInputSearch from "suggestion-react-input-search";
import "../../styles/historicForm.css";
import Modal from "react-modal";
import CheckBox from "./checkbox";
import * as nameData from "../../data/facilityNames.json";
import * as ReactBootstrap from "react-bootstrap";
import FilterModalforHistoric from "./filterModalforHistoric";
import CustomSearch from "./customSearch";
import StateContext from "../Context/inputStatecontext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from '../GlobalState/dateFormat';
Modal.setAppElement("#root");


// This component is used to render historic form 

class HistoricForm extends Component {
  constructor(props) {
    super(props);
    // Initializing Historicform with default values
    this.state = {
      startDate: new Date(localStorage.getItem("historicStart")),
      endDate: new Date(localStorage.getItem("historicEnd")),
      inputState: "ALL US",
      modalIsOpen: false,
      filterstr: "all",
    };
    // Binding methods for historic 
    this.filters = this.props.filters;
    this.formControl = this.formControl.bind(this);
    this.resetControl=this.resetControl.bind(this);
    this.filterByFuel = this.filterByFuel.bind(this);
    this.arrayForParent = [];
    this.saveOrcloseModal = this.saveOrcloseModal.bind(this);
  }
  formControl(e) {

    // Performing validation when user clicks on seach button
    if(this.state.startDate<this.state.endDate)
    {
      // Setting values to local Storage
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
      // Storing new search region in local storage 
      localStorage.setItem("name", this.props.inputstate.name);
      this.arrayForParent[0] = this.props.inputstate.name;
      this.arrayForParent[1] = this.state.startDate;
      this.arrayForParent[2] = this.state.endDate;
      this.arrayForParent[3] = this.props.filterstr;
      if(this.state.startDate<this.state.endDate)
      {
        // Calling parent component formControl with all the updated values
        this.props.historicFormHandler(this.arrayForParent);
      } 
    }
    
    
  }

  // When user clicks on reset button in historic button
  resetControl (e){

    // If Display by is changed then display is set back to Water Consumption
    // Settling value of reload 
    if(localStorage.getItem("displayBy")!=="Water Consumption" && localStorage.getItem("name").toLowerCase().includes("all us"))
    {
      localStorage.setItem("reload","true");
      localStorage.setItem("reloadformapcontent","true");
    }
        
    // Settling value of reload if it is true in the localstorage
    else
    {
      localStorage.setItem("reload","false"); 
    }

    // Storing data in an array and updating all the values in localStorage to update url

    this.arrayForParent[0] = "all us";
    let date=new Date("2015/01");
    this.arrayForParent[1] =date;
    date= new Date("2015/12");
    this.arrayForParent[2] = date;
    this.arrayForParent[3] = "all";

    // Calling global context to update the search region
    this.props.setInputState("all us")
    localStorage.setItem("name", this.props.inputstate.name);
    localStorage.setItem("viewBy", "States");
    localStorage.setItem("displayBy","Water Consumption");
    localStorage.setItem("filterstr", "all");
    localStorage.setItem("resetView", "true");
    localStorage.setItem("resetViewforLastLayer", "true");
    localStorage.setItem("reset", "true");
    localStorage.setItem("historicStart","2015/01");
    localStorage.setItem("historicEnd","2015/12");
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].isChecked = true;
    }
    // Calling global context to update the filters 
    this.props.setFilterStr("all");
    this.props.setFilters(this.filters);
    this.setState({
      startDate:new Date("2015/01"),
      endDate:new Date("2015/12"),
    })
    this.props.historicFormHandler(this.arrayForParent);
  }

// This method is used for styling of labels in historic form
  useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  // This will update the state when user clicks on filter by fuel type modal
  filterByFuel() {
    this.setState({
      modalIsOpen: true,
    });
  }

  // This will be called when user clicks on save or close modal button
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

      // Update the context 
      this.props.setFilterStr(str);
      this.props.setFilters(this.filters);
      this.setState({
        modalIsOpen: false,
        filterstr: str,
      });
    }
  }

  // Rendering historic form
  render() {
    const {startMonth,startYear,endMonth,endYear}=dateFormat(String(this.state.startDate),String(this.state.endDate));

    var formatstart = startYear+"/"+startMonth;
    var formatend = endYear+"/"+endMonth;
    localStorage.setItem("historicStart",String(formatstart));
    localStorage.setItem("historicEnd",String(formatend));
    const recentSearches = nameData["Names"];
    const inputPosition = "center";
    const minimumLen = 3;
    return (
      <div className="queryForm_container__historic queryForm_container__inner">
        <form>
          <div>
            <div>
              <InputLabel>Search for State, HUC or County</InputLabel>
            </div>
            <div>
              <CustomSearch inputtext={this.props.inputstate.name} />
            </div>
          </div>
          <div>
            <InputLabel>Select month and year from</InputLabel>
            <DatePicker
              selected={new Date(localStorage.getItem("historicStart"))}
              onChange={(date) =>
                this.setState({
                  startDate: date,
                })
              }
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div>
          
            <InputLabel>Select month and year to</InputLabel>
            <DatePicker
              selected={new Date(localStorage.getItem("historicEnd"))}
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
            <Button
              onClick={this.filterByFuel}
              variant="contained"
              color="primary"
            >
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
            <Button
              onClick={this.formControl}
              variant="contained"
              color="primary"
            >
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
    );
  }
}

// Calling global context to manage historic form and update the values of filters and regions selected by user
export default (props) => {
  return (
    <StateContext.Consumer>
      {(context) => {
        return <HistoricForm {...props} {...context} />;
      }}
    </StateContext.Consumer>
  );
};
