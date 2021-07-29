const { Writer } = require('./classes/Writer.js')
const colors = require('colors/safe')

// An overview of the main Kata function, with the console.logs removed for readability
function viewKata(point, length, eraser) {
    let text = "This is Ripley... last survivor of the Nostromo... signing off."
    let string = "kitty"
    let writer = new Writer(point, length, eraser)

    writer.write(text)

    writer.sharpen()

    writer.paper.setPaper("Here kitty, kitty, kitty. Meaow. Here Jonesy.")
    writer.erase(string)
    writer.erase(string)

    string = "Alien"
    writer.edit(string)

    string = "Xenomorph"
    writer.edit(string)
}

// The main Kata function run using the command "npm run kata" with console.logs describing the step-by-step process
const runKata = (pointVal, lengthVal, eraserVal) => {
    let text = "This is Ripley... last survivor of the Nostromo... signing off."
    let string = "kitty"
    let writer = new Writer(pointVal, lengthVal, eraserVal)

    // #region Holding Variables to ensure concise console.logs
    let pencil = writer.pencil.getPencil()
    let paper = writer.paper.getPaper()
    let point
    let pointMod
    let length
    let lengthMod
    let eraser
    let eraserMod

    function getValues() {
        paper = writer.paper.getPaper()
        pencil = writer.pencil.getPencil()
        point = pencil.point
        length = pencil.length
        eraser = pencil.eraser
    }
    //#endregion

    // #region Logs Initial Variables
    console.log(`
${colors.underline("Running Kata")}`)

    console.log(colors.italic("Initial Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${pencil.point}`)},
        length: ${colors.grey(`${pencil.length}`)},
        eraser: ${colors.grey(`${pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.grey(`${paper}`)}"
`)

    console.log(colors.italic("Text to be written:"))

    console.log(`    "${colors.grey(`${text}`)}"
`)
    pointMod = pencil.point
    // #endregion

    writer.write(text)

    // #region Logs Write Function
    getValues()
    console.log(`
${colors.underline("Writing Text")}`)

    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${pencil.point} [${pencil.point - pointMod}]`)},
        length: ${colors.grey(`${pencil.length}`)},
        eraser: ${colors.grey(`${pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${paper}`)}"
`)
    pointMod = pencil.point
    lengthMod = pencil.length
    //#endregion

    writer.sharpen()

    // #region Logs Sharpen Function
    getValues()
    console.log(`
${colors.underline("Sharpening Pencil")}`)

    console.log(colors.italic("Value of Sharpened Pencil:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.green(`${pencil.point} [+${pencil.point + pointMod}]`)},
        length: ${colors.red(`${pencil.length} [${pencil.length - lengthMod}]`)},
        eraser: ${colors.grey(`${pencil.eraser}`)}
    }
`)
    // #endregion

    writer.paper.setPaper("Here kitty, kitty, kitty. Meaow. Here Jonesy.")

    // #region Logs Erase Function
    getValues()
    console.log(`
${colors.underline("Erasing Text")}`)

    console.log(colors.italic("New declared value of Paper:"))

    console.log(`    "${colors.green(`${paper}`)}"
`)

    console.log(colors.italic("Text to be Erased:"))

    console.log(`    "${colors.red(`${string}`)}"
`)
    eraserMod = pencil.eraser
    // #endregion

    writer.erase(string)

    // #region Logs Modified Variables
    getValues()
    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${pencil.point}`)},
        length: ${colors.grey(`${pencil.length}`)},
        eraser: ${colors.red(`${pencil.eraser} [${pencil.eraser - eraserMod}]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${paper}`)}"

`)
    eraserMod = pencil.eraser
    // #endregion

    writer.erase(string)

    // #region Logs Additional Erase Function
    getValues()
    console.log(`
${colors.underline("Erasing Text")}`)

    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${pencil.point}`)},
        length: ${colors.grey(`${pencil.length}`)},
        eraser: ${colors.red(`${pencil.eraser} [${pencil.eraser - eraserMod}]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${paper}`)}"
`)
    // #endregion

    string = "Alien"

    // #region Logs Edit function
    console.log(`
${colors.underline("Editing Text")}`)

    console.log(colors.italic("Text to be added:"))

    console.log(`    "${colors.green(`${string}`)}"
`)
    pointMod = pencil.point
    // #endregion

    writer.edit(string)

    // #region Logs Modified Variables
    getValues()
    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${pencil.point} [${pencil.point - pointMod}]`)},
        length: ${colors.grey(`${pencil.length}`)},
        eraser: ${colors.grey(`${pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${paper}`)}"
`)
    // #endregion

    string = "Xenomorph"

    // #region Logs Additional Edit function
    console.log(`
${colors.underline("Editing Text")}`)

    console.log(colors.italic("Text to be added:"))

    console.log(`    "${colors.green(`${string}`)}"
`)
    pointMod = pencil.point
    // #endregion

    writer.edit(string)

    // #region Logs Final variables
    getValues()
    console.log(colors.italic("Final Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${pencil.point} [${pencil.point - pointMod}]`)},
        length: ${colors.grey(`${pencil.length}`)},
        eraser: ${colors.grey(`${pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${paper}`)}
`)

    console.log(`
${colors.bold("Kata Complete")}`)
    // #endregion
}

module.exports = { runKata }