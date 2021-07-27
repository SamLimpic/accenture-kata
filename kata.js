const { Writer } = require('./classes/Writer.js')

function viewKata(text = "This is Ripley, last survivor of Nostromo, signing off.", point, length, eraser) {
    let writer = new Writer(point, length, eraser)
    let string

    writer.write(text)
    writer.sharpen()
    writer.paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    string = "kitty"
    writer.erase(string)
    writer.erase(string)
    string = "Alien"
    writer.edit(string)
    string = "Xenomorph"
    writer.edit(string)
}

const runKata = (text = "This is Ripley, last survivor of Nostromo, signing off.", point, length, eraser) => {
    let writer = new Writer(point, length, eraser)
    let string

    console.log(`
----- RUNNING KATA -----
`, `
*Initial value of Stationery:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    },
    paper = "${writer.paper}"
`, `
----- WRITING TEXT -----
`)

    writer.write(text)

    console.log(`*Text to be written:`, `
    "${text}"
`, `
*Current value of Stationery:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    },
    paper = "${writer.paper}"
`, `
----- SHARPENING PENCIL -----
`)

    writer.sharpen()

    console.log(`*Value of Sharpened Pencil:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    }
`, `
----- ERASING TEXT -----
`)

    writer.paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    string = "kitty"

    console.log(`*Modified value of Paper:`, `
    "${writer.paper}"
`, `
*Text to be Erased:`, `
    "${string}"
`)

    writer.erase(string)

    console.log(`*Current value of Stationery:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    },
    paper = "${writer.paper}"
`, `
----- ERASING TEXT -----`)

    writer.erase(string)
    string = "Alien"

    console.log(`*Current value of Stationery:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    },
    paper = "${writer.paper}"
`, `
----- EDITING TEXT -----
`, `
*Text to be added:`, `
    "${string}"
`)

    writer.edit(string)
    string = "Xenomorph"

    console.log(`*Current value of Stationery:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    },
    paper = "${writer.paper}"
`, `
----- EDITING TEXT -----
`, `
*Text to be added:`, `
    "${string}"
`)

    writer.edit(string)

    console.log(`*Current value of Stationery:`, `
    pencil = {
        point: ${writer.pencil.point},
        length: ${writer.pencil.length},
        eraser: ${writer.pencil.eraser}
    },
    paper = "${writer.paper}"
`)
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