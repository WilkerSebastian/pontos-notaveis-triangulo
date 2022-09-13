class Triangulo {

    A: { x: number, y: number }
    B: { x: number, y: number }
    C: { x: number, y: number }
    alfa: number
    beta: number
    charlie: number

    constructor(A: { x: number, y: number }, B: { x: number, y: number }, C: { x: number, y: number }) {

        this.A = A
        this.B = B
        this.C = C
        this.alfa = this.getAngle("alfa")
        this.beta = this.getAngle("beta")
        this.charlie = this.getAngle("charlie")

    }

    getAngle(tipo: string) {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        switch (tipo) {
            case "alfa": return this.radToGraus(Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)))

            case "beta": return this.radToGraus(Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)))

            case "charlie": return this.radToGraus(Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)))
        }
        return 0

    }

    isValid() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        return (Math.abs(bc - ca) < ab && ab < bc + ca) && (Math.abs(ab - ca) < bc && bc < ab + ca) && (Math.abs(ab - bc) < ca && ca < ab + bc)

    }

    getPerimetro() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        return ab + bc + ca

    }

    getLine(p1: { x: number, y: number }, p2: { x: number, y: number }) {

        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

    }

    render(ctx: CanvasRenderingContext2D) {

        const mostar = {

            circuncentro: $("#circuncentro").prop("checked") as boolean,
            ortocentro: $("#ortocentro").prop("checked") as boolean,
            baricentro: $("#baricentro").prop("checked") as boolean,
            incentro: $("#incentro").prop("checked") as boolean

        }

        console.log(this.ortocentro().x, this.ortocentro().y);

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

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

        ctx.fillStyle = "white"
        ctx.strokeStyle = "#5E0099"

        const triangulo = new Path2D()

        triangulo.moveTo(A.x, A.y)
        triangulo.lineTo(B.x, B.y)
        triangulo.lineTo(C.x, C.y)
        triangulo.lineTo(A.x, A.y)

        triangulo.closePath()

        ctx.stroke(triangulo)

        ctx.fill(triangulo)

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

        }
        if (mostar.ortocentro) {

            const ort = new Path2D;

            ctx.strokeStyle = "#C22D00"

            console.log({ TRI: this.scale(this.A.x, this.A.y) });
            console.log({ H });

            ort.moveTo(H.x, H.y)
            ort.lineTo(A.x, A.y)

            ort.moveTo(H.x, H.y)
            ort.lineTo(B.x, B.y)

            ort.moveTo(H.x, H.y)
            ort.lineTo(C.x, C.y)

            ctx.stroke(ort)

            ort.closePath()

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

                const r = (Math.sqrt(Math.pow(ab, 2) + Math.pow(ca, 2)) / 3) * Math.pow(ca, 2.4)

                ctx.fillStyle = "#420000"

                circulo.arc(N.x, N.y, r, this.grausToRad(0), this.grausToRad(360), true)

                ctx.fill(circulo)

                circulo.closePath()

            }

            ctx.stroke(cir)

            cir.closePath()

        }

    }

    baricentro() {

        return {

            x: (this.A.x + this.B.x + this.C.x) / 3,
            y: (this.A.y + this.B.y + this.C.y) / 3

        }

    }

    incentro() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        const p = this.getPerimetro()

        return {

            x: ((ab * this.A.x) + (bc * this.B.x) + (ca * this.C.x)) / p,
            y: ((ab * this.A.y) + (bc * this.B.y) + (ca * this.C.y)) / p

        }

    }

    circuncentro() {

        const cir = {

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

        }

        cir.N.x = ((cir.P.x * Math.tan(this.grausToRad(this.alfa))) + (cir.Q.x * Math.tan(this.grausToRad(this.charlie))) + (cir.R.x * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta)))
        cir.N.y = ((cir.P.y * Math.tan(this.grausToRad(this.alfa))) + (cir.Q.y * Math.tan(this.grausToRad(this.charlie))) + (cir.R.y * Math.tan(this.grausToRad(this.beta)))) / (Math.tan(this.grausToRad(this.alfa)) + Math.tan(this.grausToRad(this.charlie)) + Math.tan(this.grausToRad(this.beta)))

        return cir

    }

    ortocentro() {

        switch (true) {
            case Math.round(this.alfa) == 90:

                return this.C;

            case Math.round(this.beta) == 90:
                return this.A;

            case Math.round(this.charlie) == 90:

                return this.B;
        }

        return { x: NaN, y: NaN }

    }

    calculo() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

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
        a = ${ab}

        b = sqrt( (Bx - Cx)² + (By - Cy)² )
        b = sqrt( (${this.B.x} - ${this.C.x})² + (${this.B.y} - ${this.C.y})² )
        b = sqrt( (${this.B.x - this.C.x})² + (${this.B.y - this.C.y})² )
        b = sqrt( ${Math.pow(this.B.x - this.C.x, 2)} + ${Math.pow(this.B.y - this.C.y, 2)} )
        b = sqrt( ${Math.pow(this.B.x - this.C.x, 2) + Math.pow(this.B.y - this.C.y, 2)} )
        b = ${bc}

        c = sqrt( (Cx - Ax)² + (Cy - Ay)² )
        c = sqrt( (${this.C.x} - ${this.A.x})² + (${this.C.y} - ${this.A.y})² )
        c = sqrt( (${this.C.x - this.A.x})² + (${this.C.y - this.A.y})² )
        c = sqrt( ${Math.pow(this.C.x - this.A.x, 2)} + ${Math.pow(this.C.y - this.A.y, 2)} )
        c = sqrt( ${Math.pow(this.C.x - this.A.x, 2) + Math.pow(this.C.y - this.A.y, 2)} )
        c = ${ca}
        
        CONDIÇÃO DE EXISTÊNCIA DO TRIÂNGULO

        | b - c | < a < b + c
        | ${bc} - ${ca} | < ${ab} < ${bc} + ${ca}
        ${Math.abs(bc - ca)} < ${ab} < ${bc + ca}

        | a - c | < b < a + c
        | ${ab} - ${ca} | < ${bc} < ${ab} + ${ca}
        ${Math.abs(ab - ca)} < ${bc} < ${ab + ca}

        | a - b | < c < a + b
        | ${ab} - ${bc} | < ${ca} < ${ab} + ${bc}
        ${Math.abs(ab - bc)} < ${ca} < ${ab + bc} 

        
        condição de existência: ${this.isValid() ? "verdadeiro" : "falso"}

        PERÍMETRO

        p = ${this.getPerimetro()}

        p = a + b + c
        p = ${ab} + ${bc} + ${ca}
        p = ${this.getPerimetro()}

        ÂNGULO DO TRIÂNGULO

        alfa = arccos( a² - b² - c² / -2 * b * c ) * 180 / π
        alfa = arccos( ${ab}² - ${bc}² - ${ca}² / -2 * ${bc} * ${ca} ) * 180 / π
        alfa = arccos( ${ab}² - ${bc}² - ${ca}² / -2 * ${bc * ca} ) * 180 / π
        alfa = arccos( ${ab}² - ${bc}² - ${ca}² / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${Math.pow(ab, 2)} - ${Math.pow(bc, 2)} - ${Math.pow(ca, 2)} / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${Math.pow(ab, 2) - Math.pow(bc, 2)} - ${Math.pow(ca, 2)} / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)} / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${(Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)} ) * 180 / π
        alfa = ${Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca))} * 180 / π
        alfa = ${Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca))} * 180 / ${Math.PI}
        alfa = ${Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca))} * ${180 / Math.PI}
        alfa = ${Math.acos((Math.pow(ab, 2) - Math.pow(bc, 2) - Math.pow(ca, 2)) / (-2 * bc * ca)) * 180 / Math.PI}°

        beta = arccos( b² – a² – c² / – 2 * a * c ) * 180 / π
        beta = arccos( ${bc}² - ${ab}² - ${ca}² / -2 * ${ab} * ${ca} ) * 180 / π
        beta = arccos( ${bc}² - ${ab}² - ${ca}² / -2 * ${ab * ca} ) * 180 / π
        beta = arccos( ${bc}² - ${ab}² - ${ca}² / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${Math.pow(bc, 2)} - ${Math.pow(ab, 2)} - ${Math.pow(ca, 2)} / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${Math.pow(bc, 2) - Math.pow(ab, 2)} - ${Math.pow(ca, 2)} / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)} / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${(Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)} ) * 180 / π
        beta = ${Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca))} * 180 / π
        beta = ${Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca))} * 180 / ${Math.PI}
        beta = ${Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca))} * ${180 / Math.PI}
        beta = ${Math.acos((Math.pow(bc, 2) - Math.pow(ab, 2) - Math.pow(ca, 2)) / (-2 * ab * ca)) * 180 / Math.PI}°

        charlie = arccos( c² – a² – b² / – 2 * a * b ) * 180 / π
        charlie = arccos( ${ca}² - ${ab}² - ${bc}² / -2 * ${ab} * ${bc} ) * 180 / π
        charlie = arccos( ${ca}² - ${ab}² - ${bc}² / -2 * ${ab * bc} ) * 180 / π
        charlie = arccos( ${ca}² - ${ab}² - ${bc}² / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${Math.pow(ca, 2)} - ${Math.pow(ab, 2)} - ${Math.pow(bc, 2)} / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${Math.pow(ca, 2) - Math.pow(ab, 2)} - ${Math.pow(bc, 2)} / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)} / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${(Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)} ) * 180 / π
        charlie = ${Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc))} * 180 / π
        charlie = ${Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc))} * 180 / ${Math.PI}
        charlie = ${Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc))} * ${180 / Math.PI}
        charlie = ${Math.acos((Math.pow(ca, 2) - Math.pow(ab, 2) - Math.pow(bc, 2)) / (-2 * ab * bc)) * 180 / Math.PI}°

        alfa = ${this.alfa}°
        beta = ${this.beta}°
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

        equilátero: ${ab == bc && bc == ca && ca == ab ? "verdadeiro" : "falso"}
        a = b E b = c E c = a 
        ${ab} = ${bc} E ${bc} = ${ca} E ${ca} = ${ab}
        
        isósceles: ${ab == bc || bc == ca || ca == ab ? "verdadeiro" : "falso"}
        a = b OU b = c OU c = a
        ${ab} = ${bc} OU ${bc} = ${ca} OU ${ca} = ${ab}

        ethis.scaleno ${ab != bc && bc != ca && ca != ab ? "verdadeiro" : "falso"}
        a ≠ b E b ≠ c E c ≠ a
        ${ab} ≠ ${bc} E ${bc} ≠ ${ca} E ${ca} ≠ ${ab}
        

        BARICENTRO

        g = (${this.baricentro().x} , ${this.baricentro().y})

        gx = Ax + Bx + Cx / 3
        gx = ${this.A.x} + ${this.B.x} + ${this.C.x} / 3
        gx = ${(this.A.x + this.B.x + this.C.x)} / 3
        gx = ${(this.A.x + this.B.x + this.C.x) / 3}

        gy = Ax + Bx + Cx / 3
        gy = ${this.A.y} + ${this.B.y} + ${this.C.y} / 3
        gy = ${(this.A.y + this.B.y + this.C.y)} / 3
        gy = ${(this.A.y + this.B.y + this.C.y) / 3}

        INCENTRO

        i = (${this.incentro().x} , ${this.incentro().y})

        ix = a * Ax + * b * Bx + c * Cx / p
        ix = ${ab} * ${this.A.x} + ${bc} * ${this.B.x} + ${ca} * ${this.C.x} / ${p}
        ix = ${ab * this.A.x} + ${bc * this.B.x} + ${ca * this.C.x} / ${p}
        ix = ${(ab * this.A.x + bc * this.B.x + ca * this.C.x)} / ${p}
        ix = ${(ab * this.A.x + bc * this.B.x + ca * this.C.x) / p}

        iy = a * Ax + * b * Bx + c * Cx / p
        iy = ${ab} * ${this.A.y} + ${bc} * ${this.B.y} + ${ca} * ${this.C.y} / ${p}
        iy = ${ab * this.A.y} + ${bc * this.B.y} + ${ca * this.C.y} / ${p}
        iy = ${(ab * this.A.y + bc * this.B.y + ca * this.C.y)} / ${p}
        iy = ${(ab * this.A.y + bc * this.B.y + ca * this.C.y) / p}
        
        `)

    }

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

    radToGraus(rad: number) {

        return rad * (180 / Math.PI)

    }

    grausToRad(angle: number) {

        return angle * Math.PI / 180

    }

    tipoTriangulo() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

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
            case ab == bc && bc == ca && ca == ab:

                lados = "equilátero"

                break;
            case ab == bc || bc == ca || ca == ab:

                lados = "isósceles"

                break;
            case ab != bc && bc != ca && ca != ab:

                lados = "ethis.scaleno"

                break;
        }

        return {

            angulos: angulos,
            lados: lados

        }

    }

    scale = (a: number, b: number) => {

        return {
            x: (a * 20) + canvas.width / 2,
            y: (b * -20) + canvas.height / 2
        }

    }

}