import React, { Component } from 'react'
const DisplayByContext = React.createContext()
class DisplayByProvider extends Component {
  // Context state
  state = {
    displayChoice:"Water Consumption"
  }
  // Method to update state
  setdisplayChoice = (displayChoice) => {
    this.setState((prevState) => ({ displayChoice }))
  }
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
