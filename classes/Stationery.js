class Stationery {
    constructor(point = 50, length = 5, eraser = 25) {
        this.paper = ""
        this.pencil = {
            point: point,
            pointMax: point,
            length: length,
            eraser: eraser
        }
    }

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
        return this.setPoint(newPoint)
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
}

module.exports = { Stationery }