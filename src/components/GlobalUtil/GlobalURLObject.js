import React,{useEffect} from 'react';
import MainContent from '../mainContent';
import {UserProvider} from '../Context/updateContext';
import {StateProvider} from '../Context/inputStatecontext';
import {FormProvider} from '../Context/queryFormContext';
import { ProjectedProvider } from '../Context/projectedFormContext';
import {MarkerProvider} from '../Context/markerContext';
import Header from '../header';


// this component will be rendered while initially URL is given in the application 
// isurl property will be settled to true while calling the main component and passing all the contents by splitting the string
// with parameters
function GlobalURLObject() {
    let arr= window.location.href.split("/");
    localStorage.setItem("energyScenario",arr[7]);
    localStorage.setItem("climateModel",arr[6]);
    localStorage.setItem("climateScenario",arr[5]);
    
    return(
        <div>
        <Header/>
        <ProjectedProvider>
        <FormProvider>
          <StateProvider>
            <UserProvider>
                <MarkerProvider>
                <MainContent isurl={true} arr={window.location.href.split("/")}/>
                </MarkerProvider>
            </UserProvider>
        </StateProvider>
        </FormProvider>
        </ProjectedProvider>
        </div>
    )
}
export default GlobalURLObject;