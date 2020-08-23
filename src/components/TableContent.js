import React,{Component} from 'react';
import * as ReactBootstrap from "react-bootstrap";
import ReactToExcel from 'react-html-table-to-excel';

class TableContent extends Component 
{
  constructor(props)
  {
      super(props);
      this.state={
          items:this.props.tabledata,
          isLoaded:false,
          startDateProps:this.props.historicStartDate,
          endDateProps:this.props.historicEndDate,
          nameOfState:this.props.historicInputState,
          counter:1,
        }     
        this.updateState=this.updateState.bind(this);
  }
  updateState = (json,pP) => {
    
     this.setState({
       items: json,
     },() => {})
   }
  componentDidMount()
  {
   
    this.setState({
            isLoaded:true,
            items:this.props.tabledata,    
        });
        
  }
  // shouldComponentUpdate()
  // {
  //   if(this.props.notReload)
  //   {
  //     return false;
  //   }
  //   return true;
  // }
  async componentDidUpdate(pP,state,snap)
  {
    if(pP.historicInputState===this.props.historicInputState&&pP.historicStartDate===this.props.historicStartDate&&pP.historicEndDate===this.props.historicEndDate)
    {
      
      if(pP.tabledata===this.props.tabledata)
      {
        
      }
      else
      {
        this.setState({
          startDateProps:this.props.historicStartDate,
          endDateProps:this.props.historicEndDate,
          nameOfState:this.props.historicInputState,
          items:this.props.tabledata,
        });
      }
      
    }
    else{
      
      
      this.setState({
            startDateProps:this.props.historicStartDate,
            endDateProps:this.props.historicEndDate,
            nameOfState:this.props.historicInputState,
            items:this.props.tabledata,
          });
    }
    


  }


  render()
  {
      
      var startDate=this.state.startDateProps;
      var endDate=this.state.endDateProps;
      var formatstartDate=startDate.split(" ")[1]+"-"+startDate.split(" ")[3]+"  ";
      var formatendDate="  "+endDate.split(" ")[1]+"-"+endDate.split(" ")[3];
      var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};
      var nameOfState=this.props.historicInputState.toUpperCase();
      if(!this.state.isLoaded)
      {
          return <div>Loading...</div>
      }
      else
      {
        if((typeof this.state.items["Total Summary"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("all us"))
        {
          
          return(
          
            <div style={{ height: "885px",overflowY: "scroll"}} >
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
              <p><b>({formatstartDate} to {formatendDate}) </b></p>
            </div>
            <div style={{marginLeft:"450px",marginTop:"20px"}}>
            <ReactToExcel 
                table="tableid"
                filename=""
                sheet="sheet 1"
                buttonText="Download .CSV"
                className="btn"
                />
            </div>
            
            </div>
            
            
            
            <ReactBootstrap.Table id="tableid" striped bordered hover>
            <thead>
              <tr>
                <th>StateName</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody className="scrollit">   
              <tr>
                
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["Summary"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.filterName}</td>
                  <td>{item.generation}</td>
                  <td>{item.emission}</td>
                  <td>{item.waterConsumption}</td>
                  <td>{item.waterWithdrawal}</td>
              </tr>  
              ))}            
                  
            </tbody>
          </ReactBootstrap.Table>
                
  
            </div>
            );


        }
        else if((typeof this.state.items["Summary"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("state")&&this.props.viewByChoice==="Facilities")
        {
          return(
          
            <div style={{ height: "885px",overflowY: "scroll"}}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
              <p><b>({formatstartDate} to {formatendDate}) </b></p>
            </div>
            <div style={{marginLeft:"450px",marginTop:"20px"}}>
            <ReactToExcel 
                table="tableid"
                filename=""
                sheet="sheet 1"
                buttonText="Download .CSV"
                className="btn"
                />
            </div>
            
            </div>
          {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
                <ReactBootstrap.Table id="tableid" striped bordered hover>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["All Facilities"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.PRIMARY_NAME}</td>
                  <td>{item.GenerationSummary}</td>
                  <td>{item.EmissionSummary}</td>
                  <td>{item.WaterConsumptionSummary}</td>
                  <td>{item.WaterWithdrawalSummary}</td>
              </tr>  
              ))}               
            </tbody>
          </ReactBootstrap.Table>
      </div>
            );

        }
        else if((typeof this.state.items["Total Summary"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("state")&&this.props.viewByChoice!=="Facilities")
        {
          nameOfState=this.props.historicInputState;
          return(
               <div style={{ height: "885px",overflowY: "scroll"}}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
              <p><b>({formatstartDate} to {formatendDate}) </b></p>
            </div>
            <div style={{marginLeft:"450px",marginTop:"20px"}}>
            <ReactToExcel 
                table="tableid"
                filename=""
                sheet="sheet 1"
                buttonText="Download .CSV"
                className="btn"
                />
            </div>
            
            </div>
            <ReactBootstrap.Table id="tableid" striped bordered hover>
            <thead>
              <tr>
                <th>StateName</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Total Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["Summary"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.filterName}</td>
                  <td>{item.generation}</td>
                  <td>{item.emission}</td>
                  <td>{item.waterConsumption}</td>
                  <td>{item.waterWithdrawal}</td>
              </tr>  
              ))}            
                  
            </tbody>
          </ReactBootstrap.Table>
  
  
            </div>
            );
        }
        else if((typeof this.state.items["All Facilities"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("county"))
        {
          return(
          
            <div style={{ height: "885px",overflowY: "scroll"}}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
              <p><b>({formatstartDate} to {formatendDate}) </b></p>
            </div>
            <div style={{marginLeft:"450px",marginTop:"20px"}}>
            <ReactToExcel 
                table="tableid"
                filename=""
                sheet="sheet 1"
                buttonText="Download .CSV"
                className="btn"
                />
            </div>
            
            </div>
          {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
                <ReactBootstrap.Table id="tableid" striped bordered hover>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["All Facilities"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.PRIMARY_NAME}</td>
                  <td>{item.GenerationSummary}</td>
                  <td>{item.EmissionSummary}</td>
                  <td>{item.WaterConsumptionSummary}</td>
                  <td>{item.WaterWithdrawalSummary}</td>
              </tr>  
              ))}               
            </tbody>
          </ReactBootstrap.Table>
      </div>
            );
        }
        else if((typeof this.state.items["All Facilities"]) !== "undefined" && this.state.nameOfState.toLowerCase().includes("watershed"))
        {
          nameOfState=this.props.historicInputState;
          return(
          
            <div style={{height: "885px",overflowY: "scroll"}}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
            <div style={{marginTop:"20px"}}>
              <b>Activity for {nameOfState}</b>
              <p><b>({formatstartDate} to {formatendDate}) </b></p>
            </div>
            <div style={{marginLeft:"250px",marginTop:"20px"}}>
            <ReactToExcel 
                table="tableid"
                filename=""
                sheet="sheet 1"
                buttonText="Download .CSV"
                className="btn"
                />
            </div>
            
            </div>
            
          {/* <p>{JSON.stringify(this.state.items["All Facilities"])}</p> */}
          <ReactBootstrap.Table id="tableid" striped bordered hover>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Generation</th>
                <th>Emissions</th>
                <th>WaterConsumption</th>
                <th>WaterWithdrwal</th>
              </tr>
            </thead>
            <tbody>   
              <tr>
                  <td><b>Total</b></td>
                  <td><b>{this.state.items["Summary"][0].totalGeneration}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalEmission}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterConsumption}</b></td>
                  <td><b>{this.state.items["Summary"][0].totalWaterWithdrawal}</b></td>
              </tr>
              {this.state.items["All Facilities"].map((item,index)=>(
                  <tr key={index}>
                  <td>{item.PRIMARY_NAME}</td>
                  <td>{item.GenerationSummary}</td>
                  <td>{item.EmissionSummary}</td>
                  <td>{item.WaterConsumptionSummary}</td>
                  <td>{item.WaterWithdrawalSummary}</td>
              </tr>  
              ))}        
            </tbody>
          </ReactBootstrap.Table>
        </div>
            );
        }
        else{
          return <div>Loading...</div>
        }
      }   
  }
}
export default TableContent;