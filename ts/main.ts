const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = 800
canvas.height = 400

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const fundo = () => {

    ctx.fillStyle = "#35A2E0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

}

function limpar(): void {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fundo()

}

fundo()

function update(pitagoras?: boolean) {

    if (pitagoras) {

        $('#A').val("(0 , 0)")
        $('#B').val("(0 , 3)")
        $('#C').val("(4 , 0)")

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

    }

}

const getValue = (value: string) => {

    return {

        x: Number(value.split("").filter(n => (Number(n) || n == '0'))[0]),
        y: Number(value.split("").filter(n => (Number(n) || n == '0'))[1])

    }

};