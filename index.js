function convert() {
    var rawVal = document.getElementById("floatingInputVal").value;
    var base = rawVal.substr(0,(rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1));
    var num = rawVal.substr((rawVal.indexOf("#") + 1 || rawVal.indexOf("x") + 1 || rawVal.indexOf("o") + 1),);
    num = num.replace(/ /g, "");
    switch (base) {
        case "2#":
            var decVal = parseInt(num, 2);
            break;
        case "8#":
        case "0o":
            var decVal = parseInt(num, 8);
            break;
        case "10#":
            var decVal = parseInt(num, 10);
            break;
        case "16#":
        case "0x":
            var decVal = parseInt(num, 16);
            break;
    }
    document.getElementById("floatingBase").value = decVal.toString(2);
    document.getElementById("floatingBaseTen").value = decVal;
    document.getElementById("floatingBaseEight").value = decVal.toString(8);
    document.getElementById("floatingBaseS").value = decVal.toString(16);
}
                 