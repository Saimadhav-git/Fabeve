const express=require("express");
const bodyParser=require("body-parser");

const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
res.render("home");
});
app.get("/Contact",function(req,res){
  res.render("Contact");
});
app.get("/CusSignin",function(req,res){
  res.render("CusSignin");
});
app.get("/CusLogin",function(req,res){
  res.render("CusLogin");
});
app.get("/OrgSignup",function(req,res){
  res.render("OrgSignup");
});
app.get("/:post",function(req,res){
  var x=req.params.post;
  console.log(x);
});

app.listen(process.env.PORT ||3000,function(){
  console.log("Server is running in port 3000");

});
app.post("/CusLogin",function(req,res){
  var loginId=req.body.cid;
  var email=req.body.cmail;
  var password=req.body.cpw;
  var data={
    members:[
        {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:loginId,
        LNAME:password
        }
      }
  ]
    };

  var jsonData=JSON.stringify(data);
  const url="https://us4.api.mailchimp.com/3.0/lists/eb1f1f9f3c";
  const options={
    method:"POSt",
    auth:"madhav:18577bb75f6d82773ce1593ed13d77e6-us4"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);
  request.end();

});
app.post("/CusSignin",function(req,res){
  var userKey=req.body.cid;
  var userName=req.body.cname;
  var email=req.body.cmail;
  var phoneNo=req.body.cphno;
  var dateOfBirth=req.body.cdob;
  var gender=req.body.cgen;
  var cityId=req.body.cityid;

  var data={
    members:[
        {
      email_address:email,
      status:"subscribed",
      id:cityId,
      birthday:dateOfBirth,
      text:gender,
      merge_fields:{
        FNAME:userKey,
        LNAME:userName,
        PHONE:phoneNo
        }
      }
  ]
    };

  var jsonData=JSON.stringify(data);
  const url="https://us4.api.mailchimp.com/3.0/lists/eb1f1f9f3c";
  const options={
    method:"POSt",
    auth:"madhav:18577bb75f6d82773ce1593ed13d77e6-us4"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);
  request.end();

});
app.post("/OrgSignup",function(req,res){
  var name=req.body.oname;
  var userId=req.body.hid;
  var email=req.body.omail;
  var phoneNo=req.body.ophno;
  var data={
    members:[
        {
    email_address:email,
      status:"subscribed",
      id:userId,
      merge_fields:{
        FNAME:name,
        PHONE:phoneNo
        }
      }
  ]
    };

  var jsonData=JSON.stringify(data);
  const url="https://us4.api.mailchimp.com/3.0/lists/eb1f1f9f3c";
  const options={
    method:"POSt",
    auth:"madhav:18577bb75f6d82773ce1593ed13d77e6-us4"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);
  request.end();

});
//--data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \


//api key
//18577bb75f6d82773ce1593ed13d77e6-us4
//list id
//eb1f1f9f3c
