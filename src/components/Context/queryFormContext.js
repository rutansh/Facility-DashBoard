import React, { Component } from 'react'
const FormContext = React.createContext()
class FormProvider extends Component {

  // Context state for form , initially it is set to Historic
  state = {
    form: "Historic",
  }

  // Method to update state of form by using this.setState
  setForm = (form) => {
    localStorage.setItem("form",form);
    if(!localStorage.getItem("energyScenario"))
    {
      localStorage.setItem("energyScenario","REF2019");
    }
    this.setState((prevState) => ({ form }));
  }
  
  // Rendering Formcontext and provide the value of forms to all children components 
  render() {
    const { children } = this.props
    const { form } = this.state
    const { setForm } = this
    return (
      <FormContext.Provider
        value={{
            form,
            setForm
        }}
      >
        {children}
      </FormContext.Provider>
    )
  }
}
export default FormContext
export { FormProvider }