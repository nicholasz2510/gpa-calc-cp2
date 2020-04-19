<h1 align="center">GPA Calculator</h1>

<p align="center">GPA Calculator is a p5.js project for calculating a student's GPA, credit totals, and graduation eligibility.</p> 

## How to run

Since it is a website, having an .exe or .jar executable doesn't make sense. Usually, you would be able to just run the index.html file, but modern browsers don't allow websites to have access to files without a supported protocol scheme (CORS policy). Because of these limitations, I have done the following things:
* I have copied the code into a [p5.js Web Editor sketch](https://editor.p5js.org/nicholasz2510/embed/v5RjPAf1Y). This is the cleanest looking way to run it, and doesn't have any extra bugs. 
* I have copied the code into an [Open Processing sketch](https://www.openprocessing.org/sketch/864460). If it doesn't run immediately, click the play button at the top of the window. 
* Alternatively, you can open the GpaCalc folder as a p5.js project in the Processing IDE.

NOTE: There is a minor bug when running with OpenProcessing where the file I/O buttons are in the wrong place when you scroll. 
This doesn't happen when run normally through Processing. 

## Usage

Hold left click on a grade entry, drag, and release the left mouse button to select the grade. Totals on the right are automatically calculated. 

You can save the current state of the grades to a .txt file by clicking the "Save data to file" button. You can load that file by clicking the "Browse" button and selecting the saved file. To edit an existing save, you may upload it, make changes, and then save it to the same file by clicking on the original file in the file explorer (as shown in the demo video). 

Demo Video: 

[![Demo Video](http://img.youtube.com/vi/ReXjAboYYMo/0.jpg)](http://www.youtube.com/watch?v=ReXjAboYYMo "GPA Calculator Demo")

Grade Selection Demo: 

![](https://grantshandy.xyz/gif/gpa-calc.gif)

<sup>Grade Selection Demo credit: Grant Handy</sup>

## Embed

```html
<iframe src="https://editor.p5js.org/nicholasz2510/embed/v5RjPAf1Y"></iframe>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
