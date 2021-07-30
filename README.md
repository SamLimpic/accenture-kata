# Pencil Durability Kata
I settled on this particular [Kata](https://github.com/PillarTechnology/kata-pencil-durability), as of all the available challenges it struck me as the most engaging.  It provides a wide range of small logical hurdles to clear, building upon each as you move forward.<br><br>
I feel this Kata allowed me to display the widest range of development skill, while also providing the most logical order of unit tests to demonstrate the thought process required.

## Setup
To begin, after cloning down this repository, run the following commands to properly run this application:

**npm install**
>Installs all required dependencies as shown in package.json.
><ul>
><li>Jest (For Running Main Test Suite)</li>
><li>Run-Func (For Running Main Functions)</li>
><li>Colors (For Console Statement Readability)</li>
></ul>
>As a failsafe in case issues arise, simply install them individually:
><ul>
><li>npm install --save-dev jest</li>
><li>npm install -S run-func</li>
><li>npm install colors</li>
></ul>

**npm run test**
>Runs the Jest Test Suite, comprised of 40 unique unit tests.

**npm run kata**
>Runs the main Kata function, which includes console statements that log its progress in real time.

**npm run mod**
>Runs the mod Kata function, which passes unique arguments into the main Kata function.<br>
>Appropriate syntax and an example function call are as follows:
><ul>
><li>npm run mod point length eraser "write text" "erase text" "erase" "first edit" "second edit"</li>
><li>npm run mod 30 10 20 "This is Ripley" "Jonesy... here Jonesy!" "Jonesy" "Ripley" "Sigourney"</li>
></ul>

## Description
This challenge was designed to simulate the behavior of a Pencil writing to Paper.<br>
It features Write, Sharpen, Erase, and Edit functions, which affect the Pencil and Paper elements accordingly.

### Methodology
The description made clear the best method to approach this challenge.<br>
In terms of Object Oriented Programming, Encapsulation was of particular importance.
>The various required elements are abstracted into their own unique Classes, with any functions modifying those elements encapsulated within their respective Class.
><ul>
><li>The Pencil and Paper Classes contain functions that directly affect their respective elements</li>
><li>Pencil and Paper are responsible for displaying and modifying their respective properties</li>
><li>Includes .get and .set functions that provide or modify the values of those properties</li><br>
><li>The Writer Class is passed unique instances of both Pencil and Paper</li>
><li>Writer is responsible for handling the main functions of the Kata (Write, Sharpen, Erase, and Edit)</li>
><li>Calls the abstract Pencil and Paper functions as required</li>
></ul>

### Unit Testing
This application utilizes the Jest test suite to test each unique case of all its functions.<br>
These are divided into 35 unit tests of the various kata functions as well 5 unit tests for the Run Kata function.
>The tests are divided into 7 Groups:
><ul>
><li>All Classes and Variables can be successfully Instantiated</li>
><li>All Kata functions can be successfully Called</li>
><li>Point Degredation successfully Degrades the Pencil</li>
><li>Write successfully Writes Text to the Paper</li>
><li>Erase successfully Erases Text from the Paper</li>
><li>Edit successfully Edits Text on the Paper</li>
><li>Run Kata successfully Returns the correct values</li>
></ul>