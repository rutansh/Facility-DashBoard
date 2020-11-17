import React from "react";
import Modal from "react-modal";
import CheckBox from "./checkbox";
import Button from "@material-ui/core/Button";
class FilterModalforHistoric extends React.Component {

  // This component will render the filter by fuel type dialogue box where user can provide filters

  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters,
    };
  }

  // This function gets called when user clicks on Select None in the box
  // and it will save the values of updated filters

  handleAllNoneChecked = (event) => {
    let filters = this.state.filters;
    this.state.filters.forEach((fruite) => (fruite.isChecked = false));
    this.setState({ filters: filters });
  };

  // This function gets called when user clicks on Select All in the box 
  // and it will save the values of checked filters by updating component's state

  handleAllChecked = (event) => {
    let filters = this.state.filters;
    this.state.filters.forEach((fruite) => (fruite.isChecked = true));
    this.setState({ filters: filters });
  };

  // This function gets called when user clicks on Save to save the checked inputs
  handleCheckChieldElement = (event) => {
    let filters = this.state.filters;
    this.state.filters.forEach((fruite) => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked;
    });
    this.setState({ filters: filters });
  };

  // Modal Component in this is used to display filter by fuel type box

  render() {
    return (
      <div>
        <Modal
        className="filter-modal-main"
          isOpen={this.props.modalIsOpen}
          style={{
            // Inline styiling for Modal n filterbyfuel types
            overlay: {
              position: "fixed",
              zIndex: 4,
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              // Inside content of modal
              position: "absolute",
              top: "200px",
              left: "690px",
              right: "690px",
              bottom: "250px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div style={{ marginLeft: "10px" }}>
            <h4><b>Filter By Fuel Type</b></h4>
          </div>
          <center>
            <div className="filter-modal-btns-top-container">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {

                  // Changes values for filters 
                  this.handleAllChecked(e);
                }}
              >
                Select All
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {

                  //Unchecked all filters
                  
                  this.handleAllNoneChecked(e);
                }}
              >
                Select None
              </Button>
            </div>
          </center>
          <ul style={{ marginTop: "30px", marginLeft: "-30px" }}>
            {this.state.filters.map((fruite) => {
              // If user clicks on any filter
              return (
                <CheckBox
                  handleCheckChieldElement={this.handleCheckChieldElement}
                  {...fruite}
                />
              );
            })}
          </ul>
          <div className="filter-modal-btns-bottom-container">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                // If clicks on save then it will update the checked filters
                let arr = [];
                for (let i = 0; i < this.state.filters.length; i++) {
                  if (this.state.filters[i].isChecked == true) {
                    arr.push(this.state.filters[i].value.toLowerCase());
                  }
                }
                this.props.saveOrcloseModal(arr);
              }}
            >
              Save
            </Button>

            <Button variant="contained" color="primary"
            onClick={(e) => {
              // If closes the modal then it will now save the changes
              this.props.saveOrcloseModal("Close")
            }}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default FilterModalforHistoric;
