import React from 'react';
import './styles/global.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from './components/Context/updateContext';
import {StateProvider} from './components/Context/inputStatecontext';
import {FormProvider} from './components/Context/queryFormContext';
function App() {
  return (
    <BrowserRouter>
    <div className="GlobalStyle">
      <Header/>
      <FormProvider>
        <StateProvider>
          <UserProvider>
            <MainContent/>
          </UserProvider>
        </StateProvider>
      </FormProvider>
      
      
      
    </div>
    </BrowserRouter>
  );
}
export default App;