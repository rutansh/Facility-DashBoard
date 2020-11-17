import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
import ReactToExcel from "react-html-table-to-excel";
import UserContext from "./Context/updateContext";
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

//This component is used to render table data in the application
class TableContent extends Component {

  //Initializing local state with the values got from the parent component
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.tabledata,
      isLoaded: false,
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,
      counter: 1,
    };

    //Event binding for whenever user clicks on particular region or hover over particular entry in the table
    this.updateState = this.updateState.bind(this);
    this.strokeColor = this.strokeColor.bind(this);
  }

  // This method will update the local state based on the different regions requested by the user
  updateState = (json, pP) => {
    this.setState(
      {
        items: json,
      },
      () => {}
    );
  };

  //This method will change the global context to render green border on the map layer for that region
  strokeColor = (item) => {
    this.props.setRegion(item.filterName);
  };

  // This method gets called after component will be mounted on DOM and set a state with the data provided from the props
  componentDidMount() {
    this.setState({
      isLoaded: true,
      items: this.props.tabledata,
    });
  }

  
  //This method gets called everytime component will be rerendered it will update the state of the table data based on the 
  //region requested by the user
  async componentDidUpdate(pP, state, snap) {
    const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    
    urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
    if (
      pP.historicInputState === this.props.historicInputState &&
      pP.historicStartDate === this.props.historicStartDate &&
      pP.historicEndDate === this.props.historicEndDate
    ) {
      if (pP.tabledata === this.props.tabledata) {
      } else {
        this.setState({
          startDateProps: this.props.historicStartDate,
          endDateProps: this.props.historicEndDate,
          nameOfState: this.props.historicInputState,
          items: this.props.tabledata,
        });
      }
    } else {
      this.setState({
        startDateProps: this.props.historicStartDate,
        endDateProps: this.props.historicEndDate,
        nameOfState: this.props.historicInputState,
        items: this.props.tabledata,
      });
    }
  }

  // This component will render the table data
  // ReactToExcel component is used to get values present in the table into csv format
  // All the "if...else" conditions are implemented because data is coming in different formats from the backend
  // Each Row has onclick method, if user clicks on any row then it will render the entire application based on the
  // region clicked by the user
  
  render() {

    //Changing URL whenever this component gets rerendered
    const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
    urlchange("/"+this.props.form+"/"+localStorage.getItem("name")+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);
    var startDate = this.state.startDateProps;
    var endDate = this.state.endDateProps;
    var formatstartDate =
      startDate.split(" ")[1] + "-" + startDate.split(" ")[3] + "  ";
    var formatendDate =
      "  " + endDate.split(" ")[1] + "-" + endDate.split(" ")[3];
    var mapping = {
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
    var nameOfState = this.props.historicInputState.toUpperCase();

    // If data is not yet loaded
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } 
    else {

      //If user has requested for all us region
      if (
        typeof this.props.tabledata["Total Summary"] !== "undefined" &&
        this.props.historicInputState.toLowerCase().includes("all us")
      ) {
        return (
          <div>
            <div className="table-top-bar-container">
              <div className="activity-container">
                <b>Activity for {nameOfState}</b>
                <b>
                  ({formatstartDate} to {formatendDate}){" "}
                </b>
              </div>
              <div>
                <ReactToExcel
                  table="tableid"
                  filename={this.props.historicInputState}
                  sheet="sheet 1"
                  buttonText="Download .CSV"
                  className="btn btn-primary"
                />
              </div>
            </div>
            <div className="table-wrapper">
              <ReactBootstrap.Table id="tableid" striped bordered hover>
                <thead>
                  <tr>
                    <th>StateName</th>
                    <th>Generation</th>
                    <th>Emissions</th>
                    <th>WaterConsumption</th>
                    <th>WaterWithdrwal</th>
                  </tr>
                </thead>
                <tbody className="scrollit">
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>
                        {

                          Number(this.props.tabledata["Total Summary"][0]
                          .totalGeneration).toLocaleString()
                        }
                      </b>
                    </td>
                    <td>
                      <b>
                        {Number(this.props.tabledata["Total Summary"][0].totalEmission).toLocaleString()}
                      </b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Total Summary"][0]
                          .totalWaterConsumption).toLocaleString()
                        }
                      </b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Total Summary"][0]
                          .totalWaterWithdrawal).toLocaleString()
                        }
                      </b>
                    </td>
                  </tr>
                  {this.props.tabledata["Summary"].map((item, index) => (
                    <tr
                      key={index}
                      onMouseOver={() => {
                        this.props.setRegion(item.filterName);
                      }}
                      onMouseOut={() => {
                        this.props.setRegion("");
                      }}
                      onClick={() => {
                        if (!item.filterName) {
                        } else {
                          localStorage.setItem("viewBy","Watersheds");
                          this.props.formHandler(
                            item.filterName.toLowerCase() + " (state)"
                          );
                        }
                      }}
                    >
                      <td>{item.filterName}</td>
                      <td>{Number(item.generation).toLocaleString()}</td>
                      <td>{Number(item.emission).toLocaleString()}</td>
                      <td>{Number(item.waterConsumption).toLocaleString()}</td>
                      <td>{Number(item.waterWithdrawal).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </ReactBootstrap.Table>
            </div>
          </div>
        );
      } 
      
      //If user has requested for the state region's facilities
      else if (
        typeof this.props.tabledata["Summary"] !== "undefined" &&
        this.state.nameOfState.toLowerCase().includes("state") &&
        this.props.viewByChoice === "Facilities"
      ) {
        return (
          <div>
            <div className="table-top-bar-container">
              <div className="activity-container">
                <b>Activity for {nameOfState}</b>
                <b>
                  ({formatstartDate} to {formatendDate}){" "}
                </b>
              </div>
              <div>
                <ReactToExcel
                  table="tableid"
                  filename={nameOfState}
                  sheet="sheet 1"
                  buttonText="Download .CSV"
                  className="btn btn-primary"
                />
              </div>
            </div>
            {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
            <div className="table-wrapper">
              <ReactBootstrap.Table id="tableid" striped bordered hover>
                <thead>
                  <tr>
                    <th>Facility Name</th>
                    <th>Generation</th>
                    <th>Emissions</th>
                    <th>WaterConsumption</th>
                    <th>WaterWithdrwal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>{Number(this.state.items["Summary"][0].totalGeneration).toLocaleString()}</b>
                    </td>
                    <td>
                      <b>{Number(this.state.items["Summary"][0].totalEmission).toLocaleString()}</b>
                    </td>
                    <td>
                      <b>
                        {Number(this.state.items["Summary"][0].totalWaterConsumption).toLocaleString()}
                      </b>
                    </td>
                    <td>
                      <b>
                        {Number(this.state.items["Summary"][0].totalWaterWithdrawal).toLocaleString()}
                      </b>
                    </td>
                  </tr>
                  {this.state.items["All Facilities"].map((item, index) => (
                    <tr key={index}>
                      <td>{item.PRIMARY_NAME}</td>
                      <td>{Number(item.GenerationSummary).toLocaleString()}</td>
                      <td>{Number(item.EmissionSummary).toLocaleString()}</td>
                      <td>{Number(item.WaterConsumptionSummary).toLocaleString()}</td>
                      <td>{Number(item.WaterWithdrawalSummary).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </ReactBootstrap.Table>
            </div>
          </div>
        );
      } 
      //If user has requested for State region but viewby is not facility
      else if (
        typeof this.props.tabledata["Total Summary"] !== "undefined" &&
        this.state.nameOfState.toLowerCase().includes("state") &&
        this.props.viewByChoice !== "Facilities"
      ) {
        
        nameOfState = this.props.historicInputState;

        return (
          <div>
            <div className="table-top-bar-container">
              <div className="activity-container">
                <b>Activity for {nameOfState}</b>
                <b>
                  ({formatstartDate} to {formatendDate}){" "}
                </b>
              </div>
              <div>
                <ReactToExcel
                  table="tableid"
                  filename={nameOfState}
                  sheet="sheet 1"
                  buttonText="Download .CSV"
                  className="btn btn-primary"
                />
              </div>
            </div>
            <div className="table-wrapper">
              <ReactBootstrap.Table id="tableid" striped bordered hover>
                <thead>
                  <tr>
                    <th>StateName</th>
                    <th>Generation</th>
                    <th>Emissions</th>
                    <th>WaterConsumption</th>
                    <th>WaterWithdrwal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Total Summary"][0]
                          .totalGeneration).toLocaleString()
                        }
                      </b>
                    </td>
                    <td>
                      <b>
                        {Number(this.props.tabledata["Total Summary"][0].totalEmission).toLocaleString()}
                      </b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Total Summary"][0]
                          .totalWaterConsumption).toLocaleString()
                          
                        }
                      </b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Total Summary"][0]
                          .totalWaterWithdrawal).toLocaleString()
                        }
                      </b>
                    </td>
                  </tr>
                  {this.props.tabledata["Summary"].map((item, index) => (
                    <tr
                      key={index}
                      onMouseOver={() => {
                        this.props.setRegion(item.filterName);
                      }}
                      onMouseOut={() => {
                        this.props.setRegion("");
                      }}
                      onClick={() => {
                        if (!item.filterName) {
                        } else {
                          localStorage.setItem("name",item.filterName);
                          this.props.formHandler(item.filterName);
                        }
                      }}
                    >
                      <td>{item.filterName}</td>
                      <td>{Number(item.generation).toLocaleString()}</td>
                      <td>{Number(item.emission).toLocaleString()}</td>
                      <td>{Number(item.waterConsumption).toLocaleString()}</td>
                      <td>{Number(item.waterWithdrawal).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </ReactBootstrap.Table>
            </div>
          </div>
        );
      } 
      
      
      //If user has requested for county's facilitites
      else if (
        typeof this.props.tabledata["All Facilities"] !== "undefined" &&
        this.state.nameOfState.toLowerCase().includes("county")
      ) {
        return (
          <div>
            <div className="table-top-bar-container">
              <div className="activity-container">
                <b>Activity for {nameOfState}</b>
                <b>
                  ({formatstartDate} to {formatendDate}){" "}
                </b>
              </div>
              <div>
                <ReactToExcel
                  table="tableid"
                  filename={nameOfState}
                  sheet="sheet 1"
                  buttonText="Download .CSV"
                  className="btn btn-primary"
                />
              </div>
            </div>
            <div className="table-wrapper">
              <ReactBootstrap.Table id="tableid" striped bordered hover>
                <thead>
                  <tr>
                    <th>Facility Name</th>
                    <th>Generation</th>
                    <th>Emissions</th>
                    <th>WaterConsumption</th>
                    <th>WaterWithdrwal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>
                        {Number(this.props.tabledata["Summary"][0].totalGeneration).toLocaleString()}
                      </b>
                    </td>
                    <td>
                      <b>{Number(this.props.tabledata["Summary"][0].totalEmission).toLocaleString()}</b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Summary"][0]
                          .totalWaterConsumption).toLocaleString()
                        }
                      </b>
                    </td>
                    <td>
                      <b>
                        {
                          Number(this.props.tabledata["Summary"][0]
                            .totalWaterWithdrawal).toLocaleString()
                        }
                      </b>
                    </td>
                  </tr>
                  {this.props.tabledata["All Facilities"].map((item, index) => (
                    <tr
                      key={index}
                      onMouseOver={() => {
                        this.props.setRegion(item.PRIMARY_NAME);
                      }}
                      onMouseOut={() => {
                        this.props.setRegion("");
                      }}
                      
                    >
                      <td>{item.PRIMARY_NAME}</td>
                      <td>{Number(item.GenerationSummary).toLocaleString()}</td>
                      <td>{Number(item.EmissionSummary).toLocaleString()}</td>
                      <td>{Number(item.WaterConsumptionSummary).toLocaleString()}</td>
                      <td>{Number(item.WaterWithdrawalSummary).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </ReactBootstrap.Table>
            </div>
          </div>
        );
      } 
      //If user has requested for watershed's facilitites
      else if (
        typeof this.props.tabledata["All Facilities"] !== "undefined" &&
        (this.state.nameOfState.toLowerCase().includes("watershed") || true)
      ) {
        nameOfState = this.props.historicInputState;
        return (
          <div>
            <div className="table-top-bar-container">
              <div className="activity-container">
                <b>Activity for {nameOfState}</b>
                <b>
                  ({formatstartDate} to {formatendDate}){" "}
                </b>
              </div>
              <div>
                <ReactToExcel
                  table="tableid"
                  filename={nameOfState}
                  sheet="sheet 1"
                  buttonText="Download .CSV"
                  className="btn btn-primary"
                />
              </div>
            </div>
            {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
            <div className="table-wrapper">
              <ReactBootstrap.Table id="tableid" striped bordered hover>
                <thead>
                  <tr>
                    <th>Facility Name</th>
                    <th>Generation</th>
                    <th>Emissions</th>
                    <th>WaterConsumption</th>
                    <th>WaterWithdrwal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>{Number(this.state.items["Summary"][0].totalGeneration).toLocaleString()}</b>
                    </td>
                    <td>
                      <b>{Number(this.state.items["Summary"][0].totalEmission).toLocaleString()}</b>
                    </td>
                    <td>
                      <b>
                        {Number(this.state.items["Summary"][0].totalWaterConsumption).toLocaleString()}
                      </b>
                    </td>
                    <td>
                      <b>
                        {Number(this.state.items["Summary"][0].totalWaterWithdrawal).toLocaleString()}
                      </b>
                    </td>
                  </tr>
                  {this.state.items["All Facilities"] ? (
                    this.state.items["All Facilities"].map((item, index) => (
                      <tr key={index}>
                        <td>{item.PRIMARY_NAME}</td>
                        <td>{Number(item.GenerationSummary).toLocaleString()}</td>
                        <td>{Number(item.EmissionSummary).toLocaleString()}</td>
                        <td>{Number(item.WaterConsumptionSummary).toLocaleString()}</td>
                        <td>{Number(item.WaterWithdrawalSummary).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <div>Please wait for the data to render on previous layer...!</div>
                  )}
                </tbody>
              </ReactBootstrap.Table>
            </div>
          </div>
        );
      } else {
        return <div>Loading...</div>;
      }
    }
  }
}

// Global context to set the value for the region to render green border on map layer
export default (props) => {
  return (
    <UserContext.Consumer>
      {(context) => {
        return <TableContent {...props} {...context} />;
      }}
    </UserContext.Consumer>
  );
};
