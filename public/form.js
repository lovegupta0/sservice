
var plan=0;

$("#plan").hide();
$("#submit").hide();
$("#prev1").hide();
$("#next2").hide();
$("#payment").hide();
$("#next3").hide();
$("#prev2").hide();
$("#interest").hide();
$("#prev3").hide();

function nxt1(){
    var fname=document.getElementById("fname").value;
    var lname=document.getElementById("lname").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var c_password=document.getElementById("c_password").value;
    var mobile=document.getElementById("mobile").value;
    var DOB=document.getElementById("DOB").value;
    if(fname=="" || lname=="" || email=="" || password=="" || c_password=="" || mobile=="" || DOB==""){
        alert("All field mandatory");
    }
    else{
  $("#prev1").show();
  $("#plan").show();
  $("#form").hide();
  $("#next1").hide();
  $("#next2").show();
    }
};

function pre1(){
  $("#prev1").hide();
  $("#plan").hide();
  $("#form").show();
  $("#next1").show();
  $("#next2").hide();
}

function plan0(){
  plan=0;

}
function plan199(){
  plan=199;
}
function plan499(){
  plan=499;
}


function nxt2(){
  if(plan!=0){
  $("#prev1").hide();
$("#next2").hide();
$("#payment").show();
$("#plan").hide();
$("#next3").show();
$("#prev2").show();
document.getElementById("next3").innerHTML="Pay"+" "+plan;
  }
  else{
    $("#interest").show();
$("#prev2").hide();
$("#next3").hide();
$("#submit").show();
$("#payment").hide();
$("#plan").hide();
$("#prev1").hide();
$("#next2").hide();
  }

}

function pre2(){
$("#prev1").show();
$("#next2").show();
$("#payment").hide();
$("#plan").show();
$("#next3").hide();
$("#prev2").hide();
}

function nxt3(){
$("#interest").show();
$("#prev2").hide();
$("#next3").hide();
$("#submit").show();
$("#payment").hide();

}

function op1(){
    var password=  document.getElementById("password").value;
    var c_password=document.getElementById("c_password").value;
    
    if(password!=c_password){
        $("#password").addClass("is-invalid");
        $("#c_password").addClass("is-invalid");
        $("#password").removeClass("mb-3");
        $("#c_password").removeClass("mb-3");
        
    }
   else if(password=="" || c_password==""){
    $("#password").addClass("is-invalid");
    $("#c_password").addClass("is-invalid");
   }
    else{
        $("#password").removeClass("is-invalid");
        $("#c_password").removeClass("is-invalid");
        $("#password").addClass("is-valid");
        $("#c_password").addClass("is-valid");
        $("#password").addClass("mb-3");
        $("#c_password").addClass("mb-3");
    }
}

