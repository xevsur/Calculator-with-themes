const numbers = document.querySelectorAll('.Regbutton');
const operators = document.querySelectorAll('.operator');
const zero = document.querySelector('.Zero');
const firstDisplay = document.getElementById("res");
const secondDisplay = document.getElementById("lastnum");
const equalButton = document.querySelector(".Equalbutton");
const delButton = document.querySelector(".Delbutton");
const Resetbutton = document.querySelector(".Resetbutton");
const dotButton = document.querySelector(".dotbutton");


let firstNumber = [];
let secondNumber = [];
let preres = '';
let result = '';

delButton.addEventListener("click", function () {
  let currentDisplay = firstDisplay.innerHTML;

  if (currentDisplay.length > 1) {
      currentDisplay = currentDisplay.slice(0, -1);
      firstDisplay.innerHTML = currentDisplay;
      firstNumber = currentDisplay.split("");
  }
  else if (currentDisplay.length < 2){
          firstDisplay.innerHTML = 0 ;
          firstNumber = [];
  }
   else {
      firstNumber = [];
  }
});

dotButton.addEventListener("click", function () {
  const currentDisplay = firstDisplay.innerHTML;
  if (!currentDisplay.includes(".")) {
      if (currentDisplay === "0") {
          firstDisplay.innerHTML = "0.";
          firstNumber = ["0"];
      } else {
          firstDisplay.innerHTML = currentDisplay + ".";
      }
      firstNumber.push(".");
  }
});

numbers.forEach(function (button) {
    button.addEventListener('click', function () {
      
        const numero = button.innerHTML;
        firstNumber.push(numero);

        if(firstNumber.length < 14){
        firstDisplay.innerHTML = firstNumber.join("");
        }
        
    });
});
zero.addEventListener("click", function(){
        const zeroValue = 0;
        if (firstNumber.length > 0 && firstNumber.length < 12){
            firstNumber.push(zeroValue);
            firstDisplay.innerHTML = firstNumber.join("");
        }
        else {
            return false;
        };
});



operators.forEach(function (operator) {
    operator.addEventListener('click', function () {
      
        const oper = operator.innerHTML;

        if (firstNumber.length > 0 && secondNumber.length == 0){
                    switch(oper){
                        case "+":
                            secondNumber.push(...firstNumber,..."+");
                            secondDisplay.innerHTML = secondNumber.join("");
                            firstDisplay.innerHTML = 0 ;
                            firstNumber = [];
                            break;
                        case "-":
                            secondNumber.push(...firstNumber,..."-");
                            secondDisplay.innerHTML = secondNumber.join("");
                            firstDisplay.innerHTML = 0 ;
                            firstNumber = [];
                            break;
                        case "/":
                            secondNumber.push(...firstNumber,..."/");
                            secondDisplay.innerHTML = secondNumber.join("");
                            firstDisplay.innerHTML = 0 ;
                            firstNumber = [];
                            break;
                        case "x":   
                            secondNumber.push(...firstNumber,..."*");
                            secondDisplay.innerHTML = secondNumber.join("");
                            firstDisplay.innerHTML = 0 ;
                            firstNumber = [];
                            break;
                    }
        };
       
        
      });
});

function roundToDecimal(number, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    const roundedNumber = Math.round(number * multiplier) / multiplier;
    return roundedNumber;
  }

function hasRepeatingDecimals(number) {
    const numberString = number.toString();
    const decimalIndex = numberString.indexOf('.');
    
    if (decimalIndex !== -1) {
      const decimalPart = numberString.substring(decimalIndex + 1);
      const regex = /(\d+)(\1+)$/;
      if (regex.test(decimalPart)) {
        const integerPart = numberString.substring(0, decimalIndex);
        const formattedDecimal = `(${decimalPart[0]})`;
        return `${integerPart}.${formattedDecimal}`;
      }
    }
    
    return numberString;
}

function isPeriodic(number) {
    const numberString = number.toString();
    const decimalIndex = numberString.indexOf('.');
    
    if (decimalIndex !== -1) {
      const decimalPart = numberString.substring(decimalIndex + 1);
      const regex = /(\d+)(\1+)$/;
      return regex.test(decimalPart);
    }
    
    return false;
  }

  function excessNumbersBeforePeriod(number) {
    const numberString = number.toString();
    const parts = numberString.split('.');
  
    if (parts[0].replace('-', '').length > 5) {
      return true;
    }
  
    return false;
  }


function isNotExponential(result) {
  const resultString = result.toString();
  return !resultString.includes('e');
}

equalButton.addEventListener("click", function () {
    if (firstNumber.length > 0) {
        preres = secondNumber.join("").concat(firstNumber.join(""));
        result = eval(preres);
         if (!Number.isNaN(result)) {
            if (result.toString().length > 12 && excessNumbersBeforePeriod(result) && !isPeriodic(result) ){
                let exponent = result.toExponential(2);
                firstDisplay.innerHTML = exponent;
            } 
            else if (result.toString().length > 12 && !excessNumbersBeforePeriod(result) && !isPeriodic(result) && !isNotExponential(result)){
                let exponent = result.toExponential(2);
                firstDisplay.innerHTML = exponent;
            }
          
            else if (result.toString().length > 12 && !Number.isInteger(result) && !isPeriodic(result)) {
                    const roundedNumber = roundToDecimal(result, 6);
                    firstDisplay.innerHTML = roundedNumber;
            }
            else if (result.toString().length > 12 && isPeriodic(result)){
                    const periodicNumber = hasRepeatingDecimals(result);
                    firstDisplay.innerHTML = periodicNumber;
            }
            else{
                firstDisplay.innerHTML = result;
            }
        } else {
            firstDisplay.innerHTML = "Error";
        }
      
    

        secondDisplay.innerHTML = 0;
        firstNumber = [];
        firstNumber.push(...firstDisplay.innerHTML)
        secondNumber = [];
        result = '';
        preres = '';
    }
});


Resetbutton.addEventListener("click", function(){
  secondDisplay.innerHTML = 0;
  firstDisplay.innerHTML = 0;
  firstNumber = [];
  secondNumber = [];
  result = '';
  preres = '';
});


function updateStyles(themeValue) {
  document.getElementById("theme1").disabled = true;
  document.getElementById("theme2").disabled = true;
  document.getElementById("theme3").disabled = true;

  document.getElementById(`theme${themeValue}`).disabled = false;
}

updateStyles(1);
const themeSlider = document.getElementById("themeSlider");

themeSlider.addEventListener("input", function () {
  const themeValue = themeSlider.value;
  updateStyles(themeValue);
});

//Hope you like it