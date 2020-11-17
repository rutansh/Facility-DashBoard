
// This is used to set new date format 
export default function dateFormat(start,end){
    var startDate=start;
    var endDate=end;
    var startYear=startDate.split(" ")[3]
    var endYear=endDate.split(" ")[3]
    var mapping={"Jan":"1","Feb":"2","Mar":"3","Apr":"4","May":"5","Jun":"6","Jul":"7","Aug":"8","Sep":"9","Oct":"10","Nov":"11","Dec":"12"};    
    var startMonth=mapping[startDate.split(" ")[1]];
    var endMonth=mapping[endDate.split(" ")[1]];
    // Object created with new dates
    const obj={
        startMonth:startMonth,
        startYear:startYear,
        endMonth:endMonth,
        endYear:endYear
    }
    return obj
    
}