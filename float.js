function floatConvert() {
    setDeafult();
    // getting input value 
    var inVal = document.getElementById("inp").value;
    var base2 = "", scien = "", tempOutputs = "";
    var baseVal = inVal.substr(0, inVal.indexOf('#')+1);
    inVal = inVal.substr(inVal.indexOf('#')+1);

    // setting the negative status 
    var negStat = false; 
    if (inVal.indexOf('-') != -1) negStat = true;

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
      // document.getElementById("base2").innerHTML = base2;
      var temp = document.querySelectorAll("#base2");
      // if (base2.length <= 16) {
      //   temp[0].innerHTML = format(base2);
      //   temp[1].innerHTML = format(base2);
      // }
      // else if (base2.length <= 32) {
      //   temp[1].innerHTML = format(base2);
      //   limit16();
      // }
      // else limit16(), limit32();
      if (base2.length > 32) {
        limit();
      }
      else {
        for (let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = format(base2);
        }
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
      temp = document.querySelectorAll("#sign");
      for (let i = 0; i < temp.length; i++) {
        temp[i].innerHTML = sign;
      }
      // document.getElementById("signOutput16").innerHTML = sign + " | x xxxx | xxxx xxxx xx";

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
      tempOutputs = formatBias(bias16, "16");
      var tmp = document.querySelectorAll("#biasBase2");
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].innerHTML = tempOutputs;
      }
      // document.getElementById("expOutput16").innerHTML = "x | " + tempOutputs + " | xxxx xxxx xx";


      document.getElementById("bias16size").innerHTML = bias16.length;
      tempOutputs = format(mantissa(base2).substr(0,10));
      // document.getElementById("mantissa16").innerHTML = tempOutputs;
      // document.getElementById("manOut16").innerHTML = "x | x xxxx | " + tempOutputs;
     if (bias16.length > 5 || exp < -14) {
        error16();
      } 
      else {
        document.getElementById("check16").innerHTML = "FITS";
        bin16 += sign + ' | ';
        bin16 += formatBias(bias16, "16") + ' | ';
        bin16 += tempOutputs;
        temp = document.querySelectorAll("#B16");
        for(let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = bin16;
        }
        document.getElementById("out16").value = bin16;
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
        document.getElementById("out32").value = bin32;
      }


    function baseConvert(inputVal, base) {   
      inputVal = inputVal.replace(" ", '');
        var outputVal = "", outputFloat = "", i = 0, counter=0, decVal, floatVal;
        
        if (inputVal != "") {
          if (inputVal.indexOf('.') == -1) {
            decVal = inputVal;
            floatVal = "0".repeat(4);
          }
          else {
            decVal = inputVal.substr(0, inputVal.indexOf('.'));
            floatVal = inputVal.substr(inputVal.indexOf('.')+ 1);

            if (decVal != "" && floatVal != "") {
              if (floatVal.charAt(0) == 0) {
                    while (floatVal.charAt(i) == 0 && i < floatVal.length) {
                      counter++;
                      i++;
                    }
                  }
            }
          }
          outputVal += parseInt(decVal, base).toString(2);
          outputVal += '.';
          outputVal += '0'.repeat(4*counter); 
          for (let i = counter; i < floatVal.length; i++) {
            outputFloat += format(parseInt(floatVal.charAt(i), base).toString(2));
          }
          // outputVal += outputFloat;
          // outputVal += format8(outputFloat);
          // switch (base) {            
          //   case 8:
          //     alert(format8(outputFloat));
          //     outputVal += format8(outputFloat);
          //     break;
    
          //   case 16:
          //     outputVal += format(outputFloat);
          //     break; 
    
          //   default: 
          //     outputVal += format(outputFloat);
          //     break; 
          // }
          if (base == 8) {
            outputVal += format8(outputFloat);
          }
          else outputVal += outputFloat;
        }
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
      // function format(strBase2) {
      //   // return strBase2.match(/.{1,4}/g).join(' ');
      //   var formattedStr = "";
      //   var zeroes = Math.ceil(strBase2.length / 4) * 4 - strBase2.length;

      //   formattedStr += '0'.repeat(zeroes) + strBase2;      
      //   formattedStr = formattedStr.match(/.{1,4}/g).join(' ');
      
      //   return formattedStr.toUpperCase();
      // }
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

      // handling the formating for the fractional  part in conversion of the bases
      function format8(strBase8) {
        var formattedStr = "";
        if (strBase8.length <= 3) {
          formattedStr += '0'.repeat(3 - strBase8.length) + strBase8;
        }
        else {
          var zeroes = Math.ceil(strBase8.length / 3) * 3 - strBase8.length;
          formattedStr += '0'.repeat(zeroes) + strBase8;
        }
        formattedStr = formattedStr.match(/.{1,3}/g).join(' ');
        return formattedStr.toUpperCase();
      }

      // handling error for IEEE16
      function error16() {
        document.getElementById("check16").innerHTML = "ERROR";
        document.getElementById("check16").style.color = "red";
        document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[0].style.borderColor = "red";
        // document.getElementById("signOutput16").innerHTML = "ERROR";
        // document.getElementById("signOutput16").style.color = "red";
        // document.getElementById("expOutput16").innerHTML = "ERROR";
        // document.getElementById("expOutput16").style.color = "red";
        // document.getElementById("manOut16").innerHTML = "ERROR";
        // document.getElementById("manOut16").style.color = "red";
        temp = document.querySelectorAll("#B16");
        for(let i = 0; i < temp.length; i++) {
          temp[i].style.color = "red";
          temp[i].innerHTML = "ERROR";
        }
        document.getElementById("out16").value = "ERROR";
        document.getElementById("out16").style.color = "red";
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
        document.getElementById("out32").value = "ERROR";
        document.getElementById("out32").style.color = "red";
      }

      function setDeafult() {
          document.getElementById("check16").style.color = "black";
          document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[0].style.borderColor = "black";
          document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[1].style.borderColor = "black";
          temp = document.querySelectorAll("#B16");
          for(let i = 0; i < temp.length; i++) {
            temp[i].style.color = "black";
          }    

          document.getElementById("out16").style.color = "black";
          document.getElementById("out32").style.color = "black";
          
          document.getElementById("check32").style.color = "black";
          document.getElementsByClassName("container border-weight pt-2 px-2 lineheight")[1].style.borderColor = "black";
          temp = document.querySelectorAll("#B32");
          for(let i = 0; i < temp.length; i++) {
            temp[i].style.color = "black";
          }
      }

      function limit() {
        temp = document.querySelectorAll("#base2");
        for (let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = "limit exceeded";
        }
      }
}