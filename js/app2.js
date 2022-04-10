//helper functions 
//helper fuction to support evaluate function 
function evalHelper (str){
    for (var i = 0 ; i< str.length ; i++){
        if (str.charAt(i)== "%"){
            var temp = str.substring(0,i); 
            var operatorIndex = Math.max(temp.lastIndexOf("+"), temp.lastIndexOf("-"), temp.lastIndexOf("*"), temp.lastIndexOf("/"));
            var equivalantValue = parseFloat(str.substring(operatorIndex+1,i))/100;  
            str = str.substring(0,operatorIndex+1)+equivalantValue+str.slice(i+1)
  
        }
    }
    return str;
}

//helper dunction to adjust appearance 
function modifyDisplayScreenApperance(){
    var eqnDisplayesScreen = document.getElementById("storedEnteredValues"); 
var replaceToAddMultiplicationMark = eqnDisplayesScreen.innerHTML.replace(/[*]/g,"<span>&#215;</span>"); 
eqnDisplayesScreen.innerHTML = replaceToAddMultiplicationMark ;

var replaceToAddDivisionMark = eqnDisplayesScreen.textContent.replace(/[/]/g,"<span>&#247;</span>")
eqnDisplayesScreen.innerHTML = replaceToAddDivisionMark ;

}
//////////////////////////////////////////////////////////////////
// global variables 
var userEnteredButtons = document.querySelector("#userinterfacelist"); 
var calculatorDisplayStatus = document.getElementById("virtualElment1"); 


var eqn = ""; 
var localResult = 0 ; 
var numOfEqnElements = 0 ; 

var myEvent = new Event("localResultChanged"); 

function EditViewedOutput(){

    document.getElementById("storedEnteredValues").innerHTML = eqn; 
  
    if (localResult == Infinity){
        document.getElementById("currentEnteredValues").innerHTML = "";
    }else if (localResult != 0){
        document.getElementById("currentEnteredValues").innerHTML = localResult;
    }
    else{
        document.getElementById("currentEnteredValues").innerHTML = "";
    }
    modifyDisplayScreenApperance(); 

}


function createFunction(str){
    var assignValue  = str.charAt(str.length-1);
    var assignOperator = str.charAt(0);

    if(!(isNaN(assignValue)) || str=="dot." ||  str == "doubleZero"){
        
        if ( str == "doubleZero"){
            if (isFinite(eqn.charAt(eqn.length-1)) && eqn !=""){
                assignValue = "00"; 
            }else{return "escape"; }
        }
        if (eqn.charAt(eqn.length-1) == "%" ){
            assignValue =`*${assignValue}`
        }
        eqn += assignValue ;
        
        
        if (numOfEqnElements == 1 ){
            if (!(eqn.charAt(eqn.length-1)==".")){
                // localResult = eval(eqn); 
                localResult=eval(evalHelper(eqn));
                localResult=parseFloat(localResult.toFixed(5));
            }else{
                eqn += "0";
                localResult=eval(evalHelper(eqn));
                localResult=parseFloat(localResult.toFixed(5));
            }
        }
        console.log(eqn);
        console.log(localResult); 
    }
    else if (assignOperator=="o" && (eqn.endsWith("+") || eqn.endsWith("-") || eqn.endsWith("*") || eqn.endsWith("/")) && eqn.length!=1){
       
        eqn = eqn.substring(0,eqn.length-1);
        eqn += assignValue;
       
    }

    else if ((assignValue=="+"|| assignValue=="*"|| assignValue=="/") && eqn != "" && eqn.charAt(eqn.length-1)!="+"  && eqn.charAt(eqn.length-1)!="-"  && eqn.charAt(eqn.length-1)!="*"  && eqn.charAt(eqn.length-1)!="/" ){
        
        eqn += assignValue; 
        numOfEqnElements=1;
        console.log(eqn);
        
    }else if (assignValue=="-" && eqn == ""){
        
        eqn += assignValue; 
        console.log(eqn);
    }
}

function equal(){
    if(localResult == Infinity){
        alert("can't divide by zero"); 
    }else{
        eqn = localResult.toString();  
        localResult = null; 
        numOfEqnElements = 0 ; 
    }
}
function clearAll(){
    eqn = ""; 
    localResult = null; 
    numOfEqnElements = 0 ;
    console.log("3amalt clear all ea pro "); 
}

function backspace(){
    
    eqn = eqn.substring(0,eqn.length-1); 
    console.log(eqn);
    if ((!(isNaN(eqn.charAt(eqn.length-1))))|| (eqn.charAt(eqn.length-1)==".") || eqn.charAt(eqn.length-1)=="%"){

        if(eqn.charAt(eqn.length-1)=="."){
            eqn = eqn.substring(0,eqn.length);
        }
       

        if(eqn.charAt(eqn.length-1)=="%"){
            console.log(eqn);
            localResult=eval(evalHelper(eqn));
            localResult=parseFloat(localResult.toFixed(5));
        }
        // numOfEqnElements = 1 ; 
        if (eqn == ""){
            localResult = 0 ; 
            
        }else if (eqn.includes("*")|| eqn.includes("/") ||eqn.includes("+") ||eqn.includes("-") ){
            // localResult = eval(eqn);
            localResult=eval(evalHelper(eqn));
            localResult=parseFloat(localResult.toFixed(5));
           
        }
        else{
            numOfEqnElements = 0 ; 
            localResult = null;
            
        }
    }else{
       
        console.log(eqn.substring(0,eqn.length-1));
        localResult = "";
    }
}

function precentage(){
    if (isNaN(eqn.charAt(eqn.length-1)) || eqn ==""){
        alert("incorrect format"); 
    }else{
        console.log(eqn);
        var indexOfOperator = Math.max(eqn.lastIndexOf("+"), eqn.lastIndexOf("-"), eqn.lastIndexOf("*"), eqn.lastIndexOf("/"));  
        var temp = eqn.substring(0,indexOfOperator+1)+ parseFloat(eqn.slice(indexOfOperator+1))/100 ;
        console.log(temp);
        localResult=eval(evalHelper(temp));
        localResult=parseFloat(localResult.toFixed(5));
        eqn += "%"; 

    }
}


function operations(str){
    var assignValue  = str.charAt(str.length-1);
    var assignOperator = str.charAt(0); 
    if (!(isNaN(assignValue)) || assignOperator == "o" || str == "dot." || str == "doubleZero" ){
        console.log("enter secoundstage");
        createFunction(str);  
    }else if (str=="equal"){
        equal(); 
    }else if (str =="clearAll"){
        clearAll(); 
    }else if (str=="backspace"){
        backspace();
    }else if (str=="precentage"){
        precentage(); 
    }
    calculatorDisplayStatus.dispatchEvent(myEvent);
}

function modifystyle(evt){
   
    var idValue = evt.target.id; 
    document.getElementById(idValue).classList.add("pressedButton");
}
function ignoreModifystyle(evt){
    var idValue = evt.target.id; 
    document.getElementById(idValue).classList.remove("pressedButton");
}

function clickEvent(evt){
    console.log("pressed");
    evt.preventDefault(); 
    
    var returnedvalue= evt.target.id;
    console.log(returnedvalue);
    operations(returnedvalue); 
}



userEnteredButtons.addEventListener('click', clickEvent); 

userEnteredButtons.addEventListener("mousedown", modifystyle);
userEnteredButtons.addEventListener("mouseup", ignoreModifystyle);

calculatorDisplayStatus.addEventListener("localResultChanged",EditViewedOutput); 





