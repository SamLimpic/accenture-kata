const { Stationery } = require('./classes/Stationery.js')
const { Writer } = require('./classes/Writer.js')

let text = "This is Ripley, last survivor of Nostromo, signing off."
let writer
let pencil
let paper
let string

beforeEach(() => {
    writer = new Writer()
    pencil = writer.pencil
    paper = writer.paper
})

describe("Variables can be instantiated and assigned correct values", () => {
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
        let point = 1
        let length = 1
        let eraser = 1
        let pencil = new Pencil(point, length, eraser)
        let text = string
        let paper = ""
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
        let char
        let pencil
        test("Spaces do not degrade Point value", () => {
            char = ' '
            pencil = {
                point: 2
            }
            checkCasing(char, pencil)
            expect(pencil.point).toBe(2)
        })
        test("Lower Case letters degrade Point value by 1", () => {
            char = 'c'
            pencil = {
                point: 2
            }
            checkCasing(char, pencil)
            expect(pencil.point).toBe(1)
        })
        test("Numbers degrade Point value by 1", () => {
            char = '0'
            pencil = {
                point: 2
            }
            checkCasing(char, pencil)
            expect(pencil.point).toBe(1)
        })
        test("Non-Alphanumeric characters degrade Point value by 1", () => {
            char = '&'
            pencil = {
                point: 2
            }
            checkCasing(char, pencil)
            expect(pencil.point).toBe(1)
        })
        test("Upper Case letters degrade Point value by 2", () => {
            char = 'C'
            pencil = {
                point: 2
            }
            checkCasing(char, pencil)
            expect(pencil.point).toBe(0)
        })
    })

    describe("Text is recorded according to Point value", () => {
        let point
        let pencil
        let text
        let paper
        test("Text is recorded as empty Spaces if Point value is 0", () => {
            point = 0
            pencil = new Pencil(point)
            text = string
            paper = ""
            expect(write(pencil, paper, text)).toBe(" ".repeat(text.length))
            expect(pencil.point).toBe(0)
        })
        test("Text is recorded completely if final Point value is 0 and final length of Text is 0", () => {
            point = 50
            pencil = new Pencil(point)
            text = string
            paper = ""
            expect(write(pencil, paper, text)).toBe(string)
            expect(pencil.point).toBe(0)
        })
        test("Text is recorded completely if final Point value is > 0 and final length of Text is 0", () => {
            point = 51
            text = string
            pencil = new Pencil(point)
            paper = ""
            expect(write(pencil, paper, text)).toBe(string)
            expect(pencil.point).toBe(1)
        })
        test("Text is recorded partially if final Point value is 0 and final length of Text is > 0", () => {
            point = 6
            text = "This is"
            pencil = new Pencil(point)
            paper = ""
            expect(write(pencil, paper, text)).toBe("This i ")
            expect(pencil.point).toBe(0)
        })
        test("Final character is recorded if final Point value is 0 and final character is an empty Space", () => {
            point = 7
            text = "This is "
            pencil = new Pencil(point)
            paper = ""
            expect(write(pencil, paper, text)).toBe("This is ")
            expect(pencil.point).toBe(0)
        })
        test("Final character is not recorded if final Point value is < 2 and final character is Uppercase", () => {
            point = 8
            text = "This is R"
            pencil = new Pencil(point)
            paper = ""
            expect(write(pencil, paper, text)).toBe("This is  ")
            expect(pencil.point).toBe(0)
        })
    })

    describe("Text value can be appended to existing Text on Paper", () => {
        test("Appends additional Text to Paper", () => {
            let point = 7
            let pencil = new Pencil(point)
            let text = "Ripley"
            let paper = "This is "
            expect(write(pencil, paper, text)).toBe("This is Ripley")
        })
    })
})

describe("Sharpen function returns Point to its original value according to Length value", () => {
    let point
    let length
    let pencil
    test("Pencil can be Sharpened if its Length is > 0", () => {
        point = 30
        length = 1
        pencil = new Pencil(0, length)
        sharpen(point, pencil)
        expect(pencil.point).toBe(30)
    })
    test("Pencil cannot be Sharpened if its Length is 0", () => {
        point = 30
        length = 0
        pencil = new Pencil(0, length)
        sharpen(point, pencil)
        expect(pencil.point).toBe(0)
    })
    test("Pencil can be Sharpened multiple times if its Length remains > 0", () => {
        point = 30
        length = 3
        pencil = new Pencil(0, length)
        sharpen(point, pencil)
        expect(pencil.point).toBe(30)
        expect(pencil.length).toBe(2)
        sharpen(point, pencil)
        expect(pencil.point).toBe(30)
        expect(pencil.length).toBe(1)
        sharpen(point, pencil)
        expect(pencil.point).toBe(30)
        expect(pencil.length).toBe(0)
    })
})

describe("Erase function removes the last occurrence of a String from the Paper according to Eraser value", () => {
    let text = "Here kitty, kitty, kitty. Meaow. Here Jonesy."
    let pencil
    let paper
    let str
    let eraser
    test("Erase replaces last occurrence of String with empty Spaces", () => {
        pencil = new Pencil()
        paper = text
        str = "kitty"
        expect(erase(str, paper, pencil)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
    })
    test("Eraser value degrades by 1 for every character replaced", () => {
        pencil = new Pencil()
        pencil.eraser = 6
        paper = text
        str = "kitty"
        eraser = pencil.eraser - str.length
        expect(erase(str, paper, pencil)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
        expect(pencil.eraser).toBe(eraser)
    })
    test("Erase replaces characters of String in reverse until Eraser value is 0", () => {
        pencil = new Pencil()
        pencil.eraser = 3
        paper = text
        str = "kitty"
        expect(erase(str, paper, pencil)).toBe("Here kitty, kitty, ki   . Meaow. Here Jonesy.")
        expect(pencil.eraser).toBe(0)
    })
    test("Erase does not remove String from Paper if Eraser value is 0", () => {
        pencil = new Pencil()
        pencil.eraser = 0
        paper = text
        str = "kitty"
        expect(erase(str, paper, pencil)).toBe(text)
    })
    test("Erase replaces the next-to-last occurrence of String upon multiple uses if Eraser value remains > 0", () => {
        pencil = new Pencil()
        paper = text
        str = "kitty"
        eraser = pencil.eraser - str.length
        expect(erase(str, paper, pencil)).toBe("Here kitty, kitty,      . Meaow. Here Jonesy.")
        expect(pencil.eraser).toBe(eraser)
        paper = "Here kitty, kitty,      . Meaow. Here Jonesy."
        eraser = eraser - str.length
        expect(erase(str, paper, pencil)).toBe("Here kitty,      ,      . Meaow. Here Jonesy.")
        expect(pencil.eraser).toBe(eraser)
        paper = "Here kitty,      ,      . Meaow. Here Jonesy."
        eraser = eraser - str.length
        expect(erase(str, paper, pencil)).toBe("Here      ,      ,      . Meaow. Here Jonesy.")
        expect(pencil.eraser).toBe(eraser)
    })
})

describe("Edit function replaces Erased Text with a new String according to Point value", () => {
    let text = "Here kitty, kitty,      . Meaow. Here Jonesy."
    let pencil
    let paper
    let str
    let point
    test("Edit replaces Erased Text with new String", () => {
        pencil = new Pencil()
        paper = text
        str = "Alien"
        expect(edit(str, paper, pencil)).toBe("Here kitty, kitty, Alien. Meaow. Here Jonesy.")
    })
    test("Point value degrades by 1 for every character replaced until Point value is 0", () => {
        pencil = new Pencil()
        pencil.point = 4
        paper = text
        str = "Alien"
        expect(edit(str, paper, pencil)).toBe("Here kitty, kitty, Alie . Meaow. Here Jonesy.")
        expect(pencil.point).toBe(0)
    })
    test("Edit replaces existing characters with '@' if length of String exceeds length of empty Spaces and Point value remains > 0", () => {
        pencil = new Pencil()
        paper = text
        str = "Xenomorph"
        expect(edit(str, paper, pencil)).toBe("Here kitty, kitty, Xenom@r@@aow. Here Jonesy.")
    })
    test("Edit replaces next-available blank Text with String if Edit is run multuple times and Point value remains > 0", () => {
        text = "Here      ,      ,      . Meaow. Here Jonesy."
        pencil = new Pencil()
        paper = text
        str = "Alien"
        expect(edit(str, paper, pencil)).toBe("Here Alien,      ,      . Meaow. Here Jonesy.")
        paper = "Here Alien,      ,      . Meaow. Here Jonesy."
        expect(edit(str, paper, pencil)).toBe("Here Alien, Alien,      . Meaow. Here Jonesy.")
        paper = "Here Alien, Alien,      . Meaow. Here Jonesy."
        expect(edit(str, paper, pencil)).toBe("Here Alien, Alien, Alien. Meaow. Here Jonesy.")
        paper = "Here Alien, Alien, Alien. Meaow. Here Jonesy."
    })
})