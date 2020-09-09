import React from 'react';
import CustomMarker from './customMarker';
import FacilityChart from './facilityChart';
import Modal from 'react-modal';
import {geostats} from './geostats';
import StateLayer from './stateLayer';
import UserContext from './Context/updateContext';

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
    var g=new geostats();
    
    this.markerClick=this.markerClick.bind(this);
    this.modalClick=this.modalClick.bind(this);
    this.formHandler=this.formHandler.bind(this);
    this.formHandlerforFacility=this.formHandlerforFacility.bind(this);
    this.arrayForParent = []; 
  }
  formHandler(e)
  {
    this.props.formHandler(e);
  }
  formHandlerforFacility(e)
  {
    this.props.formHandlerforFacility(e);
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
        if (this.props.viewByChoice == "Facilities" ) 
        {
        if(this.props.regions["All Facilities"])
          {
            let dataforcolor=this.props.tabledata;
            let data=this.props.tabledata.Summary;
            let arr=[];
            let objforstate={};
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
      else if(this.props.regions.length>0 && this.props.tabledata.Summary.length!==1){
      {
        //pattern find the data in facility , what is in data and in datacolor
        let dataforcolor=this.props.tabledata;
        let data=this.props.tabledata.Summary;

        let arr=[];
        let objforstate={};
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
                if(arr.length<10)
                {
                  g.getClassJenks2(arr.length-1);  
                }
                else{
                  g.getClassJenks2(10);
                }
                
              }
              //map->based on key name, function -> 2 (g,map,regionJ.properties.NAME)->g.random(map[regionJ.properties.NAME].waterConsumption)
          }
        }
            return this.props.regions.map(regionJ => {
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
              return(
                  <StateLayer displayChoice={this.props.displayChoice}viewByChoice={this.props.viewByChoice} coordArr={coordArr} 
                  regionJ={regionJ} historicInputState={this.props.historicInputState} 
                  formHandler={(e)=>{this.formHandler(e)}} 
                  formHandlerforFacility={(e)=>{this.formHandlerforFacility(e)}} 
                  objforstate={objforstate} g={g}/> 
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
export default (props)=>{
  return(
    <UserContext.Consumer>
    {(context)=>{
      return <Regions {...props}{...context}/>
    }} 
  </UserContext.Consumer>
  )
}
