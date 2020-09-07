import React, { Component } from 'react'
const FormContext = React.createContext()
class FormProvider extends Component {
  // Context state
  state = {
    form: "Historic",
  }
  // Method to update state
  setForm = (form) => {
    console.log("state context",form);
    this.setState((prevState) => ({ form }))
  }
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