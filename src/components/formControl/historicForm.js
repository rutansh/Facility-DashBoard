import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
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
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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
      };
    this.filters= this.props.filters
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
useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
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
      
      for(let i=0;i<this.filters.length;i++)
      {
        this.filters[i].isChecked=true;
      }

      this.props.setFilterStr("all")

      this.props.setFilters(this.filters);
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
      for(let i=0;i<this.filters.length;i++)
      {
        this.filters[i].isChecked=false;
      }
      for(let i=0;i<e.length;i++)
      {
        for(let j=0;j<this.filters.length;j++)
        {
          if(this.filters[j].value.toLowerCase()==e[i])
          {
            this.filters[j].isChecked=true;
          }
          
        } 
      }
      
      this.props.setFilterStr(str)
      this.props.setFilters(this.filters);
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
            <InputLabel>Search for State, HUC or County</InputLabel>
            </div>
            <div style={{}}>
            <CustomSearch inputtext={this.props.inputstate.name}/>
            </div>
          </div>
            <div style={{marginLeft:'10px',zIndex:2}}>
            <InputLabel>Select month and year from</InputLabel>
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
            {/* <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e,date)=>console.log(date)}
            /> */}
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
            <Button onClick={this.filterByFuel} variant="contained" color="primary">Filter By Fuel Type</Button>
            
            {this.state.modalIsOpen?<FilterModalforHistoric saveOrcloseModal={(e)=>{this.saveOrcloseModal(e)}} modalIsOpen={this.state.modalIsOpen} filters={this.props.filters}/>:console.log("")}
            </div>
            <div style={{marginLeft:'40px',marginTop:'10px'}}>
            <Button onClick={this.formControl} variant="contained" color="primary">Search</Button>
            </div>
            <div style={{marginLeft:'40px',marginTop:'10px'}}>
            <Button variant="contained" color="primary">Reset View</Button>
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