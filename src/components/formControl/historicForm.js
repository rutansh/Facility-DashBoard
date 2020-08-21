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
      fruites: [
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

    this.handleOnSubmit=this.handleOnSubmit.bind(this)
    this.formControl=this.formControl.bind(this)
    // this.sendDataToParent=this.sendDataToParent.bind(this)
    this.filterByFuel=this.filterByFuel.bind(this)
    this.arrayForParent=[]
}
  
  handleOnSubmit(term) {
    // Do whatever you need i.e. calling API
    this.setState({
        inputState:term
    })
    }
  formControl()
  {
        this.arrayForParent[0]=this.state.inputState;
        this.arrayForParent[1]=this.state.startDate;
        this.arrayForParent[2]=this.state.endDate;
        this.props.historicFormHandler(this.arrayForParent);
  }

  filterByFuel()
  {
        this.setState({
          modalIsOpen:true
        })
  }
  handleAllChecked = (event) => {
    let fruites = this.state.fruites
   
    fruites.forEach(fruite => fruite.isChecked = event.target.checked) 
  
   this.setState({fruites: fruites})
}

  handleCheckChieldElement = (event) => {
    let fruites = this.state.fruites
   fruites.forEach(fruite => {
     if (fruite.value === event.target.value)
       fruite.isChecked =  event.target.checked
     })
   this.setState({fruites: fruites})
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
            <div style={{marginLeft:'35px'}}>
            <SuggestionInputSearch onSubmitFunction={this.handleOnSubmit}
            recentSearches={recentSearches}
            inputPosition={inputPosition}
            minLength={minimumLen}
            placeholder={this.props.historicInputState}/>
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
                  
                  <Modal 
                  isOpen={this.state.modalIsOpen}
                  style={
                    {
                      overlay: {
                        position: 'fixed',
                        zIndex:4,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)'
                      },
                      content: {
                        position: 'absolute',
                        top: '300px',
                        left: '690px',
                        right: '690px',
                        bottom: '300px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px'
                      }
                    }
                  }>
                  
                    <h3>Filter Your Choice</h3>
                    <input type="checkbox" onClick={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All

                    <ul>
                    {
                          this.state.fruites.map((fruite) => {
                            return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
                          })
                    }
                    </ul>

                  <div>
                    <button onClick={()=>this.setState({modalIsOpen:false})}>Save</button>
                    <button onClick={()=>this.setState({modalIsOpen:false})}>Close</button>
                  </div>
                  
                  </Modal>
            
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
)   
  }  
}
export default HistoricForm;
