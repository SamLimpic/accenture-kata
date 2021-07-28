const { Stationery } = require('./classes/Stationery.js')
const { Writer } = require('./classes/Writer.js')
const colors = require('colors/safe')

let text = "This is Ripley"
let point
let length
let eraser
let writer
let pencil
let paper

// describe("Initial Variables", () => {

//     beforeEach(() => {

//     })

// })

describe(colors.underline(`
Initial Variables`), () => {
    describe(colors.green("Variables can be instantiated"), () => {
        point = 50
        length = 5
        eraser = 25
        writer = new Writer(point, length, eraser)
        pencil = writer.pencil
        paper = writer.paper
        test("Pencil can be instantiated", () => {
            expect(pencil.point).toBeTruthy()
            expect(pencil.eraser).toBeTruthy()
            expect(pencil.length).toBeTruthy()
        })
        test("Pencil is assigned correct value", () => {
            expect(pencil.point).toBe(point)
            expect(pencil.eraser).toBe(eraser)
            expect(pencil.length).toBe(length)
        })
        test("Text can be instantiated", () => {
            expect(text).toBeTruthy()
        })
        test("Text is assigned correct value", () => {
            expect(text).toBe(text)
        })
        test("Paper can be instantiated", () => {
            expect(paper).toBe(paper)
        })
        test("Paper is assigned correct value", () => {
            expect(paper).toBe("")
        })
    })
})

describe(colors.underline(`
Point Degredation`), () => {
    describe(colors.green("Pencil Point is degraded by correct value"), () => {
        writer = new Writer()
        let char
        test("Spaces do not degrade Point value", () => {
            char = " "
            expect(writer.checkCasing(char)).toBe(0)
        })
        test("Lower Case letters degrade Point value by 1", () => {
            char = "c"
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
})

describe(colors.underline(`
Write Function`), () => {
    describe(colors.green("Text is recorded according to Pencil Point value"), () => {
        beforeEach(() => {
            writer = new Writer()
        })
        test("Text is recorded as empty Spaces if Point value is 0", () => {
            writer.pencil.point = 0
            expect(writer.write(text)).toBe(" ".repeat(text.length))
            expect(writer.pencil.point).toBe(0)
        })
        test("Text is recorded completely if final Point value is 0 and final length of Text is 0", () => {
            writer.pencil.point = 14
            expect(writer.write(text)).toBe(text)
            expect(writer.pencil.point).toBe(0)
        })
        test("Text is completely recorded if final Point value is > 0 and final length of Text is 0", () => {
            writer.pencil.point = 15
            expect(writer.write(text)).toBe(text)
            expect(writer.pencil.point).toBe(1)
        })
        test("Text is partially recorded if final Point value is 0 and final length of Text is > 0", () => {
            writer.pencil.point = 6
            expect(writer.write(text)).toBe("This i        ")
            expect(writer.pencil.point).toBe(0)
        })
        test("Character is recorded if final Point value is 0 and character is an empty Space", () => {
            writer.pencil.point = 7
            expect(writer.write(text)).toBe("This is       ")
            expect(writer.pencil.point).toBe(0)
        })
        test("Character is not recorded if final Point value is < 2 and character is Uppercase", () => {
            writer.pencil.point = 8
            expect(writer.write(text)).toBe("This is       ")
        })
        test("Point value is not degraded below 0 if final Point value is < 2 and character is Uppercase", () => {
            writer.pencil.point = 8
            expect(writer.write(text)).toBe("This is       ")
            expect(writer.pencil.point).toBe(0)
        })
        test("Appends additional Text to existing Text on Paper if Point value remains > 0", () => {
            text = "Ripley"
            writer.paper = "This is "
            writer.pencil.point = 7
            expect(writer.write(text)).toBe("This is Ripley")
            expect(writer.pencil.point).toBe(0)
        })
    })
})

describe(colors.underline(`
Sharpen Function`), () => {
    describe(colors.green("Sharpen returns Point to its max value according to Length value"), () => {
        let pointMax
        beforeEach(() => {
            writer = new Writer()
            pointMax = writer.pencil.pointMax
            length = writer.pencil.length
        })
        test("Pencil can be Sharpened if its Length is > 0", () => {
            writer.sharpen()
            expect(writer.pencil.point).toBe(pointMax)
            expect(writer.pencil.length).toBe(length - 1)
        })
        test("Pencil cannot be Sharpened if its Length is 0", () => {
            writer.pencil.point = 0
            writer.pencil.length = 0
            writer.sharpen()
            expect(writer.pencil.point).toBe(0)
            expect(writer.pencil.length).toBe(0)
        })
        test("Pencil can be Sharpened multiple times if its Length value remains > 0", () => {
            length = 3
            writer.pencil.length = length
            writer.sharpen()
            expect(writer.pencil.point).toBe(pointMax)
            expect(writer.pencil.length).toBe(length - 1)
            writer.sharpen()
            expect(writer.pencil.point).toBe(pointMax)
            expect(writer.pencil.length).toBe(length - 2)
            writer.sharpen()
            expect(writer.pencil.point).toBe(pointMax)
            expect(writer.pencil.length).toBe(length - 3)
        })
    })
})

describe(colors.underline(`
Erase Function`), () => {
    describe(colors.green("Erase removes the last instance of a String according to Eraser value"), () => {
        let text = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
        let string = "kitty"
        let erased
        beforeEach(() => {
            writer = new Writer()
            writer.paper = text
            erased = writer.pencil.eraser - string.length
        })
        test("Erase replaces last occurrence of String with empty Spaces", () => {
            expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
        })
        test("Eraser value degrades by 1 for every character replaced", () => {
            expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
            expect(writer.pencil.eraser).toBe(erased)
        })
        test("Erase replaces characters of String in reverse order until Eraser value is 0", () => {
            writer.pencil.eraser = 3
            expect(writer.erase(string)).toBe("Here kitty, kitty, ki   . Meaow. Here Jonesy.")
            expect(writer.pencil.eraser).toBe(0)
        })
        test("Erase does not remove String from Paper if Eraser value is 0", () => {
            writer.pencil.eraser = 0
            expect(writer.erase(string)).toBe(text)
            expect(writer.pencil.eraser).toBe(0)
        })
        test("Erase replaces the next-to-last occurrence of String after multiple uses if Eraser value remains > 0", () => {
            expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
            expect(writer.pencil.eraser).toBe(erased)
            erased = writer.pencil.eraser - string.length
            expect(writer.erase(string)).toBe("Here kitty,      ,      . Meaow. Here Jonesy.")
            expect(writer.pencil.eraser).toBe(erased)
            erased = writer.pencil.eraser - string.length
            expect(writer.erase(string)).toBe("Here      ,      ,      . Meaow. Here Jonesy.")
            expect(writer.pencil.eraser).toBe(erased)
        })
    })
})

describe(colors.underline(`
Edit Function`), () => {
    describe(colors.green("Edit replaces Erased Text with a new String according to Point value"), () => {
        let text = "Here kitty, kitty,      . Meaow. Here Jonesy."
        let string = "Alien"
        beforeEach(() => {
            writer = new Writer()
            writer.paper = text
        })
        test("Edit replaces Erased Text with new String", () => {
            expect(writer.edit(string)).toBe("Here kitty, kitty, Alien. Meaow. Here Jonesy.")
        })
        test("Point value degrades by 1 for every character replaced until Point value is 0", () => {
            writer.pencil.point = 5
            expect(writer.edit(string)).toBe("Here kitty, kitty, Alie . Meaow. Here Jonesy.")
            expect(writer.pencil.point).toBe(0)
        })
        test("Edit replaces next-available blank Text with String after multiple uses if Point value remains > 0", () => {
            writer.paper = "Here      ,      ,      . Meaow. Here Jonesy."
            expect(writer.edit(string)).toBe("Here Alien,      ,      . Meaow. Here Jonesy.")
            writer.paper = "Here Alien,      ,      . Meaow. Here Jonesy."
            expect(writer.edit(string)).toBe("Here Alien, Alien,      . Meaow. Here Jonesy.")
            writer.paper = "Here Alien, Alien,      . Meaow. Here Jonesy."
            expect(writer.edit(string)).toBe("Here Alien, Alien, Alien. Meaow. Here Jonesy.")
        })
        test("Edit replaces existing characters with '@' if length of String exceeds length of empty Spaces", () => {
            string = "Xenomorph"
            expect(writer.edit(string)).toBe("Here kitty, kitty, Xenom@r@@aow. Here Jonesy.")
        })
    })
})