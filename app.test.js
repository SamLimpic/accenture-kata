const write = require('./app.js')

describe("Logs a given string to the console, determined by durability of Pencil", () => {
    test("Logs a given string to the console", () => {
        expect(write("This is Ripley, last survivor of the Nostromo, signing off.")).toBe("This is Ripley, last survivor of the Nostromo, signing off.")
    })
})