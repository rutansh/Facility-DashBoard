import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import * as nameData from "../../data/facilityNames.json";
import { statename} from "../../data/stateNames.js";
import StateContext from '../Context/inputStatecontext';

class CustomSearch extends Component {
  recentSearches =nameData["Names"];
  constructor(props)
  {
      super(props);
      this.myRef=React.createRef();
  }
  render() {
    console.log("dsadasdsa:"+this.myRef)
    console.log(this.myRef.current);
    console.log("customsearch:"+this.props.inputstate.name);
    return (
        <div>
                     
     {/* <ReactSearchBox

        placeholder="Placeholder"
        value={this.props.inputstate.name}
        data={statename}
        callback={record => console.log("this is callback:"+record)}
        onSelect={e=>{this.props.setInputState(e.key)}}
      /> */}
        </div>
   
    )
  }
}
export default (props)=>{
    return(
      <StateContext.Consumer>
      {(context)=>{
        return <CustomSearch {...props}{...context}/>
      }} 
      </StateContext.Consumer>
    )
  }