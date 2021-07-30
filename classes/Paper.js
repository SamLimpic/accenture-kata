class Paper {
    // The Paper Class handles all function calls directly related to an instance of Paper
    paper = ""

    getPaper() {
        return this.paper
    }

    /** @param {string} text */
    setPaper(text) {
        return this.paper = text
    }

    /** @param {string} text */
    addToPaper(text) {
        return this.paper += text
    }
}

module.exports = { Paper }