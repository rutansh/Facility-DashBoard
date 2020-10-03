import React, { Component } from 'react'
const ViewByContext = React.createContext()
class ViewByProvider extends Component {
  // Context state
  state = {
    viewChoice:"States"
  }
  // Method to update state
  setviewChoice = (viewChoice) => {
    this.setState((prevState) => ({ viewChoice }))
  }
  render() {
    const { children } = this.props
    const { viewChoice } = this.state
    const { setviewChoice } = this
    return (
      <ViewByContext.Provider
        value={{
            viewChoice,
            setviewChoice,
        }}
      >
        {children}
      </ViewByContext.Provider>
    )
  }
}
export default ViewByContext
export { ViewByProvider }