//set form value,
import React, { Component } from "react";
import FormContext from "./Context/queryFormContext";
import { Radio, InputLabel } from "@material-ui/core";
import urlchange from './GlobalUtil/urlutil';

//This component is a parent compoennt of both historic and projected form components
class QueryForm extends Component {
  constructor(props) {
    super(props);

    // when initially rendered it is taking value present in the global context
    this.state = {
      selectedChoice: this.props.form.name,
    };
    this.selectedItem = this.selectedItem.bind(this);
  }

  //This method gets called whenenver user clicks on particular radio button
  selectedItem(event) {
    console.log("inside child function",localStorage.getItem("energyScenario"));
    localStorage.setItem("formchange","true");
    localStorage.setItem("form",event.target.value);
    console.log("THis is form");
    console.log(event.target.value);

      
        if(localStorage.getItem("energyScenario")=="na")
        {
          localStorage.setItem("energyScenario","REF2019")
        }
      
        if(localStorage.getItem("climateScenario")=="na")
        {
          localStorage.setItem("climateScenario","RCP45")
        }
      
        if(localStorage.getItem("climateModel")=="na")
        {
          localStorage.setItem("climateModel","AVG45")
        }
      
      
    //changing global context of the form
    this.props.setForm(event.target.value);
    // this.props.optionHandler(event.target.value)
  }

  // This will render 2 Radio buttons with different forms
  //If any of the radio button is clicked different form will be rendered
  render() {
    return (
      <div
        className="queryForm_container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Radio
                  color="primary"
                  name="Options"
                  value="Historic"
                  onChange={this.selectedItem}
                  checked={this.props.form === "Historic"}
                />
              </div>
              <div style={{ marginTop: "10px" }}>Historic</div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <Radio
                    color="primary"
                    name="Options"
                    value="Projected"
                    onChange={this.selectedItem}
                    checked={this.props.form === "Projected"}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>Projected</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

//To Get and update the forms using context
export default (props) => {
  return (
    <FormContext.Consumer>
      {(context) => {
        return <QueryForm {...props} {...context} />;
      }}
    </FormContext.Consumer>
  );
};
