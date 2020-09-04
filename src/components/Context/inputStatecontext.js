import React, { Component } from 'react'
const StateContext = React.createContext()
class StateProvider extends Component {
  // Context state
  state = {
    inputstate: {name:"ALL US"},
    filterstr:"all",
    
  }
  // Method to update state
  setInputState = (region) => {
    console.log("state context",region);
    let inputstate={name:region}
    this.setState((prevState) => ({ inputstate }))
  }
  setFilterStr = (filterstr) => {
    this.setState((prevState) => ({ filterstr }))
  }
  
  render() {
    const { children } = this.props
    const { inputstate } = this.state
    const { filterstr } = this.state
    const { setInputState } = this
    const { setFilterStr } = this
    return (
      <StateContext.Provider
        value={{
            inputstate,
            setInputState,
            setFilterStr,
            filterstr
        }}
      >
        {children}
      </StateContext.Provider>
    )
  }
}
export default StateContext
export { StateProvider }