import React, { Component } from 'react'
const DisplayByContext = React.createContext()

// This component is used to set value of Display by form in the map layer


class DisplayByProvider extends Component {

  // Context state initially "Water Consumption"
  state = {
    displayChoice:"Water Consumption"
  }
  
  // Method to update state
  setdisplayChoice = (displayChoice) => {
    this.setState((prevState) => ({ displayChoice }))
  }

  // It will set the display context and provide values to all children components 

  render() {
    const { children } = this.props
    const { displayChoice } = this.state
    const { setdisplayChoice } = this
    return (
      <DisplayByContext.Provider
        value={{
            displayChoice,
            setdisplayChoice,
        }}
      >
        {children}
      </DisplayByContext.Provider>
    )
  }
}
export default DisplayByContext
export { DisplayByProvider }
