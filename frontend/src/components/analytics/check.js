import csvToJson from "./data.js";
var data = await csvToJson()
console.log(data.data);