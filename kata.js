// Imports the Writer class, where the main logic of the Kata is written
const { Writer } = require('./classes/Writer.js')

// Imports the 'colors' plugin, for easier readability of the main Kata function's console.logs
const colors = require('colors/safe')



// An overview of the main Kata function, with the console.logs removed for readability
function viewKata(point, length, eraser, text = "This is Ripley... last survivor of the Nostromo... signing off.") {
    let writer = new Writer(point, length, eraser)
    let string = "kitty"

    writer.write(text)

    writer.sharpen()

    writer.journal.paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    writer.erase(string)
    writer.erase(string)

    string = "Alien"
    writer.edit(string)

    string = "Xenomorph"
    writer.edit(string)
}



// The main Kata function run using the command "npm run kata" with console.logs describing the step-by-step process
const runKata = (point, length, eraser, text = "This is Ripley... last survivor of the Nostromo... signing off.") => {
    let writer = new Writer(point, length, eraser)
    let string = "kitty"
    let pointVal
    let lengthVal
    let eraserVal

    // #region Logs Initial Variables
    console.log(`
${colors.underline("Running Kata")}`)

    console.log(colors.italic("Initial Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${writer.journal.pencil.point}`)},
        length: ${colors.grey(`${writer.journal.pencil.length}`)},
        eraser: ${colors.grey(`${writer.journal.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.grey(`${writer.journal.paper}`)}"
`)

    console.log(colors.italic("Text to be written:"))

    console.log(`    "${colors.grey(`${text}`)}"
`)
    // #endregion

    pointVal = writer.journal.pencil.point

    writer.write(text)

    // #region Logs Write Function
    console.log(`
${colors.underline("Writing Text")}`)

    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${writer.journal.pencil.point} [${writer.journal.pencil.point - pointVal}]`)},
        length: ${colors.grey(`${writer.journal.pencil.length}`)},
        eraser: ${colors.grey(`${writer.journal.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${writer.journal.paper}`)}"
`)
    //#endregion

    pointVal = writer.journal.pencil.point
    lengthVal = writer.journal.pencil.length

    writer.sharpen()

    // #region Logs Sharpen Function
    console.log(`
${colors.underline("Sharpening Pencil")}`)

    console.log(colors.italic("Value of Sharpened Pencil:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.green(`${writer.journal.pencil.point} [+${writer.journal.pencil.point + pointVal}]`)},
        length: ${colors.red(`${writer.journal.pencil.length} [${writer.journal.pencil.length - lengthVal}]`)},
        eraser: ${colors.grey(`${writer.journal.pencil.eraser}`)}
    }
`)
    // #endregion

    writer.journal.paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."

    // #region Logs Erase Function
    console.log(`
${colors.underline("Erasing Text")}`)

    console.log(colors.italic("New declared value of Paper:"))

    console.log(`    "${colors.green(`${writer.journal.paper}`)}"
`)

    console.log(colors.italic("Text to be Erased:"))

    console.log(`    "${colors.red(`${string}`)}"
`)
    // #endregion

    eraserVal = writer.journal.pencil.eraser

    writer.erase(string)

    // #region Logs Modified Variables
    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${writer.journal.pencil.point}`)},
        length: ${colors.grey(`${writer.journal.pencil.length}`)},
        eraser: ${colors.red(`${writer.journal.pencil.eraser} [${writer.journal.pencil.eraser - eraserVal}]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${writer.journal.paper}`)}"

`)
    // #endregion

    eraserVal = writer.journal.pencil.eraser

    writer.erase(string)

    // #region Logs Additional Erase Function
    console.log(`
${colors.underline("Erasing Text")}`)

    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${writer.journal.pencil.point}`)},
        length: ${colors.grey(`${writer.journal.pencil.length}`)},
        eraser: ${colors.red(`${writer.journal.pencil.eraser} [${writer.journal.pencil.eraser - eraserVal}]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${writer.journal.paper}`)}"
`)
    // #endregion

    string = "Alien"

    // #region Logs Edit function
    console.log(`
${colors.underline("Editing Text")}`)

    console.log(colors.italic("Text to be added:"))

    console.log(`    "${colors.green(`${string}`)}"
`)
    // #endregion

    pointVal = writer.journal.pencil.point

    writer.edit(string)

    // #region Logs Modified Variables
    console.log(colors.italic("Current Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${writer.journal.pencil.point} [${writer.journal.pencil.point - pointVal}]`)},
        length: ${colors.grey(`${writer.journal.pencil.length}`)},
        eraser: ${colors.grey(`${writer.journal.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${writer.journal.paper}`)}"
`)
    // #endregion

    string = "Xenomorph"

    // #region Logs Additional Edit function
    console.log(`
${colors.underline("Editing Text")}`)

    console.log(colors.italic("Text to be added:"))

    console.log(`    "${colors.green(`${string}`)}"
`)
    // #endregion

    pointVal = writer.journal.pencil.point

    writer.edit(string)

    // #region Logs Final variables
    console.log(colors.italic("Final Variables:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${writer.journal.pencil.point} [${writer.journal.pencil.point - pointVal}]`)},
        length: ${colors.grey(`${writer.journal.pencil.length}`)},
        eraser: ${colors.grey(`${writer.journal.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${writer.journal.paper}`)}
`)

    console.log(`
${colors.bold("Kata Complete")}`)
    // #endregion
}
// #region REVIEW REFACTORED
// const write = (pencil, paper, text) => {
//     for (let i = 0; i < text.length; i++) {
//         let char = text[i]
//         if (!writer.stationery.pencil.point) {
//             char = " "
//         }
//         checkCasing(char, pencil)
//         if (writer.stationery.pencil.point < 0) {
//             writer.stationery.pencil.point = 0
//             char = " "
//         }
//         paper += char
//     }
//     return paper
// }

// const checkCasing = (char, pencil) => {
//     if (char === " ") {
//         return
//     }
//     if (char === char.toLowerCase()) {
//         return writer.stationery.pencil.point -= 1
//     }
//     if (char === char.toUpperCase()) {
//         return writer.stationery.pencil.point -= 2
//     }
// }

// const sharpen = (point, pencil) => {
//     if (writer.stationery.pencil.length > 0) {
//         writer.stationery.pencil.point = point
//         writer.stationery.pencil.length--
//     }
//     return pencil
// }

// const erase = (string, paper, pencil) => {
//     if (writer.stationery.pencil.eraser > 0) {
//         let index = paper.lastIndexOf(string)
//         let arr = paper.split("")
//         for (let i = index + string.length - 1; i > index - 1; i--) {
//             if (writer.stationery.pencil.eraser === 0) {
//                 break
//             }
//             arr[i] = " "
//             writer.stationery.pencil.eraser--
//         }
//         paper = arr.join("")
//     }
//     return paper
// }

// const edit = (string, paper, pencil) => {
//     if (writer.stationery.pencil.point > 0) {
//         let index = paper.indexOf("  ") + 1
//         let arr = paper.split("")
//         let j = 0
//         for (let i = index; i < index + string.length; i++) {
//             if (writer.pencil.point === 0) {
//                 break
//             }
//             if (arr[i] === " ") {
//                 arr[i] = string[j]
//             } else {
//                 arr[i] = "@"
//             }
//             j++
//             pencil.point--
//         }
//         paper = arr.join("")
//     }
//     return paper
// }
// #endregion

module.exports = { runKata }