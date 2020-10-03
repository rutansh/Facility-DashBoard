//set form value,
import React, { Component } from "react";
import FormContext from "./Context/queryFormContext";
import { Radio, InputLabel } from "@material-ui/core";
class QueryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoice: this.props.form.name,
    };
    this.selectedItem = this.selectedItem.bind(this);
  }

  selectedItem(event) {
    console.log("inside child function");
    this.props.setForm(event.target.value);
    // this.props.optionHandler(event.target.value)
  }
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
export default (props) => {
  return (
    <FormContext.Consumer>
      {(context) => {
        return <QueryForm {...props} {...context} />;
      }}
    </FormContext.Consumer>
  );
};
