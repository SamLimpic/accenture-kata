const { Writer } = require('./Writer.js')
const colors = require('colors/safe')

function viewKata(text = "This is Ripley... last survivor of the Nostromo... signing off.", point, length, eraser) {
    let writer = new Writer(point, length, eraser)
    let string = "kitty"

    writer.write(text)
    writer.sharpen()

    writer.paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    writer.erase(string)
    writer.erase(string)

    string = "Alien"
    writer.edit(string)
    string = "Xenomorph"
    writer.edit(string)
}

const runKata = (text = "This is Ripley... last survivor of the Nostromo... signing off.", point, length, eraser) => {
    let writer = new Writer(point, length, eraser)
    let string = "kitty"

    console.log(`
${colors.underline("Running Kata")}`)

    console.log(colors.italic("Initial value of Stationery:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${writer.pencil.point}`)},
        length: ${colors.grey(`${writer.pencil.length}`)},
        eraser: ${colors.grey(`${writer.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.grey(`${writer.paper}`)}"
`)

    console.log(colors.italic("Text to be written:"))

    console.log(`    "${colors.grey(`${text}`)}"

`)

    console.log(colors.underline("Writing Text"))

    writer.write(text)

    console.log(colors.italic("Current value of Stationery:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${writer.pencil.point} [-50]`)},
        length: ${colors.grey(`${writer.pencil.length}`)},
        eraser: ${colors.grey(`${writer.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${writer.paper}`)}"

`)

    console.log(colors.underline("Sharpening Pencil"))

    writer.sharpen()

    console.log(colors.italic("Value of Sharpened Pencil:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.green(`${writer.pencil.point} [+50]`)},
        length: ${colors.red(`${writer.pencil.length} [-1]`)},
        eraser: ${colors.grey(`${writer.pencil.eraser}`)}
    }

`)

    console.log(colors.underline("Erasing Text"))

    writer.paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."

    console.log(colors.italic("Modified value of Paper:"))

    console.log(`    "${colors.grey(`${writer.paper}`)}"
`)

    console.log(colors.italic("Text to be Erased:"))

    console.log(`    "${colors.red(`${string}`)}"
`)

    writer.erase(string)

    console.log(colors.italic("Current value of Stationery:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${writer.pencil.point}`)},
        length: ${colors.grey(`${writer.pencil.length}`)},
        eraser: ${colors.red(`${writer.pencil.eraser} [-5]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${writer.paper}`)}"

`)

    console.log(colors.underline("Erasing Text"))

    writer.erase(string)

    console.log(colors.italic("Current value of Stationery:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.grey(`${writer.pencil.point}`)},
        length: ${colors.grey(`${writer.pencil.length}`)},
        eraser: ${colors.red(`${writer.pencil.eraser} [-5]`)}
    },
    ${colors.bold("paper")} = "${colors.red(`${writer.paper}`)}"

`)

    string = "Alien"

    console.log(colors.underline("Editing Text"))

    console.log(colors.italic("Text to be added:"))

    console.log(`    "${colors.green(`${string}`)}"
`)

    writer.edit(string)

    console.log(colors.italic("Current value of Stationery:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${writer.pencil.point} [-6]`)},
        length: ${colors.grey(`${writer.pencil.length}`)},
        eraser: ${colors.grey(`${writer.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${writer.paper}`)}"

`)

    string = "Xenomorph"

    console.log(colors.underline("Editing Text"))

    console.log(colors.italic("Text to be added:"))

    console.log(`    "${colors.green(`${string}`)}"
`)

    writer.edit(string)

    console.log(colors.italic("Final value of Stationery:"))

    console.log(`    ${colors.bold("pencil")} = {
        point: ${colors.red(`${writer.pencil.point} [-10]`)},
        length: ${colors.grey(`${writer.pencil.length}`)},
        eraser: ${colors.grey(`${writer.pencil.eraser}`)}
    },
    ${colors.bold("paper")} = "${colors.green(`${writer.paper}`)}

`)

    console.log(colors.bold("Kata Complete"))
}
// #region REVIEW REFACTORED
// const write = (pencil, paper, text) => {
//     for (let i = 0; i < text.length; i++) {
//         let char = text[i]
//         if (!writer.pencil.point) {
//             char = " "
//         }
//         checkCasing(char, pencil)
//         if (writer.pencil.point < 0) {
//             writer.pencil.point = 0
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
//         return writer.pencil.point -= 1
//     }
//     if (char === char.toUpperCase()) {
//         return writer.pencil.point -= 2
//     }
// }

// const sharpen = (point, pencil) => {
//     if (writer.pencil.length > 0) {
//         writer.pencil.point = point
//         writer.pencil.length--
//     }
//     return pencil
// }

// const erase = (string, paper, pencil) => {
//     if (writer.pencil.eraser > 0) {
//         let index = paper.lastIndexOf(string)
//         let arr = paper.split("")
//         for (let i = index + string.length - 1; i > index - 1; i--) {
//             if (writer.pencil.eraser === 0) {
//                 break
//             }
//             arr[i] = " "
//             writer.pencil.eraser--
//         }
//         paper = arr.join("")
//     }
//     return paper
// }

// const edit = (string, paper, pencil) => {
//     if (writer.pencil.point > 0) {
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