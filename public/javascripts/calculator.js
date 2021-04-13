
const input1=document.getElementById("num1")
const input2=document.getElementById("num2")
const out=document.getElementById("side")
const btn=document.getElementById("formbtn")
const form=document.getElementById("form")
input1.addEventListener('input', updateValue1);
input2.addEventListener('input',updateValue2);
let val1=null
let val2=null
function updateValue1(e) {
  val1= e.target.value;
  tryToGenerate(val1,val2)
}
function updateValue2(e){
    val2=e.target.value;
    tryToGenerate(val1,val2);
}


//input1.addEventListener("input",tryToGenerate)
function generatePrimativeTriangle(g,h){
    tempG=g
    tempH=h
    while(tempG!=0 && tempH!=0){
        if(tempG>tempH){
            tempG%=tempH
        }else{
            tempH%=tempG
        }
    }
    if(Math.max(tempG,tempH)==1){
        if(g%2==0){
            return generateTriangle(g,h)
        }else{
            return generateTriangle(h,g)
        }
    }
    else{
        return false
    }
}

function generateTriangle(g,h){
    let a=h*(2*g+h)
    let b=2*g*(g+h)
    let c=2*g*g+2*g*h+h*h
    
    return (`side a: ${a} side b: ${b} side c: ${c}`)
}

function tryToGenerate(){
    if(val1!=null && val1!="" && val2!=null && val2!="" && isNumeric(parseInt(val1)) && isNumeric(parseInt(val2))){
    var g = val1;
    var h=val2;
    g=parseInt(g)
    h=parseInt(h)
    console.log("hi")
    let validInput=generatePrimativeTriangle(g,h);
    if(validInput){
        console.log("validInput")
        out.style.backgroundColor="lightgreen"
        out.value = `${validInput}`;
        out.disabled=false
        btn.disabled=false
        
    }
    else{
        out.style.backgroundColor="red"
        out.value=  "not valid input"
        btn.disabled=true
    }
    }
    
}
function isNumeric(input){
    if(typeof input==="number"){
      return true;
    }
    else {
      return false;
    }
  }
