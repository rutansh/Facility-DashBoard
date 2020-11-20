import React, { Component } from 'react'
const SearchContext = React.createContext()
class SearchProvider extends Component {

  // Context state for form , initially it is set to Historic
  state = {
    searchstate: true,
  }

  // Method to update state of form by using this.setState
  setSearch = (searchstate) => {
    this.setState((prevState) => ({ searchstate }));
  }
  
  // Rendering Formcontext and provide the value of forms to all children components 
  render() {
    const { children } = this.props
    const { searchstate } = this.state
    const { setSearch } = this
    return (
      <SearchContext.Provider
        value={{
            searchstate,
            setSearch
        }}
      >
        {children}
      </SearchContext.Provider>
    )
  }
}
export default SearchContext
export { SearchProvider }