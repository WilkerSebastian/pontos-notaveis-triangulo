"use strict";
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth < 700 ? window.innerWidth * 0.90 : window.innerWidth * 0.75;
canvas.height = window.innerHeight < 700 ? window.innerWidth * 0.50 : window.innerWidth * 0.35;
var ctx = canvas.getContext("2d");
var run = false;
var triangulo;
document.getElementById("autorender").addEventListener("change", function () {
    run = !run;
    if (run) {
        $("#render").attr("disabled", "disabled");
    }
    else {
        $("#render").removeAttr("disabled");
    }
});
var fundo = function () {
    ctx.fillStyle = "#F5FACF";
    ctx.strokeStyle = "#CFCFC6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var path = new Path2D();
    path.moveTo(0, canvas.height / 2);
    path.lineTo(canvas.width, canvas.height / 2);
    path.moveTo(canvas.width / 2, 0);
    path.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke(path);
};
fundo();
function update(template) {
    switch (template) {
        case "pitagoras":
            $('#A').val("(0 , 0)");
            $('#B').val("(0 , 3)");
            $('#C').val("(4 , 0)");
            break;
        case "equilatero":
            $('#A').val("(0 , 2)");
            $('#B').val("(2.732050807568877 , 2.732050807568877)");
            $('#C').val("(2 , 0)");
            break;
        case "obtusangulo":
            $('#A').val("(-5.2 , 0)");
            $('#B').val("(0 , 3)");
            $('#C').val("(5.2 , 0)");
            break;
    }
    template = "";
    var a = getValue($('#A').val());
    var b = getValue($('#B').val());
    var c = getValue($('#C').val());
    triangulo = new Triangulo(a, b, c);
    $("#erro").css("display", (triangulo.isValid()) ? "none" : "block");
    if (triangulo.isValid()) {
        fundo();
        triangulo.render(ctx);
        triangulo.calculo();
    }
    else {
        triangulo.calculo();
    }
    if (run) {
        console.log("auto");
        setTimeout(function () { update(template); });
    }
}
var getValue = function (value) {
    var v = value.trim().split("(").join("").split(")")[0].trim().split(',');
    return {
        x: Number(v[0]),
        y: Number(v[1])
    };
};
