import React from 'react';
import './styles/global.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from './components/Context/updateContext';
import {StateProvider} from './components/Context/inputStatecontext';
import {FormProvider} from './components/Context/queryFormContext';
import { ProjectedProvider } from './components/Context/projectedFormContext';
function App() {
  return (
    <BrowserRouter>
    <div className="GlobalStyle">
      <Header/>
      <ProjectedProvider>
      <FormProvider>
        <StateProvider>
          <UserProvider>
            <MainContent/>
          </UserProvider>
        </StateProvider>
      </FormProvider>
      </ProjectedProvider>
      
      
      
    </div>
    </BrowserRouter>
  );
}
export default App;