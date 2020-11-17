import React from 'react';
const ProjectedContext=React.createContext();

// This component is used to set values for climateScenario, climateModel and energyScenario in Projected Form

class ProjectedProvider extends React.Component{
    
    // Initialize the states with default values 
    state={
        climateScenario:"RCP45",
        climateModel:"AVG45",
        energyScenario:"REF2019"
    }

    // Global Method to set climatescenario
    setclimateScenario = (climateScenario) => {
        if(climateScenario!==0)
        {
            localStorage.setItem("climateScenario",climateScenario);
            this.setState((prevState) => ({ climateScenario }))
        }
      }

    // Global Method to set climatemodel
    setclimateModel = (climateModel) => {
        if(climateModel!==0)
        {
            localStorage.setItem("climateModel",climateModel);
            this.setState((prevState) => ({ climateModel }))
        }
    }

    // Global Method to set energyscenario
    setenergyScenario=(energyScenario)=>{
        if(energyScenario!==0)
        {
          localStorage.setItem("energyScenario",energyScenario);
        }
        this.setState((prevState) => ({ energyScenario }))
    }

    // Rendering context to children components
    render()
    {
        const { children } = this.props
        const { climateScenario } = this.state
        const { climateModel } = this.state
        const { energyScenario } = this.state
        const { setclimateScenario } = this
        const { setclimateModel } = this
        const { setenergyScenario } = this
        return(
        <ProjectedContext.Provider
        value={{
          climateScenario,
          climateModel,
          energyScenario,
          setclimateScenario,
          setclimateModel,
          setenergyScenario,
        }}
      >
        {children}
      </ProjectedContext.Provider>
        );
    }}
export default ProjectedContext
export { ProjectedProvider }