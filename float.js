function floatConvert() {
    // getting input value 
    var inVal = document.getElementById("inp").value;
    var base2 = "", scien = "";
    baseVal = inVal.substr(0, inVal.indexOf('#')+1);
    inVal = inVal.substr(inVal.indexOf('#')+1);

    // setting the negative status 
    var negStat; 
    if (inVal.indexOf('-') != -1) negStat = true;
    else negStat = false; 

    // getting rid of the minus sign from inval 
    inVal = inVal.replace('-', '');

    // convert to scientific form and find the base2 string 
    switch (baseVal) {
        // temp stores the base2 string. 
        case "2#":
        case "0b":
          base2 = inVal;
          scien = parseFloat(base2).toExponential();
          break;
        
        case "8#":
        case "0o":
          base2 = baseConvert(inVal, 8);
          scien = parseFloat(base2).toExponential();
          break;
        
        case "16#":
        case "0x":
          base2 = baseConvert(inVal, 16);
          scien = parseFloat(base2).toExponential();
          break;

        case "10#": 
        default: 
          base2 = parseFloat(inVal).toString(2); 
          scien = parseFloat(base2).toExponential();
      }

      document.getElementById("2base16").innerHTML = base2;
      document.getElementById("2base32").innerHTML = base2;

      // converting into conventional scientific notation. 
      var base2scien = scien.substr(0, scien.indexOf('e')) + ' X 2^ ';
      var exp = scien.substr(scien.indexOf('e')+1);
      base2scien += parseInt(exp).toString(2) + ' (' + exp +')';

      document.getElementById("2scien16").innerHTML = base2scien;
      document.getElementById("2scien32").innerHTML = base2scien;

      // sign index 
      var sign;
      if (negStat) sign = 1;
      else sign = 0;

      // writing the exponents 
      document.getElementById("exp16").innerHTML = exp;
      document.getElementById("exp32").innerHTML = exp;

      // BINARY 16
      var output, bias16, bin16 = ""; 
      bias16 = (15 + parseInt(exp));
      document.getElementById("bias16").innerHTML = bias16; // write bias 
      document.getElementById("bias16-2").innerHTML = bias16;
      bias16 = bias16.toString(2);
      document.getElementById("2bias16").innerHTML = bias16; // write bias in base2
      document.getElementById("2bias16-2").innerHTML = bias16;

      document.getElementById("bias16size").innerHTML = bias16.length;
     if (bias16.length > 5 || exp < -14) {
        document.getElementById("check16").innerHTML = "error";
      } 
      else {
        document.getElementById("check16").innerHTML = "FITS";
        bin16 += sign + ' | ';
        bin16 += formatBias(bias16, "16") + ' | ';
        bin16 += format(mantissa(base2).substr(0,10));
        document.getElementById("B16").innerHTML = bin16;
        document.getElementById("bin16-2").innerHTML = bin16;
      }

      // Binary 32
      var bias32, bin32 = "";
      bias32 = (127 + parseInt(exp))
      document.getElementById("bias32").innerHTML = bias32; // write bias 
      document.getElementById("bias32-2").innerHTML = bias32;
      bias32 = bias32.toString(2);
      document.getElementById("2bias32").innerHTML = bias32; // write bias in base2
      document.getElementById("2bias32-2").innerHTML = bias32;

      document.getElementById("bias32size").innerHTML = bias32.length;
      if (bias32.length > 8 || exp < -126) {
        document.getElementById("check32").innerHTML = "error";
      } 
      else { 
        document.getElementById("check32").innerHTML = "FITS";
        bin32 += sign + ' | ';
        bin32 += formatBias(bias32, "32") + ' | ';
        bin32 += format(mantissa(base2).substr(0,23));
        document.getElementById("B32").innerHTML = bin32;
        document.getElementById("bin32-2").innerHTML = bin32;
      }


    function baseConvert(inputVal, base) {
        var outputVal = "", outputFloat = "", i = 0, counter=0;
  
        var decVal = inputVal.substr(0, inputVal.indexOf('.'));
        var floatVal = inputVal.substr(inputVal.indexOf('.')+ 1);
  
        if (floatVal.charAt(0) == 0) {
          while (floatVal.charAt(i) == 0) {
            counter++;
            i++;
          }
        }
  
        outputVal += format(parseInt(decVal, base).toString(2));
        outputVal += '.';
        outputVal += '0'.repeat(4*counter);
        for (let i = counter; i < floatVal.length; i++) {
          outputFloat += format(parseInt(floatVal.charAt(i), base).toString(2));
        }
        outputVal += outputFloat;
        return outputVal;
      }
  
      // calculating the mantissa 
      function mantissa(strBase2) {
        var res = strBase2.replace('.', '');
        if (res.indexOf(1) === res.length - 1) {
            res += '0'.repeat(25);
        }
        res = res.substr(res.indexOf(1) + 1);
        return res;
      }
  
      // breaking into 4 chunks 
      function format(strBase2) {
        return strBase2.match(/.{1,4}/g).join(' ');
      }
  
      // formatting the expoenent in value system
      function formatBias(strBase2, base){
        var res = "";
        switch (base) {
          case "16": 
            if (strBase2.length <= 5) {
              res += '0'.repeat(5-strBase2.length) + strBase2;
            }
  
            res = res.slice(0, 1) + ' ' + res.slice(1);
            break;
          case "32": 
            if (strBase2.length <= 8) {
              res += '0'.repeat(8-strBase2.length) + strBase2;
            }
            res = res.slice(0, 4) + ' ' + res.slice(4);
            break;
        }
        return res; 
      }
}