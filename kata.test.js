// const { Writer } = require('./Writer.js')
const { Writer } = require('./classes/Writer.js')

const setPaper = (string) => {
    writer.journal.paper = string
}

const setPencil = (pointVal = pointMax, lengthVal = lengthMax, eraserVal = eraserMax) => {
    point = writer.journal.pencil.point = pointVal
    length = writer.journal.pencil.length = lengthVal
    eraser = writer.journal.pencil.eraser = eraserVal
}

const text = "This is Ripley"
const pointMax = 50
const lengthMax = 5
const eraserMax = 25

let point
let length
let eraser
let writer
let journal
let pencil
let paper

describe(`
Testing Kata`, () => {
    beforeAll(() => {
        writer = new Writer(pointMax, lengthMax, eraserMax)
        journal = writer.journal
        pencil = journal.pencil
        paper = journal.paper
        point = pencil.point
        length = pencil.length
        eraser = pencil.eraser
    })
    describe(`
    Initial Variables`, () => {
        describe("Variables can be instantiated", () => {
            test("Writer can be instantiated", () => {
                expect(writer).toBeTruthy()
            })
            test("Journal can be instantiated", () => {
                expect(journal).toBeTruthy()
            })
            test("Pencil can be instantiated", () => {
                expect(pencil.pointMax).toBeTruthy()
                expect(pencil.point).toBeTruthy()
                expect(pencil.eraser).toBeTruthy()
                expect(pencil.length).toBeTruthy()
            })
            test("Pencil is assigned correct values", () => {
                expect(pencil.pointMax).toBe(point)
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
        })
    })

    describe(`
    Point Degredation`, () => {
        let char
        describe("Pencil Point is degraded by correct value", () => {
            test("Spaces do not degrade Point value", () => {
                char = " "
                expect(journal.checkCasing(char)).toBe(0)
            })
            test("Non-Alphanumeric characters degrade Point value by 1", () => {
                char = ","
                expect(journal.checkCasing(char)).toBe(1)
            })
            test("Lower Case letters degrade Point value by 1", () => {
                char = "c"
                expect(journal.checkCasing(char)).toBe(1)
            })
            test("Upper Case letters degrade Point value by 2", () => {
                char = "C"
                expect(journal.checkCasing(char)).toBe(2)
            })
        })
    })

    describe(`
    Write Function`, () => {
        beforeEach(() => {
            setPencil()
            setPaper("")
        })
        describe("Text is recorded according to Pencil Point value", () => {
            test("Text is recorded as empty Spaces if Point value is 0", () => {
                point = 0
                setPencil(point)
                expect(writer.write(text)).toBe(" ".repeat(text.length))
                expect(pencil.point).toBe(0)
            })
            test("Text is completely recorded if final Point value is >= 0 and final length of Text is 0", () => {
                point = 14
                setPencil(point)
                expect(writer.write(text)).toBe(text)
                expect(pencil.point).toBe(0)
            })
            test("Text is partially recorded if final Point value is 0 and final length of Text is > 0", () => {
                point = 6
                setPencil(point)
                expect(writer.write(text)).toBe("This i        ")
                expect(pencil.point).toBe(0)
            })
            test("Character is not recorded if final Point value is < 2 and character is Uppercase", () => {
                point = 8
                setPencil(point)
                expect(writer.write(text)).toBe("This is       ")
            })
            test("Point value is not degraded below 0 if final Point value is < 2 and character is Uppercase", () => {
                point = 8
                setPencil(point)
                expect(writer.write(text)).toBe("This is       ")
                expect(pencil.point).toBe(0)
            })
            test("Character is recorded if final Point value is 0 and character is an empty Space", () => {
                point = 7
                setPencil(point)
                expect(writer.write(text)).toBe("This is       ")
                expect(pencil.point).toBe(0)
            })
            test("Text is added to existing Text on Paper if Point value remains > 0", () => {
                let newText = "Ripley"
                setPaper("This is ")
                point = 7
                setPencil(point)
                expect(writer.write(newText)).toBe("This is Ripley")
                expect(pencil.point).toBe(0)
            })
        })
    })

    describe(`
    Sharpen Function`, () => {
        beforeEach(() => {
            setPencil()
        })
        describe("Sharpen returns Point to its Max value according to Length value", () => {
            test("Pencil can be Sharpened if its Length is > 0", () => {
                writer.sharpen()
                expect(pencil.point).toBe(pointMax)
                expect(pencil.length).toBe(length - 1)
            })
            test("Pencil cannot be Sharpened if its Length is 0", () => {
                point = 0
                length = 0
                setPencil(point, length)
                writer.sharpen()
                expect(pencil.point).toBe(0)
                expect(pencil.length).toBe(0)
            })
            test("Pencil can be Sharpened multiple times if its Length value remains > 0", () => {
                writer.sharpen()
                expect(pencil.point).toBe(pointMax)
                expect(pencil.length).toBe(length - 1)
                writer.sharpen()
                expect(pencil.point).toBe(pointMax)
                expect(pencil.length).toBe(length - 2)
                writer.sharpen()
                expect(pencil.point).toBe(pointMax)
                expect(pencil.length).toBe(length - 3)
            })
        })
    })

    describe(`
    Erase Function`, () => {
        let newText = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
        let string = "kitty"
        point = 50
        length = 5
        beforeEach(() => {
            setPencil()
            setPaper(newText)
        })
        describe("Erase removes the last instance of a String according to Eraser value", () => {
            test("Erase replaces last occurrence of String with empty Spaces", () => {
                expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
            })
            test("Eraser value degrades by 1 for every character replaced", () => {
                expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
                expect(pencil.eraser).toBe(eraser - string.length)
            })
            test("Erase replaces characters of String in reverse order until Eraser value is 0", () => {
                eraser = 3
                setPencil(point, length, eraser)
                expect(writer.erase(string)).toBe("Here kitty, kitty, ki   . Meaow. Here Jonesy.")
                expect(pencil.eraser).toBe(0)
            })
            test("Erase does not remove String from Paper if Eraser value is 0", () => {
                eraser = 0
                setPencil(point, length, eraser)
                expect(writer.erase(string)).toBe(newText)
                expect(pencil.eraser).toBe(0)
            })
            test("Erase replaces the next-to-last occurrence of String after multiple uses", () => {
                expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
                expect(pencil.eraser).toBe(eraser - string.length)
                expect(writer.erase(string)).toBe("Here kitty,      ,      . Meaow. Here Jonesy.")
                expect(pencil.eraser).toBe(eraser - (string.length * 2))
                expect(writer.erase(string)).toBe("Here      ,      ,      . Meaow. Here Jonesy.")
                expect(pencil.eraser).toBe(eraser - (string.length * 3))
            })
        })
    })

    describe(`
    Edit Function`, () => {
        let newText = "Here kitty, kitty,      . Meaow. Here Jonesy."
        let string = "Alien"
        beforeEach(() => {
            setPencil()
            setPaper(newText)
        })
        describe("Edit replaces Erased Text with a new String according to Point value", () => {
            test("Edit replaces blank Text with new String", () => {
                expect(writer.edit(string)).toBe("Here kitty, kitty, Alien. Meaow. Here Jonesy.")
            })
            test("Point value degrades by 1 for every character replaced until Point value is 0", () => {
                point = 5
                setPencil(point)
                expect(writer.edit(string)).toBe("Here kitty, kitty, Alie . Meaow. Here Jonesy.")
                expect(pencil.point).toBe(0)
            })
            test("Edit replaces next occurrence of blank Text after multiple uses if Point value remains > 0", () => {
                setPaper("Here      ,      ,      . Meaow. Here Jonesy.")
                expect(writer.edit(string)).toBe("Here Alien,      ,      . Meaow. Here Jonesy.")
                setPaper("Here Alien,      ,      . Meaow. Here Jonesy.")
                expect(writer.edit(string)).toBe("Here Alien, Alien,      . Meaow. Here Jonesy.")
                setPaper("Here Alien, Alien,      . Meaow. Here Jonesy.")
                expect(writer.edit(string)).toBe("Here Alien, Alien, Alien. Meaow. Here Jonesy.")
            })
            test("Edit replaces existing characters with '@' if length of String exceeds length of blank Text", () => {
                string = "Xenomorph"
                expect(writer.edit(string)).toBe("Here kitty, kitty, Xenom@r@@aow. Here Jonesy.")
            })
        })
    })
})