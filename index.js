// DOMContentLoaded means when DOM objects are loaded, function() will be invoked
// Whenever page refreshes or is opened, takes user straight to integer conversion
document.addEventListener("DOMContentLoaded", function() {
    window.location.hash = '#integer';
});
let cDec, decNum;
let i, j;
let index, val;

function convert() {
    var rawVal = document.getElementById("floatingInputVal").value;
    rawVal = rawVal.replace(/[-, ]/g, "");
    var base = rawVal.substr(0,(rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1));
    var num = rawVal.substr((rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1),);
    i = -1, j = -1;
    index = 0, val = 0;
    switch (base) {
        case "2#":
        case "0b":
            if (isBinary(num)) {
                var decVal = parseInt(num, 2);
                cDec = decNum = decVal;
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "8#":
        case "0o":
            if (isOctal(num)) {
                var decVal = parseInt(num, 8);
                cDec = decNum = decVal;
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "16#":
        case "0x":
            if (isHex(num)) {
                var decVal = parseInt(num, 16);
                cDec = decNum = decVal;
                validInput(decVal);
            }
            else invalidInput();
            break;
        case "10#":
        default:
            var decVal = parseInt(num, 10);
            if (Number.isInteger(decVal)) {
                cDec = decNum = decVal;
                validInput(decVal);
            }
            else invalidInput();
            break;
    }
}   
function validInput(decimalVal) {
    if (!neg(document.getElementById("floatingInputVal").value)) {
        document.getElementById("floatingBase").value = "2# " + format2_16(decimalVal.toString(2));
        document.getElementById("floatingBaseTen").value = "10# " + decimalVal;
        document.getElementById("floatingBaseEight").value = "8# " + format8(decimalVal.toString(8));
        document.getElementById("floatingBaseS").value = "16# " +format2_16(decimalVal.toString(16)); 
    }
    else {
        document.getElementById("floatingBase").value = "2# -" + format2_16(decimalVal.toString(2));
        document.getElementById("floatingBaseTen").value = "10# -" + decimalVal;
        document.getElementById("floatingBaseEight").value = "8# -" + format8(decimalVal.toString(8));
        document.getElementById("floatingBaseS").value = "16# -" +format2_16(decimalVal.toString(16));
    }
    document.getElementById("onesComplement").value = format2_16(bit16(onesComplement(decimalVal.toString(2))));  
    document.getElementById("ascii").value = ascii(decimalVal); 
    document.getElementById("twosComplement").value = format2_16(bit16(twosComplement(decimalVal)));
    document.getElementById("UnsignedInt").value = unsignedInt(decimalVal);
    document.getElementById("signedInt").value = signedInt(decimalVal);
    document.getElementById("base64").value = base64(decimalVal);
}                 
function ascii(decimalVal){
    var hex = decimalVal.toString(16);
    var str = '';
    var cur = '';
    for (var n = 0; n < hex.length; n+=2){
         cur = hex.substr(n, 2);
         if (parseInt(cur, 16) < 32 || parseInt(cur, 16) > 126) {
             return "invalid";
         }
         if(parseInt(cur, 16) == 32){
            return "\"space\"";
         } else {
         cur = String.fromCharCode(parseInt(cur, 16));
         console.log(cur);
         str += cur;
         console.log(str);
        }
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
    document.getElementById("onesComplement").value = "invalid number";
    document.getElementById("twosComplement").value = "invalid number";
    document.getElementById("UnsignedInt").value = "invalid number";
    document.getElementById("signedInt").value = "invalid number";
    document.getElementById("base64").value="invalid number";
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
    var reg = /^[0-9A-F]{1,}$/i; // range of valid hex numbers 
    if (numVal.match(reg)){
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
function neg(rawVal){
    var sign = false;
    if (rawVal.indexOf('-') > -1)
    {
      sign = true;
    }
    return sign;
}
function onesComplement(binVal) {
    var str = "";
    if (!neg(document.getElementById("floatingInputVal").value)) {
        str = binVal;
        return str;
    }
    else {
        for (let i = 0; i < binVal.length; i++) {
            if (binVal[i] == 0) {
              str += "1";
            }
            else str += "0";
        }   
        return str;
    }
}
function twosComplement(decVal) {
    var one = onesComplement(decVal.toString(2)); 
    var two = "", temp = "";
    if (neg(document.getElementById("floatingInputVal").value)) {
        two = (parseInt(one, 2) + 1).toString(2);
        if (one.length != two.length) {
           for (let i = 0; i < (one.length - two.length); i++) {
                temp += "0";
            }
        }
        temp += two;
        return temp;
    }
    return one;
}
function bit16(binVal) {
    var negStat = neg(document.getElementById("floatingInputVal").value);
    var str = "";
    for (let i = 0; i < 16 - binVal.length; i++) {
        if (negStat){
            str += '1';
        } 
        else str += '0';
    }
    str += binVal;
  return str;
}
function signedInt(decVal){
    var str = "";
    if (neg(document.getElementById("floatingInputVal").value)){
        str = '-' + decVal;
    }
    else str = decVal;
    return str;
}
function unsignedInt(decVal) {
    var str = "";
    if (!neg(document.getElementById("floatingInputVal").value)) {
        return decVal;
    }
    else {
        str += bit16(twosComplement(decVal));
        return parseInt(str, 2);
    }

}
var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function base64(decVal){
    // get the remainder when divided by 64 and appends the char to the result
    var result = '', mod;
    do {
        mod = decVal % 64;
        result = ALPHA.charAt(mod) + result;
        decVal = Math.floor(decVal / 64);
    } while(decVal > 0);
    return result;
}

function stepBy(){
    if(i == -1){
        document.getElementById("stepOne").innerHTML = `${cDec} / 2 = ${Math.floor(cDec/2)} , ${cDec%2}`;
        cDec = Math.floor(cDec/2);  
        i++;  
    }
    else if (i == 0){
        toBinary(cDec);
        cDec = Math.floor(cDec/2);
    }
}
function toBinary(n){
    document.getElementById("stepOne").innerHTML += `<br> ${n} / 2 = ${Math.floor(n/2)} , ${n%2}`;
    if(n == 0){
        i++;
    }
}

function stepDec(){
    decNum = decNum.toString(2);
    if (j == -1) {
        document.getElementById("divStep").innerHTML = `${val} * 2 + ${decNum.charAt(index)} = ${val*2+parseInt(decNum.charAt(index))}`;
        val = (val*2+parseInt(decNum.charAt(index)));
        index++, j++;
    }
    else if (index < decNum.length && j == 0) {
        toDecimal(decNum); 
    }
}

function toDecimal(binNum) {
    document.getElementById("divStep").innerHTML += `<br> ${val} * 2 + ${binNum.charAt(index)} = ${val*2+parseInt(binNum.charAt(index))}`;
    val = val*2+parseInt(binNum.charAt(index));

    if (index == binNum.length - 1) {
        j++;
    }
    else{ 
        index++;
    }
}

//String.format('{0} / 2 = {0} , {0}', n, Math.floor(n/2), n%2);
// "<br>" + val + " * 2 + " + binNum.charAt(index) + " = " + (val*2+parseInt(binNum.charAt(index)));