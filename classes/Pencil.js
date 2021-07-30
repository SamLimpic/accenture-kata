class Pencil {
    // The Pencil Class handles all function calls directly related to an instance of Pencil
    constructor(
        /** @type {number} */ point = 50,
        /** @type {number} */ length = 5,
        /** @type {number} */ eraser = 25) {
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

    /** @param {string} char */
    checkCasing(char) {
        // Checks the casing of the current character to determine the Point Degredation value
        if (char === " " || char === `
        `) {
            return 0
        }
        if (char === char.toLowerCase()) {
            return 1
        }
        return 2
    }

    /** @param {number} number */
    setPoint(number) {
        return this.point = number
    }

    /** @param {string} char */
    degradePoint(char) {
        let newPoint = this.getPoint() - this.checkCasing(char)
        if (newPoint < 0) {
            // Sets the Point to 0 if would fall below 0 and returns false
            this.setPoint(0)
            return false
        }
        this.setPoint(newPoint)
        // Degrades the Point by the value dictated by checkCasing and returns true
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