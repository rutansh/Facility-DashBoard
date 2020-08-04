import React from 'react';
import './styles/global.css';
import Header from './components/header';
import MainContent from './components/mainContent';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="GlobalStyle">
      <Header/>
      <MainContent/>
    </div>
    </BrowserRouter>
  );
}
export default App;