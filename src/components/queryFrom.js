//set form value,
import React,{Component} from 'react';
import FormContext from './Context/queryFormContext';
class QueryForm extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      selectedChoice:this.props.form.name
    }
    this.selectedItem=this.selectedItem.bind(this)
  }

  selectedItem(event){
    console.log("inside child function")
    this.props.setForm(event.target.value)
    // this.props.optionHandler(event.target.value)
  } 
  render()
  {  
      return (
      <div className="queryForm_container" style={{display:'flex',flexDirection:'column'}}>
      <div>  
      <form style={{display:'flex',flexDirection:'row',marginBottom:'10px'}}>
        <div>
          
        <input type="radio" name="Options" className="radioButton" value="Historic" onChange={this.selectedItem}  checked={this.props.form === 'Historic'}/>Historic
        </div>
        <div>
        <input type="radio" name="Options" className="radioButton" value="Projected" onChange={this.selectedItem}  checked={this.props.form === 'Projected'}/>Projected  
        </div>  
      </form>
      </div>
      </div> 
    );
  } 
}
export default (props)=>{
  return(
    <FormContext.Consumer>
      {
        (context)=>{
          return <QueryForm {...props}{...context}/>     
        }
      }
    </FormContext.Consumer>
  );
};