const express=require("Express")
const https=require("https")
const BP=require("body-parser")
const app=express()
app.use(BP.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})
app.post('/',function (req,res) {
const city=req.body.cityName;
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=fdbde990b2dc7c8ea2bd1ddbaef3d013&units=metric";
https.get(url,function (responce) {
    console.log(responce.statusCode);

    responce.on('data',function (data) {
        var info=JSON.parse(data);
        const temp=info.main.temp;
        const description=info.weather[0].description;
        const icon=info.weather[0].icon;
        iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        
        res.write("<h1>Current temperature of "+city+" is"+temp+"</h1>");
        res.write("<h1>Weather is "+description+"</h1>");
        res.write("<img src="+iconURL+">");
        res.send();
    })
})
})









app.listen(3000,function (req,res){
    console.log("Server is open at port 3000");
})