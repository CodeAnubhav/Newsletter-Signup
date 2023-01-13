//jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");
// const request = require("request");
const https = require("https");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

mailchimp.setConfig({
    apiKey: "0b5a45fb367c96ed7dac726aca9bcea7-us21",  
    server: "us21",
});


app.post("/", function(req, res){
   const firstName = req.body.fName;
    const lastName = req.body.lastName; 
    const email = req.body.email;
    console.log(firstName, lastName, email);

    const subscribingUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    }
    const run = async () => {
       const response = await mailchimp.lists.addListMember("92dcb00bbf", {
       email_address: subscribingUser.email,
       status: "subscribed",
       merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
        }
        
      });

    if (response.status === 200){
        res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
    console.log(response);
}
    run();
      
});

app.listen(process.env.PORT, function (){
    console.log("server is running on port 3000");
})


// api key
// 0b5a45fb367c96ed7dac726aca9bcea7-us21

//List id
// 92dcb00bbf



   
    // const data = {
    //     members:[
    //         {
    //             email:Email,
    //             detail:"subscribed",
    //             merge_fields:{
    //                 FNAME:firstName,
    //                 LNAME:lastName
    //             }
    //         }
    //     ]
    // }   


    // const jsondata = JSON.stringify(data);
    // const url = "https://us21.api.mailchimp.com/3.0/lists/92dcb00bbf/members/";

    // const Options ={
    //     method: "POST",
    //     auth:"raj1:0b5a45fb367c96ed7dac726aca9bcea7-us21" 
    // }


    // https.request(url , Options , function(response){
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     })
    // })

    // request.write(jsondata);
    // request.end();
  