
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.visualViewport.width, 700);
// window.onload = function(){
//     if(window.visualViewport.width > 400){
//         camera.position.setZ(-100);
//     }
// }
changeSize = function() { 
    renderer.setSize(window.visualViewport.width, 700); 
    if(window.visualViewport.width > 400){
        camera.position.setZ(-100);
        // camera.position.Z(100)
    }
}
window.addEventListener("resize", changeSize);
camera.position.setZ(30);
camera.position.setX(-25);
camera.position.setY(8);

renderer.render(scene, camera);

const worldTexture = new THREE.TextureLoader().load('img/binary-world.jpg');

const world = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshBasicMaterial({
    map: worldTexture
  })
);

scene.add(world);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// Animation Loop
world.rotation.z = 0.5;
function animate() {
  requestAnimationFrame(animate);
  world.rotation.y += 0.005;
  //world.rotation.z += 0.001;
  renderer.render(scene, camera);
}

animate();

// DOMContentLoaded means when DOM objects are loaded, function() will be invoked
// Whenever page refreshes or is opened, takes user straight to integer conversion
document.addEventListener("DOMContentLoaded", function() {
    console.log(window.visualViewport.width);
    var text = "Integer Conversion & Encoding";
    function typeText(text, i){
        if(i < text.length){
            document.querySelector('#head').innerHTML = text.substring(0, i+1) 
            + '<span aria-hidden="true"></span>';
            setTimeout(function() {
                typeText(text, i + 1)
            }, 130);
        }else{
            setTimeout(function(){
                window.location.hash = '';
                window.location.hash = '#integer';
            }, 200);
        }
    }
    typeText(text, 0);
});

let cDec, decNum;
let fractional;
let precision = 15; // how many times to convert fractional bit
let i = -1;
let j;
let binaryStr = "";
let isFloat = false;
let index, val;

function convert() {
    i = -1;
    precision = 8; // the number of floating places considered 
    binaryStr = ""; // final binary value for the decimal conversion
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
                validInput(decVal, base);
            }
            else invalidInput();
            break;
        case "8#":
        case "0o":
            if (isOctal(num)) {
                var decVal = parseInt(num, 8);
                cDec = decNum = decVal;
                validInput(decVal, base);
            }
            else invalidInput();
            break;
        case "16#":
        case "0x":
            if (isHex(num)) {
                var thatNum = String(num);
                if(thatNum.length % 2) { thatNum = '0' + String(num); }
                try{
                    var neVal = BigInt('0x' + thatNum);
                }
                catch(err){
                   invalidInput();      
                }
                var decVal = neVal.toString(10);
                
                console.log("TT: " + decVal);
                decVal = BigInt(decVal);
                cDec = decNum = decVal;
                //var decVal = num.toString(16);
                //var decVal = parseInt(num,16);
                validInput(decVal, base);
            }
            else invalidInput();
            break;
        case "10#":
        default:
            var decVal = parseInt(num, 10);
            let floatVal = parseFloat(num);
            if(typeof floatVal == "number"){
                fractional = floatVal - decVal;
                let middleNum = Math.ceil(fractional);
                if(middleNum == 1){
                   // console.log("hi");
                    let row = document.createElement("div");
                    row.classList.add("row", "dtb-boxes");
                    let col1 = document.createElement("div");
                    col1.classList.add("col-sm-6", "col-md-6");
                    col1.setAttribute("id", "decimalCol")
                    row.append(col1);
                    let col2 = document.createElement("div");
                    col2.classList.add("col-sm-6", "col-md-6");
                    col2.setAttribute("id", "fractionCol");
                    row.append(col2);
                    stepOne.replaceChildren(row);
                    isFloat = true;
                }
            }
            if (Number.isInteger(decVal)) {
                cDec = decNum = decVal;
                validInput(decVal, base);
            }
            else invalidInput();
            break;
    }
}   
function validInput(decimalVal, base) {
    if (!neg(document.getElementById("floatingInputVal").value)) {
        document.getElementById("floatingBase").value = "2# " + format2(decimalVal.toString(2), base);
        document.getElementById("floatingBaseTen").value = "10# " + decimalVal;
        document.getElementById("floatingBaseEight").value = "8# " + format8(decimalVal.toString(8));
        document.getElementById("floatingBaseS").value = "16# " +format16(decimalVal.toString(16));
    }
    else {
        document.getElementById("floatingBase").value = "2# -" + format2(decimalVal.toString(2), base);
        document.getElementById("floatingBaseTen").value = "10# -" + decimalVal;
        document.getElementById("floatingBaseEight").value = "8# -" + format8(decimalVal.toString(8));
        document.getElementById("floatingBaseS").value = "16# -" +format16(decimalVal.toString(16));
    }
    if (decimalVal.toString(2).length <= 16) {
        document.getElementById("onesComplement").value = format16(bit16(onesComplement(decimalVal.toString(2))));  
        document.getElementById("ascii").value = ascii(decimalVal); 
        document.getElementById("twosComplement").value = format16(bit16(twosComplement(decimalVal)));
        document.getElementById("UnsignedInt").value = unsignedInt(decimalVal);
        document.getElementById("signedInt").value = signedInt(decimalVal);
        document.getElementById("base64").value = base64(decimalVal);
    }
    else invalid16();
    
}                 
function ascii(decimalVal){
    var hex = decimalVal.toString(16);
    //console.log("TTT: " + hex);
    var str = '';
    var cur = '';
    for (var n = 0; n < hex.length; n+=2){
         cur = hex.substr(n, 2);
         if (parseInt(cur, 16) < 32 || parseInt(cur, 16) > 126) {
             return "invalid number";
         }
         if(parseInt(cur, 16) == 32){
            return "sp";
         } else {
         cur = String.fromCharCode(parseInt(cur, 16));
         //console.log(cur);
         str += cur;
         //console.log(str);
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

let divWidth;
let secDivWidth;
let fontSize;
function stepBy(){
    if(isFloat){
        let ele = document.getElementById("decimalCol");
        let posInfo = ele.getBoundingClientRect();
        divWidth = posInfo.width;
        ele = document.getElementById("fractionCol");
        posInfo = ele.getBoundingClientRect();
        secDivWidth = posInfo.width;
        fontSize = 1;
        if(Number.isInteger(cDec) && i == -1){
            // Adding decimal to binary content
            let divEle = document.createElement("div");
            divEle.setAttribute("id", "temp2");
            divEle.classList.add("div-cols");
            let spanEle = document.createElement("span");
            spanEle.append(`${cDec} `);
            divEle.append(spanEle);
            divEle.append(`/ `);
            let spanEle2 = document.createElement("span");
            spanEle2.append(`2 = ${Math.floor(cDec/2)}, ${cDec%2}`);
            divEle.append(spanEle2);
            decimalCol.replaceChildren(divEle);
            let tempDi = document.getElementById("temp2");
            posInfo = tempDi.getBoundingClientRect();
            let otherDiv = posInfo.width;
            while(otherDiv > divWidth){
                fontSize -= 0.088;
                tempDi.style.fontSize = (fontSize) + "rem";
                tempDi = document.getElementById("temp2");
                posInfo = tempDi.getBoundingClientRect();
                otherDiv = posInfo.width;            
            }
            cDec = Math.floor(cDec/2);  

            // Adding fractional to binary content
            precision--;
            divEle = document.createElement("div");
            divEle.setAttribute("id", "temp00");
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
                fractionCol.replaceChildren(divEle);        
            }else{
                fractional = Math.round(fractional * 1e8) / 1e8;
                let places = decimalPlaces(fractional);
                spanEle.append(`${fract_bit}, ${fractional * places}`);  
                divEle.append(spanEle);
                divEle.append("= ");
                places = decimalPlaces(orig);
                spanEle2.append(`${orig*places} * 2`);
                divEle.append(spanEle2);
                fractionCol.replaceChildren(divEle);                 
            }
            tempDi = document.getElementById("temp00");
            posInfo = tempDi.getBoundingClientRect();
            otherDiv = posInfo.width;
            while(otherDiv > secDivWidth){
                fontSize -= 0.088;
                tempDi.style.fontSize = (fontSize) + "rem";
                tempDi = document.getElementById("temp00");
                posInfo = tempDi.getBoundingClientRect();
                otherDiv = posInfo.width;            
            }        
            i++;  
        }
        else if(Number.isInteger(cDec) && i == 0){
            decToBinary(cDec);
            fracToBinary(fractional);
            precision--;
            cDec = Math.floor(cDec/2);
        }
        else if(Number.isInteger(cDec) && precision > 0){
            fracToBinary(fractional);
            precision--;
        }
    } else {
        if(Number.isInteger(cDec) && i == -1){
           // stepOne.replaceChildren(document.createElement("span"));
            let divEle = document.createElement("div");
            divEle.setAttribute("id", "temp");
            let spanEle = document.createElement("span");
            spanEle.append(`${cDec} `);
            divEle.append(spanEle);
            divEle.append(`/ `);
            let spanEle2 = document.createElement("span");
            spanEle2.append(`2 = ${Math.floor(cDec/2)}, ${cDec%2}`);
            divEle.append(spanEle2);
            stepOne.replaceChildren(divEle);

          //  stepOne.append(linebreak);
            cDec = Math.floor(cDec/2);  
            i++;  
        }
        else if (Number.isInteger(cDec) && i == 0){
            toBinary(cDec);
            cDec = Math.floor(cDec/2);
           // console.log(cDec);
        }
    }
}

function decimalPlaces(dec){
    if(!isFinite(dec)) return 1;
    let temp = 1, count = 1;
    while(Math.round(dec * temp) / temp !== dec){
        temp *= 10;
        count *= 10;
    }
    if(count == 10){
        count *= 10;
    }
    return count;
}
let idTag = "3";
function decToBinary(num){
    if(num == 0 && i == 0){
        let divEle = document.createElement("div");
        divEle.setAttribute("id", idTag);
        divEle.classList.add("div-cols");
        let spanEle = document.createElement("span");
        spanEle.append(`${cDec} `);
        divEle.append(spanEle);
        divEle.append(`/ `);
        let spanEle2 = document.createElement("span");
        spanEle2.append(`2 = ${Math.floor(cDec/2)}, ${cDec%2}`);
        divEle.append(spanEle2);
        decimalCol.append(divEle);
        let tempDi = document.getElementById(idTag);
        posInfo = tempDi.getBoundingClientRect();
        let otherDiv = posInfo.width;
        while(otherDiv > divWidth){
            fontSize -= 0.088;
            tempDi.style.fontSize = (fontSize) + "rem";
            tempDi = document.getElementById(idTag);
            posInfo = tempDi.getBoundingClientRect();
            otherDiv = posInfo.width;            
        }
        i++;
    }
    else if(i == 0){
        let divEle = document.createElement("div");
        divEle.setAttribute("id", idTag);
        divEle.classList.add("div-cols");
        let spanEle = document.createElement("span");
        spanEle.append(`${cDec} `);
        divEle.append(spanEle);
        divEle.append(`/ `);
        let spanEle2 = document.createElement("span");
        spanEle2.append(`2 = ${Math.floor(cDec/2)}, ${cDec%2}`);
        divEle.append(spanEle2);
        decimalCol.append(divEle);
        let tempDi = document.getElementById(idTag);
        posInfo = tempDi.getBoundingClientRect();
        let otherDiv = posInfo.width;
        while(otherDiv > divWidth){
            fontSize -= 0.088;
            tempDi.style.fontSize = (fontSize) + "rem";
            tempDi = document.getElementById(idTag);
            posInfo = tempDi.getBoundingClientRect();
            otherDiv = posInfo.width;            
        }
        idTag = parseInt(idTag, 10) + 1;
        idTag = '' + idTag;
    }
}
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

function toBinary(n){
    if(n == 0 && i == 0){
        let divEle = document.createElement("div");
        divEle.setAttribute("id", "temp");
        let spanEle = document.createElement("span");
        spanEle.append(`${n} `);
        divEle.append(spanEle);
        divEle.append(`/ `);
        let spanEle2 = document.createElement("span");
        spanEle2.append(`2 = ${Math.floor(n/2)}, ${n%2}`);
        divEle.append(spanEle2);
        stepOne.append(divEle);
        i++;
    }
    else if(i==0){
        //stepOne.append(document.createElement("br"));
       // stepOne.append(document.createElement("br"));
        let divEle = document.createElement("div");
        divEle.setAttribute("id", "temp");
        let spanEle = document.createElement("span");
        spanEle.append(`${n} `);
        divEle.append(spanEle);
        divEle.append(`/ `);
        let spanEle2 = document.createElement("span");
        spanEle2.append(`2 = ${Math.floor(n/2)}, ${n%2}`);
        divEle.append(spanEle2);
        stepOne.append(divEle);
    }
};

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


// Fluff, please leave for me - Luis
/* <header class="masthead">
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
