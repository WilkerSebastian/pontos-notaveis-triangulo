class Triangulo {

    A: { x: number, y: number }
    B: { x: number, y: number }
    C: { x: number, y: number }
    alfa:number
    beta:number
    charlie:number

    constructor(A: { x: number, y: number }, B: { x: number, y: number }, C: { x: number, y: number }) {

        this.A = A
        this.B = B
        this.C = C
        this.alfa = this.getAngle("alfa")
        this.beta = this.getAngle("beta")
        this.charlie = this.getAngle("charlie")

    }

    getAngle(tipo:string) {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        switch (tipo) {
            case "alfa": return this.radToGraus(Math.acos((Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)) / (-2 * bc * ca)))
        
            case "beta": return this.radToGraus(Math.acos((Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)) / (-2 * ab * ca)))

            case "charlie": return this.radToGraus(Math.acos((Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)) / (-2 * ab * bc)))
        }
        return 0

    }

    isValid() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        return (Math.abs(bc - ca) < ab && ab < bc + ca) && (Math.abs(ab - ca) < bc && bc < ab + ca) && (Math.abs(ab - bc) < ca && ca < ab + bc)

    }

    getLine(p1: { x: number, y: number }, p2: { x: number, y: number }) {

        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

    }

    render(ctx: CanvasRenderingContext2D , modo?:string) {

        const A = scale(this.A.x , this.A.y)
        const B = scale(this.B.x , this.B.y)
        const C = scale(this.C.x , this.C.y)

        ctx.fillStyle = "#5E0099"
        ctx.strokeStyle = "#5E0099"

        const path = new Path2D()

        path.moveTo(A.x, A.y)
        path.lineTo(B.x, B.y)

        path.moveTo(B.x, B.y)
        path.lineTo(C.x, C.y)

        path.moveTo(C.x, C.y)
        path.lineTo(A.x, A.y)

        path.closePath()

        ctx.fill(path)
        ctx.stroke(path)

    }

    calculo() {

        const ab = this.getLine(this.A, this.B)
        const bc = this.getLine(this.B, this.C)
        const ca = this.getLine(this.C, this.A)

        $("#calculo").val(`

        sqrt = raiz quadrada

        A = (${this.A.x} , ${this.A.y})
        B = (${this.B.x} , ${this.B.y})
        C = (${this.C.x} , ${this.C.y})

        LADOS

        a = sqrt( (Ax - Bx)² + (Ay - By)² )
        a = sqrt( (${this.A.x} - ${this.B.x})² + (${this.A.y} - ${this.B.y})² )
        a = sqrt( (${this.A.x - this.B.x})² + (${this.A.y - this.B.y})² )
        a = sqrt( ${Math.pow(this.A.x - this.B.x , 2)} + ${Math.pow(this.A.y - this.B.y , 2)} )
        a = sqrt( ${Math.pow(this.A.x - this.B.x , 2) + Math.pow(this.A.y - this.B.y , 2)} )
        a = ${ab}

        b = sqrt( (Bx - Cx)² + (By - Cy)² )
        b = sqrt( (${this.B.x} - ${this.C.x})² + (${this.B.y} - ${this.C.y})² )
        b = sqrt( (${this.B.x - this.C.x})² + (${this.B.y - this.C.y})² )
        b = sqrt( ${Math.pow(this.B.x - this.C.x , 2)} + ${Math.pow(this.B.y - this.C.y , 2)} )
        b = sqrt( ${Math.pow(this.B.x - this.C.x , 2) + Math.pow(this.B.y - this.C.y , 2)} )
        b = ${bc}

        c = sqrt( (Cx - Ax)² + (Cy - Ay)² )
        c = sqrt( (${this.C.x} - ${this.A.x})² + (${this.C.y} - ${this.A.y})² )
        c = sqrt( (${this.C.x - this.A.x})² + (${this.C.y - this.A.y})² )
        c = sqrt( ${Math.pow(this.C.x - this.A.x , 2)} + ${Math.pow(this.C.y - this.A.y , 2)} )
        c = sqrt( ${Math.pow(this.C.x - this.A.x , 2) + Math.pow(this.C.y - this.A.y , 2)} )
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

        ÂNGULO DO TRIÂNGULO

        alfa = arccos( a² - b² - c² / -2 * b * c ) * 180 / π
        alfa = arccos( ${ab}² - ${bc}² - ${ca}² / -2 * ${bc} * ${ca} ) * 180 / π
        alfa = arccos( ${ab}² - ${bc}² - ${ca}² / -2 * ${bc * ca} ) * 180 / π
        alfa = arccos( ${ab}² - ${bc}² - ${ca}² / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${Math.pow(ab , 2)} - ${Math.pow(bc , 2)} - ${Math.pow(ca , 2)} / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${Math.pow(ab , 2) - Math.pow(bc , 2)} - ${Math.pow(ca , 2)} / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)} / ${-2 * bc * ca} ) * 180 / π
        alfa = arccos( ${(Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)) / (-2 * bc * ca)} ) * 180 / π
        alfa = ${Math.acos((Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)) / (-2 * bc * ca))} * 180 / π
        alfa = ${Math.acos((Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)) / (-2 * bc * ca))} * 180 / ${Math.PI}
        alfa = ${Math.acos((Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)) / (-2 * bc * ca))} * ${180 / Math.PI}
        alfa = ${Math.acos((Math.pow(ab , 2) - Math.pow(bc , 2) - Math.pow(ca , 2)) / (-2 * bc * ca)) * 180 / Math.PI}°

        beta = arccos( b² – a² – c² / – 2 * a * c ) * 180 / π
        beta = arccos( ${bc}² - ${ab}² - ${ca}² / -2 * ${ab} * ${ca} ) * 180 / π
        beta = arccos( ${bc}² - ${ab}² - ${ca}² / -2 * ${ab * ca} ) * 180 / π
        beta = arccos( ${bc}² - ${ab}² - ${ca}² / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${Math.pow(bc , 2)} - ${Math.pow(ab , 2)} - ${Math.pow(ca , 2)} / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${Math.pow(bc , 2) - Math.pow(ab , 2)} - ${Math.pow(ca , 2)} / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)} / ${-2 * ab * ca} ) * 180 / π
        beta = arccos( ${(Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)) / (-2 * ab * ca)} ) * 180 / π
        beta = ${Math.acos((Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)) / (-2 * ab * ca))} * 180 / π
        beta = ${Math.acos((Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)) / (-2 * ab * ca))} * 180 / ${Math.PI}
        beta = ${Math.acos((Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)) / (-2 * ab * ca))} * ${180 / Math.PI}
        beta = ${Math.acos((Math.pow(bc , 2) - Math.pow(ab , 2) - Math.pow(ca , 2)) / (-2 * ab * ca)) * 180 / Math.PI}°

        charlie = arccos( c² – a² – b² / – 2 * a * b ) * 180 / π
        charlie = arccos( ${ca}² - ${ab}² - ${bc}² / -2 * ${ab} * ${bc} ) * 180 / π
        charlie = arccos( ${ca}² - ${ab}² - ${bc}² / -2 * ${ab * bc} ) * 180 / π
        charlie = arccos( ${ca}² - ${ab}² - ${bc}² / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${Math.pow(ca , 2)} - ${Math.pow(ab , 2)} - ${Math.pow(bc , 2)} / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${Math.pow(ca , 2) - Math.pow(ab , 2)} - ${Math.pow(bc , 2)} / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)} / ${-2 * ab * bc} ) * 180 / π
        charlie = arccos( ${(Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)) / (-2 * ab * bc)} ) * 180 / π
        charlie = ${Math.acos((Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)) / (-2 * ab * bc))} * 180 / π
        charlie = ${Math.acos((Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)) / (-2 * ab * bc))} * 180 / ${Math.PI}
        charlie = ${Math.acos((Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)) / (-2 * ab * bc))} * ${180 / Math.PI}
        charlie = ${Math.acos((Math.pow(ca , 2) - Math.pow(ab , 2) - Math.pow(bc , 2)) / (-2 * ab * bc)) * 180 / Math.PI}°

        alfa = ${this.alfa}°
        beta = ${this.beta}°
        charlie = ${this.charlie}°
        
        `)

    }

    radToGraus (rad:number) {

        return Math.round(rad * (180 / Math.PI))
    
    }

}

const scale = (a:number , b: number ) => {

    return {
        x: (a * 20) + canvas.width / 2,
        y: (b * -20) + canvas.height / 2
    }

}