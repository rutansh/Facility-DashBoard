import React,{Component} from 'react';
import HistoricForm from './historicForm';
import ProjectedForm from './projectedForm';
import FormContext from '../Context/queryFormContext';


// This is the parent component of both Historic and Projected forms 

class FormControl extends Component {

  // Binding methods in constructor
  constructor(props)
  {
    super(props);
    this.historicFormHandler=this.historicFormHandler.bind(this);
    this.projectedFormHadnler=this.projectedFormHandler.bind(this);
    this.arrayforparents=[];
  }

  //Historic form handler for historic form will set the value if historic is selected
  // and this will call mainContent component with all the values provided in the form
  historicFormHandler(changeEvent){
    this.arrayforparents[0]=changeEvent
    this.arrayforparents[1]="Historic"
    this.props.formHandler(this.arrayforparents);
  }

  
  //Projected form handler for projected form will set the value if projected is selected
  // and this will call mainContent component with all the values provided in the form
  projectedFormHandler(changeEvent){
    this.arrayforparents[0]=changeEvent
    this.arrayforparents[1]="Projected"
    this.props.formHandler(this.arrayforparents);
  }

  // Conditional rendering for different forms based on it is selected from Parent component QueryForm
  render()
  {
    console.log("formcontrol");
    return(
      <div>
        {this.props.form==="Historic"?<HistoricForm historicFormHandler={(e)=>this.historicFormHandler(e)}/>:<ProjectedForm projectedFormHandler={(e)=>this.projectedFormHandler(e)}/>}
      </div>)
  }
}

// Form context is imported to set the form selected by user
export default (props)=>{
  return(
    <FormContext.Consumer>
    {(context)=>{
      return <FormControl {...props}{...context}/>
    }} 
    </FormContext.Consumer>
  )
}