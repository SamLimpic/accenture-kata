const { Stationery } = require('./classes/Stationery.js')
const { Writer } = require('./classes/Writer.js')

let text = "This is Ripley"
let point
let length
let eraser
let writer
let pencil
let paper

describe("Variables can be instantiated", () => {
    beforeEach(() => {
        writer = new Writer()
        pencil = writer.pencil
        paper = writer.paper
    })
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
    point = 50
    length = 5
    eraser = 25
    beforeEach(() => {
        writer = new Writer(point, length, eraser)
        pencil = writer.pencil
        paper = writer.paper
    })
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

describe("Pencil Point is degraded by correct value", () => {
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
    test("Text is recorded completely if final Point value is > 0 and final length of Text is 0", () => {
        writer.pencil.point = 15
        expect(writer.write(text)).toBe(text)
        expect(writer.pencil.point).toBe(1)
    })
    test("Text is recorded partially if final Point value is 0 and final length of Text is > 0", () => {
        writer.pencil.point = 6
        expect(writer.write(text)).toBe("This i        ")
        expect(writer.pencil.point).toBe(0)
    })
    test("Final character is recorded if final Point value is 0 and final character is an empty Space", () => {
        writer.pencil.point = 7
        expect(writer.write(text)).toBe("This is       ")
        expect(writer.pencil.point).toBe(0)
    })
    test("Final character is not recorded if final Point value is < 2 and final character is Uppercase", () => {
        writer.pencil.point = 8
        expect(writer.write(text)).toBe("This is       ")
        expect(writer.pencil.point).toBe(0)
    })
    test("Appends additional Text to existing Text on Paper", () => {
        text = "Ripley"
        writer.pencil.point = 7
        writer.paper = "This is "
        expect(writer.write(text)).toBe("This is Ripley")
    })
})

describe("Sharpen function returns Point to its original value according to Length value", () => {
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
    test("Pencil can be Sharpened multiple times if its Length remains > 0", () => {
        writer.pencil.length = 3
        writer.sharpen()
        expect(writer.pencil.point).toBe(pointMax)
        expect(writer.pencil.length).toBe(2)
        writer.sharpen()
        expect(writer.pencil.point).toBe(pointMax)
        expect(writer.pencil.length).toBe(1)
        writer.sharpen()
        expect(writer.pencil.point).toBe(pointMax)
        expect(writer.pencil.length).toBe(0)
    })
})

describe("Erase function removes the last occurrence of a String from the Paper according to Eraser value", () => {
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
    test("Erase replaces characters of String in reverse until Eraser value is 0", () => {
        writer.pencil.eraser = 3
        expect(writer.erase(string)).toBe("Here kitty, kitty, ki   . Meaow. Here Jonesy.")
        expect(writer.pencil.eraser).toBe(0)
    })
    test("Erase does not remove String from Paper if Eraser value is 0", () => {
        writer.pencil.eraser = 0
        expect(writer.erase(string)).toBe(text)
    })
    test("Erase replaces the next-to-last occurrence of String upon multiple uses if Eraser value remains > 0", () => {
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

describe("Edit function replaces Erased Text with a new String according to Point value", () => {
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
    test("Edit replaces next-available blank Text with String if Edit is run multuple times and Point value remains > 0", () => {
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