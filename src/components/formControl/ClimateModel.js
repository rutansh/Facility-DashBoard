import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ProjectedContext from '../Context/projectedFormContext'; 
import {climateModels45} from './climateModelData45.js';
import {climateModels85} from './climateModelData85.js';
class ClimateModel extends React.Component{

    // This component is used to manage climate model in projected form

    constructor(props)
    {
        super(props);
    }

    // This method will store the climatemodel value to localstorage and  to provide its updated value 
    // to projected form global context 
    
    render()
    {

        
        return(
            <div>
            <InputLabel>Select Climate Model</InputLabel>
            {localStorage.getItem("climateModel")=="na" && this.props.climateScenario=="RCP45"?localStorage.setItem("climateModel","AVG45"):console.log()}
            {localStorage.getItem("climateModel")=="na" && this.props.climateScenario=="RCP85"?localStorage.setItem("climateModel","AVG85"):console.log()}
            {console.log("this is climate model",localStorage.getItem("climateModel")+"climate scenario:"+this.props.climateScenario)}
            {this.props.climateScenario=="RCP45"?
            <Select
            defaultValue={localStorage.getItem("climateModel")}
            onClick={(e)=>{

                // If it is different than the currently selected then update the state

                if(this.props.climateModel!==e.target.value)
                {
                    if(e.target.value=="undefined" || e.target.value==0){
                        this.props.setclimateModel("AVG45");   
                    }
                    console.log("this is climate model",e.target.value);
                    if(e.target.value!=="undefined" && e.target.value &&e.target.value!==0)
                    {
                        console.log("this is climate model inside",e.target.value);
                        this.props.setclimateModel(e.target.value);
                    }
                    
                    
                }
                
            }}>
              
              {climateModels45.map((data)=>{
                  return(
                  <MenuItem value={data.value}>{data.name}</MenuItem>
                  );
              })}
              
          </Select>:
          <Select
            defaultValue={localStorage.getItem("climateModel")}
            onClick={(e)=>{
                if(this.props.climateModel!==e.target.value)
                {
                    this.props.setclimateModel(e.target.value);
                }
                else 
                {
                    
                }
            }}
          >
              {climateModels85.map((data)=>{
                  return(
                  <MenuItem value={data.value}>{data.name}</MenuItem>
                  );
              })}
          </Select>}
            </div>
        );
    }}

// Importing Global Context for Projected form
export default (props)=>{
    return(
      <ProjectedContext.Consumer>
      {(context)=>{
        return <ClimateModel {...props}{...context}/>
      }} 
      </ProjectedContext.Consumer>
    )
}