const { Pencil } = require('./classes/Pencil.js')
const { Paper } = require('./classes/Paper.js')
const { Writer } = require('./classes/Writer.js')
const colors = require('colors/safe')

// The main Kata used for testing, with the console.logs removed for readability
const testKata = () => {
    let text = "This is Ripley... last survivor of the Nostromo... signing off."
    let string = "kitty"
    let writer = new Writer(new Pencil(), new Paper())

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

// The main Kata run using the command "npm run kata" with console.logs describing the step-by-step process
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
    //#endregion

    // #region Logs Initial Variables
    logBold("-----Run Kata-----")
    logItalic("Initial Variables:")
    logValues()
    logItalic("Text to be written:")
    logText(text)
    // #endregion

    writer.write(text)

    // #region Logs Write Function
    logBold("-----Write Text-----")
    logItalic("Current Variables:")
    logValues("green")
    getOldValues()
    //#endregion

    writer.sharpen()

    // #region Logs Sharpen Function
    logBold("-----Sharpen Pencil-----")
    logItalic("Current Variables:")
    logValues()
    // #endregion

    writer.paper.setPaper("Here kitty, kitty, kitty. Meaow. Here Jonesy.")

    // #region Logs Erase Function
    logBold("-----Erase Text-----")
    logItalic("New declared value of Paper:")
    logText(writer.paper.getPaper(), "green")
    logItalic("Text to be Erased:")
    logText(string, "red")
    getOldValues()
    // #endregion

    writer.erase(string)

    // #region Logs Modified Variables
    logItalic("Current Variables:")
    logValues("red")
    getOldValues()
    // #endregion

    writer.erase(string)

    // #region Logs Additional Erase Function
    logBold("-----Erase Text-----")
    logItalic("Current Variables:")
    logValues("red")
    // #endregion

    string = "Alien"

    // #region Logs Edit function
    logBold("-----Edit Text-----")
    logItalic("Text to be added:")
    logText(string, "green")
    getOldValues()
    // #endregion

    writer.edit(string)

    // #region Logs Modified Variables
    logItalic("Current Variables:")
    logValues("green")
    // #endregion

    string = "Xenomorph"

    // #region Logs Additional Edit function
    logBold("-----Edit Text-----")
    logItalic("Text to be Added:")
    logText(string, "green")
    getOldValues()
    // #endregion

    writer.edit(string)

    // #region Logs Final variables
    logItalic("Final Variables")
    logValues("green")
    logBold("-----Kata Complete-----")
    // #endregion

    return writer

    // #region Console.log functions
    function getValues() {
        point = writer.pencil.getPoint()
        length = writer.pencil.getLength()
        eraser = writer.pencil.getEraser()
        paper = writer.paper.getPaper()
    }

    function getOldValues() {
        oldPoint = point
        oldLength = length
        oldEraser = eraser
    }

    function logBreak() {
        console.log("")
    }

    function logBold(string) {
        logBreak()
        logBreak()
        console.log(`${colors.bold(string)}`)
        logBreak()
    }

    function logItalic(string) {
        logBreak()
        console.log(colors.italic(string))
    }

    function logText(string, color) {
        switch (color) {
            case "green":
                console.log(`    "${colors.green(string)}"`)
                break;
            case "red":
                console.log(`    "${colors.red(string)}"`)
                break;
            default:
                console.log(`    "${colors.grey(string)}"`)
                break;
        }
    }

    function logValues(color) {
        getValues()
        console.log(`    ${colors.bold("pencil")} = {
        point: ${(point === oldPoint) ? colors.grey(`${point}`) : (point > oldPoint) ? colors.green(`${point} [+${point + oldPoint}]`) : colors.red(`${point} [${point - oldPoint}]`)}
        length: ${(length === oldLength) ? colors.grey(`${length}`) : (length > oldLength) ? colors.green(`${length} [+${length + oldLength}]`) : colors.red(`${length} [${length - oldLength}]`)}
        eraser: ${(eraser === oldEraser) ? colors.grey(`${eraser}`) : (eraser > oldEraser) ? colors.green(`${eraser} [+${eraser + oldEraser}]`) : colors.red(`${eraser} [${eraser - oldEraser}]`)}
    }`)
        switch (color) {
            case "green":
                console.log(`    ${colors.bold("paper")} = "${colors.green(`${paper}`)}"`)
                break;
            case "red":
                console.log(`    ${colors.bold("paper")} = "${colors.red(`${paper}`)}"`)
                break;
            default:
                console.log(`    ${colors.bold("paper")} = "${colors.grey(`${paper}`)}"`)
                break;
        }
    }
    // #endregion
}

module.exports = { runKata, testKata }