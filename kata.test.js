const { Stationery } = require('./classes/Stationery.js')
const { Writer } = require('./classes/Writer.js')

// beforeEach(() => {

// })

describe("Variables can be instantiated and assigned correct values", () => {
    let text = "This is Ripley, last survivor of the Nostromo, signing off."
    let point = 50
    let length = 5
    let eraser = 25
    let writer = new Writer(point, length, eraser)
    let pencil = writer.pencil
    let paper = writer.paper
    describe("Variables can be instantiated", () => {
        test("Pencil can be instantiated", () => {
            expect(pencil.point).toBeTruthy()
            expect(pencil.eraser).toBeTruthy()
            expect(pencil.length).toBeTruthy()
        })
        test("Text can be instantiated", () => {
            expect(text).toBeTruthy()
        })
        test("Paper can be instantiated", () => {
            expect(paper).toBe("")
        })
    })

    describe("Variables are assigned correct values", () => {
        test("Pencil is assigned correct value", () => {
            expect(pencil.point).toBe(point)
            expect(pencil.eraser).toBe(eraser)
            expect(pencil.length).toBe(length)
        })
        test("Text is assigned correct value", () => {
            expect(text).toBe(text)
        })
        test("Paper is assigned correct value", () => {
            expect(paper).toBe("")
        })
    })
})

describe("Write function successfully records Text to Paper according to Point value", () => {
    describe("Point is degraded by correct value", () => {
        let writer = new Writer()
        let char
        test("Spaces do not degrade Point value", () => {
            char = " "
            expect(writer.checkCasing(char)).toBe(0)
        })
        test("Lower Case letters degrade Point value by 1", () => {
            char = "c"
            expect(writer.checkCasing(char)).toBe(1)
        })
        test("Numbers degrade Point value by 1", () => {
            char = "0"
            expect(writer.checkCasing(char)).toBe(1)
        })
        test("Non-Alphanumeric characters degrade Point value by 1", () => {
            char = "&"
            expect(writer.checkCasing(char)).toBe(1)
        })
        test("Upper Case letters degrade Point value by 2", () => {
            char = "C"
            expect(writer.checkCasing(char)).toBe(2)
        })
    })

    describe("Text is recorded according to Point value", () => {
        let text = "This is Ripley"
        test("Text is recorded as empty Spaces if Point value is 0", () => {
            let point = 0
            let writer = new Writer(point)
            expect(writer.write(text)).toBe(" ".repeat(text.length))
            expect(writer.pencil.point).toBe(point)
        })
        test("Text is recorded completely if final Point value is 0 and final length of Text is 0", () => {
            let point = 14
            let writer = new Writer(point)
            expect(writer.write(text)).toBe(text)
            expect(writer.pencil.point).toBe(0)
        })
        test("Text is recorded completely if final Point value is > 0 and final length of Text is 0", () => {
            let point = 15
            let writer = new Writer(point)
            expect(writer.write(text)).toBe(text)
            expect(writer.pencil.point).toBe(1)
        })
        test("Text is recorded partially if final Point value is 0 and final length of Text is > 0", () => {
            text = "This is"
            let point = 6
            let writer = new Writer(point)
            expect(writer.write(text)).toBe("This i ")
            expect(writer.pencil.point).toBe(0)
        })
        test("Final character is recorded if final Point value is 0 and final character is an empty Space", () => {
            text = "This is "
            let point = 7
            let writer = new Writer(point)
            expect(writer.write(text)).toBe("This is ")
            expect(writer.pencil.point).toBe(0)
        })
        test("Final character is not recorded if final Point value is < 2 and final character is Uppercase", () => {
            text = "This is R"
            let point = 8
            let writer = new Writer(point)
            expect(writer.write(text)).toBe("This is  ")
            expect(writer.pencil.point).toBe(0)
        })
        test("Appends additional Text to existing Text on Paper", () => {
            let point = 7
            let writer = new Writer(point)
            writer.paper = "This is "
            text = "Ripley"
            expect(writer.write(text)).toBe("This is Ripley")
        })
    })

})

describe("Sharpen function returns Point to its original value according to Length value", () => {
    test("Pencil can be Sharpened if its Length is > 0", () => {
        let point = 30
        let length = 1
        let writer = new Writer(point, length)
        writer.sharpen()
        expect(writer.pencil.point).toBe(point)
    })
    test("Pencil cannot be Sharpened if its Length is 0", () => {
        let point = 0
        let length = 0
        let writer = new Writer(point, length)
        writer.sharpen()
        expect(writer.pencil.point).toBe(point)
    })
    test("Pencil can be Sharpened multiple times if its Length remains > 0", () => {
        let point = 30
        let length = 3
        let writer = new Writer(point, length)
        writer.sharpen()
        expect(writer.pencil.point).toBe(point)
        expect(writer.pencil.length).toBe(2)
        writer.sharpen()
        expect(writer.pencil.point).toBe(point)
        expect(writer.pencil.length).toBe(1)
        writer.sharpen()
        expect(writer.pencil.point).toBe(point)
        expect(writer.pencil.length).toBe(0)
    })
})

describe("Erase function removes the last occurrence of a String from the Paper according to Eraser value", () => {
    let text = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    test("Erase replaces last occurrence of String with empty Spaces", () => {
        let string = "kitty"
        let writer = new Writer()
        writer.paper = text
        expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
    })
    test("Eraser value degrades by 1 for every character replaced", () => {
        let string = "kitty"
        let writer = new Writer()
        writer.paper = text
        let erased = writer.pencil.eraser - string.length
        expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
        expect(writer.pencil.eraser).toBe(erased)
    })
    test("Erase replaces characters of String in reverse until Eraser value is 0", () => {
        let string = "kitty"
        let writer = new Writer()
        writer.pencil.eraser = 3
        writer.paper = text
        expect(writer.erase(string)).toBe("Here kitty, kitty, ki   . Meaow. Here Jonesy.")
        expect(writer.pencil.eraser).toBe(0)
    })
    test("Erase does not remove String from Paper if Eraser value is 0", () => {
        let string = "kitty"
        let writer = new Writer()
        writer.paper = text
        writer.pencil.eraser = 0
        expect(writer.erase(string)).toBe(text)
    })
    test("Erase replaces the next-to-last occurrence of String upon multiple uses if Eraser value remains > 0", () => {
        let string = "kitty"
        let writer = new Writer()
        writer.paper = text
        let erased = writer.pencil.eraser - string.length
        expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
        expect(writer.pencil.eraser).toBe(erased)
        writer.paper = "Here kitty, kitty,      . Meaow. Here Jonesy."
        erased = writer.pencil.eraser - string.length
        expect(writer.erase(string)).toBe("Here kitty,      ,      . Meaow. Here Jonesy.")
        expect(writer.pencil.eraser).toBe(erased)
        writer.paper = "Here kitty,      ,      . Meaow. Here Jonesy."
        erased = writer.pencil.eraser - string.length
        expect(writer.erase(string)).toBe("Here      ,      ,      . Meaow. Here Jonesy.")
        expect(writer.pencil.eraser).toBe(erased)
    })
})

describe("Edit function replaces Erased Text with a new String according to Point value", () => {
    let text = "Here kitty, kitty,      . Meaow. Here Jonesy."
    test("Edit replaces Erased Text with new String", () => {
        let string = "Alien"
        let writer = new Writer()
        writer.paper = text
        expect(writer.edit(string)).toBe("Here kitty, kitty, Alien. Meaow. Here Jonesy.")
    })
    test("Point value degrades by 1 for every character replaced until Point value is 0", () => {
        let string = "Alien"
        let point = 5
        let writer = new Writer(point)
        writer.paper = text
        expect(writer.edit(string)).toBe("Here kitty, kitty, Alie . Meaow. Here Jonesy.")
        expect(writer.pencil.point).toBe(0)
    })
    test("Edit replaces existing characters with '@' if length of String exceeds length of empty Spaces", () => {
        let string = "Xenomorph"
        let writer = new Writer()
        writer.paper = text
        expect(writer.edit(string)).toBe("Here kitty, kitty, Xenom@r@@aow. Here Jonesy.")
    })
    test("Edit replaces next-available blank Text with String if Edit is run multuple times and Point value remains > 0", () => {
        let string = "Alien"
        let writer = new Writer()
        writer.paper = "Here      ,      ,      . Meaow. Here Jonesy."
        expect(writer.edit(string)).toBe("Here Alien,      ,      . Meaow. Here Jonesy.")
        writer.paper = "Here Alien,      ,      . Meaow. Here Jonesy."
        expect(writer.edit(string)).toBe("Here Alien, Alien,      . Meaow. Here Jonesy.")
        writer.paper = "Here Alien, Alien,      . Meaow. Here Jonesy."
        expect(writer.edit(string)).toBe("Here Alien, Alien, Alien. Meaow. Here Jonesy.")
    })
})