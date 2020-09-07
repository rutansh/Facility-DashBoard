import React from 'react';
const ProjectedContext=React.createContext();
class ProjectedProvider extends React.Component{
    state={
        climateScenario:"RCP45",
        climateModel:"AVG85",
        energyScenario:"REF2019"
    }
    setclimateScenario = (climateScenario) => {
        this.setState((prevState) => ({ climateScenario }))
      }
    setclimateModel = (climateModel) => {
        this.setState((prevState) => ({ climateModel }))
      }
    setenergyScenario=(energyScenario)=>{
        this.setState((prevState) => ({ energyScenario }))
    }
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