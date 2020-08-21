import React,{Component,useState} from 'react';
import '../styles/mainContent.css';
import NavBar from './navBar';
import MapContent from './mapContent';


class DataContext extends Component {
  constructor(props)
  {
      super(props);
      this.state={
        regions:null
      }
      this.formHandler=this.formHandler.bind(this);
  }
  formHandler(changeEvent){
    console.log("hello from map form"+changeEvent[0])
    this.props.mapHandler(changeEvent[0])
  }
  async componentDidMount()
  {
    await fetch("https://ewed.org:3004/all-states")
    .then(res=>res.json())
    .then(json=>{
    this.setState({
        regions:json,    
    })
    }).catch(e=>{
      console.log("Error"+e);
    })
  }
  render()
  {
    console.log("This is main view  for map and table!")
    return (
    <div>
      <div className="main_content_container">        
        <div style={{display:'flex',flexDirection:'row',width:'100%',marginTop:0}}>
          <div style={{  width: '47vw', height: "890px" }}>
            <MapContent formHandler={(e)=>this.formHandler(e)} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/> 
          </div>
          <div style={{ marginLeft:20,width: '50vw', height: "890px" }}>
            <NavBar historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/> 
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default DataContext;