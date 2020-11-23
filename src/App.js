import React from 'react';
import './styles/global.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {UserProvider} from './components/Context/updateContext';
import {StateProvider} from './components/Context/inputStatecontext';
import {FormProvider} from './components/Context/queryFormContext';
import {MarkerProvider} from './components/Context/markerContext';
import { ProjectedProvider } from './components/Context/projectedFormContext';


// If URL is root URL then this component will be rendered

function App() {
  
  localStorage.setItem("climateScenario","RCP45");
  localStorage.setItem("climateModel","AVG45");
  localStorage.setItem("energyScenario","REF2019");
  return (
    <div className="GlobalStyle">
      <Router>
        <Header/>
        <ProjectedProvider>
        <FormProvider>
          <StateProvider>
            <UserProvider>
              <MarkerProvider>
              <MainContent isUrl={false}/>
              </MarkerProvider>
            </UserProvider>
          </StateProvider>
        </FormProvider>
        </ProjectedProvider>
      </Router>
    </div>
  );
}
export default App;