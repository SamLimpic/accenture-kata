const { Pencil } = require('./classes/Pencil.js')
const { Paper } = require('./classes/Paper.js')
const { Writer } = require('./classes/Writer.js')
const { runKata } = require('./kata.js')

const text = "This is Ripley"
const pointMax = 50
const lengthMax = 5
const eraserMax = 25

let pencil
let paper
let writer

// The main test suite run using the command "npm run test"
// Tests the various use cases of all Kata functions
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
                expect(writer).toBeInstanceOf(Writer)
                expect(writer).toBeTruthy()
            })
            test("Pencil can be instantiated", () => {
                expect(pencil).toBeInstanceOf(Pencil)
                expect(pencil).toBeTruthy()
                expect(pencil.pointMax).toBeTruthy()
                expect(pencil.point).toBeTruthy()
                expect(pencil.length).toBeTruthy()
                expect(pencil.eraser).toBeTruthy()
            })
            test("Paper can be instantiated", () => {
                expect(paper).toBeInstanceOf(Paper)
                expect(paper).toBeTruthy()
            })
            test("Pencil is assigned correct values", () => {
                expect(pencil.getPointMax()).toBe(pointMax)
                expect(pencil.getPoint()).toBe(pointMax)
                expect(pencil.getLength()).toBe(lengthMax)
                expect(pencil.getEraser()).toBe(eraserMax)
            })
            test("Paper is assigned correct value", () => {
                expect(paper.getPaper()).toBe("")
            })
        })
    })

    describe(`
    Kata Functions`, () => {
        let text = "This is Ripley"
        let string = "Ripley"
        let char = "R"
        let num = pointMax
        describe("All Kata functions can be called", () => {
            test("Writer functions can be called", () => {
                expect(writer.write(text)).toBeTruthy()
                expect(writer.sharpen()).toBeTruthy()
                expect(writer.erase(string)).toBeTruthy()
                expect(writer.edit(string)).toBeTruthy()
            })
            test("Pencil functions can be called", () => {
                expect(pencil.checkCasing(char)).toBeTruthy()
                expect(pencil.setPoint(num)).toBeTruthy()
                expect(pencil.degradePoint(char)).toBeTruthy()
                expect(pencil.degradeLength()).toBeTruthy()
                expect(pencil.degradeEraser()).toBeTruthy()
                expect(pencil.getPoint()).toBeTruthy()
                expect(pencil.getPointMax()).toBeTruthy()
                expect(pencil.getLength()).toBeTruthy()
                expect(pencil.getEraser()).toBeTruthy()
            })
            test("Paper functions can be called", () => {
                expect(paper.setPaper(text)).toBeTruthy()
                expect(paper.addToPaper(string)).toBeTruthy()
                expect(paper.getPaper()).toBeTruthy()
            })
            test("Run Kata function can be called", () => {
                expect(runKata(true)).toBeTruthy()
            })
        })
    })

    describe(`
    Point Degredation`, () => {
        let char
        describe("Pencil Point is degraded by correct value", () => {
            test("Spaces do not degrade Point value", () => {
                char = " "
                expect(pencil.checkCasing(char)).toBe(0)
            })
            test("Non-Alphanumeric characters degrade Point value by 1", () => {
                char = ","
                expect(pencil.checkCasing(char)).toBe(1)
            })
            test("Lower Case letters degrade Point value by 1", () => {
                char = "c"
                expect(pencil.checkCasing(char)).toBe(1)
            })
            test("Upper Case letters degrade Point value by 2", () => {
                char = "C"
                expect(pencil.checkCasing(char)).toBe(2)
            })
        })
    })

    describe(`
    Write Function`, () => {
        describe("Text is recorded according to Pencil Point value", () => {
            test("Text is recorded as empty Spaces if Point value is 0", () => {
                writer.pencil.point = 0
                expect(writer.write(text)).toBe(" ".repeat(text.length))
                expect(pencil.getPoint()).toBe(0)
            })
            test("Text is completely recorded if Point value is >= length of remaining Text", () => {
                writer.pencil.point = 14
                expect(writer.write(text)).toBe(text)
                expect(pencil.getPoint()).toBe(0)
            })
            test("Text is partially recorded if Point value is < length of remaining Text", () => {
                writer.pencil.point = 6
                expect(writer.write(text)).toBe("This i        ")
                expect(pencil.getPoint()).toBe(0)
            })
            test("Character is recorded if Point value is 0 and character is an empty Space", () => {
                writer.pencil.point = 7
                expect(writer.write(text)).toBe("This is       ")
                expect(pencil.point).toBe(0)
            })
            test("Character is not recorded if Point value is < 2 and character is Uppercase", () => {
                writer.pencil.point = 8
                expect(writer.write(text)).toBe("This is       ")
            })
            test("Point value does not fall below 0 if Point value is < 2 and character is Uppercase", () => {
                writer.pencil.point = 8
                expect(writer.write(text)).toBe("This is       ")
                expect(pencil.getPoint()).toBe(0)
            })
            test("New Text is appended to existing Text on Paper", () => {
                let newText = "Ripley"
                writer.pencil.point = 7
                writer.paper.setPaper("This is ")
                expect(writer.write(newText)).toBe("This is Ripley")
                expect(pencil.getPoint()).toBe(0)
            })
        })
    })

    describe(`
    Sharpen Function`, () => {
        beforeEach(() => {
            length = writer.pencil.getLength()
            writer.sharpen()
        })
        describe("Sharpen returns Point to its Max value according to Length value", () => {
            test("Pencil can be Sharpened if its Length value is > 0", () => {
                expect(pencil.getPoint()).toBe(pointMax)
            })
            test("Pencil cannot be Sharpened if its Length value is 0", () => {
                writer.pencil.point = 0
                writer.pencil.length = 0
                writer.sharpen()
                expect(pencil.getPoint()).toBe(0)
                expect(pencil.getLength()).toBe(0)
            })
            test("Sharpen degrades Length value by 1", () => {
                expect(pencil.getPoint()).toBe(pointMax)
                expect(pencil.getLength()).toBe(length - 1)
            })
            test("Pencil can be Sharpened multiple times", () => {
                expect(pencil.getPoint()).toBe(pointMax)
                expect(pencil.getLength()).toBe(length - 1)
                writer.sharpen()
                expect(pencil.getPoint()).toBe(pointMax)
                expect(pencil.getLength()).toBe(length - 2)
                writer.sharpen()
                expect(pencil.getPoint()).toBe(pointMax)
                expect(pencil.getLength()).toBe(length - 3)
            })
        })
    })

    describe(`
    Erase Function`, () => {
        let newText = "Here kitty, kitty, kitty. Meaow! Here Jonesy!"
        let string = "kitty"
        let eraser
        beforeEach(() => {
            writer.paper.setPaper(newText)
            eraser = writer.pencil.eraser
        })
        describe("Erase removes the last instance of a String according to Eraser value", () => {
            test("Text can be Erased if Eraser value is > 0", () => {
                expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow! Here Jonesy!")
                expect(pencil.getEraser()).toBe(eraser - string.length)
            })
            test("Characters cannot be Erased if Eraser value is 0", () => {
                writer.pencil.eraser = 0
                expect(writer.erase(string)).toBe(newText)
                expect(pencil.getEraser()).toBe(0)
            })
            test("Erase replaces last occurrence of String with empty Spaces", () => {
                expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow! Here Jonesy!")
            })
            test("Erase replaces characters in reverse order until Eraser value is 0", () => {
                writer.pencil.eraser = 3
                writer.erase(string)
                expect(writer.erase(string)).toBe("Here kitty, kitty, ki   . Meaow! Here Jonesy!")
                expect(pencil.getEraser()).toBe(0)
            })
            test("Erase replaces the next-to-last occurrence of String after multiple uses", () => {
                expect(writer.erase(string)).toBe("Here kitty, kitty,      . Meaow! Here Jonesy!")
                expect(pencil.getEraser()).toBe(eraser - string.length)
                expect(writer.erase(string)).toBe("Here kitty,      ,      . Meaow! Here Jonesy!")
                expect(pencil.getEraser()).toBe(eraser - (string.length * 2))
                expect(writer.erase(string)).toBe("Here      ,      ,      . Meaow! Here Jonesy!")
                expect(pencil.getEraser()).toBe(eraser - (string.length * 3))
            })
        })
    })

    describe(`
    Edit Function`, () => {
        let newText = "Here kitty, kitty,      . Meaow! Here Jonesy!"
        let string = "Alien"
        beforeEach(() => {
            writer.paper.setPaper(newText)
        })
        describe("Edit replaces Erased Text with a new String according to Point value", () => {
            test("Text can be Edited if Point value is > 0", () => {
                expect(writer.edit(string)).toBe("Here kitty, kitty, Alien. Meaow! Here Jonesy!")
            })
            test("Text cannot be Edited if Point value is 0", () => {
                writer.pencil.point = 0
                expect(writer.edit(string)).toBe("Here kitty, kitty,      . Meaow! Here Jonesy!")
                expect(pencil.point).toBe(0)
            })
            test("Point value degrades by correct value for each Edited character", () => {
                writer.pencil.point = 5
                expect(writer.edit(string)).toBe("Here kitty, kitty, Alie . Meaow! Here Jonesy!")
                expect(pencil.point).toBe(0)
            })
            test("Edit replaces next occurrence of Erased Text after multiple uses", () => {
                writer.erase("kitty")
                writer.erase("kitty")
                writer.erase("kitty")
                expect(writer.edit(string)).toBe("Here Alien,      ,      . Meaow! Here Jonesy!")
                expect(writer.edit(string)).toBe("Here Alien, Alien,      . Meaow! Here Jonesy!")
                expect(writer.edit(string)).toBe("Here Alien, Alien, Alien. Meaow! Here Jonesy!")
            })
            test("Edit replaces existing characters with the @ symbol", () => {
                string = "Xenomorph"
                expect(writer.edit(string)).toBe("Here kitty, kitty, Xenom@r@@aow! Here Jonesy!")
            })
            test("Edit appends additional characters to paper if end of Paper is reached", () => {
                paper = "Here Alien, Alien,      "
                writer.paper.setPaper(paper)
                expect(writer.edit(string)).toBe("Here Alien, Alien, Xenomorph")
                expect(writer.paper.getPaper().length).toBe(paper.length + 4)
            })
        })
    })

    describe(`
    Run Kata Function`, () => {
        beforeEach(() => {
            writer = runKata(true)
            pencil = writer.pencil
            paper = writer.paper
        })
        describe("Run Kata returns the correct final values when supplied default arguments", () => {
            test("Writer is instantiated", () => {
                expect(writer).toBeInstanceOf(Writer)
                expect(writer).toBeTruthy()
            })
            test("Pencil is instantiated", () => {
                expect(pencil).toBeInstanceOf(Pencil)
                expect(pencil).toBeTruthy()
                expect(pencil.pointMax).toBeTruthy()
                expect(pencil.point).toBeTruthy()
                expect(pencil.length).toBeTruthy()
                expect(pencil.eraser).toBeTruthy()
            })
            test("Paper is instantiated", () => {
                expect(paper).toBeInstanceOf(Paper)
                expect(paper).toBeTruthy()
            })
            test("Returns correct Pencil values", () => {
                expect(pencil.getPoint()).toBe(34)
                expect(pencil.getPointMax()).toBe(50)
                expect(pencil.getLength()).toBe(4)
                expect(pencil.getEraser()).toBe(15)
            })
            test("Returns correct Paper value", () => {
                expect(paper.getPaper()).toBe("Here kitty, Alien, Xenom@r@@aow! Here Jonesy!")
            })
        })
    })
})