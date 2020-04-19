const md5=require("md5");
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
    else{
        console.log("connection successfully started...");
        
    }
});

function insertion(body,res){
     var insert="INSERT INTO signup VALUES(?)";
     var data=[body.fname,body.lname,body.email,md5(body.password),body.mobile,body.DOB
     ];
    
     
     conn.query(insert, [data], function (err, result ){
        if (err) throw err;
        
        else{
            plan_payment(body,res);
        }
      });

     
}

function plan_payment(body,res){
    var insert="INSERT INTO plan_payment VALUES(?)";
    var data=[body.email,body.plan,body.cardname,body.cardnumber,body.expdate,body.cvv];
    conn.query(insert, [data], function (err){
        if (err){
            del_rec(body);
            console.log(err);
            
        }

        else{
            interest(body,res);
        }
        
      });
}

function interest(body,res){
    var insert="INSERT INTO interest VALUES(?)";
    var data=[body.email,body.action,body.comedies,body.romantic,body.adventure,body.musicals,body.dramas,body.documentry,body.scifi];
    conn.query(insert, [data], function (err){
        if (err){
            del_rec(body);
            console.log(err);
        }

        else{
             res.sendFile(__dirname+"/congo.html");
            console.log("Number of records inserted successfully......");
        }
        
      });

}

function del_rec(body){
    var del="delete from signup where email=" + '"'+body.email+'"';
    conn.query(del,function(err){
        if(err) throw err;
    })

}


exports.response= function (body,res,cookies){
    if(body.fname){
        insertion(body,res)
    }
    else{
     login(body,res,cookies);
        
    }
}

async function login(body,res,cookies){
    var login="select *from signup where email=" + '"'+body.username+'"';

   await conn.query(login,function(err,result){
        if(err) throw err;
        else{
            if(result.length>0){
                var pass=md5(body.password);
                if(pass===result[0].password){

                    if(body.rememberme){
                        var d=new Date();
                        d=new Date(d).valueOf()+7* 24 * 60 * 60 * 1000;
                        var date=new Date(d);
                        cookies.set("streaming_service",body.username,{expires:date, signed: true });
                    }

                    if(body.username==="admin@admin.com"){
                        res.redirect("/admin");
                    }
                    else{
                        res.redirect("/home");
                    }
                    
                }
            }
        }
        
        
    })
}