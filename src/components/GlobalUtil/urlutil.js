//this is a global method to make changes in the url
// newendpoint will be passed as an argument
export default function urlchange(newendpoint){
    var url = window.location.href;
   
    var path=window.location.pathname;
    if (window.history.pushState) {
    
    if(newendpoint=="/")
    {
        newendpoint="/Historic/ALL%20US/RCP45/AVG45/REF2019/1/2015/12/2015/Water%20Consumption/States/fuelTypes/all"
    }
    var newurl = window.location.protocol + "//" + window.location.host +newendpoint;
    window.history.replaceState({}, document.title, newurl)
    
    
    }
}