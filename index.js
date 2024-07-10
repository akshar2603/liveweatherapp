 const http =  require("http") ;
const fs = require("fs") ;

var requests = require('requests');

const homeFile = fs.readFileSync("home.html" , "utf-8") ;
const replaceVal = (tempVal , orgVal) => {
    // console.log(typeof orgVal.temp); 
    // console.log(tempVal) ;
    let temperature  = tempVal.replace(`{%temp%}`, orgVal.temp);
    temperature = temperature.replace("{%maxtemp%}", orgVal.maxtemp);
    temperature  = temperature.replace("{%mintemp%}", orgVal.mintemp);
    temperature  = temperature.replace("{%location%}", orgVal.location);
    temperature  = temperature.replace("{%country%}", orgVal.county);
//    console.log(temperature) ;
    return temperature;
};


 const server = http.createServer((req, res) =>{
    if(req.url == '/'){
        requests('http://localhost:3001/data')
        .on('data',  (chunk) => {
          //console.log(chunk);
            const objData = JSON.parse(chunk);
            const arrData = [objData] ;
            // console.log(arrData[0].location) ;
            const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("") ;
            // console.log(realTimeData);
            res.write(realTimeData);
        })
        .on('end', function (err) {
          if (err) return console.log('connection closed due to errors', err);
          res.end() ;
        });
} 
 }) ;

 server.listen(8000,"127.0.0.1" , ()=>{
    console.log("listening to the port no 8000") ;
});
 

// 'https://jsonplaceholder.typicode.com/posts';

