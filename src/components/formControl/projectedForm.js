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
      startDate:new Date("2049/01"),
      endDate:new Date("2050/12"),
      inputState:"ALL US",
      modalIsOpen:false,
      filterstr:"all",
      filters: [
        {id: 1, value: "Natural Gas", isChecked: true},
        {id: 2, value: "Coal", isChecked: true},
        {id: 3, value: "Nuclear", isChecked: true},
        {id: 4, value: "Water", isChecked: true},
        {id: 5, value: "Wind", isChecked: true},
        {id: 6, value: "Solar", isChecked: true},
        {id: 7, value: "Biomass", isChecked: true},
        {id: 8, value: "Geothermal", isChecked: true},
        {id: 9, value: "Petroleum", isChecked: true},
        {id: 10, value: "Other", isChecked: true}
      ]
      };
      // this.handleDateChange=this.handleDateChange.bind(this)
      this.formControl=this.formControl.bind(this)
      this.handleOnSubmit=this.handleOnSubmit.bind(this)
      this.filterByFuel=this.filterByFuel.bind(this)
      this.saveOrcloseModal=this.saveOrcloseModal.bind(this) 
      this.arrayForParent=[]
      
  }
  formControl()
  {
        console.log("this is form control");
        console.log(this.props);
        console.log(this.state);
        this.arrayForParent[0]=this.props.inputstate.name;
        this.arrayForParent[1]=this.state.startDate;
        this.arrayForParent[2]=this.state.endDate;
        this.arrayForParent[3]=this.props.energyScenario;
        this.arrayForParent[4]=this.props.filterstr;
        this.arrayForParent[5]=this.props.climateScenario;
        this.arrayForParent[6]=this.props.climateModel;
        this.props.projectedFormHandler(this.arrayForParent);
  }
  handleOnSubmit(term) {
    // Do whatever you need i.e. calling API
    this.setState({
        inputState:this.props.inputstate.name
    })
    }
    saveOrcloseModal(e)
    {
      
      if(e.length==10)
      {
        localStorage.setItem("filterstr","all");
        this.props.setFilterStr("all")
        this.setState({
          modalIsOpen:false,
        })
      }
      else
      {
        let str=""
        for(let i=0;i<e.length-1;i++)
        {
          str=str+e[i]+","
        }
        str=str+e[e.length-1];
        console.log("filter changed",str)
        this.props.setFilterStr(str)
        this.setState({
          modalIsOpen:false,
          filterstr:str,
        })
      }
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
    
  filterByFuel()
  {
        this.setState({
          modalIsOpen:true
        })
  }
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