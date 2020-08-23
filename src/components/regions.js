import React, { Component, useState } from 'react';
import { Marker, InfoWindow, Polygon } from 'react-google-maps';
import CustomMarker from './customMarker';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {geostats} from './geostats';
class Regions extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state =
    {
      regions: this.props.regions,
      loading: false,
      startDateProps: this.props.historicStartDate,
      endDateProps: this.props.historicEndDate,
      nameOfState: this.props.historicInputState,
      displayChoice: this.props.displayChoice,
      viewByChoice: this.props.viewByChoice,
      isFacilitySelected:false,
      index:-1,
      jsonDataforChart:undefined,
      prevState:"",
      dataForColor:this.props.dataForColor,
      data:null,
      ismodalOpen:false,
      
    }
    
    this.regionColor=this.regionColor.bind(this);
    this.markerClick=this.markerClick.bind(this);
    this.modalClick=this.modalClick.bind(this);
    this.arrayForParent = []; 
  }
  regionColor()
  {
      return "green"
  }
  markerClick(e)
  {
        this.setState({
          index:e.index,
          data:e.data,
        })  
  }

  modalClick(e)
  {
    // this.props.modalOpen(true)
    this.setState({
        ismodalOpen:true,
    })
  }
  componentDidMount()
  {
   
    this.setState({
      regions: this.props.regions,
      viewByChoice: this.props.viewByChoice,
      nameOfState: this.props.historicInputState,
    })
  }
  componentDidUpdate(pP,pS,snap)
  { 
    console.log("regions",this.props.historicInputState);
    let i=this.state.index;
    if(pS.index!==this.state.index)
    {
        this.setState({
            index:i,
        })
    }
  }
  render() {
    {
        const scale=1;
        console.log("render regions");
        if (this.props.viewByChoice == "Facilities" ) {
        console.log("component rerender")
        console.log(this.props.regions);
        if(this.props.regions["All Facilities"])
          {
            return this.props.regions["All Facilities"].map((facility, index) => {
              return  (
              <div>
                {<CustomMarker facility={facility} arrIndex={index} index={this.state.index} data={this.state.data} modalOpen={(e)=>{this.modalClick(e)}} markerClick={(e)=>this.markerClick(e)} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/> }
                {this.state.ismodalOpen&&index===this.state.index&&<Modal isOpen={this.state.ismodalOpen} style={
                    {
                       overlay: {
                        position: 'fixed',
                        zIndex:4,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        height:"1200px",
                        width:"2300px"

                      },
                      content: {
                        position: 'absolute',
                        top: '300px',
                        left: '690px',
                        right: '690px',
                        bottom: '300px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px'
                      }
                    }
                  }>

                <FacilityChart facilityData={this.state.data} startDate={this.props.historicStartDate} endDate={this.props.historicEndDate}/>
                <button onClick={()=>{this.setState({ismodalOpen:false})}}>Close</button>
                </Modal>} 

              </div>
          )}
        );  
        
        }  
        else
        {
          return(
            <div>
              Loading..!
            </div>
          );
        }
      
       
      }
        else if(this.props.regions.length>0){
          
          {
            console.log("state data",this.props.viewByChoice);
            console.log("this.props.regions");
            console.log(this.props.regions);
            console.log("this.props.tabledata");
            console.log(this.props.tabledata);
            return this.props.regions.map(regionJ => {
              let region = regionJ["geometry"];
              let type = region["type"];
              var coordinates;
              if (type === "MultiPolygon") {
                var tempArr = []
                var coord = region["coordinates"]
                coord.map(coordinate => {
                  coordinate.map(temp => {
                    temp.map(t => {
                      tempArr.push(t)
                    })
                  })
                })
                coordinates = tempArr
      
              }
              else {
                coordinates = region["coordinates"][0]
              }
              let coordArr = []
              coordinates.map(coordinate => coordArr.push({ lat: coordinate[1], lng: coordinate[0] }))
              return (
                <Polygon
                  ref={this.polygonRef}
                  path={coordArr}
                  options={{
                    strokeColor: 'rgba(0,0,0,0.5)',
                    strokeOpacity: 0.2,
                    strokeWeight: 0.5,
                    fillColor: this.regionColor(regionJ,this.state.displayChoice),
                  }}
                  onClick={async () => {
                    if (this.props.historicInputState.toLowerCase().includes("all us")) {
                      console.log("all us clicked...!!")

                      this.arrayForParent[0] = regionJ["properties"]["NAME"].toLowerCase() + " (state)";
                      // console.log("")(this.arrayForParent[0]);
                      this.props.formHandler(this.arrayForParent);
                     
                    }
                    else if (this.props.historicInputState.toLowerCase().includes("state")) {
                      if (this.state.viewByChoice == "Watersheds" && regionJ.properties.SUBBASIN.toLowerCase().includes("watershed")) {
                        this.arrayForParent[0] = regionJ.properties.SUBBASIN;
                        this.props.formHandlerforFacility(this.arrayForParent);
                        
                      }
                      else if (this.state.viewByChoice == "Counties") {
                        
                        this.arrayForParent[0] = regionJ.properties.CountyState1;
                        this.props.formHandlerforFacility(this.arrayForParent);
                        
                      }
                      
                    }
                  }
                  }
                />
              )
            })  
          }
        }
        else{
          return(
            <div>
              loading...!
            </div>
          );
        }       
    }}
}
export default Regions;