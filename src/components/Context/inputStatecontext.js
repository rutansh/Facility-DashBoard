import React, { Component } from 'react'
const StateContext = React.createContext()
class StateProvider extends Component {
  // Context state
  state = {
    inputstate: {name:"ALL US"},
    filterstr:"all",
    filters:[
      {id: 1, value: "Natural Gas", isChecked: true},
      {id: 2, value: "Coal", isChecked: true},
      {id: 3, value: "Nuclear", isChecked: true},
      {id: 4, value: "Water", isChecked: true},
      {id: 5, value: "Wind", isChecked: true},
      {id: 6, value: "Solar", isChecked: true},
      {id: 7, value: "Biomass", isChecked: true},
      {id: 8, value: "Geothermal", isChecked: true},
      {id: 9, value: "Petroleum", isChecked: true},
      {id: 10, value: "Other", isChecked: true}
    ]
  }
  // Method to update state of region provided by user
  setInputState = (region) => {
    let inputstate={name:region}
    this.setState((prevState) => ({ inputstate }))
  }

  // Method used to update filter string
  setFilterStr = (filterstr) => {
    
    this.setState((prevState) => ({ filterstr }))
    
  }
  // Set filters and give updated state to all the children components
  setFilters=(filters)=>{
    this.setState((prevState)=>({filters}))
  }
  
  // It will set the input state context with filters and provide values to all children components

  render() {
    const { children } = this.props
    const { inputstate } = this.state
    const { filterstr } = this.state
    const {filters}=this.state
    const { setInputState } = this
    const { setFilterStr } = this
    const { setFilters } = this
    return (
      <StateContext.Provider
        value={{
            inputstate,
            setInputState,
            setFilterStr,
            filterstr,
            filters,
            setFilters,
        }}
      >
        {children}
      </StateContext.Provider>
    )
  }
}
export default StateContext
export { StateProvider }