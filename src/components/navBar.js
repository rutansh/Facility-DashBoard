import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import TableContent from './TableContent';
import PieChart from './pie';
import BarChart from './bar';
import LineChart from './line';
class NavBar extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        activeItem: "1",

      };
    }
    

    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };

    render() {
      return (
        
        <MDBContainer >
        <MDBNav className="nav-tabs mt-6">
          
          <MDBNavItem>
            <div style={{marginTop:'0px'}}>
            <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
              Table
            </MDBNavLink>
            </div>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
              Pie Chart
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
              Bar Chart
            </MDBNavLink>
          </MDBNavItem>
          {!this.props.historicInputState.toLowerCase().includes("all us")?
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "4"} onClick={this.toggle("4")} role="tab" >
              Line Chart
            </MDBNavLink>
          </MDBNavItem>:<></>}
          
          
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            <div>
            <TableContent historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate} />
            </div>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <PieChart historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <BarChart historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
          </MDBTabPane>
          {!this.props.historicInputState.toLowerCase().includes("all us")?
            <MDBTabPane tabId="4" role="tabpanel">
            <div>
            <LineChart historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
            </div>
          </MDBTabPane>: 
          <></>}
        </MDBTabContent>
        
      </MDBContainer>
        
        
    );
  }
}
export default NavBar;