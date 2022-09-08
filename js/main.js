"use strict";
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext("2d");
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
function update(pitagoras) {
    if (pitagoras) {
        $('#A').val("(0 , 0)");
        $('#B').val("(0 , 3)");
        $('#C').val("(4 , 0)");
    }
    var a = getValue($('#A').val());
    var b = getValue($('#B').val());
    var c = getValue($('#C').val());
    var triangulo = new Triangulo(a, b, c);
    $("#erro").css("display", (triangulo.isValid()) ? "none" : "block");
    if (triangulo.isValid()) {
        fundo();
        triangulo.render(ctx);
        triangulo.calculo();
    }
    else {
        triangulo.calculo();
    }
}
var getValue = function (value) {
    var valores = [Number(value.split("").filter(function (n) { return (Number(n) || n == '0'); })[0]), Number(value.split("").filter(function (n) { return (Number(n) || n == '0'); })[1])];
    for (var index = 0; index < 2; index++) {
        if (value[value.indexOf(valores[index].toString()) - 1] == '-') {
            valores[index] *= -1;
        }
    }
    return {
        x: valores[0],
        y: valores[1]
    };
};
