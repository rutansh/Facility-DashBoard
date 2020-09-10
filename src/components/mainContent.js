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
      projectedStartDate:"Fri Jan 01 2049 00:00:00 GMT-0800 (Pacific Standard Time)",
      projectedEndDate:"Thu Dec 01 2050 00:00:00 GMT-0800 (Pacific Standard Time)",
      energyScenario:"REF2019",
      climateScenario:"RCP45",
      climateModel:"AVG45",
      mapChange:true,
      status:true,
      filterstr:"all",
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
    
    this.setState({selectedOption:this.props.form.name,loading:true})    
  }
  formHandler(array)
  {
    
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
      this.props.setFilterStr(array[0][4]);
      localStorage.setItem("name",array[0][0]);
      localStorage.setItem("filter",array[0][4]);    
      this.setState({
        historicInputState:array[0][0],
        projectedStartDate:String(array[0][1]),
        projectedEndDate:String(array[0][2]),
        filterstr:array[0][4],
        energyScenario:array[0][3],
        climateScenario:array[0][5],
        climateModel:array[0][6],
      })
    }
    else
    {
      console.log("do nothing...!")
    }
  }
  mapHandler(changeEvent)
  {
    
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
    
    
    
    if(this.state.historicInputState===nextState.historicInputState&&this.props.form===nextProps.form&&this.props.filterstr===nextProps.filterstr
      &&this.state.historicStartDate===nextState.historicStartDate&&this.state.historicEndDate===nextState.historicEndDate
      &&this.state.energyScenario==nextState.energyScenario&&this.state.climateModel==nextState.climateModel&&this.state.climateScenario==nextState.climateScenario)
    {
      return false;
    } 
    return true;
  }
  
  render()
  {
      
      return (
        <div>
        <QueryForm/>
        <FormControl historicInputState={this.state.historicInputState} data={this.state.selectedOption} formHandler={(e)=>this.formHandler(e)} optionHandler={(e)=>{this.optionHandler(e)}}/>
        {this.props.form=="Historic"?<MapControl climateScenario={this.state.climateScenario} climateModel={this.state.climateModel}
        energyScenario={this.state.energyScenario} form={this.props.form}filterstr={this.props.filterstr}historicInputState={this.state.historicInputState} historicStartDate={this.state.historicStartDate} historicEndDate={this.state.historicEndDate} mapHandler={(e)=>this.mapHandler(e)}/>
        :<MapControl form={this.props.form} climateScenario={this.state.climateScenario} climateModel={this.state.climateModel}
        energyScenario={this.state.energyScenario}filterstr={this.props.filterstr}historicInputState={this.state.historicInputState} 
        historicStartDate={this.state.projectedStartDate} historicEndDate={this.state.projectedEndDate} mapHandler={(e)=>this.mapHandler(e)}
      />}
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