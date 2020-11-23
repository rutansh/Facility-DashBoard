import React from 'react';
const ProjectedContext=React.createContext();

// This component is used to set values for climateScenario, climateModel and energyScenario in Projected Form

class ProjectedProvider extends React.Component{
    
    // Initialize the states with default values 
    state={
        climateScenario:localStorage.getItem("climateScenario"),
        climateModel:localStorage.getItem("climateModel"),
        energyScenario:localStorage.getItem("energyScenario")?localStorage.getItem("energyScenario"):"REF2019"
    }

    // Global Method to set climatescenario
    setclimateScenario = (climateScenario) => {
      debugger
      console.log("climatescenario",climateScenario);
        if(climateScenario!==0)
        {
          localStorage.setItem("climateScenario",climateScenario);
            if(climateScenario=="RCP45")
            {
              localStorage.setItem("climateModel","AVG45");
              this.setState((prevState) => ({ climateScenario }));
              
              this.setclimateModel("AVG45");
            }          
            else
            {
              localStorage.setItem("climateModel","AVG85");
              this.setState((prevState) => ({ climateScenario }));
              this.setclimateModel("AVG85");
            }
            
            
            
        }
      }

    // Global Method to set climatemodel
    setclimateModel = (climateModel) => {
      debugger
      console.log("climateModel",climateModel);
        if(climateModel!==0)
        {
            localStorage.setItem("climateModel",climateModel);
            this.setState((prevState) => ({ climateModel }))
        }
    }

    // Global Method to set energyscenario
    setenergyScenario=(energyScenario)=>{
        console.log("energyScenario is called");
        debugger
        if(energyScenario!==0 || energyScenario!==null || energyScenario)
        {
          localStorage.setItem("energyScenario",energyScenario);
          this.setState((prevState) => ({ energyScenario }))
        }
        
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