import React from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class EnergySceanrio extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
                <Select
                defaultValue={localStorage.getItem("energyScenario")=="na"?"REF2019":localStorage.getItem("energyScenario")}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                onClick={(e) => {
                  // updating energy scenario
                  
                  if (this.props.energyScenario !== e.target.value && e.target.value) {
                    localStorage.setItem("energyScenario",e.target.value);
                    this.props.setenergyScenario(e.target.value);
                  } else {
                    console.log();
                  }
                }}
              >
                <MenuItem value={"REF2019"}>Reference</MenuItem>
                <MenuItem value={"HIGHMACRO"}>High Growth</MenuItem>
                <MenuItem value={"LOWMACRO"}>Low Growth</MenuItem>
                <MenuItem value={"HIGHPRICE"}>High Price</MenuItem>
                <MenuItem value={"LOWPRICE"}>Low Price</MenuItem>
                <MenuItem value={"HIGHRT"}>High Resource</MenuItem>
                <MenuItem value={"LOWRT"}>Low Resource</MenuItem>
                <MenuItem value={"AEO2018NO"}>AEO2018, no CPP</MenuItem>
              </Select>

            </div>
        );


    }

}

export default EnergySceanrio;