const { Pencil } = require('./Pencil.js')

const kata = () => {
    let pencil = new Pencil()
    let text = "This is Ripley, last survivor of Nostromo, signing off."
    let paper = ""

    console.log(`
*Initial value of Text:`, `
    "${text}"
    `, `
*Initial values of Pencil:`, `
    pencil = {
        point: ${pencil.point},
        length: ${pencil.length},
        eraser: ${pencil.eraser}
    }
`, `
----- RUNNING KATA -----`)
    write(pencil, paper, text)
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
    // logResults(pencil, paper, text)
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

const logResults = (pencil, paper) => {
    console.log(`
*Text written to Paper:`, `
    "${paper}"
`, `
*Final values of Pencil`, `
    pencil = {
        sharp: ${pencil.sharp},
        point: ${pencil.point},
        length: ${pencil.length},
        eraser: ${pencil.eraser}
    }
`)
}

const sharpen = (point, pencil) => {
    if (pencil.length > 0) {
        pencil.point = point
        pencil.length--
        pencil.sharp = true
    }
    return pencil
}

module.exports = { kata, write, checkCasing, sharpen }