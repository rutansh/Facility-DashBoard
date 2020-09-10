import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
import ReactToExcel from "react-html-table-to-excel";
import UserContext from "./Context/updateContext";
class TableContent extends Component {
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
    this.updateState = this.updateState.bind(this);
    this.strokeColor = this.strokeColor.bind(this);
  }
  updateState = (json, pP) => {
    this.setState(
      {
        items: json,
      },
      () => {}
    );
  };
  strokeColor = (item) => {
    this.props.setRegion(item.filterName);
  };
  componentDidMount() {
    this.setState({
      isLoaded: true,
      items: this.props.tabledata,
    });
  }

  async componentDidUpdate(pP, state, snap) {
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
  render() {
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
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
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
      } else if (
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
                  filename=""
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
      } else if (
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
                  filename=""
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
      } else if (
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
                  filename=""
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
                      onClick={() => {
                        this.props.formHandler(item.PRIMARY_NAME);
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
      } else if (
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
                  filename=""
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
                    <div>Loading...!</div>
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
export default (props) => {
  return (
    <UserContext.Consumer>
      {(context) => {
        return <TableContent {...props} {...context} />;
      }}
    </UserContext.Consumer>
  );
};
