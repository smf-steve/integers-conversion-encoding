const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
// const scene = new THREE.Scene();
// const canvas = document.querySelector('#bg');
// const body = document.querySelector('body');
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//   canvas,
// });

// camera.aspect = window.innerWidth / window.innerHeight;
// camera.updateProjectionMatrix();
// renderer.setSize(window.innerWidth, window.innerHeight);

// // body.style.width = window.innerWidth + 'px';
// // body.style.height = window.innerHeight + 'px';
// window.addEventListener('resize', () => {
//     const canvasWidth = canvas.clientWidth;
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// //     canvas.width = window.innerWidth;
// // canvas.height = window.innerHeight;
// // body.style.width = window.innerWidth + 'px';
// // body.style.height = window.innerHeight + 'px';
// console.log(window.innerWidth + ", " + window.innerHeight);
//     if (window.innerWidth < 600) {
//        // camera.position.setZ(30);
//         camera.position.setX(-17);
//       //  camera.position.setY(8);
//       } else {
//         camera.position.setZ(30);
//         camera.position.setX(-30);
//         camera.position.setY(10);
//       }
//   });

// renderer.setClearColor(0x000000, 0);


// renderer.setPixelRatio(window.devicePixelRatio);
// //renderer.setSize(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);

// camera.position.setZ(30);
// camera.position.setX(-25);
// camera.position.setY(8);

// renderer.render(scene, camera);

// const worldTexture = new THREE.TextureLoader().load('img/binary-world.jpg');

// const world = new THREE.Mesh(
//   new THREE.SphereGeometry(15, 32, 32),
//   new THREE.MeshBasicMaterial({
//     map: worldTexture,
//   })
// );

// scene.add(world);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// // Helpers

// // const lightHelper = new THREE.PointLightHelper(pointLight)
// // const gridHelper = new THREE.GridHelper(200, 50);
// // scene.add(lightHelper, gridHelper)
// const colors = [
//     new THREE.Color(1, 0, 0),   // red
//     new THREE.Color(1, 0.5, 0), // orange
//     new THREE.Color(1, 1, 0),   // yellow
//     new THREE.Color(0, 1, 0),   // green
//     new THREE.Color(0, 0, 1),   // blue
//     new THREE.Color(0.5, 0, 1), // indigo
//     new THREE.Color(1, 0, 1),   // violet
//   ];
  
//   const originalColor = new THREE.Color(1, 1, 1); // white
//   const duration = 10; // 10 seconds
//   let time = 0;
//   let delta = 0;
//   const clock = new THREE.Clock();
  
// // Animation Loop
// world.rotation.z = 0.5;
// function animate() {
//   requestAnimationFrame(animate);
//     // Update color
//     const t = (time % duration) / duration; // normalize time between 0 and 1
//     const index1 = Math.floor(t * colors.length);
//     const index2 = (index1 + 1) % colors.length;
//     const color1 = colors[index1];
//     const color2 = colors[index2];
//     const mixAmount = (t * colors.length) % 1;
//     const currentColor = new THREE.Color().lerpColors(color1, color2, mixAmount);
  
//     world.material.color = currentColor;
  
//     time += delta;
  
//     // reset animation
//     if (time >= duration) {
//       time = 0;
//     }
//     delta = clock.getDelta();

//   world.rotation.y += 0.005;
//   //world.rotation.z += 0.001;
//   renderer.render(scene, camera);
// }
  

// animate();
// Get the buttons and bits text element
const btn8 = document.getElementById("btn-8");
const btn16 = document.getElementById("btn-16");
const btn32 = document.getElementById("btn-32");
const bitsText = document.querySelector(".bits-text");

// Add click event listeners to the buttons
btn8.addEventListener("click", function() {
  toggleActiveBtn(btn8);
  bitsText.textContent = "8 Bits";
});
btn16.addEventListener("click", function() {
  toggleActiveBtn(btn16);
  bitsText.textContent = "16 Bits";
});
btn32.addEventListener("click", function() {
  toggleActiveBtn(btn32);
  bitsText.textContent = "32 Bits";
});

// Function to toggle the active class on the buttons
function toggleActiveBtn(btn) {
  btn.classList.add("active");
  const otherBtns = document.querySelectorAll(".btn-group-toggle .btn:not(#" + btn.id + ")");
  otherBtns.forEach(function(otherBtn) {
    otherBtn.classList.remove("active");
  });
}

// DOMContentLoaded means when DOM objects are loaded, function() will be invoked
// document.addEventListener("DOMContentLoaded", function() {
//    // console.log(window.visualViewport.width);
//     var text = "Integer Conversion and Encoding";
//     function typeText(text, i){
//         if(i < text.length){
//             document.querySelector('#head').innerHTML = text.substring(0, i+1) 
//             + '<span aria-hidden="true"></span>';
//             setTimeout(function() {
//                 typeText(text, i + 1)
//             }, 130);
//         }else{
//             setTimeout(function(){}, 200);
//         }
//     }
//     typeText(text, 0);
// });

let fractional;
let precision = 15; // how many times to convert fractional bit
let isFloat = false;
let currnStep, currentStep, decimalValue;
let binaryStr;
let binaryVal, ele;
let binaryValue;
let element = document.getElementById("conversionSteps");
let decArr = '';
let strOut = [];
let count = 0;

function convert() {
    strOut = [];
    decArr = '';
    count = 0;
    binArr = [];
    precision = 8; // the number of floating places considered 
    binaryStr = ""; // final binary value for the decimal conversion
    var rawVal = document.getElementById("floatingInputVal").value;

    // Remove any hyphens, commas, or spaces from the input string
    rawVal = rawVal.replace(/[-, ]/g, "");

    // Extract the base from the beginning of the input string.
    // The base is any of the following: "0b", "0o", "0x", or a number followed by "#".
    var base = rawVal.substr(0,(rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1));

    // Extract the number from the input string.
    // The number is any sequence of digits after the base.
    var num = rawVal.substr((rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1 || rawVal.indexOf("b") + 1),);
    
    currnStep = -1, currentStep = -1;
    // Switch statement that checks the base of the input number, and performs a different action based on that base
    switch (base) {
        // If the base is binary (2# or 0b), convert the number to decimal and call validInput
        case "2#":
        case "0b":
            if (isBinary(num)) {
                var decVal = parseInt(num, 2);
                validInput(decVal, base);
            }
            else {
                // If the input is not a valid binary number, call invalidInput
                invalidInput();
            }
            break;
        // If the base is octal (8# or 0o), convert the number to decimal and call validInput
        case "8#":
        case "0o":
            if (isOctal(num)) {
                var decVal = parseInt(num, 8);
                validInput(decVal, base);
            }
            else {
                // If the input is not a valid octal number, call invalidInput
                invalidInput();
            }
            break;
        // If the base is hexadecimal (16# or 0x), convert the number to decimal using hexToDec and call validInput
        case "16#":
        case "0x":
            if (isHex(num)) {
                var decVal = hexToDec(num);
                validInput(decVal, base);
            }
            else {
                // If the input is not a valid hexadecimal number, call invalidInput
                invalidInput();
            }
            break;
        case "10#":
        default:
            // If the base is decimal (10# or no prefix), parse the number and call validInput if it is an integer
            var decVal = parseInt(num, 10);
            if (Number.isInteger(decVal)) {
                validInput(decVal, base);
            }
            else {
                // If the input is not a valid integer, call invalidInput
                invalidInput();
            }
            break;
    }
     decimalValue = decVal;
     binaryValue = decimalToBinary(decimalValue);
     element = document.getElementById("conversionSteps");
     binaryVal = binaryStr; // set your binary value here
     decimalVal = binaryToDecimal(binaryVal);
     ele = document.getElementById("secConversionSteps");
}   


    // Convert hex to decimal (for any size hex)
function hexToDec(hex) {
    let result = 0;
    if (hex.length % 2) { hex = '0' + hex; }

    var bn = BigInt('0x' + hex);

    result = bn.toString(10);
    return result; // Return the final result
  }

  
function validInput(decimalVal, base) {
    // Store the prefixes and converted values in arrays
    const prefixes = ["2#", "10#", "8#", "16#"];
    const values = [
        format2(decimalVal.toString(2), base),
        decimalVal.toString(10),
        format8(decimalVal.toString(8)),
        format16(BigInt(decimalVal).toString(16))
    ];
    for (let i = 0; i < prefixes.length; i++) {
        // Construct the appropriate prefix based on whether decimalVal is positive or negative
        const prefix = prefixes[i];
        // Construct the corresponding output value
        const value = (!neg(document.getElementById("floatingInputVal").value) ? "" : "-") + values[i];
        // Construct the ID of the HTML element to set the value of
        const elementId = "floatingBase" + prefixes[i].slice(0, -1);
        // Set the value of the appropriate HTML element using a template literal for string concatenation
        document.getElementById(elementId).value = `${prefix}` + " " + `${value}`;
    }
    else {
        document.getElementById("floatingBase").value = "2# -" + format2(decimalVal.toString(2), base);
        document.getElementById("floatingBaseTen").value = "10# -" + decimalVal;
        document.getElementById("floatingBaseEight").value = "8# -" + format8(decimalVal.toString(8));
        document.getElementById("floatingBaseS").value = "16# -" +format16(decimalVal.toString(16));
    }
    // if (decimalVal.toString(2).length <= 16) {
        // document.getElementById("onesComplement").value = format16(bit16(onesComplement(decimalVal.toString(2))));  
        // document.getElementById("ascii").value = ascii(decimalVal); 
        // document.getElementById("twosComplement").value = format16(bit16(twosComplement(decimalVal)));
        // document.getElementById("UnsignedInt").value = unsignedInt(decimalVal);
        // document.getElementById("signedInt").value = signedInt(decimalVal);
        // document.getElementById("base64").value = base64(decimalVal);
    // }
    // else invalid16();
    
}                 
  
function ascii(decimalVal){
    console.log(decimalVal);

    let hexStr = BigInt(decimalVal).toString(16);

    hexStr = hexStr.toString();
    console.log(hexStr);

    let asciiStr = '';  // initialize an empty string for the resulting ASCII characters
    for (let i = 0; i < hexStr.length; i += 2) {  // iterate over the hex string two characters at a time
      let hexCode = parseInt(hexStr.substring(i, i+2), 16);  // extract the current two-digit hex code and convert it to a decimal integer
      if (hexCode < 32 || hexCode > 126) {  // check if the decimal integer is outside the printable ASCII character range
        return 'Invalid input';  // if it is, return an error message
      }
      asciiStr += String.fromCharCode(hexCode);  // otherwise, convert the decimal integer to its corresponding ASCII character and add it to the resulting string
    }
    return asciiStr;  // return the resulting ASCII string
}

function invalidInput() {
    // Loop through each input element that needs to be reset
    ['floatingBase2', 'floatingBase8', 'floatingBase10', 'floatingBase16', 'ascii', 'onesComplement', 'twosComplement', 'UnsignedInt', 'signedInt', 'base64'].forEach(function(inputId) {
        // Set the value of the current input element to "invalid number"
        document.getElementById(inputId).value = "invalid number";
    });
}

function invalid16() {
    document.getElementById("ascii").value = "Limit Exceeded";
    document.getElementById("onesComplement").value = "Limit Exceeded";
    document.getElementById("twosComplement").value = "Limit Exceeded";
    document.getElementById("UnsignedInt").value = "Limit Exceeded";
    document.getElementById("signedInt").value = "Limit Exceeded";
    document.getElementById("base64").value= "Limit Exceeded";
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
function format2(strBase2, baseVal) {
    var res = "";
    switch(baseVal) {
        case "8#":
            res = format8(strBase2);
            break;
        case "2#":
        case "16#":
        case "10#":
        default: 
            res = format16(strBase2);
    }
    return res; 
}

function format16(strBase2) {
    var formattedStr = "";
    if (strBase2.length <= 4) {
        formattedStr += '0'.repeat(4 - strBase2.length) + strBase2;
    }
    else {
        var zeroes = Math.ceil(strBase2.length / 4) * 4 - strBase2.length;
        formattedStr += '0'.repeat(zeroes) + strBase2;
    }
        
    formattedStr = formattedStr.match(/.{1,4}/g).join(' ');

    return formattedStr.toUpperCase();
}

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

function neg(rawVal){
    // Use the includes() method to check whether the input string contains a negative sign ("-")
    return rawVal.includes("-");
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
        str += bit16(decVal.toString());
        return parseInt(str, 2);
    }

}

function base64(decVal){
    let result = "";
    if (decVal < 0){
        return "invalid number";
    }

    var binVal = decVal.toString(2);

    while(binVal.length % 6 != 0){
        binVal = "0" + binVal;
    }
    var ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(let i=0, k=6; i < binVal.length; i+=6, k+=6){
        let val = binVal.substring(i, k);
        let dec = parseInt(val, 2);
        result += ALPHA[dec];
    } 
    return result;
}

  function decimalToBinary(decimal) {
    let binary = [];
    if(isNaN(decimal)) return;
    if(currentStep == -1){
        $("#stepButton").prop("disabled", false); // enable button when reset 
        $("#secStepButton").prop("disabled",false);
    }
    binaryStr = binary;
    let temp = decimal;
    while (temp > 0) {
      binary.unshift(temp % 2);
      temp = Math.floor(temp / 2);
    }
    if (binary.length === 0) {
      binary.push(0);
    }
    let steps = [];
    for (let i = 0; i <= binary.length; i++) {
      let step = decimal + " / 2 = " + Math.floor(decimal / 2) + ", " + decimal % 2;
      steps.push(step);
      decimal = Math.floor(decimal / 2);
    }
    return steps;
  }

  function displayStep(step) {
        count++;
      let html = '';
      let parts = step.split('/ 2');
      let ans = step.split(', ');
      strOut.push(ans[1]);
      html += '<div class="step">';
      html += '<span>' + parts[0] + ' / 2</span>';
      html += '<span>' + parts[1] + '</span>';
      html += '</div>';
      if(count % 4 == 0){
        strOut.push(" ");
      }
      let temp = [...strOut].reverse();

      $("#outputBin").empty().append(temp.join(''));
      $("#conversionSteps").append(html);
  }

  function binaryToDecimal(binary) {
    let decimal = 0;
    let stepTwo = []

    for (let i = 0; i < binary.length; i++) {
      let digit = binary[i];
      let step = `${decimal} * 2 + ${digit} = ${decimal*2+digit}`;
      stepTwo.push(step);
      decimal = decimal * 2 + digit;
    }
    
    return stepTwo;
  }
  
  function displayStepAlso(step) {
      let html = '';
      let parts = step.split('* 2');
      let ans = step.split("= ");
      decArr = ans[1];
      html += '<div class="step">';
      html += '<span>' + parts[0] + ' * 2</span>';
      html += '<span>' + parts[1] + '</span>';
      html += '</div>';
      $("#outputDec").empty().append("Answer: " + decArr);
    $("#secConversionSteps").append(html);
  } 

  $(document).ready(function() {
        $("#stepButton").on("click", function() {
          currentStep++;
          if(currentStep == 0){
            element.innerHTML = '';
          }
          if (currentStep >= binaryValue.length) {
            $("#stepButton").prop("disabled", true); // disable button when all steps are shown
            return;      
          }
    
          displayStep(binaryValue[currentStep]);
        });
      

        $("#secStepButton").on("click", function() {
          currnStep++;
          if(currnStep == 0){
            ele.innerHTML = '';
          }
          if (currnStep >= binaryVal.length) {
            $("#secStepButton").prop("disabled", true); // disable button when all steps are shown
            return;      
          }
    
          displayStepAlso(decimalVal[currnStep]);
        });
       
    
  });
  
let idTag2 = "0";
function fracToBinary(num){
    if(precision != 0){
        divEle = document.createElement("div");
        divEle.setAttribute("id", idTag2);
        divEle.classList.add("div-cols-2");
        spanEle = document.createElement("span");
        spanEle2 = document.createElement("span");
        let orig = fractional;
        orig = Math.round(orig * 1e8) / 1e8;
        fractional *= 2;
        let fract_bit = parseInt(fractional, 10);
        if(fract_bit == 1){
            fractional -= fract_bit;
            fractional = Math.round(fractional * 1e8) / 1e8;
            let places = decimalPlaces(fractional);
            spanEle.append(`${fract_bit}, ${fractional * places}`);  
            divEle.append(spanEle);
            divEle.append("= ");
            places = decimalPlaces(orig);
            spanEle2.append(`${orig*places} * 2`);
            divEle.append(spanEle2);
            fractionCol.append(divEle);        
        }else{
            fractional = Math.round(fractional * 1e8) / 1e8;
            let places = decimalPlaces(fractional);
            spanEle.append(`${fract_bit}, ${fractional * places}`);  
            divEle.append(spanEle);
            divEle.append("= ");
            places = decimalPlaces(orig);
            spanEle2.append(`${orig*places} * 2`);
            divEle.append(spanEle2);
            fractionCol.append(divEle);                 
        }
        let tempDi = document.getElementById("temp00");
        posInfo = tempDi.getBoundingClientRect();
        let otherDiv = posInfo.width;
        while(otherDiv > secDivWidth){
            fontSize -= 0.088;
            tempDi.style.fontSize = (fontSize) + "rem";
            tempDi = document.getElementById("temp00");
            posInfo = tempDi.getBoundingClientRect();
            otherDiv = posInfo.width;            
        }   
        idTag2 = parseInt(idTag2, 10) - 1;
        idTag2 = '' + idTag2;
    }
}





// Fluff, please leave for me - Luis
/* 
            <div>
                <a href="#" data-bs-toggle="tooltip" data-bs-title="Luis Olmos &#010;">Developers</a>
            </div>

                <div class="col w-50">
                    <div class="card top bg-light border-0">
                        <div class="card-body">
                            <h5 class="card-header text-bg-dark">16-bit Encodings</h5>
                        </div>
                        <div class="row row-cols-1 row-cols-md-2 g-2">
                            <div class="col">
                                <div class="card bg-light border border-0">
                                    <form class="form-floating">
                                        <input class="form-control" id="UnsignedInt" type="text" value="171" aria-label="Disabled input example" disabled readonly>
                                        <label for="UnsignedInt">Unsigned Int</label>           
                                    </form>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card bg-light border border-0">
                                    <form class="form-floating">
                                        <input class="form-control" id="signedInt" type="text" value="171" aria-label="Disabled input example" disabled readonly>
                                        <label for="signedInt">Signed Int</label>           
                                    </form>
                                </div>
                            </div> 
                            <div class="col">
                                <div class="card bg-light border border-0">
                                    <form class="form-floating">        
                                        <input class="form-control" id="twosComplement" type="text" value="0000 0000 1010 1011" aria-label="Disabled input example" disabled readonly>
                                        <label for="twosComplement">2s Complement</label>
                                    </form>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card bg-light border border-0">
                                    <form class="form-floating">
                                        <input class="form-control" id="onesComplement" type="text" value="0000 0000 1010 1011" aria-label="Disabled input example" disabled readonly>
                                        <label for="floatingBaseEight">1s complement</label>         
                                    </form>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card bg-light border border-0">
                                    <form class="form-floating">
                                        <input class="form-control" id="ascii" type="text" value="invalid number" aria-label="Disabled input example" disabled readonly>
                                        <label for="ascii">ASCII</label>           
                                    </form>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card bg-light border border-0">
                                    <form class="form-floating">
                                    <input class="form-control" id="base64" type="text" value="Cr" aria-label="Disabled input example" disabled readonly>
                                    <label for="floatingBaseEight">Base64</label>       </form>                               
                                </div>
                            </div>
                        </div>                            
                    </div>
                </div>

<header class="masthead">
<div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
    <div class="d-flex justify-content-center">
        <div class="text-center">
            <canvas id="bg"></canvas>

            <h1 class="mx-auto my-0 text-uppercase">Integer Conversion Encoding</h1>
            <div class="text-white-50 mx-auto mt-2 mb-5"></div>
            <a class="btn btn-outline-light" href="#integer">To Conversion</a>
        </div>
    </div>
</div>
</header> */
