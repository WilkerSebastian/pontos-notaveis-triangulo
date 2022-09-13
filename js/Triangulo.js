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
        this.alfa = this.getAngle("alfa");
        this.beta = this.getAngle("beta");
        this.charlie = this.getAngle("charlie");
    }
    Triangulo.prototype.getAngle = function (tipo) {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        switch (tipo) {
            case "alfa": return this.radToGraus(Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)));
            case "beta": return this.radToGraus(Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)));
            case "charlie": return this.radToGraus(Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)));
        }
        return 0;
    };
    Triangulo.prototype.isValid = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        return (Math.abs(bc - ca) < ab && ab < bc + ca) && (Math.abs(ab - ca) < bc && bc < ab + ca) && (Math.abs(ab - bc) < ca && ca < ab + bc);
    };
    Triangulo.prototype.getPerimetro = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        return ab + bc + ca;
    };
    Triangulo.prototype.getLine = function (p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    Triangulo.prototype.render = function (ctx) {
        var mostar = {
            circuncentro: $("#circuncentro").prop("checked"),
            ortocentro: $("#ortocentro").prop("checked"),
            baricentro: $("#baricentro").prop("checked"),
            incentro: $("#incentro").prop("checked")
        };
        console.log(this.ortocentro().x, this.ortocentro().y);
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
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
        ctx.fillStyle = "white";
        ctx.strokeStyle = "#5E0099";
        var triangulo = new Path2D();
        triangulo.moveTo(A.x, A.y);
        triangulo.lineTo(B.x, B.y);
        triangulo.lineTo(C.x, C.y);
        triangulo.lineTo(A.x, A.y);
        triangulo.closePath();
        ctx.stroke(triangulo);
        ctx.fill(triangulo);
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
        }
        if (mostar.ortocentro) {
            var ort = new Path2D;
            ctx.strokeStyle = "#C22D00";
            console.log({ TRI: this.scale(this.A.x, this.A.y) });
            console.log({ H: H });
            ort.moveTo(H.x, H.y);
            ort.lineTo(A.x, A.y);
            ort.moveTo(H.x, H.y);
            ort.lineTo(B.x, B.y);
            ort.moveTo(H.x, H.y);
            ort.lineTo(C.x, C.y);
            ctx.stroke(ort);
            ort.closePath();
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
                var r = (Math.sqrt(Math.pow(ab, 2) + Math.pow(ca, 2)) / 3) * Math.pow(ca, 2.4);
                ctx.fillStyle = "#420000";
                circulo.arc(N.x, N.y, r, this.grausToRad(0), this.grausToRad(360), true);
                ctx.fill(circulo);
                circulo.closePath();
            }
            ctx.stroke(cir);
            cir.closePath();
        }
    };
    Triangulo.prototype.baricentro = function () {
        return {
            x: (this.A.x + this.B.x + this.C.x) / 3,
            y: (this.A.y + this.B.y + this.C.y) / 3
        };
    };
    Triangulo.prototype.incentro = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        var p = this.getPerimetro();
        return {
            x: ((ab * this.A.x) + (bc * this.B.x) + (ca * this.C.x)) / p,
            y: ((ab * this.A.y) + (bc * this.B.y) + (ca * this.C.y)) / p
        };
    };
    Triangulo.prototype.circuncentro = function () {
        var cir = {
            N: {
                x: 0,
                y: 0
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
        };
        cir.N.x = ((cir.P.x * Math.tan(this.grausToRad(this.alfa))) + (cir.Q.x * Math.tan(this.grausToRad(this.charlie))) + (cir.R.x * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta)));
        cir.N.y = ((cir.P.y * Math.tan(this.grausToRad(this.alfa))) + (cir.Q.y * Math.tan(this.grausToRad(this.charlie))) + (cir.R.y * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta)));
        return cir;
    };
    Triangulo.prototype.ortocentro = function () {
        switch (true) {
            case Math.round(this.alfa) == 90:
                return this.C;
            case Math.round(this.beta) == 90:
                return this.A;
            case Math.round(this.charlie) == 90:
                return this.B;
        }
        return { x: NaN, y: NaN };
    };
    Triangulo.prototype.calculo = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
        var p = this.getPerimetro();
        $("#calculo").val("\n\n        sqrt = raiz quadrada\n\n        A = (".concat(this.A.x, " , ").concat(this.A.y, ")\n        B = (").concat(this.B.x, " , ").concat(this.B.y, ")\n        C = (").concat(this.C.x, " , ").concat(this.C.y, ")\n\n        LADOS\n\n        a = sqrt( (Ax - Bx)\u00B2 + (Ay - By)\u00B2 )\n        a = sqrt( (").concat(this.A.x, " - ").concat(this.B.x, ")\u00B2 + (").concat(this.A.y, " - ").concat(this.B.y, ")\u00B2 )\n        a = sqrt( (").concat(this.A.x - this.B.x, ")\u00B2 + (").concat(this.A.y - this.B.y, ")\u00B2 )\n        a = sqrt( ").concat(Math.pow(this.A.x - this.B.x, 2), " + ").concat(Math.pow(this.A.y - this.B.y, 2), " )\n        a = sqrt( ").concat(Math.pow(this.A.x - this.B.x, 2) + Math.pow(this.A.y - this.B.y, 2), " )\n        a = ").concat(ab, "\n\n        b = sqrt( (Bx - Cx)\u00B2 + (By - Cy)\u00B2 )\n        b = sqrt( (").concat(this.B.x, " - ").concat(this.C.x, ")\u00B2 + (").concat(this.B.y, " - ").concat(this.C.y, ")\u00B2 )\n        b = sqrt( (").concat(this.B.x - this.C.x, ")\u00B2 + (").concat(this.B.y - this.C.y, ")\u00B2 )\n        b = sqrt( ").concat(Math.pow(this.B.x - this.C.x, 2), " + ").concat(Math.pow(this.B.y - this.C.y, 2), " )\n        b = sqrt( ").concat(Math.pow(this.B.x - this.C.x, 2) + Math.pow(this.B.y - this.C.y, 2), " )\n        b = ").concat(bc, "\n\n        c = sqrt( (Cx - Ax)\u00B2 + (Cy - Ay)\u00B2 )\n        c = sqrt( (").concat(this.C.x, " - ").concat(this.A.x, ")\u00B2 + (").concat(this.C.y, " - ").concat(this.A.y, ")\u00B2 )\n        c = sqrt( (").concat(this.C.x - this.A.x, ")\u00B2 + (").concat(this.C.y - this.A.y, ")\u00B2 )\n        c = sqrt( ").concat(Math.pow(this.C.x - this.A.x, 2), " + ").concat(Math.pow(this.C.y - this.A.y, 2), " )\n        c = sqrt( ").concat(Math.pow(this.C.x - this.A.x, 2) + Math.pow(this.C.y - this.A.y, 2), " )\n        c = ").concat(ca, "\n        \n        CONDI\u00C7\u00C3O DE EXIST\u00CANCIA DO TRI\u00C2NGULO\n\n        | b - c | < a < b + c\n        | ").concat(bc, " - ").concat(ca, " | < ").concat(ab, " < ").concat(bc, " + ").concat(ca, "\n        ").concat(Math.abs(bc - ca), " < ").concat(ab, " < ").concat(bc + ca, "\n\n        | a - c | < b < a + c\n        | ").concat(ab, " - ").concat(ca, " | < ").concat(bc, " < ").concat(ab, " + ").concat(ca, "\n        ").concat(Math.abs(ab - ca), " < ").concat(bc, " < ").concat(ab + ca, "\n\n        | a - b | < c < a + b\n        | ").concat(ab, " - ").concat(bc, " | < ").concat(ca, " < ").concat(ab, " + ").concat(bc, "\n        ").concat(Math.abs(ab - bc), " < ").concat(ca, " < ").concat(ab + bc, " \n\n        \n        condi\u00E7\u00E3o de exist\u00EAncia: ").concat(this.isValid() ? "verdadeiro" : "falso", "\n\n        PER\u00CDMETRO\n\n        p = ").concat(this.getPerimetro(), "\n\n        p = a + b + c\n        p = ").concat(ab, " + ").concat(bc, " + ").concat(ca, "\n        p = ").concat(this.getPerimetro(), "\n\n        \u00C2NGULO DO TRI\u00C2NGULO\n\n        alfa = arccos( a\u00B2 - b\u00B2 - c\u00B2 / -2 * b * c ) * 180 / \u03C0\n        alfa = arccos( ").concat(ab, "\u00B2 - ").concat(bc, "\u00B2 - ").concat(ca, "\u00B2 / -2 * ").concat(bc, " * ").concat(ca, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(ab, "\u00B2 - ").concat(bc, "\u00B2 - ").concat(ca, "\u00B2 / -2 * ").concat(bc * ca, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(ab, "\u00B2 - ").concat(bc, "\u00B2 - ").concat(ca, "\u00B2 / ").concat(-2 * bc * ca, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(Math.pow(ab, 2), " - ").concat(Math.pow(bc, 2), " - ").concat(Math.pow(ca, 2), " / ").concat(-2 * bc * ca, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(Math.pow(ab, 2) - Math.pow(bc, 2), " - ").concat(Math.pow(ca, 2), " / ").concat(-2 * bc * ca, " ) * 180 / \u03C0\n        alfa = arccos( ").concat(Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2), " / ").concat(-2 * bc * ca, " ) * 180 / \u03C0\n        alfa = arccos( ").concat((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca), " ) * 180 / \u03C0\n        alfa = ").concat(Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)), " * 180 / \u03C0\n        alfa = ").concat(Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)), " * 180 / ").concat(Math.PI, "\n        alfa = ").concat(Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)), " * ").concat(180 / Math.PI, "\n        alfa = ").concat(Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)) * 180 / Math.PI, "\u00B0\n\n        beta = arccos( b\u00B2 \u2013 a\u00B2 \u2013 c\u00B2 / \u2013 2 * a * c ) * 180 / \u03C0\n        beta = arccos( ").concat(bc, "\u00B2 - ").concat(ab, "\u00B2 - ").concat(ca, "\u00B2 / -2 * ").concat(ab, " * ").concat(ca, " ) * 180 / \u03C0\n        beta = arccos( ").concat(bc, "\u00B2 - ").concat(ab, "\u00B2 - ").concat(ca, "\u00B2 / -2 * ").concat(ab * ca, " ) * 180 / \u03C0\n        beta = arccos( ").concat(bc, "\u00B2 - ").concat(ab, "\u00B2 - ").concat(ca, "\u00B2 / ").concat(-2 * ab * ca, " ) * 180 / \u03C0\n        beta = arccos( ").concat(Math.pow(bc, 2), " - ").concat(Math.pow(ab, 2), " - ").concat(Math.pow(ca, 2), " / ").concat(-2 * ab * ca, " ) * 180 / \u03C0\n        beta = arccos( ").concat(Math.pow(bc, 2) - Math.pow(ab, 2), " - ").concat(Math.pow(ca, 2), " / ").concat(-2 * ab * ca, " ) * 180 / \u03C0\n        beta = arccos( ").concat(Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2), " / ").concat(-2 * ab * ca, " ) * 180 / \u03C0\n        beta = arccos( ").concat((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca), " ) * 180 / \u03C0\n        beta = ").concat(Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)), " * 180 / \u03C0\n        beta = ").concat(Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)), " * 180 / ").concat(Math.PI, "\n        beta = ").concat(Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)), " * ").concat(180 / Math.PI, "\n        beta = ").concat(Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)) * 180 / Math.PI, "\u00B0\n\n        charlie = arccos( c\u00B2 \u2013 a\u00B2 \u2013 b\u00B2 / \u2013 2 * a * b ) * 180 / \u03C0\n        charlie = arccos( ").concat(ca, "\u00B2 - ").concat(ab, "\u00B2 - ").concat(bc, "\u00B2 / -2 * ").concat(ab, " * ").concat(bc, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(ca, "\u00B2 - ").concat(ab, "\u00B2 - ").concat(bc, "\u00B2 / -2 * ").concat(ab * bc, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(ca, "\u00B2 - ").concat(ab, "\u00B2 - ").concat(bc, "\u00B2 / ").concat(-2 * ab * bc, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(Math.pow(ca, 2), " - ").concat(Math.pow(ab, 2), " - ").concat(Math.pow(bc, 2), " / ").concat(-2 * ab * bc, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(Math.pow(ca, 2) - Math.pow(ab, 2), " - ").concat(Math.pow(bc, 2), " / ").concat(-2 * ab * bc, " ) * 180 / \u03C0\n        charlie = arccos( ").concat(Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2), " / ").concat(-2 * ab * bc, " ) * 180 / \u03C0\n        charlie = arccos( ").concat((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc), " ) * 180 / \u03C0\n        charlie = ").concat(Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)), " * 180 / \u03C0\n        charlie = ").concat(Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)), " * 180 / ").concat(Math.PI, "\n        charlie = ").concat(Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)), " * ").concat(180 / Math.PI, "\n        charlie = ").concat(Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)) * 180 / Math.PI, "\u00B0\n\n        alfa = ").concat(this.alfa, "\u00B0\n        beta = ").concat(this.beta, "\u00B0\n        charlie = ").concat(this.charlie, "\u00B0\n\n        TIPO DO TRIANGULO\n\n        pelos angulos ele \u00E9: ").concat(this.tipoTriangulo().angulos, "\n\n        acut\u00E2ngulo: ").concat(Math.round(this.alfa) < 90 && Math.round(this.beta) < 90 && Math.round(this.charlie) < 90 ? "verdadeiro" : "falso", "\n        alfa < 90\u00B0 E beta < 90\u00B0 E charlie < 90\u00B0\n        ").concat(Math.round(this.alfa), "\u00B0 < 90\u00B0 E ").concat(Math.round(this.beta), "\u00B0 < 90\u00B0 E ").concat(Math.round(this.charlie), "\u00B0 < 90\u00B0\n\n        ret\u00E2ngulo: ").concat(Math.round(this.alfa) == 90 || Math.round(this.beta) == 90 || Math.round(this.charlie) == 90 ? "verdadeiro" : "falso", "\n        alfa = 90\u00B0 OU beta = 90\u00B0 OU charlie = 90\u00B0\n        ").concat(Math.round(this.alfa), "\u00B0 = 90\u00B0 OU ").concat(Math.round(this.beta), "\u00B0 = 90\u00B0 OU ").concat(Math.round(this.charlie), "\u00B0 = 90\u00B0\n        \n        obtus\u00E2ngulo: ").concat(Math.round(this.alfa) > 90 || Math.round(this.beta) > 90 || Math.round(this.charlie) > 90 ? "verdadeiro" : "falso", "\n        alfa > 90\u00B0 OU beta > 90\u00B0 OU charlie > 90\u00B0\n        ").concat(Math.round(this.alfa), "\u00B0 > 90\u00B0 OU ").concat(Math.round(this.beta), "\u00B0 > 90\u00B0 OU ").concat(Math.round(this.charlie), "\u00B0 > 90\u00B0\n\n        pelos lados ele \u00E9: ").concat(this.tipoTriangulo().lados, "\n\n        equil\u00E1tero: ").concat(ab == bc && bc == ca && ca == ab ? "verdadeiro" : "falso", "\n        a = b E b = c E c = a \n        ").concat(ab, " = ").concat(bc, " E ").concat(bc, " = ").concat(ca, " E ").concat(ca, " = ").concat(ab, "\n        \n        is\u00F3sceles: ").concat(ab == bc || bc == ca || ca == ab ? "verdadeiro" : "falso", "\n        a = b OU b = c OU c = a\n        ").concat(ab, " = ").concat(bc, " OU ").concat(bc, " = ").concat(ca, " OU ").concat(ca, " = ").concat(ab, "\n\n        ethis.scaleno ").concat(ab != bc && bc != ca && ca != ab ? "verdadeiro" : "falso", "\n        a \u2260 b E b \u2260 c E c \u2260 a\n        ").concat(ab, " \u2260 ").concat(bc, " E ").concat(bc, " \u2260 ").concat(ca, " E ").concat(ca, " \u2260 ").concat(ab, "\n        \n\n        BARICENTRO\n\n        g = (").concat(this.baricentro().x, " , ").concat(this.baricentro().y, ")\n\n        gx = Ax + Bx + Cx / 3\n        gx = ").concat(this.A.x, " + ").concat(this.B.x, " + ").concat(this.C.x, " / 3\n        gx = ").concat((this.A.x + this.B.x + this.C.x), " / 3\n        gx = ").concat((this.A.x + this.B.x + this.C.x) / 3, "\n\n        gy = Ax + Bx + Cx / 3\n        gy = ").concat(this.A.y, " + ").concat(this.B.y, " + ").concat(this.C.y, " / 3\n        gy = ").concat((this.A.y + this.B.y + this.C.y), " / 3\n        gy = ").concat((this.A.y + this.B.y + this.C.y) / 3, "\n\n        INCENTRO\n\n        i = (").concat(this.incentro().x, " , ").concat(this.incentro().y, ")\n\n        ix = a * Ax + * b * Bx + c * Cx / p\n        ix = ").concat(ab, " * ").concat(this.A.x, " + ").concat(bc, " * ").concat(this.B.x, " + ").concat(ca, " * ").concat(this.C.x, " / ").concat(p, "\n        ix = ").concat(ab * this.A.x, " + ").concat(bc * this.B.x, " + ").concat(ca * this.C.x, " / ").concat(p, "\n        ix = ").concat((ab * this.A.x + bc * this.B.x + ca * this.C.x), " / ").concat(p, "\n        ix = ").concat((ab * this.A.x + bc * this.B.x + ca * this.C.x) / p, "\n\n        iy = a * Ax + * b * Bx + c * Cx / p\n        iy = ").concat(ab, " * ").concat(this.A.y, " + ").concat(bc, " * ").concat(this.B.y, " + ").concat(ca, " * ").concat(this.C.y, " / ").concat(p, "\n        iy = ").concat(ab * this.A.y, " + ").concat(bc * this.B.y, " + ").concat(ca * this.C.y, " / ").concat(p, "\n        iy = ").concat((ab * this.A.y + bc * this.B.y + ca * this.C.y), " / ").concat(p, "\n        iy = ").concat((ab * this.A.y + bc * this.B.y + ca * this.C.y) / p, "\n        \n        "));
    };
    /*equacaoDaReta(A: { x: number, y: number }, B: { x: number, y: number }, render?: boolean , cor?:string) {

        // y = mx + n
        const M = (B.y - A.y) / (B.x - A.x)
        const n = -1 * ((M * A.x) - A.y)

        function reta(x:number , y:number) {

            return {

                x:
                y:

            }
           
        }

        if (render) {

            reta.x = this.scale(reta.x , reta.y).x
            reta.y = this.scale(reta.x , reta.y).y

            ctx.fillStyle = cor ? cor : "black"

            const rt = new Path2D()

            switch (true) {
                case M < 0:

                    rt.moveTo(reta.x , reta.y * canvas.height)
                    rt.lineTo(reta.x , reta.y * -canvas.height)

                    break;

                case M > 0:

                    rt.moveTo(reta.x , reta.y * canvas.height)
                    rt.lineTo(reta.x , reta.y * -canvas.height)

                    break;
                case M == 0:

                    rt.moveTo(reta.x * -canvas.width , reta.y)
                    rt.lineTo(reta.x * canvas.width , reta.y)

                    break;
            }

            ctx.stroke(rt)

            return

        }

        return reta

    }*/
    Triangulo.prototype.radToGraus = function (rad) {
        return rad * (180 / Math.PI);
    };
    Triangulo.prototype.grausToRad = function (angle) {
        return angle * Math.PI / 180;
    };
    Triangulo.prototype.tipoTriangulo = function () {
        var ab = this.getLine(this.A, this.B);
        var bc = this.getLine(this.B, this.C);
        var ca = this.getLine(this.C, this.A);
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
            case ab == bc && bc == ca && ca == ab:
                lados = "equilátero";
                break;
            case ab == bc || bc == ca || ca == ab:
                lados = "isósceles";
                break;
            case ab != bc && bc != ca && ca != ab:
                lados = "ethis.scaleno";
                break;
        }
        return {
            angulos: angulos,
            lados: lados
        };
    };
    return Triangulo;
}());
