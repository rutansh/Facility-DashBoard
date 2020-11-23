import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import TableContent from './TableContent';
import PieChart from './pie';
import BarChart from './bar';
import LineChart from './line';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

// Navbar component is a parent component of table, line, bar, pie components
// mdbreact library is used to perform navigation on navigation bar
class NavBar extends Component {
    constructor(props)
    {
      super(props);

      // Initially activation id is "1" which is associated with the table
      this.state = {
        activeItem: localStorage.getItem("activeTab"),
        items:this.props.tabledata,
      };
      this.formHandler=this.formHandler.bind(this);
      this.forDisplayBy=this.forDisplayBy.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState)
    {
      //
      if(this.props.tabledata===nextProps.tabledata&&this.props.historicInputState===nextProps.historicInputState&&this.props.form===nextProps.form&&this.props.filterstr===nextProps.filterstr
        &&this.props.historicStartDate===nextProps.historicStartDate&&this.props.historicEndDate===nextProps.historicEndDate && this.state.activeItem===nextState.activeItem
        &&this.props.energyScenario==nextProps.energyScenario&&this.props.climateModel==nextProps.climateModel&&this.props.climateScenario==nextProps.climateScenario)
      {
        return false;
      }
      return true;
    }

    forDisplayBy()
    { 
      console.log("");

    }
    // When user clicks on table entry this method gets called and it will call formhandler method of mapcontrol component
    formHandler(e)
    {
      this.props.formHandler(e);
    }
    // This method gets called when user clicks on different navigation bars
    toggle = tab => e => {
      
      //changing URL 
      const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
      
      urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
      +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
      +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);           
      if (this.state.activeItem !== tab) {
        localStorage.setItem("activeTab",tab);
        this.setState({
          activeItem: tab
        });
      }
    };

    //componentDidUpdate gets called whenever this component will be rerendered
    componentDidUpdate(pP,state,snap)
    {
      // if historic form is selected  
      if(this.props.form=="Historic")
      {
        if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&pP.filterstr==this.props.filterstr)
        {

        }
        else
        {
          if(this.props.historicInputState.toLowerCase().includes("all us") && this.state.activeItem=="4")
          {
            this.setState({
              items:this.props.tabledata,
              activeItem:"1"
            })
          }
          else
          {
            this.setState({
              items:this.props.tabledata,
            })
          }
          
        }
      }

      // if projected form is selected
      else if(this.props.form=="Projected")
      {
        if(pP.climateScenario===this.props.climateScenario&&pP.climateModel===this.props.climateModel&&pP.energyScenario===this.props.energyScenario&&pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate&&pP.filterstr==this.props.filterstr)
        {

        }
        else
        {
          if(this.props.historicInputState.toLowerCase().includes("all us") && this.state.activeItem=="4")
          {
            localStorage.setItem("activeTab","1");
            this.setState({
              items:this.props.tabledata,
              activeItem:"1"
            })
          }
          else
          {
            this.setState({
              items:this.props.tabledata,
            })
          }
          
        }
      }
      
    }

    //Renders Navigation bar with Table, Pie, Bar and Line charts
    // It has assigned unique id to each of the tabs,
    // When user clicks on particular tab, id will be updated and based on the updated id associated component will be rendered
    render() {
      
      
      return (
        <div>
          <MDBContainer >
        <MDBNav className="nav-tabs mt-6">
          <MDBNavItem>
            <div style={{marginTop:'0px'}}>
            <MDBNavLink active={this.state.activeItem === "1"} 
            onDoubleClick=
            {
              this.toggle("1")
            }
            onClick={this.toggle("1")} role="tab" 
            
            link={
              ()=>{
              const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
              return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
              +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
              +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
            }
          }
            to={
              ()=>{
              const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
              return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
              +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
              +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;
              }
              // window.location.pathname
            
            }
            >
              <b>Table</b>
            </MDBNavLink>
            </div>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink  
            onDoubleClick=
            {
              this.toggle("2")
            }
            active={this.state.activeItem === "2"} 
            
            to={
              ()=>{
                const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
                +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
                +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
              }
              // window.location.pathname
            }
            link={
              ()=>{
                const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
                +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
                +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
              }
              // window.location.pathname
            } 
            
            onClick={this.toggle("2")} role="tab" >
              <b>Pie Chart</b>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink 
            to={
              ()=>{
                const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
                +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
                +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
              }
              // window.location.pathname
            }
            onDoubleClick=
            {
              this.toggle("3")
            }
            active={this.state.activeItem === "3"} 
            link={
              ()=>{
                const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
                +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
                +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
              }
              // window.location.pathname
            } 
            onClick={this.toggle("3")} role="tab" >
              <b>Bar Chart</b>
            </MDBNavLink>
          </MDBNavItem>
          {!this.props.historicInputState.toLowerCase().includes("all us")?
          <MDBNavItem>
            <MDBNavLink  
            to={
              ()=>{
                const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
                +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
                +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
              }
              // window.location.pathname
            }
            onDoubleClick=
            {
              this.toggle("4")
            }
            active={this.state.activeItem === "4"} 
            link={
              ()=>{
                const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
                return "/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")
                +"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"
                +startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr;              
              }
              // window.location.pathname
            } 
            onClick={this.toggle("4")} role="tab" >
              <b>Line Chart</b>
            </MDBNavLink>
          </MDBNavItem>
          :<></>}
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            <div>
            
            <TableContent energyScenario={this.props.energyScenario} climateModel={this.props.climateModel} 
            climateScenario={this.props.climateScenario} filterstr={this.props.filterstr} form={this.props.form} formHandler={(e)=>this.formHandler(e)} notReload={this.props.notReload} tabledata={this.props.tabledata} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate} />
            
            </div>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <div>
            <PieChart form={this.props.form} energyScenario={this.props.energyScenario} climateModel={this.props.climateModel} climateScenario={this.props.climateScenario} filterstr={this.props.filterstr}historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
            </div>
            
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <BarChart form={this.props.form} energyScenario={this.props.energyScenario} climateModel={this.props.climateModel} climateScenario={this.props.climateScenario} filterstr={this.props.filterstr} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
          </MDBTabPane>
          {!this.props.historicInputState.toLowerCase().includes("all us")?
            <MDBTabPane tabId="4" role="tabpanel">
            <div>
            <LineChart form={this.props.form}energyScenario={this.props.energyScenario} climateModel={this.props.climateModel} climateScenario={this.props.climateScenario}filterstr={this.props.filterstr} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
            </div>
          </MDBTabPane>:<></>}
          
      
        </MDBTabContent>
      </MDBContainer>
          
      
        </div>
        
    );
    
  }
}
export default NavBar;