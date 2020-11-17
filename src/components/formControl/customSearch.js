import React, { Component } from 'react'
import StateContext from '../Context/inputStatecontext';
import Autosuggest from 'react-autosuggest';
import * as nameData from "../../data/facilityNames.json";



const languages = nameData["Names"];;

 
// This component will search for the suggestions in the search form for different regions
  
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);
 
class CustomSearch extends React.Component {
  constructor() {
    super();
 
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
 
  onChange = (event, { newValue }) => {
    this.props.setInputState(newValue)
    this.setState({
      value: newValue
    });
  };
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
 
  render() {
    const { values, suggestions } = this.state;
    var value=this.props.inputstate.name;
 
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a State, County or watershedname',
      value,
      onChange: this.onChange
    };
 
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}   />
    );
  }
}
// Importing Context to set new seached value 
export default (props)=>{
    return(
      <StateContext.Consumer>
      {(context)=>{
        return <CustomSearch {...props}{...context}/>
      }} 
      </StateContext.Consumer>
    )
  }