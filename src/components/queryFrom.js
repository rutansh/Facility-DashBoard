import React,{Component} from 'react';
class QueryForm extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      selectedChoice:"Historic"
    }
    this.selectedItem=this.selectedItem.bind(this)
  }

  selectedItem(event){
    console.log("inside child function")
    this.setState({
      selectedChoice:event.target.value
    })
    this.props.optionHandler(event.target.value)
} 
  render()
  {  
      return (
      <div className="queryForm_container" style={{display:'flex',flexDirection:'column'}}>
      <div>  
      <form style={{display:'flex',flexDirection:'row',marginBottom:'10px'}}>
        <div>
        <input type="radio" name="Options" className="radioButton" value="Historic" onChange={this.selectedItem}  checked={this.state.selectedChoice === 'Historic'}/>Historic
        </div>
        <div>
        <input type="radio" name="Options" className="radioButton" value="Projected" onChange={this.selectedItem}  checked={this.state.selectedChoice === 'Projected'}/>Projected  
        </div>  
      </form>
      </div>
      </div> 
    );
  } 
}
export default QueryForm;