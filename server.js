const express=require("express");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.route("/")
    .get(function(req,res){
    res.sendFile(__dirname+"/"+"index.html");
    })
    .post(function(req,res){
    console.log(req.body);
    
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
    console.log(req.body);
    res.sendFile(__dirname+"/congo.html");
    
});







