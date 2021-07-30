class Writer {
    // The Writer Class handles all function calls directly related to an instance of Writer
    constructor(
        /** @type {object} */ pencil,
        /** @type {object} */ paper) {
        this.pencil = pencil
        this.paper = paper
    }

    /** @param {string} text */
    write(text) {
        // Writes the given Text to the Paper
        text.split("").forEach(char => {
            if (!this.pencil.degradePoint(char)) {
                // If degradePoint returns false, the character will not be written
                char = " "
                // If the Point would fall below 0, only blank spaces will be written
            }
            this.paper.addToPaper(char)
        })
        return this.paper.getPaper()
    }

    sharpen() {
        if (this.pencil.getLength() > 0) {
            // Checks if the current Length is greater than 0 and is able to be reduced
            this.pencil.setPoint(this.pencil.getPointMax())
            this.pencil.degradeLength()
        }
        return this.pencil
    }

    /** @param {string} word */
    erase(word) {
        // Erases the given Word from the Paper
        let paper = this.paper.getPaper()
        let end = paper.lastIndexOf(word)
        // Searches the Paper for any instance of the given Word, and supplies the index of the last instance
        if (end > -1) {
            // Checks if the provided word exists on the paper and is able to be removed
            end--
            // Adjusts for zero-based indexing
            let start = end + word.length
            // Only loops through the Array at the indexes of the Word to-be-Erased
            let newPaper = paper.split("")
            // Converts the Paper into an Array of individual characters so they can be modified
            for (let i = start; i > end; i--) {
                if (this.pencil.getEraser() === 0) {
                    // Checks if the current Eraser is greater than 0, else breaks the loop
                    break
                }
                newPaper[i] = " "
                this.pencil.degradeEraser()
            }
            this.paper.setPaper(newPaper.join(""))
            // Converts the newPaper Array back to a String before setting the Paper
        }
        return this.paper.getPaper()
    }

    /** @param {string} word */
    edit(word) {
        // Changes any Erased Text on the Paper to the given Word
        let paper = this.paper.getPaper()
        let start = paper.indexOf("  ")
        // Searches the Paper for any instance of repeated blank spaces, and supplies the index of the preceding Space
        if (start > -1) {
            // Checks if the Paper has any Erased words that can be Edited
            if (start !== 0) {
                start++
                // Adjusts for indexOf indexing the preceding Space, unless the Erased word is the first on the Paper
            }
            let end = start + word.length
            // Only loops through the Array at the indexes of the Spaces to-be-Edited
            let newPaper = paper.split("")
            // Converts the Paper into an Array of individual characters so they can be modified
            let j = 0
            for (let i = start; i < end; i++) {
                if (!this.pencil.degradePoint(word[j])) {
                    // If degradePoint returns false, the character will not be written
                    word = " ".repeat(word.length)
                    // If the Point would fall below 0, the Edit is replaced with empty spaces of equal length
                }
                if (newPaper[i] === " " || !newPaper[i]) {
                    newPaper[i] = word[j]
                    // If the current character on the Paper is an empty space, the Edit character replaces it
                    // If the Edit exceeds the length of the Paper, the Edit character is appended
                } else {
                    newPaper[i] = "@"
                    // If the current character on the Paper is not an empty space, an @ symbol replaces it
                }
                j++
            }
            this.paper.setPaper(newPaper.join(""))
            // Converts the newPaper Array back to a String before setting the Paper
        }
        return this.paper.getPaper()
    }
}

module.exports = { Writer }