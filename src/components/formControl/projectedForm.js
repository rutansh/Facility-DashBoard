import React from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import * as nameData from "../../data/facilityNames.json";
import CustomSearch from "./customSearch";
import FilterModalforHistoric from "./filterModalforHistoric";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ClimateModel from "./ClimateModel";
import ProjectedContext from "../Context/projectedFormContext";
import StateContext from "../Context/inputStatecontext";

class ProjectedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date("2049/01"),
      endDate: new Date("2050/12"),
      inputState: "ALL US",
      modalIsOpen: false,
      filterstr: "all",
    };
    this.formControl = this.formControl.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.filterByFuel = this.filterByFuel.bind(this);
    this.saveOrcloseModal = this.saveOrcloseModal.bind(this);
    this.arrayForParent = [];
    this.filters = this.props.filters;
  }
  formControl() {
    this.arrayForParent[0] = this.props.inputstate.name;
    this.arrayForParent[1] = this.state.startDate;
    this.arrayForParent[2] = this.state.endDate;
    this.arrayForParent[3] = this.props.energyScenario;
    this.arrayForParent[4] = this.props.filterstr;
    this.arrayForParent[5] = this.props.climateScenario;
    this.arrayForParent[6] = this.props.climateModel;
    this.props.projectedFormHandler(this.arrayForParent);
  }
  handleOnSubmit(term) {
    // Do whatever you need i.e. calling API
    this.setState({
      inputState: this.props.inputstate.name,
    });
  }
  saveOrcloseModal(e) {
    if (e.length == 10) {
      localStorage.setItem("filterstr", "all");
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].isChecked = true;
      }
      this.props.setFilterStr("all");
      this.props.setFilters(this.filters);
      this.setState({
        modalIsOpen: false,
      });
    } else {
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

      this.props.setFilterStr(str);
      this.props.setFilters(this.filters);
      this.setState({
        modalIsOpen: false,
        filterstr: str,
      });
    }
  }
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

  filterByFuel(e) {
    // if(this.props.filterstr=="all")
    // {
    //   this.filters.map((filter)=>{filter.isChecked=true})
    // }
    // else
    // {
    //   let temparr=this.props.filterstr.split(",");
    //   for(let i=0;i<temparr.length;i++)
    //   {
    //     this.filters.map((filter)=>
    //     {
    //       if(filter.value.toLowerCase()==temparr[i].toLowerCase())
    //       {
    //         filter.isChecked=true;
    //       }
    //       else
    //       {
    //         filter.isChecked=false;
    //       }
    //       filter.isChecked=true}
    //     )
    //   }
    // }
    this.setState({
      modalIsOpen: true,
    });
  }
  render() {
    const recentSearches = nameData["Names"];
    const inputPosition = "center";
    const minimumLen = 3;
    return (
      <div className="queryForm_container__projected queryForm_container__inner">
        <div>
          <form>
            <div className="projected-form__input">
              <InputLabel>Select Energy Scenario</InputLabel>
              <Select
                defaultValue="REF2019"
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                onClick={(e) => {
                  if (this.props.climateScenario !== e.target.value) {
                    this.props.setenergyScenario(e.target.value);
                  } else {
                    console.log("do nothing..");
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
            {!this.props.inputstate.name.toLowerCase().includes("all us") ? (
              <div className="scenario-model-forms">
                <div className="projected-form__input">
                  <InputLabel>Select Climate Scenario</InputLabel>
                  <Select
                    defaultValue="RCP45"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    onClick={(e) => {
                      this.props.setclimateScenario(e.target.value);
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
                <div className="projected-form__input">
                  <ClimateModel />
                </div>
              </div>
            ) : (
              console.log("this is all us")
            )}
            <div className="projected-form__input">
              <InputLabel>Search for State, HUC or County</InputLabel>
              <CustomSearch />
            </div>
            <div className="projected-form__input">
              <InputLabel>Select month and year from </InputLabel>
              <DatePicker
                selected={this.state.startDate}
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
                selected={this.state.endDate}
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
              <Button onClick={this.filterByFuel} variant="outline-primary">
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
                console.log("sdads")
              )}
            </div>
            <div>
              <Button onClick={this.formControl} variant="primary" active>
                Search
              </Button>
            </div>
            <div>
              <Button variant="primary">Reset View</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default (props) => {
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
