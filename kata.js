const { Pencil } = require('./classes/Pencil.js')
const { Paper } = require('./classes/Paper.js')
const { Writer } = require('./classes/Writer.js')
const colors = require('colors/safe')

// The main Kata function run using the command "npm run kata"
// It features cascading console statements describing the step-by-step process.

// It has been provided with default arguments, the return values of which can be verified via the Run Kata tests
// The boolean argument "testing" determines whether or not the console statements are displayed.
// A "true" value is passed when testing the function, which removes the console statements for readability.

// If you would like to pass your own arguments, reference the modKata function at the bottom of this page

const runKata = (
    testing = false,
    /** @type {number} */ pointValue,
    /** @type {number} */ lengthValue,
    /** @type {number} */ eraserValue,
    writeText = "This is Ripley... last survivor of the Nostromo... signing off.",
    eraseText = "Here kitty, kitty, kitty. Meaow! Here Jonesy!",
    erased = "kitty",
    editedPrimary = "Alien",
    editedSecondary = "Xenomorph") => {
    let writer = new Writer(new Pencil(pointValue, lengthValue, eraserValue), new Paper())

    // Local Holding Variables to maintain concise console statements
    let paper = writer.paper.getPaper()
    let point = writer.pencil.getPoint()
    let length = writer.pencil.getLength()
    let eraser = writer.pencil.getEraser()
    let pastPoint = point
    let pastLength = length
    let pastEraser = eraser

    // Logs Initial Variables
    logBold("-----Run Kata-----")
    logItalic("Initial Variables:")
    logValues()
    logBreak()
    logItalic("Text to be Added:")
    logText(writeText)

    writer.write(writeText)

    // Logs Write Function
    logBold("-----Write Text-----")
    logItalic("Current Variables:")
    logValues("green")
    //#endregion

    writer.sharpen()

    // Logs Sharpen Function
    logBold("-----Sharpen Pencil-----")
    logItalic("Current Variables:")
    logValues()

    writer.paper.setPaper(eraseText)

    // Logs Current Variables
    logBreak()
    logItalic("New declared value of Paper:")
    logText(writer.paper.getPaper(), "green")
    logItalic("Text to be Removed:")
    logText(erased, "red")

    writer.erase(erased)

    // Logs First Erase Function
    logBold("-----Erase Text-----")
    logItalic("Current Variables:")
    logValues("red")

    writer.erase(erased)

    // Logs Second Erase Function
    logBold("-----Erase Text-----")
    logItalic("Current Variables:")
    logValues("red")

    writer.edit(editedPrimary)

    // Logs First Edit Function
    logBreak()
    logItalic("Text to be Added:")
    logText(editedPrimary, "green")
    logBold("-----Edit Text-----")
    logItalic("Current Variables:")
    logValues("green")

    writer.edit(editedSecondary)

    // Logs Second Edit Function
    logBreak()
    logItalic("Text to be Added:")
    logText(editedSecondary, "green")
    logBold("-----Edit Text-----")

    // Logs Final Variables
    logItalic("Final Variables")
    logValues("green")
    logBold("-----Kata Complete-----")

    return writer

    // Reusable Console Statement functions that are called throughout runKata when not in its Testing state

    // Updates Local Holding Variables with current Writer values to maintain concise console statements
    function getValues() {
        if (!testing) {
            point = writer.pencil.getPoint()
            length = writer.pencil.getLength()
            eraser = writer.pencil.getEraser()
            paper = writer.paper.getPaper()
        }
    }

    // Preserves the last-used Writer values to appropriately display the colored changes in value
    function getPastValues() {
        if (!testing) {
            pastPoint = point
            pastLength = length
            pastEraser = eraser
        }
    }

    // Reusable line-break for simple Formatting
    function logBreak() {
        if (!testing) {
            console.log("")
        }
    }

    // Displays Bold Text for function's main sections
    /** @param {string} string */
    function logBold(string) {
        if (!testing) {
            logBreak()
            logBreak()
            console.log(`${colors.bold(string)}`)
            logBreak()
        }
    }

    // Displays Italic Text for function's subsections
    /** @param {string} string */
    function logItalic(string) {
        if (!testing) {
            logBreak()
            console.log(colors.italic(string))
        }
    }

    // Displays a given String in the given color
    /** @param {string} string */
    /** @param {string} [color] */
    function logText(string, color) {
        if (!testing) {
            console.log(`    ${(color === undefined) ? `"${colors.grey(string)}"` : (color === "green") ? `"${colors.green(string)}"` : `"${colors.red(string)}"`}`)
        }
    }

    // Displays the current Writer values:
    // Pencil colors are determined by the difference in current vs previous values
    // Paper matches the given color
    /** @param {string} [color] */
    function logValues(color) {
        if (!testing) {
            getValues()
            console.log(`    ${colors.bold("pencil")} = {
        point: ${(point === pastPoint) ? colors.grey(`${point}`) : (point > pastPoint) ? colors.green(`${point} [+${point + pastPoint}]`) : colors.red(`${point} [${point - pastPoint}]`)}
        length: ${(length === pastLength) ? colors.grey(`${length}`) : (length > pastLength) ? colors.green(`${length} [+${length + pastLength}]`) : colors.red(`${length} [${length - pastLength}]`)}
        eraser: ${(eraser === pastEraser) ? colors.grey(`${eraser}`) : (eraser > pastEraser) ? colors.green(`${eraser} [+${eraser + pastEraser}]`) : colors.red(`${eraser} [${eraser - pastEraser}]`)}
    },
    ${colors.bold("paper")} = ${(color === undefined) ? `"${colors.grey(`${paper}`)}"` : (color === "green") ? `"${colors.green(`${paper}`)}"` : `"${colors.red(`${paper}`)}"`}`)
            getPastValues()
        }
    }
}

// The modified Kata function run using the command "npm run mod"
// Accepts original arguments in place of the defaults supplied by runKatadcx

// Syntax:
// npm run mod point length eraser "writeText" "eraseText" "erased" "editedPrimary" "editedSecondary"
// Example:
// npm run mod 30 10 20 "This is Ripley" "Jonesy... here Jonesy!" "Jonesy" "Ripley" "Sigourney"

const modKata = () => {
    const args = process.argv.slice(4)
    let testing = false
    // testing remains false to enable console statements during the function's execution
    let point = Number(args[0])
    let length = Number(args[1])
    let eraser = Number(args[2])
    // point, length, and eraser are utilized to instantiate Pencil
    let writeText = args[3]
    // writeText indicates the text to be written by the Write function
    let eraseText = args[4]
    // eraseText indicates the redeclared value of Paper preceding the Erase function, which will be called twice
    let erased = args[5]
    // erased indicates the String to be erased by the Erase function, and should be included within eraseText twice
    let editedPrimary = args[6]
    // editedPrimary indicates the String to be added by the Edit function on its first call
    let editedSecondary = args[7]
    // editedSecondary indicates the String to be added by the Edit function on its second call
    runKata(testing, point, length, eraser, writeText, eraseText, erased, editedPrimary, editedSecondary)
}

module.exports = { runKata, modKata }