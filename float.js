function floatConvert() {
    setDeafult();
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

      var temp = document.querySelectorAll("#base2");
      for (let i = 0; i < temp.length; i++) {
        temp[i].innerHTML = base2;
      }

      // converting into conventional scientific notation. 
      var base2scien = scien.substr(0, scien.indexOf('e')) + ' × 2^ ';
      var exp = scien.substr(scien.indexOf('e')+1);
      if (exp.indexOf('+') != -1){
          exp = exp.replace('+', '');
      }
      base2scien += parseInt(exp).toString(2) + ' (' + exp +')';

      var temp = document.querySelectorAll("#scien2");
      for (let i = 0; i < temp.length; i++) {
        temp[i].innerHTML = base2scien;
      }

      // sign index 
      var sign;
      if (negStat) sign = 1;
      else sign = 0;

      // writing the exponents 
      var temp = document.querySelectorAll("#exp");
      for (let i = 0; i < temp.length; i++) {
        temp[i].innerHTML = exp;
      }
      // BINARY 16
      var output, bias16, bin16 = ""; 
      bias16 = (15 + parseInt(exp));
      temp = document.querySelectorAll("#bias16");
      for (let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = bias16;
      }
      bias16 = bias16.toString(2);
      var tmp = document.querySelectorAll("#biasBase2");
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].innerHTML = formatBias(bias16, "16");
      }

      document.getElementById("bias16size").innerHTML = bias16.length;
     if (bias16.length > 5 || exp < -14) {
        error16();
      } 
      else {
        document.getElementById("check16").innerHTML = "FITS";
        bin16 += sign + ' | ';
        bin16 += formatBias(bias16, "16") + ' | ';
        bin16 += format(mantissa(base2).substr(0,10));
        temp = document.querySelectorAll("#B16");
        for(let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = bin16;
        }
      }

      // Binary 32
      var bias32, bin32 = "";
      bias32 = (127 + parseInt(exp))
      var temp = document.querySelectorAll("#bias32");
      for (let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = bias32;
      };
      bias32 = bias32.toString(2);
      temp = document.querySelectorAll("#binaryBias32");
      for(let i = 0; i < temp.length; i++) {
        temp[i].innerHTML = formatBias(bias32, "32");
      }
      document.getElementById("bias32size").innerHTML = bias32.length;
      if (bias32.length > 8 || exp < -126) {
        error32();
      } 
      else { 
        document.getElementById("check32").innerHTML = "FITS";
        bin32 += sign + ' | ';
        bin32 += formatBias(bias32, "32") + ' | ';
        bin32 += format(mantissa(base2).substr(0,23));

        temp = document.querySelectorAll("#B32");
        for(let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = bin32;
        }
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
  
        outputVal += parseInt(decVal, base).toString(2);
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
        var res = "", output = "";
        switch (base) {
          case "16": 
            if (strBase2.length <= 5) {
              res += '0'.repeat(5-strBase2.length) + strBase2;
            }
            else res = strBase2;
            res = res.slice(0, 1) + ' ' + res.slice(1);
            break;
          case "32": 
            if (strBase2.length <= 8) {
              res += '0'.repeat(8-strBase2.length) + strBase2;
            }
            else res = strBase2;
            res = res.slice(0, 4) + ' ' + res.slice(4);
            break;
        }
        return res; 
      }

      // handling error for IEEE16
      function error16() {
        document.getElementById("check16").innerHTML = "ERROR";
        document.getElementById("check16").style.color = "red";
        document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[0].style.borderColor = "red";
        temp = document.querySelectorAll("#B16");
        for(let i = 0; i < temp.length; i++) {
          temp[i].style.color = "red";
          temp[i].innerHTML = "ERROR";
        }
      }

      // handling error for IEE32
      function error32() {
        document.getElementById("check32").innerHTML = "ERROR";
        document.getElementById("check32").style.color = "red";
        document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[1].style.borderColor = "red";
        temp = document.querySelectorAll("#B32");
        for(let i = 0; i < temp.length; i++) {
          temp[i].style.color = "red";
          temp[i].innerHTML = "ERROR";
        }
      }

      function setDeafult() {
          document.getElementById("check16").style.color = "black";
          document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[0].style.borderColor = "black";
          document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[1].style.borderColor = "black";
          temp = document.querySelectorAll("#B16");
          for(let i = 0; i < temp.length; i++) {
            temp[i].style.color = "black";
        }       
      }
}