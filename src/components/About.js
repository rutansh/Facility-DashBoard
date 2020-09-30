import React from 'react';
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
class About extends React.Component{
    render(){
        console.log("This is about");
        return(
            <div>
                <Modal
        className="about-modal-header"
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
          <h2>About</h2>
        
        <p>The goal of EWED is to support timely, integrated monitoring and decision making at the nexus of energy and water systems in the US. It uses web services to access public datasets and renders visualizations in the form of customizable maps and tables.</p>
        
        <p>EWED is being developed at California State University Sacramento through a collaboration between faculty and students in the departments of Environmental Studies and Computer Science.</p>
        <p>Funding for EWED is currently provided through a grant from the US EPA Environmental Information Exchange Network.</p>
        
        {/* <p><b>Contact:</b> <a href="mailto:julian.fulton@csus.edu">julian.fulton@csus.edu</a></p> */}
        
        <h2>Background</h2>
        
        <p>The interdependence of energy and water systems is an increasingly important focus in environmental management, and the term “energy-water nexus” has been used to draw attention to these connections. The US electricity sector accounts for the largest share of water use, yet day-to-day electric grid operations are largely driven by reliability, economic, and emissions constraints. For power plants, water resource availability and impacts to natural water systems is increasingly challenged by water scarcity and competing demands. Integrated management of energy and water systems is therefore particularly important in the context of local-to-national environmental management.</p>
        
        <p>Understanding synergies and tradeoffs among different energy and water management options is thus critical, but is hindered by disparate and complex information sources.  Moreover, energy system operators and managers must often make quick decisions in response to environmental or regulatory constraints. Thus, to support better environmental decision making in the energy-water nexus, there is a need to provide information in an integrated and timely manner.</p>
        
        {/* <b>Team</b> */}
        {/* <ul>    
          <li>Julian Fulton</li>
          <li>Ying Jin</li>
        </ul>        
         */}
        
          </div>
          <Button variant="contained" color="primary"onClick={(e)=>{this.props.handleChild(e)}}>Close</Button>
          
        </Modal>
            </div>
        );
    }
}
export default About;