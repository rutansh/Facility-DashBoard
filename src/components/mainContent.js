//init state->action ->switch(action_type)->state update(state,action)->useReducer(functional component{state,onAction})
import React,{Component} from 'react';
import QueryForm from './queryFrom';
import FormControl from './formControl/formControl.js';
import MapControl from './mapControl';
import '../styles/mainContent.css';
import StateContext from './Context/inputStatecontext';
import FormContext from './Context/queryFormContext';
import urlchange from './GlobalUtil/urlutil';
import dateFormat from './GlobalState/dateFormat';
class MainContent extends Component {
  // Initializing default state and will set the inital state based on checking whether URL is provided by the user or not
  constructor(props)
  {
    super(props);
    this.props=props;
    localStorage.setItem("activeTab","1");
    // If url is provided
    if(this.props.isurl)
    {
      // Fetching all the parameters
      localStorage.setItem("fromurl","true")
      localStorage.setItem("from_url","true");
      
      let filterarr=this.props.filters;
      let str=this.props.arr[4];
      const formType=this.props.arr[3];
      
      // Checking form provided in the url
      if(formType=="Historic")
      {
        localStorage.setItem("form","Historic")
      }
      else if(formType=="Projected")
      {
        localStorage.setItem("form","Projected")
      }
      

      // Set the new form 
      this.props.setForm(formType);
      
      const viewBy=this.props.arr[13];
      let displayBy=this.props.arr[12];

      // Sanitizing display by string
      if(displayBy.includes("%20"))
      {
        displayBy=displayBy.replace("%20"," ");
      }

      // getting values of climate scenario, climate model and energy scenario
      const climatescenario=this.props.arr[5];
      const climatemodel=this.props.arr[6];
      const energyscenario=this.props.arr[7];
      
      // Setting new values in local storage for the URL
      localStorage.setItem("viewBy",viewBy);
      localStorage.setItem("displayBy",displayBy);
      localStorage.setItem("climateScenario",climatescenario);
      localStorage.setItem("climateModel",climatemodel);
      localStorage.setItem("energyScenario",energyscenario);
      

      // Sanitizing input string
      if(this.props.arr[4].includes("%20"))
      {
        str=this.props.arr[4].replaceAll("%20"," ");
        str.trim();
      }

      // Taking Filters 
      let filters=this.props.arr[15];
      let filterstr="";
      
      // If based on the url set the filterstr accordingly in global context
      if(filters=="all")
      {
        filterstr="all";
      }
      else
      {
        // Checking for custom filters
        filters=filters.split(",");
        for(let i=0;i<filters.length;i++)
        {
          if(filters[i].includes("%20"))
          {
            filters[i]=filters[i].replace("%20"," ");
          }
        }
        
        for(let i=0;i<filters.length;i++)
        {
          if(i==0)
          {
            filterstr=filters[i];
          }
          else
          {
            filterstr=filterstr+","+filters[i];
          }
        }
        for (let i = 0; i < filterarr.length; i++) {
          filterarr[i].isChecked = false;
        }
        const e=filterstr.split(",");

        // Checking the filters to true 
        for (let i = 0; i < e.length; i++) {
          for (let j = 0; j < filterarr.length; j++) {
            if (filterarr[j].value.toLowerCase() == e[i]) {
              filterarr[j].isChecked = true;
            }
          }
        }
      }
      const start=this.props.arr[9]+"/"+this.props.arr[8];
      const end=this.props.arr[11]+"/"+this.props.arr[10]
      

      // Set new value of filters in form context
      this.props.setFilterStr(filterstr);
      this.props.setFilters(filterarr);
      this.props.setInputState(str);

      // For historic and projected form, update localstorage for URL
      if(formType=="Historic")
      {
        localStorage.setItem("historicStart",start);
        localStorage.setItem("historicEnd",end);
        if(localStorage.getItem("fromReset")=="true")
        {
          localStorage.setItem("fromReset","false");
        }
        else if(!localStorage.getItem("projectedStart") || !localStorage.getItem("projectedStart"))
        {
          localStorage.setItem("projectedStart","2049/01");
          localStorage.setItem("projectedEnd","2050/12");
        }
        else
        {
          localStorage.setItem("projectedStart","2049/01");
          localStorage.setItem("projectedEnd","2050/12");
        }
        

      }
      else
      {
        localStorage.setItem("projectedStart",start);
        localStorage.setItem("projectedEnd",end);
        if(localStorage.getItem("fromReset")=="true")
        {
          localStorage.setItem("fromReset","false");
        }
        else if(!localStorage.getItem("historicStart") || !localStorage.getItem("historicEnd"))
        {
          localStorage.setItem("historicStart","2015/01");
          localStorage.setItem("historicEnd","2015/12");
        }
        else
        {
          localStorage.setItem("historicStart","2015/01");
          localStorage.setItem("historicEnd","2015/12");
        }

      }

      localStorage.setItem("name",str);
      localStorage.setItem("filterstr",filterstr);

      // Updating component's local state based on the values provided in the url
      this.state=
      {
        selectedOption:formType,
        historicInputState:str,
        historicStartDate:String(new Date(localStorage.getItem("historicStart"))),
        historicEndDate:String(new Date(localStorage.getItem("historicEnd"))),
        projectedStartDate:String(new Date(localStorage.getItem("projectedStart"))),
        projectedEndDate:String(new Date(localStorage.getItem("projectedEnd"))),
        energyScenario:localStorage.getItem("energyScenario"),
        climateScenario:localStorage.getItem("climateScenario"),
        climateModel:localStorage.getItem("climateModel"),
        mapChange:true,
        status:true,
        filterstr:this.props.filterstr,
        loading:false,
        reload:false,
        initialloader:false,
      }
    }
    // If "Root" url is given
    else
    {
      localStorage.setItem("from_url","false");
      //this is not from url hence set the initial state with default values
      // Update the localstorage for URL 
      localStorage.setItem("displayBy","Water Consumption");
      localStorage.setItem("fromurl","false");
      localStorage.setItem("viewBy","States");
      localStorage.setItem("historicStart","2015/1");
      localStorage.setItem("historicEnd","2015/12");
      localStorage.setItem("projectedStart","2049/1");
      localStorage.setItem("projectedEnd","2050/12");
      localStorage.setItem("climateScenario","RCP45");
      localStorage.setItem("climateModel","AVG45");
      localStorage.setItem("energyScenario","REF2019");
      localStorage.setItem("filterstr","all");
      localStorage.setItem("form","Historic");
      localStorage.setItem("name","ALL US");
      
      this.state=
      {
        selectedOption:"Historic",
        historicInputState:"ALL US",
        historicStartDate:String(new Date(localStorage.getItem("historicStart"))),
        historicEndDate:String(new Date(localStorage.getItem("historicEnd"))),
        projectedStartDate:String(new Date(localStorage.getItem("projectedStart"))),
        projectedEndDate:String(new Date(localStorage.getItem("projectedEnd"))),
        energyScenario:"REF2019",
        climateScenario:"RCP45",
        climateModel:"AVG45",
        mapChange:true,
        status:true,
        filterstr:this.props.filterstr,
        loading:false,
        reload:false,
        initialloader:true,
      }
    }

    // Binding methods
    this.optionHandler=this.optionHandler.bind(this)   
    this.formHandler=this.formHandler.bind(this)   
    this.mapHandler=this.mapHandler.bind(this)
    
    
    
   }

  // If different form is selected
  optionHandler(changeEvent)
  {
    this.setState({selectedOption:this.props.form.name,loading:true})    
  }

  // If new values are given in historic or projected form
  formHandler(array)
  {
    // If Historic form
    debugger
    
    console.log("formhandler");
    if(array[1]=="Historic")
    {
      this.props.setFilterStr(array[0][3]);
      localStorage.setItem("name",array[0][0]);
      localStorage.setItem("filter",array[0][3]);
      // If reset is pressed
      if(localStorage.getItem("reload")=="true")
      {
        console.log("formahandler1");
        localStorage.setItem("reload","false");
        this.setState({
          historicInputState:array[0][0],
          historicStartDate:String(array[0][1]),
          historicEndDate:String(array[0][2]),
          filterstr:array[0][3],
          reload:true,
        })
      }   
      else
      {
        console.log("formahandler2",array[0][1]);
        this.setState({
          historicInputState:array[0][0],
          historicStartDate:String(array[0][1]),
          historicEndDate:String(array[0][2]),
          filterstr:array[0][3]
        })
      } 
      
    }
    else if(array[1]=="Projected")
    {
      
        // Set localstorage for URL
        console.log(array);
        if(localStorage.getItem("energyScenario")=="na")
        {
          localStorage.setItem("energyScenario","REF2019")
        }
      
        if(localStorage.getItem("climateScenario")=="na")
        {
          localStorage.setItem("climateScenario","RCP45")
        }
      
        if(localStorage.getItem("climateModel")=="na")
        {
          localStorage.setItem("climateModel","AVG45")
        }
        // Updating climate scenario, climate model and energy scenario values
        localStorage.setItem("climateScenario",array[0][5]);
        localStorage.setItem("climateModel",array[0][6]);
        localStorage.setItem("energyScenario",array[0][3]);
      
        // Calling global context to set new values
        this.props.setFilterStr(array[0][4]);
        localStorage.setItem("name",array[0][0]);
        localStorage.setItem("filter",array[0][4]);
        
        // If reset is true
        if(localStorage.getItem("reload")=="true")
        {
          localStorage.setItem("reload","false");
          this.setState({
            historicInputState:array[0][0],
            projectedStartDate:String(array[0][1]),
            projectedEndDate:String(array[0][2]),
            filterstr:array[0][4],
            energyScenario:array[0][3],
            climateScenario:array[0][5],
            climateModel:array[0][6],
            reload:true,
        })
        }
        else
        {
          this.setState({
          historicInputState:array[0][0],
          projectedStartDate:String(array[0][1]),
          projectedEndDate:String(array[0][2]),
          filterstr:array[0][4],
          energyScenario:array[0][3],
          climateScenario:array[0][5],
          climateModel:array[0][6],
        })
      }    
      

    }
    
  }

  // This method is called when user clicks on map layer
  mapHandler(changeEvent)
  {
    let newState=changeEvent;
    localStorage.setItem("name",changeEvent);
    

    // Updating global context 
    this.props.setInputState(changeEvent);

    // Updating component's state 
    if(changeEvent.includes("watershed"))
    { 
      this.setState({
        historicInputState:changeEvent,
        mapChange:false,
        status:false,
      })
    }
    else
    {
      this.setState({
        historicInputState:changeEvent,
        mapChange:false,
        status:false,
      })
    }   
  }
  componentDidMount()
  {
    if(localStorage.getItem("from_url")=="true")
    {
      localStorage.setItem("from_url","false");
      localStorage.setItem("from_url2","true");
      this.setState({
        initialloader:true,
      })
    }
  }
  // Everytime will be called after render method
  componentDidUpdate(pP,pS)
  {
    debugger
    // If loading data
    if(this.state.loading)
    {
      this.setState({
        loading:false,
      })
    }

    else
    {
      // Set localstorage to update the URL
      if(localStorage.getItem("energyScenario")=="na" || localStorage.getItem("energyScenario")==null)
      {
          localStorage.setItem("energyScenario","REF2019")
      }
      
      if(localStorage.getItem("climateScenario")=="na")
      {
          localStorage.setItem("climateScenario","RCP45")
      }
      
      if(localStorage.getItem("climateModel")=="na")
      {
          localStorage.setItem("climateModel","AVG45")
      }
      if(this.props.inputstate.name.toLowerCase().includes("all us"))
      {
          localStorage.setItem("viewBy","States");
      }
    
      else if(this.props.inputstate.name.toLowerCase().includes("state"))
      {

        // localStorage.setItem("viewBy","Watersheds");
      }
      else
      {
        
        localStorage.setItem("viewBy","Facilities");
      }
      
      if(localStorage.getItem("form")=="Historic")
      {
        // Update the url
        
        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.state.historicStartDate,this.state.historicEndDate);
        
        urlchange("/"+this.props.form+"/"+this.state.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
      }
      else
      {
        // Update the url
        localStorage.setItem("climateScenario",this.state.climateScenario);
        localStorage.setItem("climateModel",this.state.climateModel);
        localStorage.setItem("energyScenario",this.state.energyScenario);
        const {startMonth,startYear,endMonth,endYear}=dateFormat(this.state.projectedStartDate,this.state.projectedEndDate);
        
        urlchange("/"+this.props.form+"/"+this.state.historicInputState+"/"+localStorage.getItem("climateScenario")+"/"+localStorage.getItem("climateModel")+"/"+localStorage.getItem("energyScenario")+"/"+startMonth+"/"+startYear+"/"+endMonth+"/"+endYear+"/"+localStorage.getItem("displayBy")+"/"+localStorage.getItem("viewBy")+"/fuelTypes/"+this.props.filterstr);        
      }
      this.setState({
        reload:false,
      })

    }
  }
  // This method will not rerender the component again if everything is same
  shouldComponentUpdate(nextProps,nextState)
  {
    console.log("should outside");
    if(localStorage.getItem("from_url2")=="true")
    {
      localStorage.setItem("from_url2","false");
      return true;
    }
    else if((this.state.historicInputState===nextState.historicInputState&&this.props.form===nextProps.form&&this.props.filterstr===nextProps.filterstr
      &&this.state.historicStartDate===nextState.historicStartDate&&this.state.historicEndDate===nextState.historicEndDate
      &&this.state.projectedStartDate===nextState.projectedStartDate&&this.state.projectedEndDate===nextState.projectedEndDate
      &&this.state.energyScenario==nextState.energyScenario&&this.state.climateModel==nextState.climateModel&&
      this.state.climateScenario==nextState.climateScenario&&!nextState.reload))
    {
      console.log("should inside false");
      return false;
    } 
    return true;
  }

  // Rendering Main component and all the children components by passing local state as a prop
  render()
  {
    if(localStorage.getItem("from_url")=="true")
    {
      return(
        <div>
          Loading....
          </div>
      )
    }
    else{
      return (
        <div>
        <QueryForm/>
        <FormControl historicInputState={this.state.historicInputState} data={this.state.selectedOption} 
        formHandler={(e)=>this.formHandler(e)} optionHandler={(e)=>{this.optionHandler(e)}}/>
        {this.props.form=="Historic"?<MapControl climateScenario={this.state.climateScenario} climateModel={this.state.climateModel}
        energyScenario={this.state.energyScenario} form={this.props.form}filterstr={this.props.filterstr}
        historicInputState={this.state.historicInputState} historicStartDate={this.state.historicStartDate} 
        historicEndDate={this.state.historicEndDate} mapHandler={(e)=>this.mapHandler(e)}/>
        :<MapControl form={this.props.form} climateScenario={this.state.climateScenario} climateModel={this.state.climateModel}
        energyScenario={this.state.energyScenario}filterstr={this.props.filterstr}historicInputState={this.state.historicInputState} 
        historicStartDate={this.state.projectedStartDate} historicEndDate={this.state.projectedEndDate} mapHandler={(e)=>this.mapHandler(e)}
      />}
        </div>
      );    
    }
      
  }
}

// Form context to set the new values of a selceted form and State context is used to set and get updated values from form 

export default (props)=>{
  return(
    <FormContext.Consumer>
    {
      (context1)=>{
        return(
          <StateContext.Consumer>
        {(context)=>{

          return <MainContent {...props}{...context}{...context1}/>
        }} 
      </StateContext.Consumer>
        );
      }
    }  
    </FormContext.Consumer>
  )
}