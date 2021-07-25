const { Pencil } = require('./Pencil.js')

const kata = () => {
    let pencil = new Pencil()
    let point = pencil.point
    let text = "This is Ripley, last survivor of Nostromo, signing off."
    let paper = ""
    let str = ""

    console.log(`
*Initial value of Text:`, `
    "${text}"
    `, `
*Initial value of Pencil:`, `
    pencil = {
        point: ${pencil.point},
        length: ${pencil.length},
        eraser: ${pencil.eraser}
    }
`, `
----- RUNNING KATA -----`)

    write(pencil, paper, text)
    paper = "This is Ripley, last survivor of "
    console.log(`
*Text written to Paper:`, `
        "${paper}"
`, `
*Current value of Pencil:`, `
    pencil = {
        point: ${pencil.point},
        length: ${pencil.length},
        eraser: ${pencil.eraser}
    }
`, `
----- SHARPENING PENCIL -----`)

    sharpen(point, pencil)

    console.log(`
*Value of Sharpened Pencil:`, `
    pencil = {
        point: ${pencil.point},
        length: ${pencil.length},
        eraser: ${pencil.eraser}
    }
`)
    paper = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    str = "kitty"
    erase(str, paper, pencil)
}

const write = (pencil, paper, text) => {
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        if (!pencil.point) {
            char = " "
        }
        checkCasing(char, pencil)
        if (pencil.point < 0) {
            pencil.point = 0
            char = " "
        }
        paper += char
    }
    return paper
}

const checkCasing = (char, pencil) => {
    if (char === " ") {
        return
    }
    if (char === char.toLowerCase()) {
        return pencil.point -= 1
    }
    if (char === char.toUpperCase()) {
        return pencil.point -= 2
    }
}

const sharpen = (point, pencil) => {
    if (pencil.length > 0) {
        pencil.point = point
        pencil.length--
    }
    return pencil
}

const erase = (string, paper, pencil) => {
    if (pencil.eraser > 0) {
        let index = paper.lastIndexOf(string)
        let arr = paper.split("")
        for (let i = index + string.length - 1; i > index - 1; i--) {
            if (pencil.eraser === 0) {
                break
            }
            arr[i] = " "
            pencil.eraser--
        }
        paper = arr.join("")
    }
    return paper
}

const edit = (string, paper, pencil) => {
    if (pencil.point > 0) {
        let index = paper.indexOf("  ") + 1
        let arr = paper.split("")
        let j = 0
        for (let i = index; i < index + string.length; i++) {
            if (pencil.point === 0) {
                break
            }
            if (arr[i] === " ") {
                arr[i] = string[j]
            } else {
                arr[i] = "@"
            }
            j++
            pencil.point--
        }
        paper = arr.join("")
    }
    return paper
}

module.exports = { kata, write, checkCasing, sharpen, erase, edit }