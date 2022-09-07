"use strict";
var Triangulo = /** @class */ (function () {
    function Triangulo(A, B, C) {
        this.A = A;
        this.B = B;
        this.C = C;
    }
    Triangulo.prototype.isValid = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        return (Math.abs(bc - ca) < ab && ab < bc + ca) && (Math.abs(ab - ca) < bc && bc < ab + ca) && (Math.abs(ab - bc) < ca && ca < ab + bc);
    };
    Triangulo.prototype.getLine = function (p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    Triangulo.prototype.render = function (ctx) {
        var A = scale(this.A.x, this.A.y);
        var B = scale(this.B.x, this.B.y);
        var C = scale(this.C.x, this.C.y);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        var path = new Path2D();
        path.moveTo(A.x, A.y);
        path.lineTo(B.x, B.y);
        path.moveTo(B.x, B.y);
        path.lineTo(C.x, C.y);
        path.moveTo(C.x, C.y);
        path.lineTo(A.x, A.y);
        ctx.stroke(path);
    };
    Triangulo.prototype.calculo = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        $("#calculo").val("\n\n        sqrt = raiz quadrada\n\n        A = (".concat(this.A.x, " , ").concat(this.A.y, ")\n        B = (").concat(this.B.x, " , ").concat(this.B.y, ")\n        C = (").concat(this.C.x, " , ").concat(this.C.y, ")\n\n        LADOS\n\n        a = sqrt( (Ax - Bx)\u00B2 + (Ay - By)\u00B2 )\n        a = sqrt( (").concat(this.A.x, " - ").concat(this.B.x, ")\u00B2 + (").concat(this.A.y, " - ").concat(this.B.y, ")\u00B2 )\n        a = sqrt( (").concat(this.A.x - this.B.x, ")\u00B2 + (").concat(this.A.y - this.B.y, ")\u00B2 )\n        a = sqrt( ").concat(Math.pow(this.A.x - this.B.x, 2), " + ").concat(Math.pow(this.A.y - this.B.y, 2), " )\n        a = sqrt( ").concat(Math.pow(this.A.x - this.B.x, 2) + Math.pow(this.A.y - this.B.y, 2), " )\n        a = ").concat(ab, "\n\n        b = sqrt( (Bx - Cx)\u00B2 + (By - Cy)\u00B2 )\n        b = sqrt( (").concat(this.B.x, " - ").concat(this.C.x, ")\u00B2 + (").concat(this.B.y, " - ").concat(this.C.y, ")\u00B2 )\n        b = sqrt( (").concat(this.B.x - this.C.x, ")\u00B2 + (").concat(this.B.y - this.C.y, ")\u00B2 )\n        b = sqrt( ").concat(Math.pow(this.B.x - this.C.x, 2), " + ").concat(Math.pow(this.B.y - this.C.y, 2), " )\n        b = sqrt( ").concat(Math.pow(this.B.x - this.C.x, 2) + Math.pow(this.B.y - this.C.y, 2), " )\n        b = ").concat(bc, "\n\n        c = sqrt( (Cx - Ax)\u00B2 + (Cy - Ay)\u00B2 )\n        c = sqrt( (").concat(this.C.x, " - ").concat(this.A.x, ")\u00B2 + (").concat(this.C.y, " - ").concat(this.A.y, ")\u00B2 )\n        c = sqrt( (").concat(this.C.x - this.A.x, ")\u00B2 + (").concat(this.C.y - this.A.y, ")\u00B2 )\n        c = sqrt( ").concat(Math.pow(this.C.x - this.A.x, 2), " + ").concat(Math.pow(this.C.y - this.A.y, 2), " )\n        c = sqrt( ").concat(Math.pow(this.C.x - this.A.x, 2) + Math.pow(this.C.y - this.A.y, 2), " )\n        c = ").concat(ca, "\n        \n        CONDI\u00C7\u00C3O DE EXIST\u00CANCIA DO TRI\u00C2NGULO\n\n        | b - c | < a < b + c\n        | ").concat(bc, " - ").concat(ca, " | < ").concat(ab, " < ").concat(bc, " + ").concat(ca, "\n        ").concat(Math.abs(bc - ca), " < ").concat(ab, " < ").concat(bc + ca, "\n\n        | a - c | < b < a + c\n        | ").concat(ab, " - ").concat(ca, " | < ").concat(bc, " < ").concat(ab, " + ").concat(ca, "\n        ").concat(Math.abs(ab - ca), " < ").concat(bc, " < ").concat(ab + ca, "\n\n        | a - b | < c < a + b\n        | ").concat(ab, " - ").concat(bc, " | < ").concat(ca, " < ").concat(ab, " + ").concat(bc, "\n        ").concat(Math.abs(ab - bc), " < ").concat(ca, " < ").concat(ab + bc, " \n\n        \n        condi\u00E7\u00E3o de exist\u00EAncia: ").concat(this.isValid() ? "verdadeiro" : "falso", "\n        \n        "));
    };
    return Triangulo;
}());
var scale = function (a, b) {
    return {
        x: (a * 20) + canvas.width / 2,
        y: (b * -20) + canvas.height / 2
    };
};
