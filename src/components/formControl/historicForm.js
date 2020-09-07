import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import {Button} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import SuggestionInputSearch from 'suggestion-react-input-search'; 
import '../../styles/historicForm.css';
import Modal from 'react-modal';
import CheckBox from './checkbox';
import * as nameData from "../../data/facilityNames.json";
import * as ReactBootstrap from "react-bootstrap";
import FilterModalforHistoric from "./filterModalforHistoric";
import CustomSearch from './customSearch';
import StateContext from '../Context/inputStatecontext';
Modal.setAppElement('#root')
class HistoricForm extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      startDate:new Date("2015/01"),
      endDate:new Date("2015/12"),
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

    // this.handleOnSubmit=this.handleOnSubmit.bind(this)
    this.formControl=this.formControl.bind(this)
    // this.sendDataToParent=this.sendDataToParent.bind(this)
    this.filterByFuel=this.filterByFuel.bind(this)
    this.arrayForParent=[]
    this.saveOrcloseModal=this.saveOrcloseModal.bind(this) 
}
formControl()
  {
        localStorage.setItem("name",this.props.inputstate.name);
        this.arrayForParent[0]=this.props.inputstate.name;
        this.arrayForParent[1]=this.state.startDate;
        this.arrayForParent[2]=this.state.endDate;
        this.arrayForParent[3]=this.props.filterstr;
        this.props.historicFormHandler(this.arrayForParent);
  }

  filterByFuel()
  {
        this.setState({
          modalIsOpen:true
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

  render()
  {
  const recentSearches =nameData["Names"];
  const inputPosition = 'center';
  const minimumLen=3;
  return(
  <div className="queryForm_container">
  <div>  
  <form style={{display:'flex',flexDirection:'row'}}>
          <div>
            <div style={{marginLeft:'0px'}}>
            Search for State, HUC or County  <br></br> 
            </div>
            <div style={{}}>
            <CustomSearch inputtext={this.props.inputstate.name}/>
            </div>
          </div>
            <div style={{marginLeft:'70px',zIndex:2}}>
            Select month and year from    <br></br>
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={date => this.setState({
                        startDate:date
                    })}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    /> 
            </div>
            <div style={{marginLeft:'40px',zIndex:2}}>
            Select month and year to    <br></br>
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
            <Button onClick={this.formControl} variant="primary">Search</Button>
            </div>
            <div style={{marginLeft:'40px',marginTop:'10px'}}>
            <Button variant="primary">Reset View</Button>
            </div>
        </form>
  </div>
</div>
)}}
export default (props)=>{
  return(
    <StateContext.Consumer>
    {(context)=>{
      return <HistoricForm {...props}{...context}/>
    }} 
    </StateContext.Consumer>
  )
}