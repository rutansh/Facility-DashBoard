import React, { Component } from 'react'
const UserContext = React.createContext()
class UserProvider extends Component {
  // Context state
  state = {
    region: {name:""},
    prevState:"",
    storeState:""
  }
  // Method to update state
  setRegion = (region) => {
    this.setState((prevState) => ({ region }))
  }
  setprevState = (region) => {
    this.setState((prevState) => ({ region }))
  }
  setstoreState=(region)=>{
    this.setState((prevState) => ({ region }))
  }
  render() {
    const { children } = this.props
    const { region } = this.state
    const { setRegion } = this
    const { setprevState } = this
    const { setstoreState } = this
    return (
      <UserContext.Provider
        value={{
          region,
          setRegion,
          setprevState,
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