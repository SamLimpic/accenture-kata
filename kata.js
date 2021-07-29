const { Pencil } = require('./classes/Pencil.js')
const { Paper } = require('./classes/Paper.js')
const { Writer } = require('./classes/Writer.js')
const colors = require('colors/safe')

// The main Kata function used for testing, with the console.logs removed for readability
const testKata = () => {
    let text = "This is Ripley... last survivor of the Nostromo... signing off."
    let string = "kitty"
    let pencil = new Pencil()
    let paper = new Paper()
    let writer = new Writer(pencil, paper)

    writer.write(text)

    writer.sharpen()

    writer.paper.setPaper("Here kitty, kitty, kitty. Meaow. Here Jonesy.")
    writer.erase(string)
    writer.erase(string)

    string = "Alien"
    writer.edit(string)

    string = "Xenomorph"
    writer.edit(string)

    return writer
}

// The main Kata function run using the command "npm run kata" with console.logs describing the step-by-step process
const runKata = () => {
    let text = "This is Ripley... last survivor of the Nostromo... signing off."
    let string = "kitty"
    let pencil = new Pencil()
    let paper = new Paper()
    let writer = new Writer(pencil, paper)

    // #region Holding Variables to ensure concise console.logs
    let point = writer.pencil.getPoint()
    let length = writer.pencil.getLength()
    let eraser = writer.pencil.getEraser()
    let oldPoint = point
    let oldLength = length
    let oldEraser = eraser

    function logValues() {
        paper = writer.paper.getPaper()
        point = writer.pencil.getPoint()
        length = writer.pencil.getLength()
        eraser = writer.pencil.getEraser()
    }
    //#endregion

    // #region Logs Initial Variables
    logValues()
    console.log(`
${colors.underline("Running Kata")}`)

    console.log(colors.italic("Initial Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${point}`)},
        length: ${colors.grey(`${length}`)},
        eraser: ${colors.grey(`${eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.grey(`${paper}`)}"
`)

    console.log(colors.italic("Text to be written:"))

    console.log(`    "${colors.grey(`${text}`)}"
`)
    oldPoint = point
    // #endregion

    writer.write(text)

    // #region Logs Write Function
    logValues()
    console.log(`
${colors.underline("Writing Text")}`)

    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${point} [${point - oldPoint}]`)},
        length: ${colors.grey(`${length}`)},
        eraser: ${colors.grey(`${eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${paper}`)}"
`)
    oldPoint = point
    oldLength = length
    //#endregion

    writer.sharpen()

    // #region Logs Sharpen Function
    logValues()
    console.log(`
${colors.underline("Sharpening Pencil")}`)

    console.log(colors.italic("Value of Sharpened Pencil:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.green(`${point} [+${point + oldPoint}]`)},
        length: ${colors.red(`${length} [${length - oldLength}]`)},
        eraser: ${colors.grey(`${eraser}`)}
    }
`)
    // #endregion

    writer.paper.setPaper("Here kitty, kitty, kitty. Meaow. Here Jonesy.")

    // #region Logs Erase Function
    logValues()
    console.log(`
${colors.underline("Erasing Text")}`)

    console.log(colors.italic("New declared value of Paper:"))

    console.log(`    "${colors.green(`${paper}`)}"
`)

    console.log(colors.italic("Text to be Erased:"))

    console.log(`    "${colors.red(`${string}`)}"
`)
    oldEraser = eraser
    // #endregion

    writer.erase(string)

    // #region Logs Modified Variables
    logValues()
    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${point}`)},
        length: ${colors.grey(`${length}`)},
        eraser: ${colors.red(`${eraser} [${eraser - oldEraser}]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${paper}`)}"

`)
    oldEraser = eraser
    // #endregion

    writer.erase(string)

    // #region Logs Additional Erase Function
    logValues()
    console.log(`
${colors.underline("Erasing Text")}`)

    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${point}`)},
        length: ${colors.grey(`${length}`)},
        eraser: ${colors.red(`${eraser} [${eraser - oldEraser}]`)}
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
    oldPoint = point
    // #endregion

    writer.edit(string)

    // #region Logs Modified Variables
    logValues()
    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${point} [${point - oldPoint}]`)},
        length: ${colors.grey(`${length}`)},
        eraser: ${colors.grey(`${eraser}`)}
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
    oldPoint = point
    // #endregion

    writer.edit(string)

    // #region Logs Final variables
    logValues()
    console.log(colors.italic("Final Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${point} [${point - oldPoint}]`)},
        length: ${colors.grey(`${length}`)},
        eraser: ${colors.grey(`${eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${paper}`)}"
`)

    console.log(`
${colors.bold("Kata Complete")}`)

    return writer
    // #endregion
}

module.exports = { runKata, testKata }