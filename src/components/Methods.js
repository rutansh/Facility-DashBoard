import React from 'react';
import Modal from "react-modal";
import Button from '@material-ui/core/Button';
class Methods extends React.Component{
    render(){
        console.log("This is Methods");
        return(
            <div>
                <Modal
        className="methods-modal-header"
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
          <h2>Methods and Data</h2>

<b>Power Plants</b>
<p>EWED’s basic unit of analysis is the power plant. There are around 9,000 grid-connected power plants larger than 1 megawatt (MW) in the United States, according to the Energy Information Administration (EIA).  EWED obtains general information on these power plants — name, location, state, and reference IDs —  through the Environmental Protection Agency’s (EPA) Facility Registry Service (FRS) web service [1].  Location (latitude, longitude) values are used to plot power plants on the EWED user interface map as well as to locate within county [8] and watershed [9] regions.  States are assigned directly from FRS.</p>

<b>Electricity Generation</b>
<p>The FRS field PrgmSysID corresponds to EIA Plant code, and is used to generate a query of EIA’s API [2] for power plant monthly electricity generation (megawatt-hours, MWh) by fuel type and prime mover.  This query occurs on the first of every month to capture recent power plant activity.</p>

<b>Power Plant Type</b>
<p>Power plants may have multiple generators using different fuels, e.g. natural gas and coal, and different prime movers, e.g. steam and gas turbine.  Plant type in EWED is determined by the dominant fuel type over a given calendar year of generation and may therefore change from year to year. Plant types are aggregated to fuel type (removing prime mover distinctions) for the purpose of assigning water use coefficients (see below) and for filtering by fuel type in the user interface.</p>

<b>Emissions</b>
<p>EPA collects greenhouse gas (GHG) emissions data from power plants larger than 25 MW through the Greenhouse Gas Reporting Program and makes these data available through the EnviroFacts web service [3]. EWED queries yearly emissions of carbon dioxide (CO2), nitrous oxide (N2O), and methane (CH4), and aggregates those values using the unit metric tons of CO2 equivalent (mtCO2e). EWED then creates yearly coefficients of mtCO2e-per-MWh of generation for each power plant, which are then multiplied by monthly generation (MWh) to give monthly emissions values. For years not covered by EPA’s GHG data, monthly generation is multiplied by the nearest available year for which an emissions coefficient has been created.</p>

<b>Water Use</b>
<p>EIA provides data containing monthly cooling water withdrawal and consumption volumes for larger (>100MW) thermoelectric power plants. These data are self-reported by power plant operators through EIA forms 860 and 923, and are made available in summary format for years 2014-2018 [4].  For these years, EWED reports monthly water withdrawal and consumption at the power plant level in million gallons. For years not covered by these EIA data, EWED calculates yearly coefficients (gallons-per-megawatt-hour) for the closest year for which data exist for that power plant. For power plants not covered by EIA data at all — smaller thermoelectric and non-thermoelectric, non-hydroelectric power plants — EWED uses plant type (see above) to reference water withdrawal and consumption coefficients from a recent US-scale inventory published by Sanders and Grubert [5]. For hydropower plants, we use region-specific coefficients of net-evaporative and seepage losses provided by Grubert [6]. Water withdrawal and consumption coefficients are multiplied by monthly generation, resulting in monthly water use values (million gallons) for all power plants in all months.</p>

<b>Water Availability</b>
<p>EWED displays monthly water availability (million gallons) for each watershed (HUC8 “sub-basin”) using data provided by the US Forest Service Water Supply Stress Index Model (WaSSI) [7]. The WaSSI model was run using historic PRISM data for years 2003-2015 and the variable FLWOUT is used to indicate water availability in EWED.  WaSSI is expected to include updated PRISM data in the near future, and EWED will be updated accordingly. For projected EWED data (next section), the WaSSI model was run using its 20 available general circulation models from the Coupled Model Intercomparison Project Phase 5 (CMIP5), as well as its two Representative Concentration Pathways (RCP), as described by Duan et al [7].</p>

<b>Projected Data</b>
<p>EWED projections of generation, emissions, and water use are based on the EIA’s 2019 Annual Energy Outlook (AEO) [10]. The AEO provides yearly projections of generation by fuel type and from 2020 to 2050 under eight different energy market scenarios. AEO 2019 spatially disaggregates these projections by Electric Market Module regions, which correspond to North American Electric Reliability Corporation (NERC) and Independent System Operator (ISO) regions. Each EWED facility was assigned to an EMM region using GIS software and was assumed to continue generating through the projection period (i.e. no new or retired facilities).  Projected generation by fuel type within each EMM from AEO was allocated to the existing fleet of plants (regardless of capacity) based on each plant’s percent-contribution to total generation for each fuel type-EMM combination in EWED’s most recent year of actual generation (in version 2.0 this is 2018).  These yearly generation values are further disaggregated to monthly generation based on the monthly contribution of each fuel type-EMM generation to its yearly total in the most recent year.  The resulting projections of monthly,  plant-level generation are reported as well as multiplied by that plant’s most recent coefficient for emissions, water withdrawal and water consumption (following the methods above).</p>

<br/>
<b>Sources:</b>

<ol>
  <li>US Environmental Protection Agency, Facility Registry Service, https://www.epa.gov/frs/frs-data-resources</li>
  <li>Energy Information Administration (EIA), API,  https://www.eia.gov/opendata/qb.php?category=1017</li>
  <li>US Environmental Protection Agency (EPA), Greenhouse Gas Reporting Program, https://www.epa.gov/enviro/greenhouse-gas-restful-data-service</li>
  <li>Energy Information Administration (EIA) Thermoelectric cooling water data https://www.eia.gov/electricity/data/water/</li>
  <li>Grubert, E., Sanders, K. T. (2018). Water Use in the United States Energy System: A National Assessment and Unit Process Inventory of Water Consumption and Withdrawals. Environmental Science and Technology, 52(11), 6695–6703. https://doi.org/10.1021/acs.est.8b00139 </li>
  <li>Grubert, E. A. (2016). Water consumption from hydroelectricity in the United States. Advances in Water Resources, 96, 88–94. https://doi.org/10.1016/j.advwatres.2016.07.004 </li>
  <li>Duan, K., Caldwell, P. V., Sun, G., McNulty, S. G., Zhang, Y., Shuster, E., … Bolstad, P. V. (2019). Understanding the role of regional water connectivity in mitigating climate change impacts on surface water supply stress in the United States. Journal of Hydrology, 570(January), 80–95. https://doi.org/10.1016/j.jhydrol.2019.01.011 </li>
  <li>US Census Bureau (USCB), TIGER/Lines Shapefiles, 2018 County (and equivalents). https://www.census.gov/cgi-bin/geo/shapefiles/index.php</li>
  <li>US Forest Service (USFS), WaSSI Ecosystem Services Model, Hydrologic Units Dataset. https://map.wassiweb.fs.usda.gov/help/huc8_wassiweb.zip  </li>
  <li>Energy Information Administration (EIA), Annual Energy Outlook 2019, https://www.eia.gov/outlooks/archive/aeo19/</li>
</ol>

            <Button variant="contained" color="primary"onClick={(e)=>{this.props.handleChild(e)}}>Close</Button>
          </div>

          
          
        </Modal>
            </div>
        );
    }
}
export default Methods;