import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import {Button} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import 'react-datepicker/dist/react-datepicker.css';
import * as nameData from "../../data/facilityNames.json";
import CustomSearch from "./customSearch";
import FilterModalforHistoric from "./filterModalforHistoric";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ClimateModel from './ClimateModel';
import ProjectedContext from '../Context/projectedFormContext'; 
import StateContext from '../Context/inputStatecontext';

class ProjectedForm extends Component {
  constructor(props)
  {
    super(props);
    this.props=props;
    this.state={
      startDate:new Date("2014/02"),
      endDate:new Date("2014/04"),
      inputState:"ALL US",
      };
      // this.handleDateChange=this.handleDateChange.bind(this)
      this.formControl=this.formControl.bind(this)
      this.handleOnSubmit=this.handleOnSubmit.bind(this)
      this.arrayForParent=[]
  }
  formControl()
  {
        this.arrayForParent[0]=this.state.inputState;
        this.arrayForParent[1]=this.state.startDate;
        this.arrayForParent[2]=this.state.endDate;
        this.props.projectedFormHandler(this.arrayForParent);
  }
  handleOnSubmit(term) {
    // Do whatever you need i.e. calling API
    this.setState({
        inputState:term
    })
    }
  useStyles = makeStyles((theme) => ({
      button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    }));
  render()
  {
    const recentSearches =nameData["Names"];
    const inputPosition = 'center';
    const minimumLen=3;
    console.log("context of :");
    console.log(this.props);
    return(
    <div className="queryForm_container">
    <div>  
    <form style={{display:'flex',flexDirection:'row'}}>
        <div>
        <InputLabel>Select Energy Scenario</InputLabel>
        <Select
          defaultValue="REF2019"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          onClick={(e)=>{
            this.props.setenergyScenario(e.target.value)
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
      {!this.props.inputstate.name.toLowerCase().includes("all us")?                            
        <div style={{display:'flex',flexDirection:'row'}}>
          <div>
          <InputLabel>Select Climate Scenario</InputLabel>    
          <Select
          defaultValue="RCP45"       
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          onClick={(e)=>{
            this.props.setclimateScenario(e.target.value);
          }}
        >
          <MenuItem value={"RCP45"}>RCP 4.5 (Low emissions scenario)</MenuItem>
          <MenuItem value={"RCP85"}>RCP 8.5 (High emissions scenario)</MenuItem>
          </Select>
          </div>
          <div>
          <ClimateModel/>
          </div>
        </div>
        :console.log("this is all us")}
      <div style={{marginLeft:"10px"}}>
      <InputLabel>Search for State, HUC or County</InputLabel>
      <CustomSearch/>
      </div>
            <div style={{marginLeft:"10px",zIndex:2}}>

            <InputLabel>Select month and year from </InputLabel>
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={date => this.setState({
                        startDate:date
                    })}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    /> 
            </div>
            <div style={{marginLeft:'10px',zIndex:2}}>
            <InputLabel>Select month and year to</InputLabel>
                    <DatePicker
                    selected={this.state.endDate}
                    onChange={date => this.setState({
                        endDate:date
                    })}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    />
            </div>
            <div style={{marginLeft:'40px',marginTop:'10px'}}>
            <Button onClick={this.filterByFuel} variant="outline-primary">Filter By Fuel Type</Button>
            
            {this.state.modalIsOpen?<FilterModalforHistoric saveOrcloseModal={(e)=>{this.saveOrcloseModal(e)}} modalIsOpen={this.state.modalIsOpen} filters={this.state.filters}/>:console.log("sdads")}
            </div>
            <div style={{marginLeft:'40px',marginTop:'10px'}}>
            <Button onClick={this.formControl} variant="primary" active>Search</Button>
            </div>
            <div style={{marginLeft:'40px',marginTop:'10px'}}>
            <Button variant="primary">Reset View</Button>
            </div>     
    </form>
    </div>
    </div>
  )
}
}
export default (props)=>{
  return(
  <ProjectedContext.Consumer>
  {
    (context1)=>{
      return(
        <StateContext.Consumer>
          {(context)=>{
          return <ProjectedForm {...props}{...context}{...context1}/>
          }}
        </StateContext.Consumer>
      );
    }
    }
    </ProjectedContext.Consumer>
  )}