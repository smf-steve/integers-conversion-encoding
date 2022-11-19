function convert() {
    var rawVal = document.getElementById("floatingInputVal").value;
    var base = rawVal.substr(0,(rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1));
    setNeg(rawVal);
    var num = rawVal.substr((rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1) || rawVal.indexOf("b") + 1,);
    num = num.replace(/ /g, "");
    switch (base) {
        case "2#":
        case "0b":
            if (isBinary(num)) {
                var decVal = parseInt(num, 2);
                ascii(decVal);
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "8#":
        case "0o":
            if (isOctal(num)) {
                var decVal = parseInt(num, 8);
                validInput(decVal);
                ascii(decVal);
            }
            else invalidInput();
            break;
        case "16#":
        case "0x":
            if (isHex(num)) {
                var decVal = parseInt(num, 16);
                ascii(decVal);
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "10#":
        default:
            var decVal = parseInt(num, 10);
            if (Number.isInteger(decVal)) {
                ascii(decVal);
                validInput(decVal);
            }
            else invalidInput();
            break;
    }
}   

function validInput(decimalVal) {

    document.getElementById("floatingBase").value = "2# " + format2_16(decimalVal.toString(2));
    document.getElementById("floatingBaseTen").value = "10# " + decimalVal;
    document.getElementById("floatingBaseEight").value = "8# 0o" + format8(decimalVal.toString(8));
    document.getElementById("floatingBaseS").value = "#16 0x" +format2_16(decimalVal.toString(16));   
}                 
function ascii(decimalVal){
    var hex = decimalVal.toString(16);
    var str = '';
    if (decimalVal < 33 || decimalVal > 254) {
        str = "invalid";
    }
    else {
       for (var n = 0; n < hex.length; n+=2){
            str += String.fromCharCode(parseInt(hex.substr(n, n + 2), 16));
        } 
    } 
    document.getElementById("ascii").value = str;
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

    document.getElementById("ascii").value = "invalid number";
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
function format2_16(strBase2) {
    var formattedStr = "";
    var formattedStr = strBase2.match(/.{1,4}/g);
    formattedStr = formattedStr.join(' ');
    var upperCase = formattedStr.toUpperCase();
    return upperCase;
}
function format8(strBase8) {
    var formattedStr = "";
    var formattedStr = strBase8.match(/.{1,3}/g);
    formattedStr = formattedStr.join(' ');
    return formattedStr;
}

function setNeg(rawVal){
    var sign = false;
    if (rawVal.indexOf('-') > -1)
    {
      sign = true;
    }
}

