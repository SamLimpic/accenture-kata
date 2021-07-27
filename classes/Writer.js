class Writer {
    constructor(point = 50, length = 5, eraser = 25) {
        this.paper = ""
        this.pencil = {
            point: point,
            pointMax: point,
            length: length,
            eraser: eraser
        }
    }

    // #region Get / Set Variables
    getPaper() {
        return this.paper
    }

    setPaper(text) {
        return this.paper = text
    }

    addToPaper(text) {
        return this.paper += text
    }

    checkCasing(char) {
        if (char === " " || char === `
        `) {
            return 0
        }
        if (char === char.toLowerCase()) {
            return 1
        }
        return 2
    }

    getPoint() {
        return this.pencil.point
    }

    getPointMax() {
        return this.pencil.pointMax
    }

    setPoint(number) {
        return this.pencil.point = number
    }

    degradePoint(char) {
        let newPoint = this.getPoint() - this.checkCasing(char)
        if (newPoint < 0) {
            this.setPoint(0)
            return false
        }
        this.setPoint(newPoint)
        return true
    }

    getLength() {
        return this.pencil.length
    }

    degradeLength() {
        return this.pencil.length--
    }

    getEraser() {
        return this.pencil.eraser
    }

    degradeEraser() {
        return this.pencil.eraser--
    }
    // #endregion



    // #region Writer Functions
    write(text) {
        text.split("").forEach(char => {
            if (!this.degradePoint(char)) {
                char = " "
            }
            this.addToPaper(char)
        })
        return this.paper
    }

    sharpen() {
        if (this.getLength() > 0) {
            this.setPoint(this.getPointMax())
            this.degradeLength()
        }
        return this.pencil
    }

    erase(word) {
        let paper = this.getPaper()
        let end = paper.lastIndexOf(word)
        if (end > -1 && this.getEraser() > 0) {
            end--
            let start = end + word.length
            let erased = paper.split("")
            for (let i = start; i > end; i--) {
                if (this.getEraser() === 0) {
                    break
                }
                erased[i] = " "
                this.degradeEraser()
            }
            this.setPaper(erased.join(""))
        }
        return this.paper
    }

    edit(word) {
        let paper = this.getPaper()
        let point = this.getPoint()
        let start = paper.indexOf("  ")
        if (start > -1 && point > 0) {
            if (start !== 0) {
                start++
            }
            let end = start + word.length
            let edited = paper.split("")
            let j = 0
            for (let i = start; i < end; i++) {
                if (!this.degradePoint(word[j])) {
                    break
                }
                if (edited[i] === " ") {
                    edited[i] = word[j]
                } else {
                    edited[i] = "@"
                }
                j++
            }
            this.setPaper(edited.join(""))
        }
        return this.paper
    }
    // #endregion
}

module.exports = { Writer }