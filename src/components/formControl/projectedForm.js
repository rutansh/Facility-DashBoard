import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import {Button} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import SuggestionInputSearch from 'suggestion-react-input-search'; 
import * as nameData from "../../data/facilityNames.json";

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
 
  render()
  {
    const recentSearches =nameData["Names"];
    const inputPosition = 'center';
    const minimumLen=3;
    return(
    <div className="queryForm_container">
    <div>  
    <form style={{display:'flex',flexDirection:'row'}}>
        <div style={{marginLeft:'0px'}}>
                            Select Energy Scenario   <br></br>     
                            <input value={this.state.inputState} />
        </div>
        <div style={{marginLeft:'30px'}}>
                            Select Climate Scenario   <br></br>     
                            <input value={this.state.inputState} />
        </div>
        <div style={{marginLeft:'30px'}}>
                            Select Climate Model   <br></br>     
                            <input value={this.state.inputState} />
        </div>
        <div style={{marginLeft:'20px'}}>
                <div style={{marginLeft:'0px'}}>
                Search for State, HUC or County  <br></br> 
                </div>
                <div style={{marginLeft:'35px'}}>
                <SuggestionInputSearch onSubmitFunction={this.handleOnSubmit}
                recentSearches={recentSearches}
                inputPosition={inputPosition}
                minLength={minimumLen}/>
                </div>
                <div style={{marginBottom:'0px'}}>  
                <br></br>Current Search : <br></br>{this.state.inputState}
                </div>
            </div>
        <div style={{marginLeft:'35px'}}>
                            Select month and year from   <br></br>
                            <DatePicker
                            selected={this.state.startDate}
                            onChange={date => this.setState({
                            startDate:date
                            })}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker/>  
        </div>
        <div style={{marginLeft:'30px'}}>
                            Select month and year to  <br></br>
                            <DatePicker
                            selected={this.state.endDate}
                            onChange={date => this.setState({
                            endDate:date
                            })}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                        />     
        </div>
        <div style={{marginLeft:'30px'}}>
                        <Button>Filter By Fuel Type</Button>
        </div>
        <div style={{marginLeft:'20px'}}>
                        <Button onClick={this.formControl}>Search</Button>
        </div>
        <div style={{marginLeft:'20px'}}>
                        <Button>Reset View</Button> 
        </div>
                                
    </form>
    </div>
    
        </div>
        )

    
    
    }
  
}
export default ProjectedForm;
