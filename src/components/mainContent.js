//init state->action ->switch(action_type)->state update(state,action)->useReducer(functional component{state,onAction})
import React,{Component} from 'react';
import QueryForm from './queryFrom';
import FormControl from './formControl/formControl.js';
import MapControl from './mapControl';
import '../styles/mainContent.css';
import StateContext from './Context/inputStatecontext';
import FormContext from './Context/queryFormContext';

class MainContent extends Component {
  constructor(props)
  {
    super(props);
    this.props=props;
    this.state=
    {
      selectedOption:"Historic",
      historicInputState:"ALL US",
      historicStartDate:"Thu Jan 01 2015 00:00:00 GMT-0800 (Pacific Standard Time)",
      historicEndDate:"Tue Dec 01 2015 00:00:00 GMT-0800 (Pacific Standard Time)",
      mapChange:true,
      status:true,
      filterstr:"",
      loading:false,
    }
    this.optionHandler=this.optionHandler.bind(this)   
    this.formHandler=this.formHandler.bind(this)   
    this.mapHandler=this.mapHandler.bind(this)
    localStorage.setItem("name","ALL US");
    localStorage.setItem("filterstr","all");
   }
  optionHandler(changeEvent)
  {
    console.log("radio button is changed",changeEvent)
    this.setState({selectedOption:this.props.form.name,loading:true})    
  }
  formHandler(array)
  {
    console.log("rerender after filter change",array[0][3]);  
    if(array[1]=="Historic")
    {
      this.props.setFilterStr(array[0][3]);
      localStorage.setItem("name",array[0][0]);
      localStorage.setItem("filter",array[0][3]);    
      this.setState({
        historicInputState:array[0][0],
        historicStartDate:String(array[0][1]),
        historicEndDate:String(array[0][2]),
        filterstr:array[0][3]
      })
    }
    else if(array[1]=="Projected")
    {
      this.props.setFilterStr(array[0][3]);
      localStorage.setItem("name",array[0][0]);
      localStorage.setItem("filter",array[0][3]);    
      this.setState({
        historicInputState:array[0][0],
        historicStartDate:String(array[0][1]),
        historicEndDate:String(array[0][2]),
        filterstr:array[0][3]
      })
    }
    else
    {
      console.log("do nothing...!")
    }
        
  }
  mapHandler(changeEvent)
  {
    console.log("maphandler in maincontent")
    let newState=changeEvent;
    localStorage.setItem("name",changeEvent);
    this.props.setInputState(changeEvent);    
    if(changeEvent.includes("watershed"))
    { 
      this.setState({
        historicInputState:changeEvent,
        mapChange:false,
        status:false,
      })
    }
    else
    {
      this.setState({
        historicInputState:changeEvent,
        mapChange:false,
        status:false,
      })
    }   
  }
  componentDidUpdate(pP,pS)
  {
    if(this.state.loading)
    {
      this.setState({
        loading:false,
        
      })
    }
    
    
  }
  shouldComponentUpdate(nextProps,nextState)
  {
    
    console.log("should component update",nextProps.form);
    
    if(this.state.historicInputState===nextState.historicInputState&&this.props.form===nextProps.form&&this.props.filterstr===nextProps.filterstr&&this.state.historicStartDate===nextState.historicStartDate&&this.state.historicEndDate===nextState.historicEndDate)
    {
      return false;
    } 
    return true;
  }
  
  render()
  {
    
    
      console.log("maincontent context");
      console.log(this.props)
      return (
        <div>
        <QueryForm/>
        <FormControl historicInputState={this.state.historicInputState} data={this.state.selectedOption} formHandler={(e)=>this.formHandler(e)} optionHandler={(e)=>{this.optionHandler(e)}}/>
        <MapControl form={this.props.form}filterstr={this.props.filterstr}historicInputState={this.state.historicInputState} historicStartDate={this.state.historicStartDate} historicEndDate={this.state.historicEndDate} mapHandler={(e)=>this.mapHandler(e)}/>
        </div>
      );    
  }
}
export default (props)=>{
  return(
    <FormContext.Consumer>
    {
      (context1)=>{
        return(
          <StateContext.Consumer>
        {(context)=>{
          return <MainContent {...props}{...context}{...context1}/>
        }} 
      </StateContext.Consumer>
        );
      }
    }  
    </FormContext.Consumer>
  )
}