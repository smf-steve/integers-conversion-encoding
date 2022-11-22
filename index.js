// DOMContentLoaded means when DOM objects are loaded, function() will be invoked
// Whenever page refreshes or is opened, takes user straight to integer conversion
document.addEventListener("DOMContentLoaded", function() {
    window.location.hash = '#integer';
});
let cDec;
let i = -1;
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
            cDec = decVal;
            if (Number.isInteger(decVal)) {
                validInput(decVal);
            }
            else invalidInput();
            break;
    }
    if (isASCII(num)) {
        var decVal = parseInt(num, 16);
        if (Number.isInteger(decVal)) {
            validInput(decVal);
        }
    } else invalidInput();

}   

function validInput(decimalVal) {
    document.getElementById("floatingBase").value = "2# " + format2_16(decimalVal.toString(2));
    document.getElementById("floatingBaseTen").value = "10# " + decimalVal;
    document.getElementById("floatingBaseEight").value = "8# 0o" + format8(decimalVal.toString(8));
    document.getElementById("floatingBaseS").value = "#16 0x" +format2_16(decimalVal.toString(16));   

        
    document.getElementById("ascii").value = ascii(decimalVal);
  
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
// function isASCII(numVal){
//     var range = /[\x00-\x7F]/g;
//     if (numVal.match(range)){
//         return true;
//     }
//     else return false;
// }
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
function stepBy(){
    if(Number.isInteger(cDec) && i == -1){
        document.getElementById("stepOne").innerHTML = cDec + " / 2 = " + Math.floor(cDec/2) + ", " + cDec%2;
        cDec = Math.floor(cDec/2);  
        i++;  
    }
    else if (Number.isInteger(cDec) && i == 0){
        toBinary(cDec);
        cDec = Math.floor(cDec/2);
    }
}
function toBinary(n){
    if(n == 0 && i == 0){
        document.getElementById("stepOne").innerHTML += "<br>" + (n + " / 2 = " + Math.floor(n/2) + ", " + n%2);
        i++;
       // return String(n);
        //document.getElementById("stepOne").innerHTML += String(n);
    }
    else if(i==0){
    document.getElementById("stepOne").innerHTML += "<br>" + n + " / 2 = " + Math.floor(n/2) + ", " + n%2;
    }//return toBinary(Math.floor(n/2)) + String(n % 2);
        // let t = toBinary(n/2);
    // let x = n % 2;
    // return t.toString() + x.toString();
    console.log(n + " / 2 = " + Math.floor(n/2) + ", " + n%2);
};
//console.log(toBinary(5));

/*
public String toBinary(int n){
    if(n <= 1){
        return String.valueOf(n);
    }
    return toBinary(n/2) + String.valueOf(n % 2);
}
*/

