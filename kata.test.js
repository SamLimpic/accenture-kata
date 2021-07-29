const { Pencil } = require('./classes/Pencil.js')
const { Paper } = require('./classes/Paper.js')
const { Writer } = require('./classes/Writer.js')
const { testKata } = require('./kata.js')


const text = "This is Ripley"
const pointMax = 50
const lengthMax = 5
const eraserMax = 25

let pencil
let paper
let writer
let point
let length
let eraser

// const setPaper = (string) => {
//     paper = writer.paper.setPaper(string)
// }

// const setPencil = (pointVal = pointMax, lengthVal = lengthMax, eraserVal = eraserMax) => {
//     pencil = writer.pencil.getPencil()
//     point = pencil.point = pointVal
//     length = pencil.length = lengthVal
//     eraser = pencil.eraser = eraserVal
// }

// The main test suite run using the command "npm run test"
describe(`
Testing Kata`, () => {
    beforeEach(() => {
        pencil = new Pencil(pointMax, lengthMax, eraserMax)
        paper = new Paper()
        writer = new Writer(pencil, paper)
    })
    describe(`
    Initial Variables`, () => {
        describe("Variables can be instantiated", () => {
            test("Writer can be instantiated", () => {
                expect(writer).toBeTruthy()
            })
            test("Pencil can be instantiated", () => {
                expect(writer.pencil).toBeTruthy()
                expect(writer.pencil.pointMax).toBeTruthy()
                expect(writer.pencil.point).toBeTruthy()
                expect(writer.pencil.length).toBeTruthy()
                expect(writer.pencil.eraser).toBeTruthy()
            })
            test("Pencil is assigned correct values", () => {
                expect(writer.pencil.pointMax).toBe(pointMax)
                expect(writer.pencil.point).toBe(pointMax)
                expect(writer.pencil.length).toBe(lengthMax)
                expect(writer.pencil.eraser).toBe(eraserMax)
            })
            test("Paper can be instantiated", () => {
                expect(writer.paper).toBeTruthy()
            })
            test("Paper is assigned correct value", () => {
                expect(writer.paper.getPaper()).toBe("")
            })
            test("Text can be instantiated", () => {
                expect(text).toBeTruthy()
            })
            test("Text is assigned correct value", () => {
                expect(text).toBe(text)
            })
        })
    })

    describe(`
    Point Degredation`, () => {
        let char
        describe("Pencil Point is degraded by correct value", () => {
            test("Spaces do not degrade Point value", () => {
                char = " "
                expect(writer.pencil.checkCasing(char)).toBe(0)
            })
            test("Non-Alphanumeric characters degrade Point value by 1", () => {
                char = ","
                expect(writer.pencil.checkCasing(char)).toBe(1)
            })
            test("Lower Case letters degrade Point value by 1", () => {
                char = "c"
                expect(writer.pencil.checkCasing(char)).toBe(1)
            })
            test("Upper Case letters degrade Point value by 2", () => {
                char = "C"
                expect(writer.pencil.checkCasing(char)).toBe(2)
            })
        })
    })

    describe(`
    Write Function`, () => {
        describe("Text is recorded according to Pencil Point value", () => {
            test("Text is recorded as empty Spaces if Point value is 0", () => {
                writer.pencil.point = 0
                expect(writer.write(text)).toBe(" ".repeat(text.length))
                expect(pencil.point).toBe(0)
            })
            test("Text is completely recorded if final Point value is >= 0", () => {
                writer.pencil.point = 14
                expect(writer.write(text)).toBe(text)
                expect(pencil.point).toBe(0)
            })
            test("Text is partially recorded if final Point value is 0 and final length of Text is > 0", () => {
                writer.pencil.point = 6
                expect(writer.write(text)).toBe("This i        ")
                expect(pencil.point).toBe(0)
            })
            test("Character is recorded if final Point value is 0 and character is an empty Space", () => {
                writer.pencil.point = 7
                expect(writer.write(text)).toBe("This is       ")
                expect(pencil.point).toBe(0)
            })
            test("Character is not recorded if final Point value is < 2 and character is Uppercase", () => {
                writer.pencil.point = 8
                expect(writer.write(text)).toBe("This is       ")
            })
            test("Point value is not degraded below 0 if final Point value is < 2 and character is Uppercase", () => {
                writer.pencil.point = 8
                expect(writer.write(text)).toBe("This is       ")
                expect(pencil.point).toBe(0)
            })
            test("Text is added to existing Text on Paper if Point value remains > 0", () => {
                let newText = "Ripley"
                writer.pencil.point = 7
                writer.paper.setPaper("This is ")
                expect(writer.write(newText)).toBe("This is Ripley")
                expect(pencil.point).toBe(0)
            })
        })
    })

    describe(`
    Sharpen Function`, () => {
        beforeEach(() => {
            length = writer.pencil.getLength()
        })
        describe("Sharpen returns Point to its Max value according to Length value", () => {
            test("Pencil can be Sharpened if its Length value is > 0", () => {
                writer.sharpen()
                expect(writer.pencil.point).toBe(pointMax)
                expect(writer.pencil.length).toBe(length - 1)
            })
            test("Pencil cannot be Sharpened if its Length value is 0", () => {
                writer.pencil.point = 0
                writer.pencil.length = 0
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
        beforeEach(() => {
            writer.paper.setPaper(newText)
            eraser = writer.pencil.eraser
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
                writer.pencil.eraser = 3
                expect(writer.erase(string)).toBe("Here kitty, kitty, ki   . Meaow. Here Jonesy.")
                expect(pencil.eraser).toBe(0)
            })
            test("Erase does not replace String if Eraser value is 0", () => {
                writer.pencil.eraser = 0
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
            writer.paper.setPaper(newText)
        })
        describe("Edit replaces Erased Text with a new String according to Point value", () => {
            test("Edit replaces blank Text with new String", () => {
                expect(writer.edit(string)).toBe("Here kitty, kitty, Alien. Meaow. Here Jonesy.")
            })
            test("Point value degrades appropriately for each character replaced until Point value is 0", () => {
                writer.pencil.point = 5
                expect(writer.edit(string)).toBe("Here kitty, kitty, Alie . Meaow. Here Jonesy.")
                expect(pencil.point).toBe(0)
            })
            test("Edit replaces next occurrence of blank Text after multiple uses if Point value remains > 0", () => {
                writer.erase("kitty")
                writer.erase("kitty")
                writer.erase("kitty")
                expect(writer.edit(string)).toBe("Here Alien,      ,      . Meaow. Here Jonesy.")
                expect(writer.edit(string)).toBe("Here Alien, Alien,      . Meaow. Here Jonesy.")
                expect(writer.edit(string)).toBe("Here Alien, Alien, Alien. Meaow. Here Jonesy.")
            })
            test("Edit replaces existing characters with '@' if length of String exceeds length of blank Text", () => {
                string = "Xenomorph"
                expect(writer.edit(string)).toBe("Here kitty, kitty, Xenom@r@@aow. Here Jonesy.")
            })
        })
    })

    describe(`
    Test Kata`, () => {
        beforeEach(() => {
            writer = testKata()
        })
        describe("The Test Kata function returns the correct final values of runKata()", () => {
            test("Returns valid Writer object", () => {
                expect(writer).toBeTruthy()
            })
            test("Returns correct Pencil Point value", () => {
                expect(writer.pencil.point).toBe(34)
            })
            test("Returns correct Pencil Length value", () => {
                expect(writer.pencil.length).toBe(4)
            })
            test("Returns correct Pencil Eraser value", () => {
                expect(writer.pencil.eraser).toBe(15)
            })
            test("Returns correct Paper value", () => {
                expect(writer.paper.getPaper()).toBe("Here kitty, Alien, Xenom@r@@aow. Here Jonesy.")
            })
        })
    })
})