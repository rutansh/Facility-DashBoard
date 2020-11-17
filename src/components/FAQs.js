import React from 'react';
import Modal from "react-modal";
import Button from '@material-ui/core/Button';

//This is a static page used to render FAQs
class FAQs extends React.Component{
    render(){
        console.log("This is FAQs");
        return(
            <div>
                <Modal
        className="faqs-modal-header"
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
          <div style={{ marginLeft: "10px" }}>
          <h2>FAQs</h2>
<ul>
<li><b>What is EWED?</b>
<p>The Energy Water Emissions Dashboard (EWED) is a data visualization tool. It provides the most up-to-date data on US power sector generation, water consumption and greenhouse gas emissions.</p></li>

<li><b>How can I use EWED?</b>
<p>EWED can be used to visualize the aforementioned data with a series of customizable maps, tables, and graphs. Allowing a better look at how the energy water nexus and US power sector are related. </p></li>

<li><b>How can I submit comments?</b>
<p>Comments can be submitted on the EWED prototype through a feedback form that is accessible on every screen by clicking the “click here to enter feedback” box in the bottom of the screen.</p></li>

<li><b>What is a HUC?</b>
<p>A hydrologic unit code that represents the drainage basin of a specific stream. EWED uses the HUC8 category in its maps; which are classified as subbasins.</p></li>

<li><b>What is planned for EWED?</b>
<p>EWED is planned to continue its development until Fall 2020. By that time, a long-term host for the dashboard must be found and EWED will be maintenanced regularly for data updates.</p></li>

<li><b>What is the difference between Water Withdrawal and Water Consumption?</b>
<p>Water withdrawal is a measurement of the water withdrawn from any water resource. Water withdrawal is a useful measurement for evaluation of the demand upon the resource, but water withdrawn is not necessarily lost. Whereas, water consumption is the water that is withdrawn, but not returned to the resource. This water is considered “consumed” and lost from the resource.</p></li>
</ul>
            <Button variant="contained" color="primary"onClick={(e)=>{this.props.handleChild(e)}}>Close</Button>
          </div>
          
          
        </Modal>
            </div>
        );
    }
}
export default FAQs;