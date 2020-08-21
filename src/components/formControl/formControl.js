import React,{Component} from 'react';
import HistoricForm from './historicForm';
import ProjectedForm from './projectedForm';

class FormControl extends Component {
  constructor(props)
  {
    super(props);
    this.historicFormHandler=this.historicFormHandler.bind(this);
    this.projectedFormHadnler=this.projectedFormHandler.bind(this);
  }
  historicFormHandler(changeEvent){
    this.props.formHandler(changeEvent)
  }
  projectedFormHandler(changeEvent){
    this.props.formHandler(changeEvent)
  }
  render()
  {
    return(
      <div>
        {this.props.data==="Historic"?<HistoricForm historicFormHandler={(e)=>this.historicFormHandler(e)} historicInputState={this.props.historicInputState}/>:<ProjectedForm projectedFormHandler={(e)=>this.projectedFormHandler(e)}/>}
      </div>)
  }
}
export default FormControl;