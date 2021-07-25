const { write, checkCasing, sharpen } = require('./app.js')
const { Pencil } = require('./Pencil.js')

const string = "This is Ripley, last survivor of Nostromo, signing off."

// describe(" ", () => {
//     test(" ", () => {
//         expect().toBe()
//     })
// })

describe("Variables can be instantiated and assigned correct values", () => {
    describe("Variables can be instantiated", () => {
        let pencil = new Pencil()
        let text = string
        let paper = ""
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

describe("Write function successfully records Text to Paper according to Pencil Point Degredation", () => {
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
    describe("Pencil can be Sharpened", () => {
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
        test("Pencil can be Sharpened multiple times if its initial Length is > 1", () => {
            point = 30
            length = 2
            pencil = new Pencil(0, length)
            sharpen(point, pencil)
            expect(pencil.point).toBe(30)
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
    })
})