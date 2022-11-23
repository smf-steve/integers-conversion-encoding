function convert() {
    var rawVal = document.getElementById("floatingInputVal").value;
    rawVal = rawVal.replace(/[-, ]/g, "");
    var base = rawVal.substr(0,(rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1));
    var num = rawVal.substr((rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1),);
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
}                 
function ascii(decimalVal){
    var hex = decimalVal.toString(16);
    var str = '';
    var cur = '';
    for (var n = 0; n < hex.length; n+=2){
         cur = hex.substr(n, 2);
         if (parseInt(cur, 16) < 33 || parseInt(cur, 16) > 254) {
             return "inalid";
         }
         cur = String.fromCharCode(parseInt(cur, 16));
         str += cur;
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