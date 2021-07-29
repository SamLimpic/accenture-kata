const { Journal } = require('./Journal.js')
class Writer {
    constructor(point, length, eraser) {
        this.journal = new Journal(point, length, eraser)
    }

    write(text) {
        text.split("").forEach(char => {
            if (!this.journal.degradePoint(char)) {
                char = " "
            }
            this.journal.addToPaper(char)
        })
        return this.journal.paper
    }

    sharpen() {
        if (this.journal.getLength() > 0) {
            this.journal.setPoint(this.journal.getPointMax())
            this.journal.degradeLength()
        }
        return this.journal.pencil
    }

    erase(word) {
        let paper = this.journal.getPaper()
        let end = paper.lastIndexOf(word)
        if (end > -1 && this.journal.getEraser() > 0) {
            end--
            let start = end + word.length
            let erased = paper.split("")
            for (let i = start; i > end; i--) {
                if (this.journal.getEraser() === 0) {
                    break
                }
                erased[i] = " "
                this.journal.degradeEraser()
            }
            this.journal.setPaper(erased.join(""))
        }
        return this.journal.paper
    }

    edit(word) {
        let paper = this.journal.getPaper()
        let point = this.journal.getPoint()
        let start = paper.indexOf("  ")
        if (start > -1 && point > 0) {
            if (start !== 0) {
                start++
            }
            let end = start + word.length
            let edited = paper.split("")
            let j = 0
            for (let i = start; i < end; i++) {
                if (!this.journal.degradePoint(word[j])) {
                    break
                }
                if (edited[i] === " ") {
                    edited[i] = word[j]
                } else {
                    edited[i] = "@"
                }
                j++
            }
            this.journal.setPaper(edited.join(""))
        }
        return this.journal.paper
    }
}

module.exports = { Writer }