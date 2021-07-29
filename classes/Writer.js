const { Pencil } = require('./Pencil.js')
const { Paper } = require('./Paper.js')
class Writer {
    constructor(point, length, eraser) {
        this.pencil = new Pencil(point, length, eraser)
        this.paper = new Paper()
    }

    write(text) {
        text.split("").forEach(char => {
            if (!this.pencil.degradePoint(char)) {
                char = " "
            }
            this.paper.addToPaper(char)
        })
        return this.paper.getPaper()
    }

    sharpen() {
        if (this.pencil.getLength() > 0) {
            this.pencil.setPoint(this.pencil.getPointMax())
            this.pencil.degradeLength()
        }
        return this.pencil.getPencil()
    }

    erase(word) {
        let paper = this.paper.getPaper()
        let end = paper.lastIndexOf(word)
        if (end > -1 && this.pencil.getEraser() > 0) {
            end--
            let start = end + word.length
            let erased = paper.split("")
            for (let i = start; i > end; i--) {
                if (this.pencil.getEraser() === 0) {
                    break
                }
                erased[i] = " "
                this.pencil.degradeEraser()
            }
            this.paper.setPaper(erased.join(""))
        }
        return this.paper.getPaper()
    }

    edit(word) {
        let paper = this.paper.getPaper()
        let point = this.pencil.getPoint()
        let start = paper.indexOf("  ")
        if (start > -1 && point > 0) {
            if (start !== 0) {
                start++
            }
            let end = start + word.length
            let edited = paper.split("")
            let j = 0
            for (let i = start; i < end; i++) {
                if (!this.pencil.degradePoint(word[j])) {
                    break
                }
                if (edited[i] === " ") {
                    edited[i] = word[j]
                } else {
                    edited[i] = "@"
                }
                j++
            }
            this.paper.setPaper(edited.join(""))
        }
        return this.paper.getPaper()
    }
}

module.exports = { Writer }