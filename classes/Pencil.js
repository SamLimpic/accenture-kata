class Pencil {
    constructor(point = 50, length = 5, eraser = 25) {
        this.pencil = {
            point: point,
            pointMax: point,
            length: length,
            eraser: eraser
        }
    }

    getPencil() {
        return this.pencil
    }

    getPoint() {
        return this.pencil.point
    }

    getPointMax() {
        return this.pencil.pointMax
    }

    getLength() {
        return this.pencil.length
    }

    getEraser() {
        return this.pencil.eraser
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

    degradeLength() {
        return this.pencil.length--
    }

    degradeEraser() {
        return this.pencil.eraser--
    }
}

module.exports = { Pencil }