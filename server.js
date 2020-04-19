const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const multer=require("multer");
const path=require("path");
const app=express();
const mysql=require("./component/signup.js");
const mongo=require("./component/admin");
const home=require("./component/home");
const session=require("express-session");
const passport=require("passport");
const Cookies=require("cookies");

var val;
var keys=["hello world"];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine",'ejs');

var storage=multer.diskStorage({
    destination:"./public/upload/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  })
  
  var upload=multer({
    storage:storage
  });


app.route("/")
    .get( function(req,res){
    
    var cookies = new Cookies(req,res, { keys: keys });
    var x=cookies.get("streaming_service");
    if(x && x!=="null"){
      if(x==="admin@admin.com"){
        res.redirect("/admin");
      }
      else{
      val=x;
      res.redirect("/home");
      }
      
    }
    else{
      res.sendFile(__dirname+"/"+"index.html");
    }
    
    })
    .post(function(req,res){
      var cookies = new Cookies(req,res, { keys: keys });
    mysql.response(req.body,res,cookies);
    val=req.body;
    remember=req.body.rememberme;
    
});

app.listen(3500,function(){
    console.log("server started on part 3500.........");
});



app.get("/index.html",function(req,res){
  var cookies = new Cookies(req,res, { keys: keys });
  cookies.set("streaming_service",["null"],{overwrite:true,signed: true});
    res.redirect("/");
});

app.route("/form.html")
    .get(function(req,res){
    res.sendFile(__dirname+"/"+"form.html");
    })

    .post(function(req,res){
    mysql.response(req.body,res);
    val=req.body;
   
    
});


app.route("/admin")
    .get((req,res)=>{
        res.render("admin",{success:null,profile:"admin"});
    })
    .post(upload.single("img"),(req,res)=>{
        mongo.upload(req,res);
    });

app.route("/home")
    .get((req,res)=>{
       home.view(val,res);
        
    
    });