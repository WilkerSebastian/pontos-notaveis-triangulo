"use strict";
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext("2d");
var fundo = function () {
    ctx.fillStyle = "#35A2E0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
function limpar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fundo();
}
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
}
var getValue = function (value) {
    return {
        x: Number(value.split("").filter(function (n) { return (Number(n) || n == '0'); })[0]),
        y: Number(value.split("").filter(function (n) { return (Number(n) || n == '0'); })[1])
    };
};
