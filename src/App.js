import React from 'react';
import './styles/global.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from './components/Context/updateContext';
import {StateProvider} from './components/Context/inputStatecontext';
function App() {
  return (
    <BrowserRouter>
    <div className="GlobalStyle">
      <Header/>
      <StateProvider>
      <UserProvider>
        <MainContent/>
      </UserProvider>
      </StateProvider>
      
      
    </div>
    </BrowserRouter>
  );
}
export default App;