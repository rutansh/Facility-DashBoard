//init state->action ->switch(action_type)->state update(state,action)->useReducer(functional component{state,onAction})
import React,{Component} from 'react';
import QueryForm from './queryFrom';
import FormControl from './formControl/formControl.js';
import MapControl from './mapControl';
import '../styles/mainContent.css';
import StateContext from './Context/inputStatecontext';

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
      filterstr:"all"
    }
    this.optionHandler=this.optionHandler.bind(this)   
    this.formHandler=this.formHandler.bind(this)   
    this.mapHandler=this.mapHandler.bind(this)
    localStorage.setItem("name","ALL US");
    localStorage.setItem("filterstr","all");
   }
  optionHandler(changeEvent)
  {
    this.setState({selectedOption:changeEvent})    
  }
  formHandler(changeEvent)
  {
    console.log("rerender after filter change",changeEvent[3]);  
    localStorage.setItem("name",changeEvent[0]);    
    this.setState({
      historicInputState:changeEvent[0],
      historicStartDate:String(changeEvent[1]),
      historicEndDate:String(changeEvent[2]),
      filterstr:changeEvent[3]
    })    
  }
  mapHandler(changeEvent)
  {
    console.log("maphandler in maincontent")
    let newState=changeEvent;
    localStorage.setItem("name",changeEvent);
    this.props.setInputState(changeEvent);    
    if(changeEvent.includes("watershed"))
    { this.setState({
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
    console.log("didupdate of maincontent");
    
  }
  shouldComponentUpdate(pP,pS)
  {
    console.log("should component update",this.state.historicInputState===pS.historicInputState);
   if(this.state.historicInputState===pS.historicInputState && this.state.filterstr===pS.filterstr)
   {
    return false;
   } 
   return true;
  }
  componentDidMount()
  {
    console.log("didmount of mainContent");
  }
  render()
  {
      return (
        <div>
        <QueryForm data={this.state.selectedOption} optionHandler={(e)=>this.optionHandler(e)}/>
        <FormControl historicInputState={this.state.historicInputState} data={this.state.selectedOption} formHandler={(e)=>this.formHandler(e)}/>
        <MapControl filterstr={this.state.filterstr}historicInputState={this.state.historicInputState} historicStartDate={this.state.historicStartDate} historicEndDate={this.state.historicEndDate} mapHandler={(e)=>this.mapHandler(e)}/>
        </div>
      );  
  }
}
export default (props)=>{
  return(
    <StateContext.Consumer>
    {(context)=>{
      return <MainContent {...props}{...context}/>
    }} 
    </StateContext.Consumer>
  )
}