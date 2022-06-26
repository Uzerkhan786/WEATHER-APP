const { response } = require("express");
const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const https = require("https");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {

    res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){

    const city=req.body.city_name;
    const id="f1c44d2fd7546c698aff4ceee0a99e84";
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q= "+city+" &appid="+id+"&units="+unit;
    https.get(url, function (response) {
        response.on("data", function (data) {

            const weatherapi = JSON.parse(data);

            const tempe =weatherapi.main.temp;
            const des = weatherapi.weather[0].description;
            const image = weatherapi.weather[0].icon;

            res.write( "<h1> The temperature in "  +city+ " is "  + tempe + " celcius  </h1>");
            res.write("<p>The clouds are " + des + "</p> ");
            res.send();

        })
    })
})




app.listen(process.env.PORT || 3000, function () {
    console.log("function");
})