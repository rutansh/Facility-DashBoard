import React from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class ClimateScenario extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div className="projected-form__input">
                  <InputLabel>Select Climate Scenario</InputLabel>
                  {localStorage.getItem("climateScenario")=="na"?localStorage.setItem("climateScenario","RCP45"):console.log("")}
                  <Select
                    defaultValue={localStorage.getItem("climateScenario")=="na"?"RCP45":localStorage.getItem("climateScenario")}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    onClick={(e) => {
                      
                      // updating climate scenario
                      if(e.target.value!=="undefined" && e.target.value&&e.target.value!==0)
                      {
                        this.props.setclimateScenario(e.target.value);
                        console.log("this is projected form");
                        if(e.target.value=="RCP45")
                        {

                          this.props.setclimateModel("AVG45");  
                        }
                        else if(e.target.value=="RCP85")
                        {
                          this.props.setclimateModel("AVG85");  
                        }
                        
                        
                        
                      }
                      
                    }}
                  >
                    <MenuItem value={"RCP45"}>
                      RCP 4.5 (Low emissions scenario)
                    </MenuItem>
                    <MenuItem value={"RCP85"}>
                      RCP 8.5 (High emissions scenario)
                    </MenuItem>
                  </Select>
                </div> 
        );


    }

}

export default ClimateScenario;