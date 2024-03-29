// Created by The Young Programmer aka NemoNet

//Declaring Variables
var count=1, total=0, correct=0, wrong=0, lim=0;
var ans = "", question ="", input="", width= 220, t = '', n1, n2, n3, r1, r2, mode=0;
var opr = [];

//Hide Quiz Body At Start
$(document).ready(function() {
    $("#quizbody").hide();
});

//Selecting Difficulty Level
function level(lvl) {
    if (lvl<5) {
        if (lvl==1){
            opr = ["+", "-"];        
            lim = 5;}
        else if (lvl==2){
            opr = ["+", "-"];        
            lim = 10;}
        else if (lvl==3){
            opr = ["+", "-"];        
            lim = 25;}
        else if (lvl==4){
            opr = ["+", "-", "*"];        
            lim = 50;    }        
    }
    else if (lvl==5) {
        lim = 80;
        opr = ["+", "-", "*", "*"];
    }
    $("#diff").hide();
    $("#quizbody").show();
    if (mode==1) {
        $("#donebtn").hide();
    }
    else {
        $("#donebtn").show();
    }
    quiz();
}

//Generating Questions
function quiz() {
    var len = opr.length;    
    n1 = Math.floor(Math.random() * lim);
    n2 = Math.floor(Math.random() * lim);
    n3 = Math.floor(Math.random() * lim);    
    r1 = opr[Math.floor(Math.random()*len)];
    r2 = opr[Math.floor(Math.random()*len)];    
    question = n1+r1+n2+r2+n3;
    ans = eval(question);
    $("#question").html(question+" = ?");
    t = setInterval(timeCheck, 300);
}

//Checking Answer
function check() {
    var input = $("#answer").val();
    if(input == ans) {
        Swal.fire({
          icon: 'success',
          title: 'Benar',
          text: ans + ' adalah benar.',
          showConfirmButton: false,
          timer: 1000
        });
        correct++;
        $("#correct").html(correct);
    }
    else {
        Swal.fire({
          icon: 'error',
          title: 'Salah',
          text: 'Jawaban yang benar adalah '+ans,
          showConfirmButton: false,
          timer: 1000
        });
        wrong++;
        $("#wrong").html(wrong);
    } 
    $("#answer").val('');
    count++;
    total++;
    $("#no").html(count);
    $("#total").html(total);
    clearInterval(t);
    width = 220;
    bar.style.width = '200px';
    quiz();
}

//Inserting Numbers
function ins(num) {
    var chk = $("#answer").val().includes(".");
    if ($("#answer").val() != '' && num == '-' || num == "." && chk)
    {
      //do nothing  
    }
    
    else {
      $("#answer").val($("#answer").val() + num);
      if (mode==1) {
          if ($("#answer").val() ==ans)
              check();
      }
    }      
}

//Timer
function timeCheck() {
    var bar = document.getElementById("bar");
    if(width == 0) {
        clearInterval(t);
        Swal.fire({
          icon: 'warning',
          title: 'Waktu habis',
          text: 'Jawaban yang benar adalah '+ans,
          showConfirmButton: false,
          timer: 500
        });
        wrong++;
        $("#wrong").html(wrong);
    quiz();
    width = 220;
    bar.style.width = '200px';
    }
    else {
        width--;
        bar.style.width = width+'px';
    }
}

//Other Functions
$(function() {

   //Quick mode
    $("#mode").click(function() {
        if (mode==0) {
            $(this).html("Quick Mode (ON)");
            mode=1;
        }
        else {
            $(this).html("Quick Mode (OFF)");
            mode=0;
        }
    });
    
    //Reseting
    $("#res").click(function() {
        $("#diff").show();
        $("#quizbody").hide();
        count=1, total=0, correct=0, wrong=0, lim=0;
        $("#correct").html(correct);
        $("#wrong").html(wrong);
        $("#total").html(total);
        input.value = "";
        clearInterval(t);
        width = 220;
        bar.style.width = '200px';
    });
    
    //Deleting a number
    $("#del").click(function() {
        var txt = $("#answer").val();
        txt = txt.slice(0, -1);
        $("#answer").val(txt);
    });
   
   //Explaining Quick mode 
    $("#ex").click(function() {
        Swal.fire({
          icon: 'info',
          title: 'Quick Mode',
          text: 'Ketika Quick Mode diaktifkan (ON), sistem langsung mendeteksi jawaban jika benar.',
          showConfirmButton: true,
        });
    });
});
