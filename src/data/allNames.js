import {Names} from './facilityNames.json';

let keys=new Set();
for(let i=0;i<Names.length;i++)
{
    keys.add(Names[i].toLowerCase());
}
console.log(keys);
export default keys;