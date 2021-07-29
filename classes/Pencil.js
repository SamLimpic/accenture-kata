class Pencil {
    constructor(point = 50, length = 5, eraser = 25) {
        this.point = point
        this.pointMax = point
        this.length = length
        this.eraser = eraser
    }

    getPoint() {
        return this.point
    }

    getPointMax() {
        return this.pointMax
    }

    getLength() {
        return this.length
    }

    getEraser() {
        return this.eraser
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
        return this.point = number
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
        return this.length--
    }

    degradeEraser() {
        return this.eraser--
    }
}

module.exports = { Pencil }