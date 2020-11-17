import React from 'react';
import Modal from "react-modal";
import Button from '@material-ui/core/Button';

//It is a static component used to render tutorials page
class Tutorials extends React.Component{
    render(){
        console.log("This is Tutorials");
        return(
            <div>
                <Modal
        className="tutorial-modal-header"
          isOpen={true}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 4,
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "200px",
              left: "690px",
              right: "690px",
              bottom: "250px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
    <div>
          <h2>Tutorial</h2>

<p>Welcome to EWED! This tutorial will introduce you to the functions and features of the dashboard.</p>

<p>The dashboard is separated primarily by its main functionalities. The left hand side of the dashboard is for the mapping of the data while the right hand side of the dashboard is for visualizing the data apart from the map feature.</p>
<img src={require('../assets/img/tutorial-page/01-left-and-right-aws.png')}/><br/>
<p>Let’s explore the mapping functionality of EWED first. You can choose to display either water consumption, water withdrawal or emissions data on the map by selecting the coordinating bubbles in the upper left of the map. Below this, States, HUC Regions and Counties are another search parameter you can select. However, HUC Regions and Counties are not available to view at the National scale. </p>
<img src={require('../assets/img/tutorial-page/02-parameter-selection-aws.png')}/><br/>

<p>To change the scale of the map, simply click on a State and the map will zoom in accordingly. </p>
<img src={require('../assets/img/tutorial-page/03-state-view-aws.png')}/><br/>

<p>At the state level, you can now view by HUC Regions, Counties or Individual facilities. At this scale, clicking on a HUC Region will display the individual facilities, represented by bubbles, inside that subbasin.</p>
<img src={require('../assets/img/tutorial-page/04-HUC-view-aws.png')}/><br/>

<p>If you would like to select a different HUC Region, the Back to State View will zoom you back out to the State scale. </p>
<img src={require('../assets/img/tutorial-page/05-huc-view-back-to-state-view-aws.png')}/><br/>

<p>If you would like to select  another State, the Reset View button to the right of search bar at the top will return you to the National scale at any time.</p>
<img alt="assa"/><br/>

<p>The search bar is a convenient way to view a specific State, HUC Region, or County if you know its name. Changing the timeline of data that is visualized is also possible with the search bar. Currently, data from 2003-2016 is available on EWED.</p>
<img src={require('../assets/img/tutorial-page/07-map-search-bar-aws.png')}/><br/>

<p>After exploring the mapping functionalities of EWED, let us now examine the data on the right hand side of the dashboard. At the National scale, the “Table” tab showcases every State’s total generation, emissions, water withdrawal and water consumption. At the State scale, totals for either HUC Regions or Counties are available depending on what is selected under “View By”. At the HUC scale, totals for individual facilities are available.</p>
<img src={require('../assets/img/tutorial-page/08-table-aws.png')}/><br/>

<p>When selecting an individual facility at the HUC scale from the map, you will see more specific details about that single facility, and it is possible to “view trends”. This will show a time series for the individual facility’s generation, emissions, water consumption and water withdrawal. </p>
<img src={require('../assets/img/tutorial-page/09-HUC-view-facility-view-trends-aws.png')}/>
<img src={require('../assets/img/tutorial-page/10-HUC-view-facility-trends-aws.png')}/><br/>

<p>Additional time series are also available to view for the State and HUC scale when selecting the “Line Chart” tab. Additional data visualizations include Pie Charts and Bar Charts that separate generation, emissions, water consumption and water withdrawal data into the different fuel types for energy generation at the National, State and HUC scales. </p>
<img src={require('../assets/img/tutorial-page/11-table-chart-selection-aws.png')}/><br/>

<p>Lastly, if at any time you would like to submit a comment, please use the Feedback form by selecting the feedback button in the bottom right of every page.</p>
<img src={require('../assets/img/tutorial-page/12-feedback.png')}/><br/>
<Button variant="contained" color="primary"onClick={(e)=>{this.props.handleChild(e)}}>Close</Button>
          </div> 
        </Modal>
            </div>
        );
    }
}
export default Tutorials;