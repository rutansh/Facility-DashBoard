//init state->action ->switch(action_type)->state update(state,action)->useReducer(functional component{state,onAction})
import React,{Component} from 'react';
import QueryForm from './queryFrom';
import FormControl from './formControl/formControl.js';
import MapControl from './mapControl';
import '../styles/mainContent.css';

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
    }
    this.optionHandler=this.optionHandler.bind(this)   
    this.formHandler=this.formHandler.bind(this)   
    this.mapHandler=this.mapHandler.bind(this)
   }
  optionHandler(changeEvent)
  {
    this.setState({selectedOption:changeEvent})    
  }
  formHandler(changeEvent)
  {
     this.setState({
      historicInputState:changeEvent[0],
      historicStartDate:String(changeEvent[1]),
      historicEndDate:String(changeEvent[2])
    })    
  }
  mapHandler(changeEvent)
  {
    console.log("maphandler in maincontent")
    let newState=changeEvent;
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
   if(this.state.historicInputState===pS.historicInputState)
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
        <MapControl historicInputState={this.state.historicInputState} historicStartDate={this.state.historicStartDate} historicEndDate={this.state.historicEndDate} mapHandler={(e)=>this.mapHandler(e)}/>
        
        </div>
      );
  
   
  
    
   
  
    
  }
}
export default MainContent;