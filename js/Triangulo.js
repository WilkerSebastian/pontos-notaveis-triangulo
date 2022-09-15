"use strict";
var Triangulo = /** @class */ (function () {
    function Triangulo(A, B, C) {
        this.scale = function (a, b) {
            return {
                x: (a * 20) + canvas.width / 2,
                y: (b * -20) + canvas.height / 2
            };
        };
        this.A = A;
        this.B = B;
        this.C = C;
        this.a = this.getLine(this.A, this.B);
        this.b = this.getLine(this.B, this.C);
        this.c = this.getLine(this.C, this.A);
        this.alfa = this.getAngle("alfa");
        this.beta = this.getAngle("beta");
        this.charlie = this.getAngle("charlie");
    }
    Triangulo.prototype.getAngle = function (tipo) {
        switch (tipo) {
            // arc cos b² – a² – c² / –2.a.c
            case "alfa": return this.radToGraus(Math.acos((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c)));
            // arc cos c² – a² – b² / –2.a.b
            case "beta": return this.radToGraus(Math.acos((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b)));
            // arc cos a² – c² – b² / –2.c.b
            case "charlie": return this.radToGraus(Math.acos((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b)));
        }
        return 0;
    };
    Triangulo.prototype.isValid = function () {
        return (Math.abs(this.b - this.c) < this.a && this.a < this.b + this.c) && (Math.abs(this.a - this.c) < this.b && this.b < this.a + this.c) && (Math.abs(this.a - this.b) < this.c && this.c < this.a + this.b);
    };
    Triangulo.prototype.getPerimetro = function () {
        return this.a + this.b + this.c;
    };
    Triangulo.prototype.getLine = function (p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    Triangulo.prototype.render = function (ctx) {
        var mostar = {
            circuncentro: $("#circuncentro").prop("checked"),
            ortocentro: $("#ortocentro").prop("checked"),
            baricentro: $("#baricentro").prop("checked"),
            incentro: $("#incentro").prop("checked"),
            extra: $("#extras").prop("checked")
        };
        var G = this.scale(this.baricentro().x, this.baricentro().y);
        var I = this.scale(this.incentro().x, this.incentro().y);
        var H = this.scale(this.ortocentro().x, this.ortocentro().y);
        var N = this.scale(this.circuncentro().N.x, this.circuncentro().N.y);
        var P = this.scale(this.circuncentro().P.x, this.circuncentro().P.y);
        var Q = this.scale(this.circuncentro().Q.x, this.circuncentro().Q.y);
        var R = this.scale(this.circuncentro().R.x, this.circuncentro().R.y);
        var A = this.scale(this.A.x, this.A.y);
        var B = this.scale(this.B.x, this.B.y);
        var C = this.scale(this.C.x, this.C.y);
        ctx.strokeStyle = "#5E0099";
        var triangulo = new Path2D();
        triangulo.moveTo(A.x, A.y);
        triangulo.lineTo(B.x, B.y);
        triangulo.lineTo(C.x, C.y);
        triangulo.lineTo(A.x, A.y);
        triangulo.closePath();
        ctx.stroke(triangulo);
        ctx.fillStyle = "white";
        ctx.fill(triangulo);
        if (mostar.extra) {
            ctx.fillStyle = "black";
            ctx.font = "15px ARIAL";
            ctx.fillText("A(".concat(this.A.x.toPrecision(2), " , ").concat(this.A.y.toPrecision(2), ")"), A.x - 75, A.y + 25);
            ctx.fillText("B(".concat(this.B.x.toPrecision(2), " , ").concat(this.B.y.toPrecision(2), ")"), B.x, B.y - 45);
            ctx.fillText("C(".concat(this.C.x.toPrecision(2), " , ").concat(this.C.y.toPrecision(2), ")"), C.x + 25, C.y + 25);
            ctx.fillStyle = "black";
            ctx.fillText("\u03B1: ".concat(Math.round(this.alfa), "\u00B0"), A.x - 75, A.y + 45);
            ctx.fillText("\u03B2: ".concat(Math.round(this.beta), "\u00B0"), B.x, B.y - 25);
            ctx.fillText("\u03B3: ".concat(Math.round(this.charlie), "\u00B0"), C.x + 25, C.y + 45);
        }
        if (mostar.baricentro) {
            var bari = new Path2D;
            ctx.strokeStyle = "#0300FF";
            bari.moveTo(A.x, A.y);
            bari.lineTo(G.x, G.y);
            bari.moveTo(B.x, B.y);
            bari.lineTo(G.x, G.y);
            bari.moveTo(C.x, C.y);
            bari.lineTo(G.x, G.y);
            ctx.stroke(bari);
            bari.closePath();
            if (mostar.extra) {
                ctx.fillStyle = "black";
                ctx.font = "10px ARIAL";
                ctx.fillText("G(".concat(this.baricentro().x.toPrecision(2), " , ").concat(this.baricentro().y.toPrecision(2), ")"), G.x, G.y);
            }
        }
        if (mostar.incentro) {
            var inc = new Path2D;
            ctx.strokeStyle = "#0090FF";
            inc.moveTo(A.x, A.y);
            inc.lineTo(I.x, I.y);
            inc.moveTo(B.x, B.y);
            inc.lineTo(I.x, I.y);
            inc.moveTo(C.x, C.y);
            inc.lineTo(I.x, I.y);
            ctx.stroke(inc);
            inc.closePath();
            if (mostar.extra) {
                ctx.fillStyle = "black";
                ctx.font = "10px ARIAL";
                ctx.fillText("I(".concat(this.incentro().x.toPrecision(2), " , ").concat(this.incentro().y.toPrecision(2), ")"), I.x, I.y);
            }
        }
        if (mostar.ortocentro) {
            var ort = new Path2D;
            ctx.strokeStyle = "#C22D00";
            ort.moveTo(H.x, H.y);
            ort.lineTo(A.x, A.y);
            ort.moveTo(H.x, H.y);
            ort.lineTo(B.x, B.y);
            ort.moveTo(H.x, H.y);
            ort.lineTo(C.x, C.y);
            if (this.tipoTriangulo().angulos == "retângulo") {
                var inverse = this.scale(this.ortocentro().ax, this.ortocentro().ay);
                ort.moveTo(H.x, H.y);
                ort.lineTo(inverse.x, inverse.y);
            }
            ctx.stroke(ort);
            ort.closePath();
            if (mostar.extra) {
                ctx.fillStyle = "black";
                ctx.font = "10px ARIAL";
                ctx.fillText("H(".concat(this.ortocentro().x.toPrecision(2), " , ").concat(this.ortocentro().y.toPrecision(2), ")"), H.x, H.y);
            }
        }
        if (mostar.circuncentro) {
            var cir = new Path2D();
            ctx.strokeStyle = "#E164FF";
            cir.moveTo(P.x, P.y);
            cir.lineTo(N.x, N.y);
            cir.moveTo(Q.x, Q.y);
            cir.lineTo(N.x, N.y);
            cir.moveTo(R.x, R.y);
            cir.lineTo(N.x, N.y);
            if (this.tipoTriangulo().lados == "equilátero") {
                var circulo = new Path2D();
                var r = (Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.c, 2)) / 3) * Math.pow(this.c, 2.4);
                ctx.fillStyle = "#420000";
                circulo.arc(N.x, N.y, r, this.grausToRad(0), this.grausToRad(360), true);
                ctx.stroke(circulo);
                circulo.closePath();
            }
            if (this.tipoTriangulo().angulos == "retângulo") {
                var inverse = this.scale(this.circuncentro().inverse.x, this.circuncentro().inverse.y);
                cir.moveTo(N.x, N.y);
                cir.lineTo(inverse.x, inverse.y);
            }
            ctx.stroke(cir);
            cir.closePath();
            if (mostar.extra) {
                ctx.fillStyle = "black";
                ctx.font = "10px ARIAL";
                ctx.fillText("N(".concat(this.circuncentro().N.x.toPrecision(2), " , ").concat(this.circuncentro().N.y.toPrecision(2), ")"), N.x, N.y + 10);
                ctx.fillText("P(".concat(this.circuncentro().P.x.toPrecision(2), " , ").concat(this.circuncentro().P.y.toPrecision(2), ")"), P.x - 5, P.y);
                ctx.fillText("Q(".concat(this.circuncentro().Q.x.toPrecision(2), " , ").concat(this.circuncentro().Q.y.toPrecision(2), ")"), Q.x + 5, Q.y);
                ctx.fillText("R(".concat(this.circuncentro().R.x.toPrecision(2), " , ").concat(this.circuncentro().R.y.toPrecision(2), ")"), R.x, R.y - 5);
            }
        }
    };
    Triangulo.prototype.baricentro = function () {
        return {
            x: (this.A.x + this.B.x + this.C.x) / 3,
            y: (this.A.y + this.B.y + this.C.y) / 3
        };
    };
    Triangulo.prototype.incentro = function () {
        var p = this.getPerimetro();
        return {
            x: ((this.a * this.A.x) + (this.b * this.B.x) + (this.c * this.C.x)) / p,
            y: ((this.a * this.A.y) + (this.b * this.B.y) + (this.c * this.C.y)) / p
        };
    };
    Triangulo.prototype.circuncentro = function () {
        var cir = {
            N: {
                x: ((this.A.x * Math.sin(this.grausToRad(2 * this.alfa))) + (this.C.x * Math.sin(this.grausToRad(2 * this.charlie))) + (this.B.x * Math.sin(this.grausToRad(2 * this.beta)))) / (Math.sin(this.grausToRad(2 * this.alfa)) + Math.sin(this.grausToRad(2 * this.charlie)) + Math.sin(this.grausToRad(2 * this.beta))),
                y: ((this.A.y * Math.sin(this.grausToRad(2 * this.alfa))) + (this.C.y * Math.sin(this.grausToRad(2 * this.charlie))) + (this.B.y * Math.sin(this.grausToRad(2 * this.beta)))) / (Math.sin(this.grausToRad(2 * this.alfa)) + Math.sin(this.grausToRad(2 * this.charlie)) + Math.sin(this.grausToRad(2 * this.beta)))
            },
            P: {
                x: (this.C.x + this.B.x) / 2,
                y: (this.C.y + this.B.y) / 2
            },
            Q: {
                x: (this.A.x + this.B.x) / 2,
                y: (this.A.y + this.B.y) / 2
            },
            R: {
                x: (this.A.x + this.C.x) / 2,
                y: (this.A.y + this.C.y) / 2
            },
            inverse: {
                x: NaN,
                y: NaN
            }
        };
        if (this.angleRet() != "nenhum") {
            switch (this.angleRet()) {
                case "alfa":
                    cir.inverse.x = this.A.x;
                    cir.inverse.y = this.A.y;
                    break;
                case "beta":
                    cir.inverse.x = this.B.x;
                    cir.inverse.y = this.B.y;
                    break;
                case "charlie":
                    cir.inverse.x = this.C.x;
                    cir.inverse.y = this.C.y;
                    break;
            }
        }
        return cir;
    };
    Triangulo.prototype.ortocentro = function () {
        var H = {
            x: ((this.A.x * Math.tan(this.grausToRad(this.alfa))) + (this.C.x * Math.tan(this.grausToRad(this.charlie))) + (this.B.x * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta))),
            y: ((this.A.y * Math.tan(this.grausToRad(this.alfa))) + (this.C.y * Math.tan(this.grausToRad(this.charlie))) + (this.B.y * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta))),
            ax: NaN,
            ay: NaN
        };
        if (this.angleRet() != "nenhum") {
            switch (this.angleRet()) {
                case "alfa":
                    H.x = this.A.x;
                    H.y = this.A.y;
                    H.ax = (this.B.x + this.C.x) / 2;
                    H.ay = (this.B.y + this.C.y) / 2;
                    break;
                case "beta":
                    H.x = this.B.x;
                    H.y = this.B.y;
                    H.ax = (this.A.x + this.C.x) / 2;
                    H.ay = (this.A.y + this.C.y) / 2;
                    break;
                case "charlie":
                    H.x = this.C.x;
                    H.y = this.C.y;
                    H.ax = (this.A.x + this.B.x) / 2;
                    H.ay = (this.A.y + this.B.y) / 2;
                    break;
            }
        }
        return H;
    };
    Triangulo.prototype.calculo = function () {
        var p = this.getPerimetro();
        $("#calculo").val("\n\n        sqrt = raiz quadrada\n\n        A = (".concat(this.A.x, " , ").concat(this.A.y, ")\n        B = (").concat(this.B.x, " , ").concat(this.B.y, ")\n        C = (").concat(this.C.x, " , ").concat(this.C.y, ")\n\n        LADOS\n\n        a = sqrt( (Ax - Bx)\u00B2 + (Ay - By)\u00B2 )\n        a = sqrt( (").concat(this.A.x, " - ").concat(this.B.x, ")\u00B2 + (").concat(this.A.y, " - ").concat(this.B.y, ")\u00B2 )\n        a = sqrt( (").concat(this.A.x - this.B.x, ")\u00B2 + (").concat(this.A.y - this.B.y, ")\u00B2 )\n        a = sqrt( ").concat(Math.pow(this.A.x - this.B.x, 2), " + ").concat(Math.pow(this.A.y - this.B.y, 2), " )\n        a = sqrt( ").concat(Math.pow(this.A.x - this.B.x, 2) + Math.pow(this.A.y - this.B.y, 2), " )\n        a = ").concat(this.a, "\n\n        b = sqrt( (Bx - Cx)\u00B2 + (By - Cy)\u00B2 )\n        b = sqrt( (").concat(this.B.x, " - ").concat(this.C.x, ")\u00B2 + (").concat(this.B.y, " - ").concat(this.C.y, ")\u00B2 )\n        b = sqrt( (").concat(this.B.x - this.C.x, ")\u00B2 + (").concat(this.B.y - this.C.y, ")\u00B2 )\n        b = sqrt( ").concat(Math.pow(this.B.x - this.C.x, 2), " + ").concat(Math.pow(this.B.y - this.C.y, 2), " )\n        b = sqrt( ").concat(Math.pow(this.B.x - this.C.x, 2) + Math.pow(this.B.y - this.C.y, 2), " )\n        b = ").concat(this.b, "\n\n        c = sqrt( (Cx - Ax)\u00B2 + (Cy - Ay)\u00B2 )\n        c = sqrt( (").concat(this.C.x, " - ").concat(this.A.x, ")\u00B2 + (").concat(this.C.y, " - ").concat(this.A.y, ")\u00B2 )\n        c = sqrt( (").concat(this.C.x - this.A.x, ")\u00B2 + (").concat(this.C.y - this.A.y, ")\u00B2 )\n        c = sqrt( ").concat(Math.pow(this.C.x - this.A.x, 2), " + ").concat(Math.pow(this.C.y - this.A.y, 2), " )\n        c = sqrt( ").concat(Math.pow(this.C.x - this.A.x, 2) + Math.pow(this.C.y - this.A.y, 2), " )\n        c = ").concat(this.c, "\n        \n        CONDI\u00C7\u00C3O DE EXIST\u00CANCIA DO TRI\u00C2NGULO\n\n        | b - c | < a < b + c\n        | ").concat(this.b, " - ").concat(this.c, " | < ").concat(this.a, " < ").concat(this.b, " + ").concat(this.c, "\n        ").concat(Math.abs(this.b - this.c), " < ").concat(this.a, " < ").concat(this.b + this.c, "\n\n        | a - c | < b < a + c\n        | ").concat(this.a, " - ").concat(this.c, " | < ").concat(this.b, " < ").concat(this.a, " + ").concat(this.c, "\n        ").concat(Math.abs(this.a - this.c), " < ").concat(this.b, " < ").concat(this.a + this.c, "\n\n        | a - b | < c < a + b\n        | ").concat(this.a, " - ").concat(this.b, " | < ").concat(this.c, " < ").concat(this.a, " + ").concat(this.b, "\n        ").concat(Math.abs(this.a - this.b), " < ").concat(this.c, " < ").concat(this.a + this.b, " \n\n        \n        condi\u00E7\u00E3o de exist\u00EAncia: ").concat(this.isValid() ? "verdadeiro" : "falso", "\n\n        PER\u00CDMETRO\n\n        p = ").concat(this.getPerimetro(), "\n\n        p = a + b + c\n        p = ").concat(this.a, " + ").concat(this.b, " + ").concat(this.c, "\n        p = ").concat(this.getPerimetro(), "\n\n        \u00C2NGULO DO TRI\u00C2NGULO\n\n        alfa = ").concat(this.alfa, "\u00B0\n        beta = ").concat(this.beta, "\u00B0\n        charlie = ").concat(this.charlie, "\u00B0\n\n        alfa = arccos( b\u00B2 \u2013 a\u00B2 \u2013 c\u00B2 / \u20132 * a * c ) * 180 / \u03C0\n        alfa = arccos( ").concat(this.b, "\u00B2 \u2013 ").concat(this.a, "\u00B2 \u2013 ").concat(this.c, "\u00B2 / \u20132 * ").concat(this.a, " * ").concat(this.c, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(Math.pow(this.b, 2), " \u2013 ").concat(Math.pow(this.a, 2), " \u2013 ").concat(Math.pow(this.c, 2), " / \u20132 * ").concat(this.a, " * ").concat(this.c, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(Math.pow(this.b, 2), " \u2013 ").concat(Math.pow(this.a, 2), " \u2013 ").concat(Math.pow(this.c, 2), " / ").concat(-2 * this.a * this.c, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2), " / ").concat(-2 * this.a * this.c, " ) * 180 / \u03C0\n        alfa = arccos( ").concat((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c), " ) * 180 / \u03C0\n        alfa = ").concat(Math.acos((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c)), " * 180 / \u03C0\n        alfa = ").concat(Math.acos((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c)) * 180, " / ").concat(Math.PI, "\n        alfa = ").concat(this.alfa, "\u00B0\n\n        beta = arccos( c\u00B2 \u2013 a\u00B2 \u2013 b\u00B2 / \u20132 * a * b ) * 180 / \u03C0\n        beta = arccos( ").concat(this.c, "\u00B2 \u2013 ").concat(this.a, "\u00B2 \u2013 ").concat(this.b, "\u00B2 / \u20132 * ").concat(this.a, " * ").concat(this.b, " ) * 180 / \u03C0\n        beta = arccos( ").concat(Math.pow(this.c, 2), " \u2013 ").concat(Math.pow(this.a, 2), " \u2013 ").concat(Math.pow(this.b, 2), " / \u20132 * ").concat(this.a, " * ").concat(this.b, " ) * 180 / \u03C0\n        beta = arccos( ").concat(Math.pow(this.c, 2), " \u2013 ").concat(Math.pow(this.a, 2), " \u2013 ").concat(Math.pow(this.b, 2), " / ").concat(-2 * this.a * this.b, " ) * 180 / \u03C0\n        beta = arccos( ").concat(Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2), " / ").concat(-2 * this.a * this.b, " ) * 180 / \u03C0\n        beta = arccos( ").concat((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b), " ) * 180 / \u03C0\n        beta = ").concat(Math.acos((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b)), " * 180 / \u03C0\n        beta = ").concat(Math.acos((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b)) * 180, " / ").concat(Math.PI, "\n        beta = ").concat(this.beta, "\u00B0\n\n        charlie = arccos( a\u00B2 \u2013 c\u00B2 \u2013 b\u00B2 / \u20132 * c * b ) * 180 / \u03C0\n        charlie = arccos( ").concat(this.a, "\u00B2 \u2013 ").concat(this.c, "\u00B2 \u2013 ").concat(this.b, "\u00B2 / \u20132 * ").concat(this.c, " * ").concat(this.b, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(Math.pow(this.a, 2), " \u2013 ").concat(Math.pow(this.c, 2), " \u2013 ").concat(Math.pow(this.b, 2), " / \u20132 * ").concat(this.c, " * ").concat(this.b, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(Math.pow(this.a, 2), " \u2013 ").concat(Math.pow(this.c, 2), " \u2013 ").concat(Math.pow(this.b, 2), " / ").concat(-2 * this.c * this.b, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2), " / ").concat(-2 * this.c * this.b, " ) * 180 / \u03C0\n        charlie = arccos( ").concat((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b), " ) * 180 / \u03C0\n        charlie = ").concat(Math.acos((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b)), " * 180 / \u03C0\n        charlie = ").concat(Math.acos((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b)) * 180, " / ").concat(Math.PI, "\n        charlie = ").concat(this.charlie, "\u00B0\n\n        TIPO DO TRIANGULO\n\n        pelos angulos ele \u00E9: ").concat(this.tipoTriangulo().angulos, "\n\n        acut\u00E2ngulo: ").concat(Math.round(this.alfa) < 90 && Math.round(this.beta) < 90 && Math.round(this.charlie) < 90 ? "verdadeiro" : "falso", "\n        alfa < 90\u00B0 E beta < 90\u00B0 E charlie < 90\u00B0\n        ").concat(Math.round(this.alfa), "\u00B0 < 90\u00B0 E ").concat(Math.round(this.beta), "\u00B0 < 90\u00B0 E ").concat(Math.round(this.charlie), "\u00B0 < 90\u00B0\n\n        ret\u00E2ngulo: ").concat(Math.round(this.alfa) == 90 || Math.round(this.beta) == 90 || Math.round(this.charlie) == 90 ? "verdadeiro" : "falso", "\n        alfa = 90\u00B0 OU beta = 90\u00B0 OU charlie = 90\u00B0\n        ").concat(Math.round(this.alfa), "\u00B0 = 90\u00B0 OU ").concat(Math.round(this.beta), "\u00B0 = 90\u00B0 OU ").concat(Math.round(this.charlie), "\u00B0 = 90\u00B0\n        \n        obtus\u00E2ngulo: ").concat(Math.round(this.alfa) > 90 || Math.round(this.beta) > 90 || Math.round(this.charlie) > 90 ? "verdadeiro" : "falso", "\n        alfa > 90\u00B0 OU beta > 90\u00B0 OU charlie > 90\u00B0\n        ").concat(Math.round(this.alfa), "\u00B0 > 90\u00B0 OU ").concat(Math.round(this.beta), "\u00B0 > 90\u00B0 OU ").concat(Math.round(this.charlie), "\u00B0 > 90\u00B0\n\n        pelos lados ele \u00E9: ").concat(this.tipoTriangulo().lados, "\n\n        equil\u00E1tero: ").concat(this.a == this.b && this.b == this.c && this.c == this.a ? "verdadeiro" : "falso", "\n        a = b E b = c E c = a \n        ").concat(this.a, " = ").concat(this.b, " E ").concat(this.b, " = ").concat(this.c, " E ").concat(this.c, " = ").concat(this.a, "\n        \n        is\u00F3sceles: ").concat(this.a == this.b || this.b == this.c || this.c == this.a ? "verdadeiro" : "falso", "\n        a = b OU b = c OU c = a\n        ").concat(this.a, " = ").concat(this.b, " OU ").concat(this.b, " = ").concat(this.c, " OU ").concat(this.c, " = ").concat(this.a, "\n\n        ethis.scaleno ").concat(this.a != this.b && this.b != this.c && this.c != this.a ? "verdadeiro" : "falso", "\n        a \u2260 b E b \u2260 c E c \u2260 a\n        ").concat(this.a, " \u2260 ").concat(this.b, " E ").concat(this.b, " \u2260 ").concat(this.c, " E ").concat(this.c, " \u2260 ").concat(this.a, "\n        \n\n        BARICENTRO\n\n        G = (").concat(this.baricentro().x, " , ").concat(this.baricentro().y, ")\n\n        Gx = Ax + Bx + Cx / 3\n        Gx = ").concat(this.A.x, " + ").concat(this.B.x, " + ").concat(this.C.x, " / 3\n        Gx = ").concat((this.A.x + this.B.x + this.C.x), " / 3\n        gx = ").concat((this.A.x + this.B.x + this.C.x) / 3, "\n\n        Gy = Ax + Bx + Cx / 3\n        Gy = ").concat(this.A.y, " + ").concat(this.B.y, " + ").concat(this.C.y, " / 3\n        Gy = ").concat((this.A.y + this.B.y + this.C.y), " / 3\n        Gy = ").concat((this.A.y + this.B.y + this.C.y) / 3, "\n\n        INCENTRO\n\n        I = (").concat(this.incentro().x, " , ").concat(this.incentro().y, ")\n\n        Ix = a * Ax + * b * Bx + c * Cx / p\n        Ix = ").concat(this.a, " * ").concat(this.A.x, " + ").concat(this.b, " * ").concat(this.B.x, " + ").concat(this.c, " * ").concat(this.C.x, " / ").concat(p, "\n        Ix = ").concat(this.a * this.A.x, " + ").concat(this.b * this.B.x, " + ").concat(this.c * this.C.x, " / ").concat(p, "\n        Ix = ").concat((this.a * this.A.x + this.b * this.B.x + this.c * this.C.x), " / ").concat(p, "\n        Ix = ").concat((this.a * this.A.x + this.b * this.B.x + this.c * this.C.x) / p, "\n\n        Iy = a * Ax + * b * Bx + c * Cx / p\n        Iy = ").concat(this.a, " * ").concat(this.A.y, " + ").concat(this.b, " * ").concat(this.B.y, " + ").concat(this.c, " * ").concat(this.C.y, " / ").concat(p, "\n        Iy = ").concat(this.a * this.A.y, " + ").concat(this.b * this.B.y, " + ").concat(this.c * this.C.y, " / ").concat(p, "\n        Iy = ").concat((this.a * this.A.y + this.b * this.B.y + this.c * this.C.y), " / ").concat(p, "\n        Iy = ").concat((this.a * this.A.y + this.b * this.B.y + this.c * this.C.y) / p, "\n\n        CIRCUNCENTRO\n\n        N = (").concat(this.circuncentro().N.x, " , ").concat(this.circuncentro().N.y, ")\n\n        P = (").concat(this.circuncentro().P.x, " , ").concat(this.circuncentro().P.y, ")\n        Q = (").concat(this.circuncentro().Q.x, " , ").concat(this.circuncentro().Q.y, ")\n        R = (").concat(this.circuncentro().R.x, " , ").concat(this.circuncentro().R.y, ")\n\n        Nx = Ax * sin(2 * alfa) + Cx * sin(2 * charlie) + Bx * sin(2 * beta) / sin(2 * alfa) + sin(2 * charlie) + sin(2 * beta)\n        Nx = ").concat(this.A.x, " * ").concat(Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(this.C.x, " ").concat(Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(this.B.x, " * ").concat(Math.sin(this.grausToRad(2 * this.beta)), " / (").concat(Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(Math.sin(this.grausToRad(2 * this.beta)), "\n        Nx = ").concat(this.A.x * Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(this.C.x * Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(this.B.x * Math.sin(this.grausToRad(2 * this.beta)), " / (").concat(Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(Math.sin(this.grausToRad(2 * this.beta)), "\n        Nx = ").concat((this.A.x * Math.sin(this.grausToRad(2 * this.alfa))) + (this.C.x * Math.sin(this.grausToRad(2 * this.charlie))) + (this.B.x * Math.sin(this.grausToRad(2 * this.beta))), " / (").concat(Math.sin(this.grausToRad(2 * this.alfa)) + Math.sin(this.grausToRad(2 * this.charlie)) + Math.sin(this.grausToRad(2 * this.beta)), "\n        Nx = ").concat(this.circuncentro().N.x, "\n\n        Ny = Ay * sin(2 * alfa) + Cy * sin(2 * charlie) + By * sin(2 * beta) / sin(2 * alfa) + sin(2 * charlie) + sin(2 * beta)\n        Ny = ").concat(this.A.y, " * ").concat(Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(this.C.y, " ").concat(Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(this.B.y, " * ").concat(Math.sin(this.grausToRad(2 * this.beta)), " / (").concat(Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(Math.sin(this.grausToRad(2 * this.beta)), "\n        Ny = ").concat(this.A.y * Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(this.C.y * Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(this.B.y * Math.sin(this.grausToRad(2 * this.beta)), " / (").concat(Math.sin(this.grausToRad(2 * this.alfa)), " + ").concat(Math.sin(this.grausToRad(2 * this.charlie)), " + ").concat(Math.sin(this.grausToRad(2 * this.beta)), "\n        Ny = ").concat((this.A.y * Math.sin(this.grausToRad(2 * this.alfa))) + (this.C.y * Math.sin(this.grausToRad(2 * this.charlie))) + (this.B.y * Math.sin(this.grausToRad(2 * this.beta))), " / (").concat(Math.sin(this.grausToRad(2 * this.alfa)) + Math.sin(this.grausToRad(2 * this.charlie)) + Math.sin(this.grausToRad(2 * this.beta)), "\n        Ny = ").concat(this.circuncentro().N.y, "\n\n\n        Px = Cx + Bx / 2\n        Px = ").concat(this.C.x, " + ").concat(this.B.x, " / 2\n        Px = ").concat(this.C.x + this.B.x, " / 2\n        Px = ").concat(this.circuncentro().P.x, "\n\n        Py = Cy + By / 2\n        Py = ").concat(this.C.y, " + ").concat(this.B.y, " / 2\n        Py = ").concat(this.C.y + this.B.y, " / 2\n        Py = ").concat(this.circuncentro().P.y, "\n\n\n        Qx = Ax + Bx / 2\n        Qx = ").concat(this.A.x, " + ").concat(this.B.x, " / 2\n        Qx = ").concat(this.A.x + this.B.x, " / 2\n        Qx = ").concat(this.circuncentro().Q.x, "\n\n        Qy = Ay + By / 2\n        Qy = ").concat(this.A.y, " + ").concat(this.B.y, " / 2\n        Qy = ").concat(this.A.y + this.B.y, " / 2\n        Qy = ").concat(this.circuncentro().Q.y, "\n\n\n        Rx = Ax + Cx / 2\n        Rx = ").concat(this.A.x, " + ").concat(this.C.x, " / 2\n        Rx = ").concat(this.A.x + this.C.x, " / 2\n        Rx = ").concat(this.circuncentro().R.x, "\n\n        Ry = Ay + Cy / 2\n        Ry = ").concat(this.A.y, " + ").concat(this.C.y, " / 2\n        Ry = ").concat(this.A.y + this.C.y, " / 2\n        Ry = ").concat(this.circuncentro().R.y, "\n\n        ORTOCENTRO\n\n        H = (").concat(this.ortocentro().x, " , ").concat(this.ortocentro().y, ")\n\n        se tri\u00E2ngulo n\u00E3o tri\u00E2ngulo ret\u00E2ngulo {\n\n        Hx = Ax * tan(alfa) + Cx * tan(charlie) + Bx * tan(beta) / tan(alfa) + tan(charlie) + tan(beta)\n        Hx = ").concat(this.A.x, " * ").concat(Math.tan(this.alfa), " + ").concat(this.C.x, " * ").concat(Math.tan(this.charlie), " + ").concat(this.B.x, " * ").concat(Math.tan(this.beta), " / ").concat(Math.tan(this.alfa), " + ").concat(Math.tan(this.charlie), " + ").concat(Math.tan(this.beta), " \n        Hx = ").concat(this.A.x * Math.tan(this.alfa), " + ").concat(this.C.x * Math.tan(this.charlie), " + ").concat(this.B.x * Math.tan(this.beta), " / ").concat(Math.tan(this.alfa), " + ").concat(Math.tan(this.charlie), " + ").concat(Math.tan(this.beta), " \n        Hx = ").concat((this.A.x * Math.tan(this.alfa)) + (this.C.x * Math.tan(this.charlie)) + (this.B.x * Math.tan(this.beta)), " / ").concat(Math.tan(this.alfa) + Math.tan(this.charlie) + Math.tan(this.beta), " \n        Hx = ").concat(this.ortocentro().x, "\n\n        Hy = Ay * tan(alfa) + Cy * tan(charlie) + By * tan(beta) / tan(alfa) + tan(charlie) + tan(beta)\n        Hy = ").concat(this.A.y, " * ").concat(Math.tan(this.alfa), " + ").concat(this.C.y, " * ").concat(Math.tan(this.charlie), " + ").concat(this.B.y, " * ").concat(Math.tan(this.beta), " / ").concat(Math.tan(this.alfa), " + ").concat(Math.tan(this.charlie), " + ").concat(Math.tan(this.beta), " \n        Hy = ").concat(this.A.y * Math.tan(this.alfa), " + ").concat(this.C.y * Math.tan(this.charlie), " + ").concat(this.B.y * Math.tan(this.beta), " / ").concat(Math.tan(this.alfa), " + ").concat(Math.tan(this.charlie), " + ").concat(Math.tan(this.beta), " \n        Hy = ").concat((this.A.y * Math.tan(this.alfa)) + (this.C.y * Math.tan(this.charlie)) + (this.B.y * Math.tan(this.beta)), " / ").concat(Math.tan(this.alfa) + Math.tan(this.charlie) + Math.tan(this.beta), " \n        Hy = ").concat(this.ortocentro().y, "\n\n        } se n\u00E3o {\n\n            Hx = ").concat(this.angleRet(true) == "nenhum" ? "NaN" : this.angleRet(true) + "x", "\n            Hx = ").concat(this.angleRet(true) == "nenhum" ? "NaN" : this.ortocentro().x, "\n\n            Hy = ").concat(this.angleRet(true) == "nenhum" ? "Nan" : this.ortocentro().x + "y", "\n            Hy = ").concat(this.angleRet(true) == "nenhum" ? "NaN" : this.ortocentro().y, "\n\n        }\n\n        "));
    };
    Triangulo.prototype.radToGraus = function (rad) {
        return rad * (180 / Math.PI);
    };
    Triangulo.prototype.grausToRad = function (angle) {
        return angle * Math.PI / 180;
    };
    Triangulo.prototype.tipoTriangulo = function () {
        var angulos = "nenhum";
        var lados = "nenhum";
        switch (true) {
            case Math.round(this.alfa) == 90 || Math.round(this.beta) == 90 || Math.round(this.charlie) == 90:
                angulos = "retângulo";
                break;
            case Math.round(this.alfa) < 90 && Math.round(this.beta) < 90 && Math.round(this.charlie) < 90:
                angulos = "acutângulo";
                break;
            case Math.round(this.alfa) > 90 || Math.round(this.beta) > 90 || Math.round(this.charlie) > 90:
                angulos = "obtusângulo";
                break;
        }
        switch (true) {
            case this.a == this.b && this.b == this.c && this.c == this.a:
                lados = "equilátero";
                break;
            case this.a == this.b || this.b == this.c || this.c == this.a:
                lados = "isósceles";
                break;
            case this.a != this.b && this.b != this.c && this.c != this.a:
                lados = "ethis.scaleno";
                break;
        }
        return {
            angulos: angulos,
            lados: lados
        };
    };
    Triangulo.prototype.angleRet = function (lado) {
        var res = "nenhum";
        switch (true) {
            case Math.round(this.alfa) == 90:
                res = lado ? "A" : "alfa";
                break;
            case Math.round(this.beta) == 90:
                res = lado ? "B" : "beta";
                break;
            case Math.round(this.beta) == 90:
                res = lado ? "C" : "charlie";
                break;
        }
        return res;
    };
    return Triangulo;
}());
