class Paper {
    paper = ""
    getPaper() {
        return this.paper
    }

    setPaper(text) {
        return this.paper = text
    }

    addToPaper(text) {
        return this.paper += text
    }
}

module.exports = { Paper }