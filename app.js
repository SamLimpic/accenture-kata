// #region SECTION Pencil & Paper variables
const stationary = {
    pencil: {
        length: 20,
        point: 33,
        eraser: 40
    },
    paper: '',
    text: {
        written: '',
        remaining: 'This is Ripley, last survivor of the Nostromo, signing off.'
    }
}

let pencil = stationary.pencil
let paper = stationary.paper
let text = stationary.text
// #endregion

const kata = () => {
    // refresh()
    console.log("*Initial values of Pencil object:", `
    pencil = {
        length: ${pencil.length},
        point: ${pencil.point},
        eraser: ${pencil.eraser}
    }
`, `
*Initial values of Text object:`, `
    text = {
        written: "${text.written}",
        remaining: "${text.remaining}"
    }
`)
    write(text.remaining)
    return paper
}

const refresh = () => {
    pencil.length = Math.floor(Math.random() * 20)
    pencil.point = Math.floor(Math.random() * 30)
    pencil.eraser = Math.floor(Math.random() * 40)
    paper = ''
    text = {
        written: '',
        remaining: 'This is Ripley, last survivor of the Nostromo, signing off.'
    }
}

const write = (string) => {
    // for (let i = 0; i < string.length; i++) {
    //     paper += string[i]
    // }
    for (let i = 0; i < string.length; i++) {
        if (pencil.point > 0 || string[i] === ' ') {
            if (string[i] === ' ') {
                pencil.point = pencil.point
            } else if (string[i] === string[i].toLowerCase()) {
                pencil.point -= 1
            } else if (string[i] === string[i].toUpperCase()) {
                pencil.point -= 2
            }
            paper += string[i]
            text.written += string[i]
        } else {
            if (pencil.point < 0) {
                pencil.point = 0
                paper = paper.slice(0, -1)
                text.written = text.written.slice(0, -1)
                text.remaining = string.substring(i - 1)
            } else {
                text.remaining = string.substring(i)
            }
            i = string.length
        }
    }
    console.log("*Text written to Paper:", `
    "${paper}"
`, paper.length)
    console.log("*Resulting values of Pencil object:", `
    pencil = {
        length: ${pencil.length},
        point: ${pencil.point},
        eraser: ${pencil.eraser}
    }
`)
    console.log("*Resulting values of Text object:", `
    text = {
        written: "${text.written}",
        remaining: "${text.remaining}"
    }
`, text.written.length)
    return paper
}

// toWhomItMayConcern(text.remaining)

module.exports = write
module.exports = { kata }