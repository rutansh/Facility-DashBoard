import React from 'react';
import CustomMarker from './customMarker';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {geostats} from './geostats';
import StateLayer from './stateLayer';
import UserContext from './Context/updateContext';
import Button from '@material-ui/core/Button';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';

// This component is used to display different colors on map layer
class Regions extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    
    // Initially has a state where setting up local state based on the data received from the parent Mapcontent component 
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

    // This will help to display different colors on map and divide value of table data using statistics and will create clusters
    var g=new geostats();
    
    //binding events
    this.markerClick=this.markerClick.bind(this);
    this.modalClick=this.modalClick.bind(this);
    this.formHandler=this.formHandler.bind(this);
    this.formHandlerforFacility=this.formHandlerforFacility.bind(this);
    this.arrayForParent = []; 
  }

  //When clicks on particular region from all us 
  formHandler(e)
  {
    this.props.formHandler(e);
  }

  //When clicks on particular region from state
  formHandlerforFacility(e)
  {
    this.props.formHandlerforFacility(e);
  }
  

  // When marker is clicked from map layer
  markerClick(e)
  {
        
        this.setState({
          index:e.index,
          data:e.data,
        })  
  }

  // modal is clicked to display line chart
  modalClick(e)
  {
    this.setState({
        ismodalOpen:true,
    })
  }

  // Initially after component is rendered it will set state of the component with the data provided by parent 
  componentDidMount()
  {
   
    this.setState({
      regions: this.props.regions,
      viewByChoice: this.props.viewByChoice,
      nameOfState: this.props.historicInputState,
    })
  }

  // If particular facility is selected
  componentDidUpdate(pP,pS,snap)
  { 
    
    let i=this.state.index;
    localStorage.setItem("id",i);

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
        
        // To display the regions for facilities
        if (this.props.viewByChoice == "Facilities" ) 
        {

        if(this.props.regions["All Facilities"])
          {
            localStorage.setItem("viewBy","Facilities");
            const {startMonth,startYear,endMonth,endYear}=dateFormat(this.props.historicStartDate,this.props.historicEndDate);
            urlchange("/"+this.props.form+"/"+this.props.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
            let dataforcolor=this.props.tabledata;
            let data=this.props.tabledata.Summary;
            let arr=[];
            let objforstate={};

            // This will make the cluster of related values
            var g=new geostats();
            if(this.props.regions["All Facilities"].length!==0)
            {
              for(let i=0;i<this.props.regions["All Facilities"].length;i++)
              {
                if(this.props.displayChoice=="Water Consumption")
                {
                  arr.push(Number(this.props.regions["All Facilities"][i].WaterConsumptionSummary));
                  
                }
                else if(this.props.displayChoice=="Water Withdrawal")
                {
                  arr.push(Number(this.props.regions["All Facilities"][i].WaterWithdrawalSummary));
                }
                else
                {
                  arr.push(Number(this.props.regions["All Facilities"][i].EmissionSummary));
                }
                objforstate[this.props.regions["All Facilities"][i].PRIMARY_NAME]=this.props.regions["All Facilities"][i];
              }

              if(arr.length>0)
              {
                
                if(arr.length<=5)
                {
                  g.setSerie(arr);
                  g.setPrecision(2);
                  g.getClassJenks2(arr.length-1);
                }
                else
                {
                  g.setSerie(arr);
                  g.setPrecision(2);
                  g.getClassJenks2(5);
                }
              }
            }

            // Custom marker will render different facilities on map layer and props are passed 
            // FacilityChart will render the facility's line chart
            return this.props.regions["All Facilities"].map((facility, index) => {
              return  (
              <div>
                {<CustomMarker 
                form={this.props.form} energyScenario={this.props.energyScenario}
                facility={facility} arrIndex={index} index={this.state.index} 
                data={this.state.data} modalOpen={(e)=>{this.modalClick(e)}} 
                markerClick={(e)=>this.markerClick(e)} historicInputState={this.props.historicInputState} 
                historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}
                objforstate={objforstate} g={g} displayChoice={this.props.displayChoice}
                /> }
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
                  
                <FacilityChart className="facility-chart-container" facilityData={this.state.data} startDate={this.props.historicStartDate} endDate={this.props.historicEndDate}/>
                <Button variant="contained" color="primary"onClick={()=>{this.setState({ismodalOpen:false})}}>Close</Button>
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

      // To display all us layer and state layers
      else if(this.props.regions&&this.props.regions.length>0 && this.props.tabledata.Summary&&this.props.tabledata.Summary.length!==1){
      {
        
        //Getting table data (data with emission, water generation, water withdrawal and water generation) to display different colors
        let data=this.props.tabledata.Summary;

        let arr=[];
        let objforstate={};

        // geostats is a library that will create different clusters of similar values
        var g=new geostats();
        if(this.props.viewByChoice!=="Facilities")
        {
          if(data)
          {
              for(let i=0;i<data.length;i++)
              {
                if(this.props.displayChoice=="Water Consumption")
                {
                  arr.push(Number(data[i].waterConsumption));
                  
                }
                else if(this.props.displayChoice=="Water Withdrawal")
                {
                  arr.push(Number(data[i].waterWithdrawal));
                }
                else
                {
                  arr.push(Number(data[i].emission));
                }
                objforstate[data[i].filterName]=data[i];
              }
              if(arr.length>0)
              {
                
                g.setSerie(arr);
                g.setPrecision(2);
                if(arr.length<=11)
                {
                  g.getClassJenks2(arr.length-1);  
                }
                else{
                  g.getClassJenks2(10);
                }
                
              }
              
          }
        }

        //  State layer component will render states for all us and requested state region 
        return this.props.regions.map(regionJ => {

              // For each layer all the required values are taken to draw borders on the map and fill out those 
              // border with different colors

              let region = regionJ["geometry"];
              let type = region["type"];
              var coordinates=[];
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
              coordinates.map(coordinate => coordArr.push({ lat: coordinate[1], lng: coordinate[0] }));

              // State layer is used to render geojson layer of requested state by the parent component
              return(
                  <StateLayer form={this.props.form}displayChoice={this.props.displayChoice}viewByChoice={this.props.viewByChoice} coordArr={coordArr} 
                  regionJ={regionJ} historicInputState={this.props.historicInputState} historicStartDate={this.props.historicStartDate}
                  historicEndDate={this.props.historicEndDate} 
                  formHandler={(e)=>{this.formHandler(e)}} 
                  formHandlerforFacility={(e)=>{this.formHandlerforFacility(e)}} 
                  objforstate={objforstate} g={g}
                  filterstr={this.props.filterstr}
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

// Global context is imported to provide synchronization between table and map layer to display borders
export default (props)=>{
  return(
    <UserContext.Consumer>
    {(context)=>{
      return <Regions {...props}{...context}/>
    }} 
  </UserContext.Consumer>
  )
}
