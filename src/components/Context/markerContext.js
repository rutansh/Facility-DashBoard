import React, { Component } from 'react'
const MarkerContext = React.createContext()
class MarkerProvider extends Component {
  
  // Context state for storing region data

  state = {
    markerData: null,
    markerId:-1,
    
  }
  
  // Method to set marker for facility layer
  setmarkerData = (markerData) => {
    this.setState((prevState) => ({ markerData }))
  }

  // To store markerid in the context
  setmarkerId = (markerId) => {
    this.setState((prevState) => ({ markerId }))
  }

  

  // Will render context to all children components
  render() {
    const { children } = this.props
    const { markerId } = this.state
    const {markerData} = this.state
    const { setmarkerData } = this
    const { setmarkerId } = this

    
    return (
      <MarkerContext.Provider
        value={{
            markerId,
            markerData,
            setmarkerData,
            setmarkerId
          
        }}
      >
        {children}
      </MarkerContext.Provider>
    )
  }
}
export default MarkerContext
export { MarkerProvider }