<h1 align="center">GPA Calculator</h1>

<p align="center">GPA Calculator is a p5.js project for calculating a student's GPA, credit totals, and graduation eligibility.</p> 

<p align="center"><img width="50%" src="https://grantshandy.xyz/gif/gpa-calc.gif"></p>

## How to run

Since it is a website, having an .exe or .jar executable doesn't make sense. Usually, you would be able to just run the index.html file, but modern browsers don't allow websites to have access to files without a supported protocol scheme (CORS policy). Because of these limitations, I have copied the code into an [Open Processing Sketch](https://www.openprocessing.org/sketch/864460). If it doesn't run immediately, click the play button at the top of the window. 
Alternatively, you can open the GpaCalc folder as a p5.js project in the Processing IDE.

NOTE: There is a minor bug when running with OpenProcessing where the file I/O buttons are in the wrong place when you scroll. 
This doesn't happen when run normally through Processing. 

## Usage

Hold left click on a grade entry, drag, and release the left mouse button to select the grade. Totals on the right are automatically calculated. 

The GPA claculator has the ability to save your grades in the form of a TXT file by clicking the "Save data to file" button. You can later access those grades by uploading it to the website. You can do this by clicking the "Browse" button and selecting the TXT file.

- YouTube Video Demo: [GPA Calculator Demo](https://youtu.be/ReXjAboYYMo)
- "Grade Wheel" Demo: [Grade Wheel GIF](https://grantshandy.xyz/gif/gpa-calc.gif)

## License
Licensed under the permissive [MIT license](https://choosealicense.com/licenses/mit/)
