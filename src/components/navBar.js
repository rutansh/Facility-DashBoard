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
        items:this.props.tabledata,
      };
      this.formHandler=this.formHandler.bind(this);
    }
    formHandler(e)
    {
      // console.log(e);
      this.props.formHandler(e);
    }
    tableDataHandler(e)
    {
      this.props.tableDataHandler(e);
    }
    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };
    componentDidUpdate(pP,state,snap)
    {
      if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate)
      {

      }
      else
      {
        this.setState({
          items:this.props.tabledata,
        })
      }
    }
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
            
            <TableContent formHandler={(e)=>this.formHandler(e)} notReload={this.props.notReload} tabledata={this.props.tabledata} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate} />
            
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