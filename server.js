const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const multer=require("multer");
const path=require("path");
const app=express();
const mysql=require("./component/signup.js");
const mongo=require("./component/admin");

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
    .get(function(req,res){
    res.sendFile(__dirname+"/"+"index.html");
    })
    .post(function(req,res){
    mysql.response(req.body,res);
    
});

app.listen(3500,function(){
    console.log("server started on part 3500.........");
});



app.get("/index.html",function(req,res){
    res.redirect("/");
});

app.route("/form.html")
    .get(function(req,res){
    res.sendFile(__dirname+"/"+"form.html");
    })

    .post(function(req,res){
    mysql.response(req.body,res);
   
    
});


app.route("/admin")
    .get((req,res)=>{
        res.render("admin");
    })
    .post(upload.single("img"),(req,res)=>{
        mongo.upload(req);
    });