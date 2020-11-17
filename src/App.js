import React from 'react';
import './styles/global.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {UserProvider} from './components/Context/updateContext';
import {StateProvider} from './components/Context/inputStatecontext';
import {FormProvider} from './components/Context/queryFormContext';
import { ProjectedProvider } from './components/Context/projectedFormContext';


// If URL is root URL then this component will be rendered

function App() {
  return (
    <div className="GlobalStyle">
      <Router>
        <Header/>
        <ProjectedProvider>
        <FormProvider>
          <StateProvider>
            <UserProvider>
              <MainContent isUrl={false}/>
            </UserProvider>
          </StateProvider>
        </FormProvider>
        </ProjectedProvider>
      </Router>
    </div>
  );
}
export default App;