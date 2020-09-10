import React from "react";
import Modal from "react-modal";
import CheckBox from "./checkbox";
import Button from "@material-ui/core/Button";
class FilterModalforHistoric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters,
    };
  }
  handleAllNoneChecked = (event) => {
    let filters = this.state.filters;
    this.state.filters.forEach((fruite) => (fruite.isChecked = false));
    this.setState({ filters: filters });
  };
  handleAllChecked = (event) => {
    let filters = this.state.filters;
    this.state.filters.forEach((fruite) => (fruite.isChecked = true));
    this.setState({ filters: filters });
  };
  handleCheckChieldElement = (event) => {
    let filters = this.state.filters;
    this.state.filters.forEach((fruite) => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked;
    });
    this.setState({ filters: filters });
  };
  render() {
    return (
      <div>
        <Modal
        className="filter-modal-main"
          isOpen={this.props.modalIsOpen}
          style={{
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
            <h3>Filter Your Choice</h3>
          </div>
          <center>
            <div className="filter-modal-btns-top-container">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  this.handleAllChecked(e);
                }}
              >
                Select All
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  this.handleAllNoneChecked(e);
                }}
              >
                Select None
              </Button>
            </div>
          </center>
          <ul style={{ marginTop: "30px", marginLeft: "-30px" }}>
            {this.state.filters.map((fruite) => {
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

            <Button variant="contained" color="primary">
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default FilterModalforHistoric;
