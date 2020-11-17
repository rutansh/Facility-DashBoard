import React, { Component } from 'react'
const UserContext = React.createContext()
class UserProvider extends Component {
  
  // Context state for storing region data

  state = {
    region: {name:""},
    prevState:"",
    storeState:""
  }
  
  // Method to set region
  setRegion = (region) => {
    this.setState((prevState) => ({ region }))
  }

  // To store previous region
  setprevState = (region) => {
    this.setState((prevState) => ({ region }))
  }

  // To store new region
  setstoreState=(region)=>{
    this.setState((prevState) => ({ region }))
  }

  // Will render context to all children components
  render() {
    const { children } = this.props
    const { region } = this.state
    const { setRegion } = this
    const { setprevState } = this
    
    return (
      <UserContext.Provider
        value={{
          region,
          setRegion,
          setprevState,
          
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}
export default UserContext
export { UserProvider }