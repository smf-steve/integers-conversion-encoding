function convert() {
    var rawVal = document.getElementById("floatingInputVal").value;
    var base = rawVal.substr(0,(rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1));
    var num = rawVal.substr((rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1) || rawVal.indexOf("b") + 1,);
    num = num.replace(/ /g, "");
    switch (base) {
        case "2#":
        case "0b":
            if (isBinary(num)) {
                var decVal = parseInt(num, 2);
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "8#":
        case "0o":
            if (isOctal(num)) {
                var decVal = parseInt(num, 8);
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "16#":
        case "0x":
            if (isHex(num)) {
                var decVal = parseInt(num, 16);
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "10#":
        default:
            var decVal = parseInt(num, 10);
            if (Number.isInteger(decVal)) {
                validInput(decVal);
            }
            else invalidInput();
            break;
    }
    document.getElementById("ascii").value = ascii(decVal);
}   

function validInput(decimalVal) {
    document.getElementById("floatingBase").value = decimalVal.toString(2);
    document.getElementById("floatingBaseTen").value = decimalVal;
    document.getElementById("floatingBaseEight").value = decimalVal.toString(8);
    document.getElementById("floatingBaseS").value = decimalVal.toString(16); 
}
function ascii(decimalVal){
    var hex = decimalVal.toString(16);
    var str = '';
    for (var n = 0; n < hex.length; n+=2){
        str += String.fromCharCode(parseInt(hex.substr(n, n + 2), 16));
    }
    return str;
}

function isBinary(dec){
    for(let i = 0; i < dec.length; i++){
        if(dec[i] != 0 && dec[i] != 1)
            return false;
    }
    return true;
}
                 
function invalidInput() {
    document.getElementById("floatingBase").value = "invalid number";
    document.getElementById("floatingBaseEight").value = "invalid number";
    document.getElementById("floatingBaseTen").value = "invalid number";
    document.getElementById("floatingBaseS").value = "invalid number";
}
function isBinary(numVal) {
    for (let i = 0; i < numVal.length; i++) {
        if (numVal[i] != 0 && numVal[i] != 1) {
            return false; 
        }
    }
    return true;
}
function isOctal(numVal) {
      for (let i = 0; i < numVal.length; i++) {
        if (numVal[i] > 7 || isNaN(numVal[i])){
          return false;
        }
      }
      return true;
  }                 

       
function isHex(numVal) {
    var check = /[a-fA-F0-9]/g;
    if (numVal.match(check)) {
        return true;
    }
    else return false;
}
