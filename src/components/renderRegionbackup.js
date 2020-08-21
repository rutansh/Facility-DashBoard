  
  function renderRegions() {
    
    
    let scale=1;
    if (this.state.viewByChoice == "Facilities") {
      
      
      if(this.state.regions["All Facilities"])
      {
        return this.state.regions["All Facilities"].map((facility, index) => {
          
          return  (
            //component-N facility-props=>title,lat,lng,onClick(e,index),isActive:(index==)
          <div>
           <Marker
              key={index}
              title={facility.LOCATION_ADDRESS}
              position={
                {
                  lat: parseFloat(facility.LATITUDE83),
                  lng: parseFloat(facility.LONGITUDE83),
                }
              }
              icon={ {
                    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                    fillColor: "#8B008B",
                    strokeColor: "#800080",
                    fillOpacity: 0.4,
                    anchor: {x:0,y:0},
                    strokeWeight: 0,
                    scale: scale
                  }}
              onClick={(async ()=>{
                // console.log("");("")("clicked..!");
                // console.log("");("")(facility.PGM_SYS_ID);
                let startDate = this.props.historicStartDate;
                let endDate = this.props.historicEndDate;
                let mapping = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
                let startYear = parseInt(startDate.split(" ")[3])
                let endYear = parseInt(endDate.split(" ")[3])
                let startmonthinInt = parseInt(mapping[startDate.split(" ")[1]]);
                let endmonthinInt = parseInt(mapping[endDate.split(" ")[1]]);
                let fetchFacility="https://ewed.org:31567/ewedService/getFacility/pgmSysId/"+facility.PGM_SYS_ID+"/"+startYear+"/"+startmonthinInt+"/"+endYear+"/"+endmonthinInt;
                var res = await fetch(fetchFacility);
                var jsondata = await res.json();
                // this.onClickFacility({facility:facility,index:index,jsonDataforChart:jsondata});
                //https://www.smashingmagazine.com/2020/06/higher-order-components-react/
                
                })}>
                {this.state.isFacilitySelected&&index===this.state.index&&
                (<InfoWindow>
                  <div style={{height:"100px",width:"150px",zIndex:10}}>
                    <b>{this.state.jsonDataforChart.Facility[0]["PRIMARY_NAME"]}</b>
                    <p>({this.state.startDateProps.split(" ")[1]} {this.state.startDateProps.split(" ")[3]} - {this.state.endDateProps.split(" ")[1]} {this.state.endDateProps.split(" ")[3]})</p>
                    
                    <button onClick={()=>{
                      this.facilityChart(this.state.jsonDataforChart);
                    }}>Show Details</button>
                  </div>
                </InfoWindow>)}  
              </Marker>
          </div>
      )}
    );  
    }
    else 
    {
      return (
        <div>
          Loading...
        </div>
      );

    }
        
  }
    else {
      if(this.state.regions.length>0)
      {
        return this.state.regions.map(regionJ => {
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
                fillColor: "green"
              }}
              onClick={async () => {
                if (props.toLowerCase().includes("all us")) {
                  this.arrayForParent[0] = regionJ["properties"]["NAME"].toLowerCase() + " (state)";
                  // console.log("");("")(this.arrayForParent[0]);
                  this.props.formHandler(this.arrayForParent);
                }
                else if (props.toLowerCase().includes("state")) {
  
                  if (this.state.viewByChoice == "Watersheds" && regionJ.properties.SUBBASIN.toLowerCase().includes("watershed")) {
                    
                    this.arrayForParent[0] = regionJ.properties.SUBBASIN;
                    this.props.formHandler(this.arrayForParent);
                  }
                  else if (this.state.viewByChoice == "Counties") {
                    
                    this.arrayForParent[0] = regionJ.properties.CountyState1;
                    this.props.formHandler(this.arrayForParent);
                  }
                }
              }
              }
            />
          )
        })  
      }
    }
  }
  shouldComponentUpdate(nP,nS)
  {
    
    return true;
  }