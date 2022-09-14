const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = 800
canvas.height = 400

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const fundo = () => {

    ctx.fillStyle = "#F5FACF"
    ctx.strokeStyle = "#CFCFC6"

    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const path = new Path2D()

    path.moveTo(0 , canvas.height / 2)
    path.lineTo(canvas.width , canvas.height / 2);
    path.moveTo(canvas.width / 2 , 0)
    path.lineTo(canvas.width / 2 , canvas.height)

    ctx.stroke(path)

}

fundo()

function update(template?: string) {

    switch (template) {
        case "pitagoras":

            $('#A').val("(0 , 0)")
            $('#B').val("(0 , 3)")
            $('#C').val("(4 , 0)")
            
            break;
    
        case "equilatero":

            $('#A').val("(0 , 2)")
            $('#B').val("(2.732050807568877 , 2.732050807568877)")
            $('#C').val("(2 , 0)")

            break;
        case "obtusangulo":

            $('#A').val("(-5.2 , 0)")
            $('#B').val("(0 , 3)")
            $('#C').val("(5.2 , 0)")

            break;
    }

    const a = getValue($('#A').val() as string)
    const b = getValue($('#B').val() as string)
    const c = getValue($('#C').val() as string)

    const triangulo = new Triangulo(a, b, c)

    $("#erro").css("display", (triangulo.isValid()) ? "none" : "block")

    if (triangulo.isValid()) {

        fundo()

        triangulo.render(ctx)

        triangulo.calculo()

    } else {

        triangulo.calculo()

    }

}

const getValue = (value: string) => {

    const v = value.trim().split("(").join("").split(")")[0].trim().split(',')

    return {

        x: Number(v[0]),
        y: Number(v[1])

    }

};