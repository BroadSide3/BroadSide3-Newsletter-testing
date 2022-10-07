const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const path = require('path');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const https = require("https");
const {request} = require("express");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/signup.html'));
});

app.post('/', (req, res) => {

    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email_name;

    // let response = {
    //     //     first_name: req.body.first_name,
    //     //     last_name: req.body.last_name,
    //     //     email_name: req.body.email_name
    //     // };
    //     // console.log(response);
    //     // res.send(JSON.stringify(response));

    let data = {
        members: [
            {
            email_address: email,
            status: "Subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAMEL: lastName
            }
        }]
    };

    let jsonData = JSON.stringify(data);

    const url = "***";

    const options = {
        method: "POST",
        auth: "***"
    }

    const request = https.request(url, options, function (response){

        let success = 200;
        if(response.statusCode === success){
            console.log("Success")
        } else {
            res.sendFile(path.join(__dirname, '/failure.html'));
        }

        response.on("data",function (data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





mailchimp.setConfig({
    apiKey: '***',
    server: '***',
});

async function callPing() {
    const response = await mailchimp.ping.get();
    console.log(response);
}

callPing();