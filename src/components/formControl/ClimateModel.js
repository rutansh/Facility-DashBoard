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
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
            <InputLabel>Select Climate Model</InputLabel>
            {this.props.climateScenario=="RCP45"?
            <Select
            defaultValue="AVG45"
            onClick={(e)=>{

                if(this.props.climateModel!==e.target.value)
                {
                    this.props.setclimateModel(e.target.value);
                }
                else 
                {
                    console.log("do nothing");
                }
            }}>
              
              {climateModels45.map((data)=>{
                  return(
                  <MenuItem value={data.value}>{data.name}</MenuItem>
                  );
              })}
              
          </Select>:
          <Select
            defaultValue="AVG85"
            onClick={(e)=>{
                if(this.props.climateModel!==e.target.value)
                {
                    this.props.setclimateModel(e.target.value);
                }
                else 
                {
                    console.log("do nothing");
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
export default (props)=>{
    return(
      <ProjectedContext.Consumer>
      {(context)=>{
        return <ClimateModel {...props}{...context}/>
      }} 
      </ProjectedContext.Consumer>
    )
}