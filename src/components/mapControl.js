import React,{Component,useState} from 'react';
import '../styles/mainContent.css';
import NavBar from './navBar';
import MapContent from './mapContent';
import Loader from 'react-loader-spinner';


// This component is fetching data for table layer and map layer, as table layer is also a part of nav bar component, 
// This component will render 2 children components 1) Map Layer 2) Nav Bar Layer
class MapControl extends Component {

  // Initializing default state for all us view
  constructor(props)
  {
      super(props);
      this.state=
      {
        regions:null,
        loading:false,
        loader:false,
        mapViewByCalled:false,
        viewByChoice:"States",
        regionClick:false,
        regionLoaded:false,
        filterstr:this.props.filterstr,
        initialrender:true,
      }

      // Binding methods
      this.formHandler=this.formHandler.bind(this);
      this.viewByButtonClicked=this.viewByButtonClicked.bind(this);
      this.formHandlerforFacility=this.formHandlerforFacility.bind(this);
      this.formHandler2=this.formHandler2.bind(this);
      this.formHandler3=this.formHandler3.bind(this);
    }

  // This method is used when user clicks on viewBy from the mao layer 
  viewByButtonClicked(obj)
  {
    // Checking for type of viewBy selected by user
    if(obj.viewByChoice=="Watersheds")
    {
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Watersheds",
      });
    }
    else if(obj.viewByChoice=="Counties")
    {
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Counties",
       });
    }
    else
    {
      this.setState({
        mapViewByCalled:true,
        viewByChoice:"Facilities",
      });
    }
  }
  
  // When user has clicked from table this method will take the new region value
  formHandler(changeEvent){
    this.props.mapHandler(changeEvent[0])
  }

  // When user has clicked from table this method will take the new region value
  formHandler2(e)
  {
    this.props.mapHandler(e);
  }
  formHandler3(changeEvent)
  {
    localStorage.setItem("backbutton","true");
    this.props.mapHandler(changeEvent[0]);
  }
  // When clicks for facility data from map layer
  formHandlerforFacility(changeEvent){

    this.props.mapHandler(changeEvent[0])
  }

  // This method will call everytime when component will be rerendered
  componentWillReceiveProps(nextProps) {
    if(localStorage.getItem("formchange")=="true")
    {
      // When form is changed then we will need to again fetch the data from updated form for that again loader is set to false
      localStorage.setItem("formchange","false");
      
      this.setState({
        loader:false,
      })  
    }

          
  }
  
  // All api calls will be handled during initial rendering 
  async componentDidMount()
  {
    // Formating start and end dates
    var startDate=this.props.historicStartDate;
    var endDate=this.props.historicEndDate;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);

    // If request is from URL and user has requested for historic form
    if(localStorage.getItem("form")=="Historic")
    {
      // If all us is selected
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        
        var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              loading:true,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
      }

      // If state is selected
      else if((this.props.historicInputState.toLowerCase().includes("state")))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0];

        // In state if Watershed is selected as a viewBy
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr")
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loading:true,
              viewByChoice:"Watersheds",
              mapViewByCalled:false,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }

        // In state if County is selected as a viewBy
        else if(localStorage.getItem("viewBy")=="Counties")
        {
          var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName.trim()+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr");
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loading:true,
              viewByChoice:"Counties",
              mapViewByCalled:false,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }

        // In state if Facility is selected as a viewBy
        else if(localStorage.getItem("viewBy")=="Facilities")
        {
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:41513/ewedService/getFacilityData/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr");
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loading:true,
              viewByChoice:"Facilities",
              mapViewByCalled:false,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }

      }

      // If user has searched for particular county
      else if((this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2)))
      {
        var countyName=this.props.historicInputState.toLowerCase()
          var url="https://ewed.org:31567/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr")
          try{
            var response=await fetch(url)
            var json=await response.json()
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loading:true,
              mapViewByCalled:false,
              loader:true,

            })
          }
          catch(e)
          {
            console.log(e);
          }
      }

      // If user has searched for particular county
      else if((this.props.historicInputState.toLowerCase().includes("watershed")))
      {
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr")
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loading:true,
            mapViewByCalled:false,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
    }

    // If Projected form is selcted
    else if(localStorage.getItem("form")=="Projected")
    {
      
      // Settling values to localStorage in oreder to update the URL
      if(localStorage.getItem("energyScenario")=="na")
      {
          localStorage.setItem("energyScenario","REF2019");
      }
      else if(localStorage.getItem("climateScenario")=="na")
      {
          localStorage.setItem("climateScenario","RCP45");
      }
      else if(localStorage.getItem("climateModel")=="na")
      {
          localStorage.setItem("climateModel","AVG45")
      }

      // If all Us is requested from the input search field
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      { 
        if(startYear<2048)
        {
          var url="https://ewed.org:31567/ewedService/getFutureData/defaultViewData/"+localStorage.getItem("energyScenario")+"/stateName/"+2049+"/"+1+"/"+2050+"/"+12+"/fuelTypes/"+localStorage.getItem("filterstr");
          try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loading:true,
            mapViewByCalled:false,
            initialrender:false,
            loader:true,
            });
          }
          catch(e)
          {
            console.log(e);
          }
        }
        else
        {
          var url="https://ewed.org:31567/ewedService/getFutureData/defaultViewData/"+localStorage.getItem("energyScenario")+"/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr");
        }
        
        
      }

      // If state is requested from the input search field
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        stateName=stateName.trim(" ");
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          if(startYear<2048)
          {
            var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+localStorage.getItem("energyScenario") +"/stateName/"+stateName+"/HUC8Name/"+2049+"/"+1+"/"+2050+"/"+12+"/fuelTypes/"+localStorage.getItem("filterstr"); 
          }
          else
          {
            var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+localStorage.getItem("energyScenario") +"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr"); 
          }
          
        }
        else if(localStorage.getItem("viewBy")=="Counties")
        {
          if(startYear<2048)
          {
            var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+localStorage.getItem("energyScenario")+"/stateName/"+stateName+"/CountyState1/"+2049+"/"+1+"/"+2050+"/"+12+"/fuelTypes/"+localStorage.getItem("filterstr");
          }
          else
          {
            var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+localStorage.getItem("energyScenario")+"/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr");
          }
          
        }
        else if(localStorage.getItem("viewBy")=="Facilities")
        {
          if(startYear<2048)
          {
            var name=this.props.historicInputState;
            name=name.split(" (")[0];
            name=name.trim(" ");  
            var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+localStorage.getItem("energyScenario")+"/stateName/"+name+"/"+2049+"/"+1+"/"+2050+"/"+12+"/fuelTypes/"+localStorage.getItem("filterstr")
          }
          else
          {
            var name=this.props.historicInputState;
            name=name.split(" (")[0];
            name=name.trim(" ");  
            var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+localStorage.getItem("energyScenario")+"/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr")
          }
          
        }
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loading:true,
            mapViewByCalled:false,
            viewByChoice:localStorage.getItem("viewBy"),
            loader:true,
          });
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // If county is requested from the input search field
      else if(this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2))
      {
        var countyName=this.props.historicInputState.toLowerCase()
        var url = "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+localStorage.getItem("energyScenario")+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr")
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loading:true,
            mapViewByCalled:false,
            loader:true,
          })
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // If watershed is requested from the input search field
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loading:true,
            mapViewByCalled:false,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
    }     
  }
  
  async componentDidUpdate(pP,state,snap)
  {
    // To get start and end month,year for URL call
    var startDate=this.props.historicStartDate;
    var endDate=this.props.historicEndDate;
    var startYear=parseInt(startDate.split(" ")[3])
    var endYear=parseInt(endDate.split(" ")[3])
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startmonthinInt=parseInt(mapping[startDate.split(" ")[1]]);
    var endmonthinInt=parseInt(mapping[endDate.split(" ")[1]]);
    
    //watershed of state url
    var stateName=this.props.historicInputState.toLowerCase().split("(")[0].trim(" ")
    if(localStorage.getItem("energyScenario")=="na")
    {
          localStorage.setItem("energyScenario","REF2019");
    }
    else if(localStorage.getItem("climateScenario")=="na")
    {
          localStorage.setItem("climateScenario","RCP45");
    }
    else if(localStorage.getItem("climateModel")=="na")
    {
          localStorage.setItem("climateModel","AVG45")
    }

    // If projected form is selected
    if(this.props.form=="Projected")
    {
 

      // Condition is used to stop rerendering of the component 
      if(pP.historicInputState == this.props.historicInputState &&
          pP.historicStartDate == this.props.historicStartDate && 
          pP.historicEndDate == this.props.historicEndDate)
      {
        
      

      // If a user has selected reset button
      if(localStorage.getItem("p_resetViewforLastLayer")=="true")
      {
        
        localStorage.setItem("p_resetViewforLastLayer","false");

        // Set view by as states because reset button is called
        localStorage.setItem("viewBy","States");
      }

      // If user has selected facilities from viewby form in map layer and then update the component's state
      if(this.state.mapViewByCalled && this.state.viewByChoice=="Facilities")
      {
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          var response=await fetch(url);
          var json=await response.json();
          this.setState({
              regions:json,
              mapViewByCalled:false,
              loading:true,
              loader:true,
            })
        }

        // If user has selected "Facilities" from viewby form in map layer and then update the component's state
        else if(this.state.mapViewByCalled && this.state.viewByChoice=="Counties")
          {
            
            var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
            var response=await fetch(url);
            var json=await response.json();
            this.setState({
              mapViewByCalled:false,
              loading:true,
              regions:json,
              loader:true,
            })
          }

        // If user has selected "Watersheds" from viewby form in map layer and then update the component's state
        else if((this.state.mapViewByCalled && this.state.viewByChoice=="Watersheds"))
        {
          var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          var response=await fetch(url);
          var json=await response.json();
          this.setState({
            mapViewByCalled:false,
            loading:true,
            regions:json,
            loader:true,
          })
        }

        // If projected form's filters are changed for all us and then update the component's state
        else if((pP.filterstr !== this.props.filterstr || pP.energyScenario !== this.props.energyScenario) && 
          this.props.historicInputState.toLowerCase().includes("all us"))
        {        
          var url="https://ewed.org:31567/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          try{
            var response=await fetch(url)
            var json=await response.json()
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
      }

      // If projected form's filters are changed for state, different urlendpoints based on the view by choice
      else if((pP.filterstr!==this.props.filterstr || pP.energyScenario!==this.props.energyScenario) &&
       this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        }
        else if(localStorage.getItem("viewBy")=="Counties")
        {
          var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr");
        }
        else if(localStorage.getItem("viewBy"=="Facilities"))
        {
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+localStorage.getItem("filterstr")
        }

        // Calling API based on the url and then update the component's state
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // If parameters are changed in Projected form and to get the data for county and then update the component's state
      else if((pP.filterstr!==this.props.filterstr||pP.energyScenario!==this.props.energyScenario) && 
        (this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 
        && this.props.historicInputState.split("(")[1].split(")")[0].length > 2)))
      {
        var countyName=this.props.historicInputState.toLowerCase()
        var url = "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loader:true,
          })
          
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // If parameters are changed in Projected form and to get the data for watershed and then to update the component's state
      else if(this.props.historicInputState.toLowerCase().includes("watershed")
        &&(pP.filterstr!==this.props.filterstr||pP.energyScenario!==this.props.energyScenario))
      {
        
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }

     }
     
     else
     {
      // If all us data is requested
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        // If all us data is requested update the state
        if(!this.state.initialrender)
        {
          this.setState({
            initialrender:true,
          })
        }
        else
        {
          // If all us data is to call the API to fetch the data
          var url="https://ewed.org:31567/ewedService/getFutureData/defaultViewData/"+this.props.energyScenario+"/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          // Update state
          try{
            localStorage.setItem("loadingfordata","true");
            var response= await fetch(url)
            var json= await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              loader:true,
            });
          }
          catch(e)
          {
            console.log(e);
          }
        }
        
      }
      // If state data is requested update the state
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        var stateName=this.props.historicInputState.toLowerCase().split("(")[0].trim(" ");

        // If viewBy is "Watersheds"
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          
          var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        }

        // If viewBy is "Counties"
        else if(localStorage.getItem("viewBy")=="Counties")
        {
          
          var url="https://ewed.org:31567/ewedService/getFutureData/getSummaryWithin/"+this.props.energyScenario+"/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
        }

        // If viewBy is "Facilities"
        else if(localStorage.getItem("viewBy")=="Facilities")
        {
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        }

        // Fetching data and updating state based on the URL endpoint
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            regionClick:false,
            loader:true,
            });
        }
        catch(e)
        {
            console.log(e);
        }
      }

      // If county is selcted
      else if(this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2))
      {
        var countyName=this.props.historicInputState.toLowerCase()
        var url = "https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        
        // Fetching data and updating state based on the URL endpoint
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            regionClick:false,
            loader:true,
          })
        }
        catch(e)
        {
          console.log(e);
        }
      }
      else if(this.props.historicInputState.toLowerCase().includes("county"))
      {
       
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/"+this.props.energyScenario+"/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            regionClick:false,
            loader:true,
          })
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // To fetch the data for watersheds
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFutureData/getFacilityData/"+this.props.energyScenario+"/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            regionClick:false,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
      
    }
  }

  // If Historic form is selected
  else if(this.props.form=="Historic")
    {
      // To optimize the performance this consdtion is checking whether current props and previous props are same or not
      if(pP.historicInputState==this.props.historicInputState&&pP.historicStartDate==this.props.historicStartDate&&pP.historicEndDate==this.props.historicEndDate)
      {
        // If reset view is called for the historic form
        if(localStorage.getItem("resetViewforLastLayer")=="true")
        {
          
          localStorage.setItem("resetViewforLastLayer","false")
          localStorage.setItem("viewBy","States");
          var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          try{
            var response=await fetch(url);
            var json=await response.json();

            // Updating the component's state
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              viewByChoice:"States",
              loader:true,  
            });
          }
          catch(e)
          {
            console.log(e);
          }
        }

        // If viewby choice is Facilities for a state in historic form
        else if(this.state.mapViewByCalled && this.state.viewByChoice=="Facilities" )
        {
        
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:41513/ewedService/getFacilityData/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          var response=await fetch(url);
          var json=await response.json();
          this.setState({
              regions:json,
              mapViewByCalled:false,
              loading:true,
              loader:true,
            })
        }

        // If viewby choice is Counties for a state in historic form
        else if(this.state.mapViewByCalled && this.state.viewByChoice=="Counties")
        {
            var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
            var response=await fetch(url);
            var json=await response.json();
            this.setState({
              mapViewByCalled:false,
              loading:true,
              regions:json,
              loader:true,
            })
        }

        // If viewby choice is watersheds for a state in historic form
        else if(this.state.mapViewByCalled && this.state.viewByChoice=="Watersheds")
        {
          if(localStorage.getItem("backbutton")=="true")
          {
            localStorage.setItem("backbutton","false");
          }
          else
          {
            var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
            var response=await fetch(url);
            var json=await response.json();
            this.setState({
              mapViewByCalled:false,
              loading:true,
              regions:json,
              loader:true,
            })
          }
            
      }

        // If filters are changed in historic form and all us is selected
        else if(pP.filterstr!==this.props.filterstr && this.props.historicInputState.toLowerCase().includes("all us"))
        {
        
          var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          try{
            var response=await fetch(url)
            var json=await response.json()
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loader:true,
            });
          }
          catch(e)
          {
            console.log(e);
          }
        }
        // If filters are changed in historic form and state is selected
        else if(pP.filterstr!==this.props.filterstr && this.props.historicInputState.toLowerCase().includes("state"))
        {

        // For state layer if viewBy is watersheds
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
          var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }

        // For state layer if viewBy is counties
        else if(localStorage.getItem("viewBy")=="Counties")
        {
          var stateName=this.props.historicInputState.toLowerCase().split("(")[0];
          var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName.trim()+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }

        // For state layer if viewBy is Facilities
        else if(localStorage.getItem("viewBy")=="Facilities")
        {
          var name=this.props.historicInputState;
          name=name.split(" (")[0];  
          var url="https://ewed.org:41513/ewedService/getFacilityData/stateName/"+name+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          try{
            var response=await fetch(url)
            var json=await response.json()
            this.setState({
              regions:json,
              filterstr:this.props.filterstr,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }
      }

      // If filters are changed and county is selected 
      else if(pP.filterstr!==this.props.filterstr && (this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2)))
      {
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loader:true,
          })
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // If filters are changed and watershed is selected 
      else if(this.props.historicInputState.toLowerCase().includes("watershed")&&pP.filterstr!==this.props.filterstr)
      {
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/HUC8Name/"+hucName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            filterstr:this.props.filterstr,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
    }

    // If input state, start date and date is changed from the historic form
    else
    { 
      // If all us is selected as a searched region
      if(this.props.historicInputState.toLowerCase().includes("all us"))
      {
        var url="https://ewed.org:31567/ewedService/defaultViewData/stateName/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
      // If state is selected as a searched region
      else if(this.props.historicInputState.toLowerCase().includes("state"))
      {
        // If view by is Watersheds
        if(localStorage.getItem("viewBy")=="Watersheds")
        {
          
          var stateName=this.props.historicInputState.toLowerCase().split("(")[0]
          var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName+"/HUC8Name/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              regionClick:false,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }

        // If view by is Counties
        if(localStorage.getItem("viewBy")=="Counties")
        {
          
          var url="https://ewed.org:31567/ewedService/getSummaryWithin/stateName/"+stateName.trim()+"/CountyState1/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr;
          
          try{
            var response=await fetch(url)
            var json=await response.json()
            //this.updateState(json,pP);
            this.setState({
              regions:json,
              regionClick:false,
              loader:true,
              });
          }
          catch(e)
          {
            console.log(e);
          }
        }
      }

      // If county is selected from historic form
      else if(this.props.historicInputState.toLowerCase().includes("county")|| (this.props.historicInputState.toLowerCase().search(",") < 0 && this.props.historicInputState.split("(")[1].split(")")[0].length > 2))
      {
        var countyName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/CountyState1/"+countyName+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          this.setState({
            regions:json,
            regionClick:false,
            loader:true,
          })
          
        }
        catch(e)
        {
          console.log(e);
        }
      }

      // If watershed is searched as a search string from historic form
      else if(this.props.historicInputState.toLowerCase().includes("watershed"))
      {
        var hucName=this.props.historicInputState.toLowerCase()
        var url="https://ewed.org:31567/ewedService/getFacilityData/HUC8Name/"+hucName+
        "/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt+"/fuelTypes/"+this.props.filterstr
        try{
          var response=await fetch(url)
          var json=await response.json()
          //this.updateState(json,pP);
          this.setState({
            regions:json,
            regionClick:false,
            loader:true,
            });
        }
        catch(e)
        {
          console.log(e);
        }
      }
    }

    }  
  }

  // This method will render the Map Layer and Nav bar layer and pass the data as a prop with all the values provided by the parent 
  // component , Loader is used to provide loader while initially rendering the data from API endpoints 
  render()
  {
    
    if(!this.state.loader)
    {
      
      return(
        <div style={{marginTop:"600px"}}>
          <div style={{marginTop:"-300px"}} >
          <center>
          <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs
      />
          </center>
          </div>         
      </div>
      );
    }

    // If data has loaded then it will render children components 
    else{
      return (
        <div>
          <div className="main_content_container">        
            <div className="main_content_inner">
              
              <div className="map-container">
              
              <MapContent  filterstr={this.props.filterstr}energyScenario={this.props.energyScenario}form={this.props.form} tabledata={this.state.regions} 
                notReload={this.state.mapViewByCalled} viewByButtonClicked={(e)=>this.viewByButtonClicked(e)} 
                formHandler={(e)=>this.formHandler(e)} formHandlerforFacility={(e)=>this.formHandlerforFacility(e)}
                historicInputState={this.props.historicInputState} formHandler3={(e)=>this.formHandler3(e)}
                historicStartDate={this.props.historicStartDate} historicEndDate={this.props.historicEndDate}/>
              </div>
              
              <div className="table-container">
                
                <NavBar climateScenario={this.props.climateScenario} climateModel={this.props.climateModel} energyScenario={this.props.energyScenario} form={this.props.form} tabledata={this.state.regions}
                formHandler={(e)=>this.formHandler2(e)}
                tableDataHandler={(e)=>{this.tableDataHandler(e)}}
                historicInputState={this.props.historicInputState} 
                historicStartDate={this.props.historicStartDate} 
                historicEndDate={this.props.historicEndDate}
                filterstr={this.props.filterstr}/>
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}
export default MapControl;
