import React from "react";
import Button from "@material-ui/core/Button";
import MarkerContext from './Context/markerContext';
class BackComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
        this.arrayForParent=[]
    }
    render(){
        return(
            <div>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ width: "200px", height: "40px" }}
                  onClick={() => {
                    // If prev state is all us then will update the view by button
                    if (this.props.prevState.length > 0) {
                      debugger
                      if (
                        this.props.prevState
                          .toLowerCase()
                          .includes("all us")
                      ) {
                        localStorage.setItem("activeTab","1");
                        this.props.backformHandler(this.arrayForParent);
                      } 
                      
                      // If prev state is some state region then will update the view by button
                      else {
                        this.arrayForParent[0] = this.props.prevState.toLowerCase();
                        this.props.backformHandler3(this.arrayForParent);
                        this.props.setmarkerId(-1);
                        this.props.setmarkerData(null);

                    }
                    }
                  }}
                >
                  ← Up to {this.props.prevState} View
                </Button>
            </div>
            );
    }   
}




export default (props) => {
    return (

            <MarkerContext.Consumer>
            {
              (context1)=>{
                return <BackComponent {...props}{...context1} />;
              }
            }
            </MarkerContext.Consumer>
          )
  };