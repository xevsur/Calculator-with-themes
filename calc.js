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


const slider = document.getElementById("themeSlider");
const root = document.documentElement;

slider.addEventListener("input", () => {
  switch (slider.value) {
    case "1":
      root.style.setProperty("--bg-color", "#3A4663");
      root.style.setProperty("--text-color", "hsl(0, 0%, 100%)");
      root.style.setProperty("--shadow-color", "#B3A497");
      root.style.setProperty("--regButBg-color", "hsl(30, 25%, 89%)");
      root.style.setProperty("--regBut-color", "hsl(221, 14%, 31%)");
      root.style.setProperty("--keyBoardbg-color", "#242D44");
      root.style.setProperty("--sliderThumb-color", "#D03F2F");
      root.style.setProperty("--sliderBg-color", "#242D44");
      root.style.setProperty("--ResDelbg-color", "#647198");
      root.style.setProperty("--ResDelShadow-color", "#414E73");
      root.style.setProperty("--EqualBg-color", "#D03F2F");
      root.style.setProperty("--EqualShadow-color", "#93261A");
      root.style.setProperty("--displayBg-color", "#181F33");
      root.style.setProperty("--upperText-color", "white");
      break;
    case "2":
      root.style.setProperty("--bg-color", "#E6E6E6");
      root.style.setProperty("--text-color", "hsl(0, 0%, 100%)");
      root.style.setProperty("--shadow-color", "#A79E91");
      root.style.setProperty("--regButBg-color", "#E5E4E1");
      root.style.setProperty("--regBut-color", "#36362C");
      root.style.setProperty("--keyBoardbg-color", "#D2CDCD");
      root.style.setProperty("--sliderThumb-color", "#C85402");
      root.style.setProperty("--sliderBg-color", "#D2CDCD");
      root.style.setProperty("--ResDelbg-color", "#378187");
      root.style.setProperty("--ResDelShadow-color", "#1B6066");
      root.style.setProperty("--EqualBg-color", "#C85402");
      root.style.setProperty("--EqualShadow-color", "#873901");
      root.style.setProperty("--displayBg-color", "#EEEEEE");
      root.style.setProperty("--upperText-color", "#36362C");
      break;
    case "3":
      root.style.setProperty("--bg-color", "#17062A");
      root.style.setProperty("--text-color", "#FFE53D");
      root.style.setProperty("--shadow-color", "#881C9E");
      root.style.setProperty("--regButBg-color", "#331C4D");
      root.style.setProperty("--regBut-color", "#FFE53D");
      root.style.setProperty("--keyBoardbg-color", "#1E0936");
      root.style.setProperty("--sliderThumb-color", "#00DED0");
      root.style.setProperty("--sliderBg-color", "#1E0936");
      root.style.setProperty("--ResDelbg-color", "#56077C");
      root.style.setProperty("--ResDelShadow-color", "#BE15F4");
      root.style.setProperty("--EqualBg-color", "#00DED0");
      root.style.setProperty("--EqualShadow-color", "#6CF9F1");
      root.style.setProperty("--displayBg-color", "#1E0936");
      root.style.setProperty("--upperText-color", "#FFE53D");
      break;
    default:
      break;
  }
});

//Hope you like it