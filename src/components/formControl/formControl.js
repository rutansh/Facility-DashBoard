import React,{Component} from 'react';
import HistoricForm from './historicForm';
import ProjectedForm from './projectedForm';
import FormContext from '../Context/queryFormContext';
class FormControl extends Component {
  constructor(props)
  {
    super(props);
    this.historicFormHandler=this.historicFormHandler.bind(this);
    this.projectedFormHadnler=this.projectedFormHandler.bind(this);
    this.arrayforparents=[];
  }
  historicFormHandler(changeEvent){
    this.arrayforparents[0]=changeEvent
    this.arrayforparents[1]="Historic"
    this.props.formHandler(this.arrayforparents);
  }
  projectedFormHandler(changeEvent){
    
    
    this.arrayforparents[0]=changeEvent
    this.arrayforparents[1]="Projected"
    this.props.formHandler(this.arrayforparents);
  }
  componentDidUpdate(pP,pS)
  {
    console.log("didupdate of form control");
  }
  render()
  {
    return(
      <div>
        {this.props.form==="Historic"?<HistoricForm historicFormHandler={(e)=>this.historicFormHandler(e)}/>:<ProjectedForm projectedFormHandler={(e)=>this.projectedFormHandler(e)}/>}
      </div>)
  }
}
export default (props)=>{
  return(
    <FormContext.Consumer>
    {(context)=>{
      return <FormControl {...props}{...context}/>
    }} 
    </FormContext.Consumer>
  )
}