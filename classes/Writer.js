class Writer {
    constructor(pencil, paper) {
        this.pencil = pencil
        this.paper = paper
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
        return this.pencil
    }

    erase(word) {
        let paper = this.paper.getPaper()
        let eraser = this.pencil.getEraser()
        let end = paper.lastIndexOf(word)
        if (end > -1 && eraser > 0) {
            end--
            let start = end + word.length
            let newPaper = paper.split("")
            for (let i = start; i > end; i--) {
                if (this.pencil.getEraser() === 0) {
                    break
                }
                newPaper[i] = " "
                this.pencil.degradeEraser()
            }
            this.paper.setPaper(newPaper.join(""))
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
            let newPaper = paper.split("")
            let j = 0
            for (let i = start; i < end; i++) {
                if (!this.pencil.degradePoint(word[j])) {
                    break
                }
                if (newPaper[i] === " ") {
                    newPaper[i] = word[j]
                } else {
                    newPaper[i] = "@"
                }
                j++
            }
            this.paper.setPaper(newPaper.join(""))
        }
        return this.paper.getPaper()
    }
}

module.exports = { Writer }