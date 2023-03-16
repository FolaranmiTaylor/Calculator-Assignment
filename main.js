const numbers=document.querySelectorAll('[data-num]');
const operators=document.querySelectorAll('[data-opr]');
const allClear=document.querySelector('[data-clr]');
const numDelete=document.querySelector('[data-del]');
const equal=document.querySelector('[data-eql]');
const dispPrev=document.querySelector('[data-prev]');
const dispCurr=document.querySelector('[data-curr]');

var i=0;
var j=undefined;
var k=undefined;
var l=undefined;

class Calculator {
    constructor(dispPrev,dispCurr){
        this.dispPrev=dispPrev;
        this.dispCurr=dispCurr;
        this.allClear();
    }
 
    allClear(){
        this.prev='';
        this.curr='';
        this.operation='';
    }

    delete(){
        this.curr=this.curr.toString().slice(0,-1);
    }

    assignNumber(numb){
        if(this.dispPrev.innerText!=="" && this.curr=="-" && numb!==""){
            this.curr=this.curr.toString().slice(1,-1);
          }
        
        if(numb=="." && this.curr.includes(".")){
            return;
        }
        if(this.dispCurr.innerText[0]=="0" && numb!="."){
            this.curr=this.curr.toString().slice(1,0);
        }
        else if(this.dispCurr.innerText[0]=="0" && numb=="."){
            this.curr=this.curr.toString().slice(1,0);
        }
        else if(this.dispCurr.innerText=="=Error" && numb!==""){
            this.curr=this.curr.toString().slice(1,0);
        }
        else if(this.dispCurr.innerText=="=NaN" && numb!==""){
            this.curr=this.curr.toString().slice(3,0);
        }
        else if(this.dispCurr.innerText[0]=="0" && numb!==""){
            this.curr=this.curr.toString().slice(1,0);
        }
        else if(this.dispCurr.innerText[0]=="-" && this.dispCurr.innerText[1]=="0" && numb!=="."){
            this.curr=this.curr.replace("0","");
        }
        this.curr=this.curr.toString()+numb.toString();
        
    }

    chooseOperation(operation){
              if(this.dispCurr.innerText=="" && operation=="-"){
            this.curr="-"
            return;
        }
        if(this.dispPrev.innerText!=="" && this.curr=="-" && operation!==""){
            this.curr=this.curr.toString().slice(1,-1);
            return;
        }
        if(this.dispCurr.innerText=="=Error" && operation!==""){
            this.curr=this.curr.toString().slice(1,0);
            return;
        }
        
        if(this.curr==''){
            return;
        }
        
        if(this.prev!=='' && operation!=="%"){
            this.compute();
        }
        else if(this.prev!=='' && this.dispPrev.innerText.includes("+") && operation==="%"){
            this.operation="/100";
            k=this.dispPrev.innerText;
            l=k.slice(0,-1);
            this.curr=eval(l+""+this.operation+""+"*"+this.curr);
            this.operation='+';
        }
        else if(this.prev!=='' && this.dispPrev.innerText.includes("-") && operation==="%"){
            this.operation="/100";
            k=this.dispPrev.innerText;
            l=k.slice(0,-1);
            this.curr=eval(l+""+this.operation+""+"*"+this.curr);
            this.operation='-';
        }
        else if(this.prev!=='' && this.dispPrev.innerText.includes("*") && operation==="%"){
            this.operation="/100";
            this.curr=eval(this.curr+""+this.operation);
            this.operation='*';
        }
        else if(this.prev!=='' && this.dispPrev.innerText.includes("/") && operation==="%"){
            this.operation="/100";
            this.curr=eval(this.curr+""+this.operation);
            this.operation='/';
        }
        
        if(operation!=="%"){
            this.operation=operation;
            this.prev=this.curr;
            this.curr='';
        }
        else if(operation==="%" && this.prev==''){
            this.operation="/100";
            
            j=this.curr;
            this.curr=eval(j+""+this.operation);
            this.prev='';
            this.operation='';
        }

    }

    compute(){
        this.curr=eval(this.prev+""+this.operation+""+this.curr);
        if(this.curr=="Infinity"){
            this.curr="Error";
        }
        else if(this.curr=="-Infinity"){
            this.curr="Error";
        }
        else if(this.curr=="NaN"){
            this.curr="Error";
        }
        this.prev='';
        this.operation='';

    }

    updateDisplay(){
        if(i>0){
            i=i-1;
            this.dispCurr.innerText="="+this.curr;
        }else{
            this.dispCurr.innerText=this.curr;
        }
        if(this.operation!=null){
        this.opr=this.operation;
        this.dispPrev.innerText=this.prev+this.opr;
        }
    }
}

const calculator=new Calculator(dispPrev,dispCurr);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.assignNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operators.forEach(button => {
    button.addEventListener('click', () => {
        
        if(button.innerText=="÷"){
            calculator.chooseOperation("/");
        }
        else{
            calculator.chooseOperation(button.innerText);
        }
        
        calculator.updateDisplay();
    })
})


allClear.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
})

equal.addEventListener('click', () => {
    i=i+1;
    calculator.compute();
    calculator.updateDisplay();
})

numDelete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener('keydown', Event => {
    console.log('Key Down',Keyboardevent.keyCode);
    if(Keyboardevent.keyCode==49){
        calculator.assignNumber("1");
    }
    else if(Keyboardevent.keyCode==50){
        calculator.assignNumber("2");
    }
    else if(Keyboardevent.keyCode==51){
        calculator.assignNumber("3");
    }
    else if(Keyboardevent.keyCode==52){
        calculator.assignNumber("4");
    }
    else if(Keyboardevent.keyCode==53){
        calculator.assignNumber("5");
    }
    else if(Keyboardevent.keyCode==54){
        calculator.assignNumber("6");
    }
    else if(Keyboardevent.keyCode==55){
        calculator.assignNumber("7");
    }
    else if(Keyboardevent.keyCode==56){
        calculator.assignNumber("8");
    }
    else if(Keyboardevent.keyCode==57){
        calculator.assignNumber("9");
    }
    else if(Keyboardevent.keyCode==48){
        calculator.assignNumber("0");
    }
    else if(Keyboardevent.keyCode==190){
        calculator.assignNumber(".");
    }
    else if(Keyboardevent.keyCode==8){
        calculator.delete();
    }
    else if(Keyboardevent.keyCode==191){
        calculator.chooseOperation("/");
    }
    else if(Keyboardevent.keyCode==88){
        calculator.chooseOperation("*");
    }
    else if(Keyboardevent.keyCode==187){
        calculator.chooseOperation("+");
    }
    else if(Keyboardevent.keyCode==189){
        calculator.chooseOperation("-");;
    }
    else if(Keyboardevent.keyCode==13){
        calculator.compute();
        i=i+1;
    }
    else if(Keyboardevent.keyCode==27){
        calculator.allClear();
    }
    calculator.updateDisplay();
});