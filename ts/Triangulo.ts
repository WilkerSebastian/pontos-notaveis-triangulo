class Triangulo {

    A: { x: number, y: number }
    B: { x: number, y: number }
    C: { x: number, y: number }
    a: number
    b: number
    c: number
    alfa: number
    beta: number
    charlie: number

    constructor(A: { x: number, y: number }, B: { x: number, y: number }, C: { x: number, y: number }) {

        this.A = A
        this.B = B
        this.C = C
        this.a = this.getLine(this.A, this.B)
        this.b = this.getLine(this.B, this.C)
        this.c = this.getLine(this.C, this.A)
        this.alfa = this.getAngle("alfa")
        this.beta = this.getAngle("beta")
        this.charlie = this.getAngle("charlie")

    }

    getAngle(tipo: string) {

        switch (tipo) {

            // arc cos b² – a² – c² / –2.a.c
            case "alfa": return this.radToGraus(Math.acos((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c)))

            // arc cos c² – a² – b² / –2.a.b
            case "beta": return this.radToGraus(Math.acos((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b)))

            // arc cos a² – c² – b² / –2.c.b
            case "charlie": return this.radToGraus(Math.acos((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b)))
        }
        return 0

    }

    isValid() {

        return (Math.abs(this.b - this.c) < this.a && this.a < this.b + this.c) && (Math.abs(this.a - this.c) < this.b && this.b < this.a + this.c) && (Math.abs(this.a - this.b) < this.c && this.c < this.a + this.b)

    }

    getPerimetro() {

        return this.a + this.b + this.c

    }

    getLine(p1: { x: number, y: number }, p2: { x: number, y: number }) {

        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

    }

    render(ctx: CanvasRenderingContext2D) {

        const mostar = {

            circuncentro: $("#circuncentro").prop("checked") as boolean,
            ortocentro: $("#ortocentro").prop("checked") as boolean,
            baricentro: $("#baricentro").prop("checked") as boolean,
            incentro: $("#incentro").prop("checked") as boolean,
            extra: $("#extras").prop("checked") as boolean

        }

        const G = this.scale(this.baricentro().x, this.baricentro().y)
        const I = this.scale(this.incentro().x, this.incentro().y)
        const H = this.scale(this.ortocentro().x, this.ortocentro().y)

        const N = this.scale(this.circuncentro().N.x, this.circuncentro().N.y)
        const P = this.scale(this.circuncentro().P.x, this.circuncentro().P.y)
        const Q = this.scale(this.circuncentro().Q.x, this.circuncentro().Q.y)
        const R = this.scale(this.circuncentro().R.x, this.circuncentro().R.y)

        const A = this.scale(this.A.x, this.A.y)
        const B = this.scale(this.B.x, this.B.y)
        const C = this.scale(this.C.x, this.C.y)

        ctx.strokeStyle = "#5E0099"

        const triangulo = new Path2D()

        triangulo.moveTo(A.x, A.y)
        triangulo.lineTo(B.x, B.y)
        triangulo.lineTo(C.x, C.y)
        triangulo.lineTo(A.x, A.y)

        triangulo.closePath()

        ctx.stroke(triangulo)

        ctx.fillStyle = "white"
        ctx.fill(triangulo)

        if (mostar.extra) {

            ctx.fillStyle = "black"
            ctx.font = "15px ARIAL"

            ctx.fillText(`A(${this.A.x.toPrecision(2)} , ${this.A.y.toPrecision(2)})` , A.x - 75 , A.y + 25)
            ctx.fillText(`B(${this.B.x.toPrecision(2)} , ${this.B.y.toPrecision(2)})` , B.x , B.y - 45)
            ctx.fillText(`C(${this.C.x.toPrecision(2)} , ${this.C.y.toPrecision(2)})` , C.x + 25, C.y + 25)

            ctx.fillStyle = "black"

            ctx.fillText(`α: ${Math.round(this.alfa)}°` , A.x - 75 , A.y + 45)
            ctx.fillText(`β: ${Math.round(this.beta)}°` , B.x , B.y - 25)
            ctx.fillText(`γ: ${Math.round(this.charlie)}°` , C.x + 25 , C.y + 45)

        }
        if (mostar.baricentro) {

            const bari = new Path2D;

            ctx.strokeStyle = "#0300FF"

            bari.moveTo(A.x, A.y)
            bari.lineTo(G.x, G.y)

            bari.moveTo(B.x, B.y)
            bari.lineTo(G.x, G.y)

            bari.moveTo(C.x, C.y)
            bari.lineTo(G.x, G.y)

            ctx.stroke(bari)

            bari.closePath()

            if (mostar.extra) {

                ctx.fillStyle = "black"
                ctx.font = "10px ARIAL"
    
                ctx.fillText(`G(${this.baricentro().x.toPrecision(2)} , ${this.baricentro().y.toPrecision(2)})` , G.x , G.y)
    
            }

        }
        if (mostar.incentro) {

            const inc = new Path2D;

            ctx.strokeStyle = "#0090FF"

            inc.moveTo(A.x, A.y)
            inc.lineTo(I.x, I.y)

            inc.moveTo(B.x, B.y)
            inc.lineTo(I.x, I.y)

            inc.moveTo(C.x, C.y)
            inc.lineTo(I.x, I.y)

            ctx.stroke(inc)

            inc.closePath()

            if (mostar.extra) {

                ctx.fillStyle = "black"
                ctx.font = "10px ARIAL"
    
                ctx.fillText(`I(${this.incentro().x.toPrecision(2)} , ${this.incentro().y.toPrecision(2)})` , I.x , I.y)
    
            }

        }
        if (mostar.ortocentro) {

            const ort = new Path2D;

            ctx.strokeStyle = "#C22D00"

            ort.moveTo(H.x, H.y)
            ort.lineTo(A.x, A.y)

            ort.moveTo(H.x, H.y)
            ort.lineTo(B.x, B.y)

            ort.moveTo(H.x, H.y)
            ort.lineTo(C.x, C.y)

            if (this.tipoTriangulo().angulos == "retângulo") {

                const inverse = this.scale(this.ortocentro().ax, this.ortocentro().ay)

                ort.moveTo(H.x, H.y)
                ort.lineTo(inverse.x , inverse.y)
                
            }

            ctx.stroke(ort)

            ort.closePath()

            if (mostar.extra) {

                ctx.fillStyle = "black"
                ctx.font = "10px ARIAL"
    
                ctx.fillText(`H(${this.ortocentro().x.toPrecision(2)} , ${this.ortocentro().y.toPrecision(2)})` , H.x , H.y)
    
            }

        }
        if (mostar.circuncentro) {

            const cir = new Path2D()

            ctx.strokeStyle = "#E164FF"

            cir.moveTo(P.x, P.y)
            cir.lineTo(N.x, N.y)


            cir.moveTo(Q.x, Q.y)
            cir.lineTo(N.x, N.y)

            cir.moveTo(R.x, R.y)
            cir.lineTo(N.x, N.y)

            if (this.tipoTriangulo().lados == "equilátero") {

                const circulo = new Path2D()

                const r = (Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.c, 2)) / 3) * Math.pow(this.c, 2.4)

                ctx.fillStyle = "#420000"

                circulo.arc(N.x, N.y, r, this.grausToRad(0), this.grausToRad(360), true)

                ctx.stroke(circulo)

                circulo.closePath()

            }
            if (this.tipoTriangulo().angulos == "retângulo") {

                const inverse = this.scale(this.circuncentro().inverse.x, this.circuncentro().inverse.y)

                cir.moveTo(N.x, N.y)
                cir.lineTo(inverse.x , inverse.y)
                
                
            }

            ctx.stroke(cir)

            cir.closePath()

            if (mostar.extra) {

                ctx.fillStyle = "black"
                ctx.font = "10px ARIAL"
    
                ctx.fillText(`N(${this.circuncentro().N.x.toPrecision(2)} , ${this.circuncentro().N.y.toPrecision(2)})` , N.x , N.y + 10)
                ctx.fillText(`P(${this.circuncentro().P.x.toPrecision(2)} , ${this.circuncentro().P.y.toPrecision(2)})` , P.x - 5, P.y)
                ctx.fillText(`Q(${this.circuncentro().Q.x.toPrecision(2)} , ${this.circuncentro().Q.y.toPrecision(2)})` , Q.x + 5, Q.y)
                ctx.fillText(`R(${this.circuncentro().R.x.toPrecision(2)} , ${this.circuncentro().R.y.toPrecision(2)})` , R.x , R.y - 5)
    
            }

        }

    }

    baricentro() {

        return {

            x: (this.A.x + this.B.x + this.C.x) / 3,
            y: (this.A.y + this.B.y + this.C.y) / 3

        }

    }

    incentro() {

        const p = this.getPerimetro()

        return {

            x: ((this.a * this.A.x) + (this.b * this.B.x) + (this.c * this.C.x)) / p,
            y: ((this.a * this.A.y) + (this.b * this.B.y) + (this.c * this.C.y)) / p

        }

    }

    circuncentro() {

        const cir = {

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

        }

        if (this.angleRet() != "nenhum") {

            switch (this.angleRet()) {
                case "alfa":

                    cir.inverse.x = this.A.x
                    cir.inverse.y = this.A.y

                    break;
                case "beta":
                   
                    cir.inverse.x = this.B.x
                    cir.inverse.y = this.B.y

                    break;
                case "charlie":

                    cir.inverse.x = this.C.x
                    cir.inverse.y = this.C.y

                    break;

            }

        }
        
        return cir

    }

    ortocentro() {

        let H = {

            x: ((this.A.x * Math.tan(this.grausToRad(this.alfa))) + (this.C.x * Math.tan(this.grausToRad(this.charlie))) + (this.B.x * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta))),
            y: ((this.A.y * Math.tan(this.grausToRad(this.alfa))) + (this.C.y * Math.tan(this.grausToRad(this.charlie))) + (this.B.y * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta))),
            ax: NaN, 
            ay: NaN

        }

        if (this.angleRet() != "nenhum") {

            switch (this.angleRet()) {
                case "alfa":

                    H.x = this.A.x
                    H.y = this.A.y
                    H.ax = (this.B.x + this.C.x) / 2
                    H.ay = (this.B.y + this.C.y) / 2

                    break;
                case "beta":

                    H.x = this.B.x
                    H.y = this.B.y
                    H.ax = (this.A.x + this.C.x) / 2
                    H.ay = (this.A.y + this.C.y) / 2

                    break;
                case "charlie":

                    H.x = this.C.x
                    H.y = this.C.y
                    H.ax = (this.A.x + this.B.x) / 2
                    H.ay = (this.A.y + this.B.y) / 2

                    break;

            }

        }

        return H

    }

    calculo() {



        const p = this.getPerimetro()

        $("#calculo").val(`

        sqrt = raiz quadrada

        A = (${this.A.x} , ${this.A.y})
        B = (${this.B.x} , ${this.B.y})
        C = (${this.C.x} , ${this.C.y})

        LADOS

        a = sqrt( (Ax - Bx)² + (Ay - By)² )
        a = sqrt( (${this.A.x} - ${this.B.x})² + (${this.A.y} - ${this.B.y})² )
        a = sqrt( (${this.A.x - this.B.x})² + (${this.A.y - this.B.y})² )
        a = sqrt( ${Math.pow(this.A.x - this.B.x, 2)} + ${Math.pow(this.A.y - this.B.y, 2)} )
        a = sqrt( ${Math.pow(this.A.x - this.B.x, 2) + Math.pow(this.A.y - this.B.y, 2)} )
        a = ${this.a}

        b = sqrt( (Bx - Cx)² + (By - Cy)² )
        b = sqrt( (${this.B.x} - ${this.C.x})² + (${this.B.y} - ${this.C.y})² )
        b = sqrt( (${this.B.x - this.C.x})² + (${this.B.y - this.C.y})² )
        b = sqrt( ${Math.pow(this.B.x - this.C.x, 2)} + ${Math.pow(this.B.y - this.C.y, 2)} )
        b = sqrt( ${Math.pow(this.B.x - this.C.x, 2) + Math.pow(this.B.y - this.C.y, 2)} )
        b = ${this.b}

        c = sqrt( (Cx - Ax)² + (Cy - Ay)² )
        c = sqrt( (${this.C.x} - ${this.A.x})² + (${this.C.y} - ${this.A.y})² )
        c = sqrt( (${this.C.x - this.A.x})² + (${this.C.y - this.A.y})² )
        c = sqrt( ${Math.pow(this.C.x - this.A.x, 2)} + ${Math.pow(this.C.y - this.A.y, 2)} )
        c = sqrt( ${Math.pow(this.C.x - this.A.x, 2) + Math.pow(this.C.y - this.A.y, 2)} )
        c = ${this.c}
        
        CONDIÇÃO DE EXISTÊNCIA DO TRIÂNGULO

        | b - c | < a < b + c
        | ${this.b} - ${this.c} | < ${this.a} < ${this.b} + ${this.c}
        ${Math.abs(this.b - this.c)} < ${this.a} < ${this.b + this.c}

        | a - c | < b < a + c
        | ${this.a} - ${this.c} | < ${this.b} < ${this.a} + ${this.c}
        ${Math.abs(this.a - this.c)} < ${this.b} < ${this.a + this.c}

        | a - b | < c < a + b
        | ${this.a} - ${this.b} | < ${this.c} < ${this.a} + ${this.b}
        ${Math.abs(this.a - this.b)} < ${this.c} < ${this.a + this.b} 

        
        condição de existência: ${this.isValid() ? "verdadeiro" : "falso"}

        PERÍMETRO

        p = ${this.getPerimetro()}

        p = a + b + c
        p = ${this.a} + ${this.b} + ${this.c}
        p = ${this.getPerimetro()}

        ÂNGULO DO TRIÂNGULO

        alfa = ${this.alfa}°
        beta = ${this.beta}°
        charlie = ${this.charlie}°

        alfa = arccos( b² – a² – c² / –2 * a * c ) * 180 / π
        alfa = arccos( ${this.b}² – ${this.a}² – ${this.c}² / –2 * ${this.a} * ${this.c} ) * 180 / π
        alfa = arccos( ${Math.pow(this.b, 2)} – ${Math.pow(this.a, 2)} – ${Math.pow(this.c, 2)} / –2 * ${this.a} * ${this.c} ) * 180 / π
        alfa = arccos( ${Math.pow(this.b, 2)} – ${Math.pow(this.a, 2)} – ${Math.pow(this.c, 2)} / ${-2 * this.a * this.c} ) * 180 / π
        alfa = arccos( ${Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)} / ${-2 * this.a * this.c} ) * 180 / π
        alfa = arccos( ${(Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c)} ) * 180 / π
        alfa = ${Math.acos((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c))} * 180 / π
        alfa = ${Math.acos((Math.pow(this.b, 2) - Math.pow(this.a, 2) - Math.pow(this.c, 2)) / (-2 * this.a * this.c)) * 180} / ${Math.PI}
        alfa = ${this.alfa}°

        beta = arccos( c² – a² – b² / –2 * a * b ) * 180 / π
        beta = arccos( ${this.c}² – ${this.a}² – ${this.b}² / –2 * ${this.a} * ${this.b} ) * 180 / π
        beta = arccos( ${Math.pow(this.c, 2)} – ${Math.pow(this.a, 2)} – ${Math.pow(this.b, 2)} / –2 * ${this.a} * ${this.b} ) * 180 / π
        beta = arccos( ${Math.pow(this.c, 2)} – ${Math.pow(this.a, 2)} – ${Math.pow(this.b, 2)} / ${-2 * this.a * this.b} ) * 180 / π
        beta = arccos( ${Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)} / ${-2 * this.a * this.b} ) * 180 / π
        beta = arccos( ${(Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b)} ) * 180 / π
        beta = ${Math.acos((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b))} * 180 / π
        beta = ${Math.acos((Math.pow(this.c, 2) - Math.pow(this.a, 2) - Math.pow(this.b, 2)) / (-2 * this.a * this.b)) * 180} / ${Math.PI}
        beta = ${this.beta}°

        charlie = arccos( a² – c² – b² / –2 * c * b ) * 180 / π
        charlie = arccos( ${this.a}² – ${this.c}² – ${this.b}² / –2 * ${this.c} * ${this.b} ) * 180 / π
        charlie = arccos( ${Math.pow(this.a, 2)} – ${Math.pow(this.c, 2)} – ${Math.pow(this.b, 2)} / –2 * ${this.c} * ${this.b} ) * 180 / π
        charlie = arccos( ${Math.pow(this.a, 2)} – ${Math.pow(this.c, 2)} – ${Math.pow(this.b, 2)} / ${-2 * this.c * this.b} ) * 180 / π
        charlie = arccos( ${Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)} / ${-2 * this.c * this.b} ) * 180 / π
        charlie = arccos( ${(Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b)} ) * 180 / π
        charlie = ${Math.acos((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b))} * 180 / π
        charlie = ${Math.acos((Math.pow(this.a, 2) - Math.pow(this.c, 2) - Math.pow(this.b, 2)) / (-2 * this.c * this.b)) * 180} / ${Math.PI}
        charlie = ${this.charlie}°

        TIPO DO TRIANGULO

        pelos angulos ele é: ${this.tipoTriangulo().angulos}

        acutângulo: ${Math.round(this.alfa) < 90 && Math.round(this.beta) < 90 && Math.round(this.charlie) < 90 ? "verdadeiro" : "falso"}
        alfa < 90° E beta < 90° E charlie < 90°
        ${Math.round(this.alfa)}° < 90° E ${Math.round(this.beta)}° < 90° E ${Math.round(this.charlie)}° < 90°

        retângulo: ${Math.round(this.alfa) == 90 || Math.round(this.beta) == 90 || Math.round(this.charlie) == 90 ? "verdadeiro" : "falso"}
        alfa = 90° OU beta = 90° OU charlie = 90°
        ${Math.round(this.alfa)}° = 90° OU ${Math.round(this.beta)}° = 90° OU ${Math.round(this.charlie)}° = 90°
        
        obtusângulo: ${Math.round(this.alfa) > 90 || Math.round(this.beta) > 90 || Math.round(this.charlie) > 90 ? "verdadeiro" : "falso"}
        alfa > 90° OU beta > 90° OU charlie > 90°
        ${Math.round(this.alfa)}° > 90° OU ${Math.round(this.beta)}° > 90° OU ${Math.round(this.charlie)}° > 90°

        pelos lados ele é: ${this.tipoTriangulo().lados}

        equilátero: ${this.a == this.b && this.b == this.c && this.c == this.a ? "verdadeiro" : "falso"}
        a = b E b = c E c = a 
        ${this.a} = ${this.b} E ${this.b} = ${this.c} E ${this.c} = ${this.a}
        
        isósceles: ${this.a == this.b || this.b == this.c || this.c == this.a ? "verdadeiro" : "falso"}
        a = b OU b = c OU c = a
        ${this.a} = ${this.b} OU ${this.b} = ${this.c} OU ${this.c} = ${this.a}

        ethis.scaleno ${this.a != this.b && this.b != this.c && this.c != this.a ? "verdadeiro" : "falso"}
        a ≠ b E b ≠ c E c ≠ a
        ${this.a} ≠ ${this.b} E ${this.b} ≠ ${this.c} E ${this.c} ≠ ${this.a}
        

        BARICENTRO

        G = (${this.baricentro().x} , ${this.baricentro().y})

        Gx = Ax + Bx + Cx / 3
        Gx = ${this.A.x} + ${this.B.x} + ${this.C.x} / 3
        Gx = ${(this.A.x + this.B.x + this.C.x)} / 3
        gx = ${(this.A.x + this.B.x + this.C.x) / 3}

        Gy = Ax + Bx + Cx / 3
        Gy = ${this.A.y} + ${this.B.y} + ${this.C.y} / 3
        Gy = ${(this.A.y + this.B.y + this.C.y)} / 3
        Gy = ${(this.A.y + this.B.y + this.C.y) / 3}

        INCENTRO

        I = (${this.incentro().x} , ${this.incentro().y})

        Ix = a * Ax + * b * Bx + c * Cx / p
        Ix = ${this.a} * ${this.A.x} + ${this.b} * ${this.B.x} + ${this.c} * ${this.C.x} / ${p}
        Ix = ${this.a * this.A.x} + ${this.b * this.B.x} + ${this.c * this.C.x} / ${p}
        Ix = ${(this.a * this.A.x + this.b * this.B.x + this.c * this.C.x)} / ${p}
        Ix = ${(this.a * this.A.x + this.b * this.B.x + this.c * this.C.x) / p}

        Iy = a * Ax + * b * Bx + c * Cx / p
        Iy = ${this.a} * ${this.A.y} + ${this.b} * ${this.B.y} + ${this.c} * ${this.C.y} / ${p}
        Iy = ${this.a * this.A.y} + ${this.b * this.B.y} + ${this.c * this.C.y} / ${p}
        Iy = ${(this.a * this.A.y + this.b * this.B.y + this.c * this.C.y)} / ${p}
        Iy = ${(this.a * this.A.y + this.b * this.B.y + this.c * this.C.y) / p}

        CIRCUNCENTRO

        N = (${this.circuncentro().N.x} , ${this.circuncentro().N.y})

        P = (${this.circuncentro().P.x} , ${this.circuncentro().P.y})
        Q = (${this.circuncentro().Q.x} , ${this.circuncentro().Q.y})
        R = (${this.circuncentro().R.x} , ${this.circuncentro().R.y})

        Nx = Ax * sin(2 * alfa) + Cx * sin(2 * charlie) + Bx * sin(2 * beta) / sin(2 * alfa) + sin(2 * charlie) + sin(2 * beta)
        Nx = ${this.A.x} * ${Math.sin(this.grausToRad(2 * this.alfa))} + ${this.C.x} ${Math.sin(this.grausToRad(2 * this.charlie))} + ${this.B.x} * ${Math.sin(this.grausToRad(2 * this.beta))} / (${Math.sin(this.grausToRad(2 * this.alfa))} + ${Math.sin(this.grausToRad(2 * this.charlie))} + ${Math.sin(this.grausToRad(2 * this.beta))}
        Nx = ${this.A.x * Math.sin(this.grausToRad(2 * this.alfa))} + ${this.C.x * Math.sin(this.grausToRad(2 * this.charlie))} + ${this.B.x * Math.sin(this.grausToRad(2 * this.beta))} / (${Math.sin(this.grausToRad(2 * this.alfa))} + ${Math.sin(this.grausToRad(2 * this.charlie))} + ${Math.sin(this.grausToRad(2 * this.beta))}
        Nx = ${(this.A.x * Math.sin(this.grausToRad(2 * this.alfa))) + (this.C.x * Math.sin(this.grausToRad(2 * this.charlie))) + (this.B.x * Math.sin(this.grausToRad(2 * this.beta)))} / (${Math.sin(this.grausToRad(2 * this.alfa)) + Math.sin(this.grausToRad(2 * this.charlie)) + Math.sin(this.grausToRad(2 * this.beta))}
        Nx = ${this.circuncentro().N.x}

        Ny = Ay * sin(2 * alfa) + Cy * sin(2 * charlie) + By * sin(2 * beta) / sin(2 * alfa) + sin(2 * charlie) + sin(2 * beta)
        Ny = ${this.A.y} * ${Math.sin(this.grausToRad(2 * this.alfa))} + ${this.C.y} ${Math.sin(this.grausToRad(2 * this.charlie))} + ${this.B.y} * ${Math.sin(this.grausToRad(2 * this.beta))} / (${Math.sin(this.grausToRad(2 * this.alfa))} + ${Math.sin(this.grausToRad(2 * this.charlie))} + ${Math.sin(this.grausToRad(2 * this.beta))}
        Ny = ${this.A.y * Math.sin(this.grausToRad(2 * this.alfa))} + ${this.C.y * Math.sin(this.grausToRad(2 * this.charlie))} + ${this.B.y * Math.sin(this.grausToRad(2 * this.beta))} / (${Math.sin(this.grausToRad(2 * this.alfa))} + ${Math.sin(this.grausToRad(2 * this.charlie))} + ${Math.sin(this.grausToRad(2 * this.beta))}
        Ny = ${(this.A.y * Math.sin(this.grausToRad(2 * this.alfa))) + (this.C.y * Math.sin(this.grausToRad(2 * this.charlie))) + (this.B.y * Math.sin(this.grausToRad(2 * this.beta)))} / (${Math.sin(this.grausToRad(2 * this.alfa)) + Math.sin(this.grausToRad(2 * this.charlie)) + Math.sin(this.grausToRad(2 * this.beta))}
        Ny = ${this.circuncentro().N.y}


        Px = Cx + Bx / 2
        Px = ${this.C.x} + ${this.B.x} / 2
        Px = ${this.C.x + this.B.x} / 2
        Px = ${this.circuncentro().P.x}

        Py = Cy + By / 2
        Py = ${this.C.y} + ${this.B.y} / 2
        Py = ${this.C.y + this.B.y} / 2
        Py = ${this.circuncentro().P.y}


        Qx = Ax + Bx / 2
        Qx = ${this.A.x} + ${this.B.x} / 2
        Qx = ${this.A.x + this.B.x} / 2
        Qx = ${this.circuncentro().Q.x}

        Qy = Ay + By / 2
        Qy = ${this.A.y} + ${this.B.y} / 2
        Qy = ${this.A.y + this.B.y} / 2
        Qy = ${this.circuncentro().Q.y}


        Rx = Ax + Cx / 2
        Rx = ${this.A.x} + ${this.C.x} / 2
        Rx = ${this.A.x + this.C.x} / 2
        Rx = ${this.circuncentro().R.x}

        Ry = Ay + Cy / 2
        Ry = ${this.A.y} + ${this.C.y} / 2
        Ry = ${this.A.y + this.C.y} / 2
        Ry = ${this.circuncentro().R.y}

        ORTOCENTRO

        H = (${this.ortocentro().x} , ${this.ortocentro().y})

        se triângulo não triângulo retângulo {

        Hx = Ax * tan(alfa) + Cx * tan(charlie) + Bx * tan(beta) / tan(alfa) + tan(charlie) + tan(beta)
        Hx = ${this.A.x} * ${Math.tan(this.alfa)} + ${this.C.x} * ${Math.tan(this.charlie)} + ${this.B.x} * ${Math.tan(this.beta)} / ${Math.tan(this.alfa)} + ${Math.tan(this.charlie)} + ${Math.tan(this.beta)} 
        Hx = ${this.A.x * Math.tan(this.alfa)} + ${this.C.x * Math.tan(this.charlie)} + ${this.B.x * Math.tan(this.beta)} / ${Math.tan(this.alfa)} + ${Math.tan(this.charlie)} + ${Math.tan(this.beta)} 
        Hx = ${(this.A.x * Math.tan(this.alfa)) + (this.C.x * Math.tan(this.charlie)) + (this.B.x * Math.tan(this.beta))} / ${Math.tan(this.alfa) + Math.tan(this.charlie) + Math.tan(this.beta)} 
        Hx = ${this.ortocentro().x}

        Hy = Ay * tan(alfa) + Cy * tan(charlie) + By * tan(beta) / tan(alfa) + tan(charlie) + tan(beta)
        Hy = ${this.A.y} * ${Math.tan(this.alfa)} + ${this.C.y} * ${Math.tan(this.charlie)} + ${this.B.y} * ${Math.tan(this.beta)} / ${Math.tan(this.alfa)} + ${Math.tan(this.charlie)} + ${Math.tan(this.beta)} 
        Hy = ${this.A.y * Math.tan(this.alfa)} + ${this.C.y * Math.tan(this.charlie)} + ${this.B.y * Math.tan(this.beta)} / ${Math.tan(this.alfa)} + ${Math.tan(this.charlie)} + ${Math.tan(this.beta)} 
        Hy = ${(this.A.y * Math.tan(this.alfa)) + (this.C.y * Math.tan(this.charlie)) + (this.B.y * Math.tan(this.beta))} / ${Math.tan(this.alfa) + Math.tan(this.charlie) + Math.tan(this.beta)} 
        Hy = ${this.ortocentro().y}

        } se não {

            Hx = ${this.angleRet(true) == "nenhum" ? "NaN" : this.angleRet(true) + "x"}
            Hx = ${this.angleRet(true) == "nenhum" ? "NaN" : this.ortocentro().x}

            Hy = ${this.angleRet(true) == "nenhum" ? "Nan" : this.ortocentro().x + "y"}
            Hy = ${this.angleRet(true) == "nenhum" ? "NaN" : this.ortocentro().y}

        }

        `)

    }

    radToGraus(rad: number) {

        return rad * (180 / Math.PI)

    }

    grausToRad(angle: number) {

        return angle * Math.PI / 180

    }

    tipoTriangulo() {

        let angulos = "nenhum"
        let lados = "nenhum"

        switch (true) {
            case Math.round(this.alfa) == 90 || Math.round(this.beta) == 90 || Math.round(this.charlie) == 90:

                angulos = "retângulo"

                break;

            case Math.round(this.alfa) < 90 && Math.round(this.beta) < 90 && Math.round(this.charlie) < 90:

                angulos = "acutângulo"

                break;
            case Math.round(this.alfa) > 90 || Math.round(this.beta) > 90 || Math.round(this.charlie) > 90:

                angulos = "obtusângulo"

                break;
        }

        switch (true) {
            case this.a == this.b && this.b == this.c && this.c == this.a:

                lados = "equilátero"

                break;
            case this.a == this.b || this.b == this.c || this.c == this.a:

                lados = "isósceles"

                break;
            case this.a != this.b && this.b != this.c && this.c != this.a:

                lados = "ethis.scaleno"

                break;
        }

        return {

            angulos: angulos,
            lados: lados

        }

    }


    angleRet(lado?:boolean) {

        let res = "nenhum"

        switch (true) {
            case Math.round(this.alfa) == 90:

                res = lado ? "A" : "alfa"

                break;

            case Math.round(this.beta) == 90:

                res = lado ? "B" :"beta"

                break;

            case Math.round(this.beta) == 90:

                res = lado ? "C" :"charlie"

                break;
        }

        return res

    }

    scale = (a: number, b: number) => {

        return {
            x: (a * 20) + canvas.width / 2,
            y: (b * -20) + canvas.height / 2
        }

    }

}