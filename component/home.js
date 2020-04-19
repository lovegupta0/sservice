const mongoose=require("mongoose");
const sql=require("mysql");


const conn=sql.createConnection({
    host: "localhost",
    user: "root",
    password: "6144",
    database: "Streaming_Service",
    insecureAuth : true
});


conn.connect(function(err){
    if(err) throw err;
});

mongoose.connect("mongodb://localhost:27017/Streaming_service",{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

const media=new mongoose.Schema({
  filename:String,
  img:String,
  media_url:String,
  premium_contain:String

});

function getData(val){
  return new Promise((resolve,reject)=>{

    const found=new mongoose.model(val,media);
    var arr=[];
   found.find(function(err,result){
      if(err) throw err;
      else{
      resolve(result);
      }
    });
    
  });
  }




exports.view=async (body,res)=>{
  if(!body.username){
    body={username:body};
  }
  var val=["signup","plan_payment","interest"];
  var profile_data=[];
  for(var i=0;i<3;i++){
 await profile(body,val[i]).then((values)=>{
    profile_data[i]=values;
  });
  
  }
  val=[profile_data[2][0].Action,profile_data[2][0].Comedies,profile_data[2][0].Romantic,profile_data[2][0].Adventure,profile_data[2][0].Musicals,
  profile_data[2][0].Dramas,profile_data[2][0].Documentry,profile_data[2][0].Sci_fi];

  var data=[];
  var title=[];
  for(i=0;i<val.length;i++){
    if(val[i]){
      title.push(val[i].toUpperCase());
      await getData(val[i]).then((values)=>{
        if(values.length>0) { data.push(values);} 
      })
    }
  }  

  res.render("home",{new_item:data,title:title,profile:profile_data[0][0].fname});


  
}




 function profile(body,val){
   return new Promise((resolve,reject)=>{
    
    var get="select *from "+ val+" where email=" + '"'+body.username+'"';
    
   conn.query(get,function(err,result){
      if(err) throw err;
      else{
         resolve(result);
         }
        });
   });
 
}
