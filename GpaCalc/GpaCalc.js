let possibleGrades;
let gradeValues;

let categories;
let categoryInfo;
let totalCredits;

let gradeLevels;

let menuCurrOpen;
let currOpenCenter;

let grades;
let gradesInput;

let red;
let darkGray;
let darkBlue;
let lightGray;
let lightBlue;

let input;

let currInp;

let dinFont;
function preload() {
  dinFont = loadFont('assets/D-DIN-Bold.otf');
}

function setup() {
  red = color(153,32,32);
  darkGray = color(30,30,30);
  darkBlue = color("#3700B3");
  lightGray = color(46, 46, 46);
  lightBlue = color("#6200EE");
  createCanvas(Math.max(windowWidth, 1160), Math.max(windowHeight, 800));
  frameRate(30);
  fill(225);
  textFont(dinFont);
  stroke("#606368");
  strokeWeight(0);
  possibleGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "P", " "];
  gradeValues = {
    "A": {val: 4.0, credit: 0.25, hlColor: lightGray},
    "A-": {val: 3.667, credit: 0.25, hlColor: lightGray},
    "B+": {val: 3.333, credit: 0.25, hlColor: lightGray},
    "B": {val: 3.0, credit: 0.25, hlColor: lightGray},
    "B-": {val: 2.667, credit: 0.25, hlColor: lightGray},
    "C+": {val: 2.333, credit: 0.25, hlColor: lightGray},
    "C": {val: 2.0, credit: 0.25, hlColor: lightGray},
    "C-": {val: 1.667, credit: 0.25, hlColor: lightGray},
    "D+": {val: 1.333, credit: 0.25, hlColor: lightGray},
    "D": {val: 1.0, credit: 0.25, hlColor: lightGray},
    "D-": {val: 0.667, credit: 0.25, hlColor: lightGray},
    "F": {val: 0.0, credit: 0.0, hlColor: red},
    "P": {val: -1.0, credit: 0.0, hlColor: lightGray},
    " ": {val: -1.0, credit: 0.0, hlColor: darkGray}
  };
  gradesInput = [];
  for (i = 0; i < 240; i++) {
    gradesInput.push(" ");
  }
  
  categories = ["Eng", "SS", "Gov", "Ma", "Sci", "Art", "PE", "CTE", "HE", "CT", "FL", "Electives"];
  categoryInfo = {
    "Eng": {total: 4.0, indices: [0], currTotal: 0.0},
    "SS": {total: 3.0, indices: [1], currTotal: 0.0},
    "Gov": {total: 0.5, indices: [2], currTotal: 0.0},
    "Ma": {total: 3.0, indices: [3], currTotal: 0.0},
    "Sci": {total: 3.0, indices: [4], currTotal: 0.0},
    "Art": {total: 1.5, indices: [5], currTotal: 0.0},
    "PE": {total: 1.5, indices: [6], currTotal: 0.0},
    "CTE": {total: 1.0, indices: [7], currTotal: 0.0},
    "HE": {total: 0.5, indices: [8], currTotal: 0.0},
    "CT": {total: 0.5, indices: [9], currTotal: 0.0},
    "FL": {total: 0.5, indices: [10], currTotal: 0.0},
    "Electives": {total: 8.0, indices: [11, 12, 13], currTotal: 0.0}
  };
  totalCredits = 0.0;
  
  gradeLevels = [9, 10, 11, 12];
  
  menuCurrOpen = -10;
  currOpenCenter = [-10, -10];
  
  makeGrades();
  
  currInp = "filename";
  input = createFileInput(handleFile);
  let inp = createInput('filename');
  inp.input(myInputEvent);
  inp.position(815, 360);
}

/**
 * Populates the grades array with new instances of Grade objects.
 */
function makeGrades() {
  grades = [];
  var currIdNum = 0;
  for (i = 0; i < gradeLevels.length + 1; i++) {
    for (r = 0; r < 4; r++) {
      var currNewRow = [];
      for (j = 0; j < categories.length; j++) {
        if (r > 1 && ((j === 2 || j === 8) || (j === 9 || j === 10))) {
          currNewRow.push(null);
          continue;
        }
        currNewRow.push(new Grade(80 + (j * 40), 100 + (i * 125) + (r * 30), currIdNum, gradesInput[currIdNum]));
        currIdNum++;
      }
      for (k = 0; k < 2; k++) {
        currNewRow.push(new Grade(550 + (k * 30), 100 + (i * 125) + (r * 30), currIdNum, gradesInput[currIdNum]));
        currIdNum++;
      }
      grades.push(currNewRow);
    }
  }
}

function draw() {
  background(12);
  textSize(24);
  fill(225);
  text("Skyline High School: 27 academic credits to graduate; Hold left click on a grade, drag, and then release to select.", 20, 32);
  
  showCategories();
  showGradesOutlines();
  calcCatTotals();
  calcGradeLevelTotals();
  
  for (var row of grades) {
    for (var g of row) {
      if (g !== null) {
        g.display();
      }
    }
  }
  
  textSize(30);
  fill(225);
  text("Total Credits: ".concat(totalCredits).concat("/27"), 700, 150);
  text("Credits Needed: ".concat(max(27.0 - totalCredits, 0)), 700, 190);
  if (isEligible()) {
    text("Eligible to graduate: Yes", 700, 230);
  } else {
    text("Eligible to graduate: No", 700, 230);
  }
  calcGpa();
  
  textSize(24);
  text("Load data from file: ", 700, 340);
  input.position(900, 320);
  
  button = createButton('Save data to file');
  button.position(700, 360);
  button.mousePressed(createFile);
}

/**
 * Parses an input file by splitting by commas.
 *
 * @param {File} file - the file to be parsed.
 */
function handleFile(file) {
  gradesInput = file.data.split(",");
  makeGrades();
}

/**
 * Creates a new file from the current state of the grades array.
 */
function createFile() {
  let writer = createWriter(currInp.concat('.txt'));
  var newFileContent = [];
  for (var row of grades) {
    for (var g of row) {
      if (g !== null) {
        newFileContent.push(g.grade);
      }
    }
  }
  writer.write([newFileContent.join()]);
  writer.close();
}

/**
 * Sets currInp to whatever the user has typed in the input box.
 */
function myInputEvent() {
  currInp = this.value();
}

/**
 * Checks if the current state of the grades array represents a student who is eligible to graduate.
 *
 * @return {boolean} true if the student is eligible to graduate.
 */
function isEligible() {
  var result = (totalCredits >= 27);
  for (var c of categories) {
    if (categoryInfo[c].currTotal < categoryInfo[c].total) {
      return false;
    }
  }
  return result;
}

/**
 * Displays the different categories of grades vertically.
 */
function showCategories() {
  var barWidth;
  textSize(12);
  for (i = 0; i < categories.length; i++) {
    strokeWeight(2);
    fill(12);
    barWidth = (categoryInfo[categories[i]].indices.length * 30) + 5;
    rect(35 + ((i + 1) * 40), 80, barWidth, 670, 10);
    strokeWeight(0);
    fill(225);
    
    if (categories[i].length == 3) {
      text(categories[i], 42 + ((i + 1) * 40), 92);
    } else {
      text(categories[i], 45 + ((i + 1) * 40), 92);
    }
  }
}

/**
 * Displays the different grade levels horizontally.
 */
function showGradesOutlines() {
  for (i = 0; i < gradeLevels.length; i++) {
    strokeWeight(2);
    fill(0, 0);
    rect(45, 96 + (i * 125), 610, 125, 10);
    strokeWeight(0);
    fill(225);
    
    textSize(18);
    if (gradeLevels[i].toString().length == 1) {
      text(gradeLevels[i], 55, 164 + (i * 125));
    } else {
      text(gradeLevels[i], 53, 164 + (i * 125));
    }
  }
  strokeWeight(2);
  line(75, 721, 610, 721);
  strokeWeight(0);
}

/**
 * Calculates and displays the total credit earned in each of the different categories of grades.
 */
function calcCatTotals() {
  for (i = 0; i < categories.length; i++) {
    var curr = 0.0;
    
    for (var index of categoryInfo[categories[i]].indices) {
      
      for (var row of grades) {
        var g = row[index];
        if (g !== null) {
          curr += g.credit;
        }
      }
    }
    categoryInfo[categories[i]].currTotal = curr;
    textSize(12);
    text(curr.toString().concat("\n   /").concat(categoryInfo[categories[i]].total), 38 + ((i + 1) * 40), 733);
    textSize(14);
  }
}

/**
 * Calculates and displays the total credit earned in each of the grade levels.
 */
function calcGradeLevelTotals() {
  totalCredits = 0.0;
  for (i = 0; i < gradeLevels.length + 1; i++) {
    var curr = 0.0;
    for (j = 0; j < 4; j++) {
      for (var g of grades[(i * 4) + j]) {
        if (g !== null) {
          curr += g.credit;
        }
      }
    }
    totalCredits += curr;
    textSize(14);
    text(curr, 620, 160 + (i * 125));
  }
}

/**
 * Calculates and displays the GPA from the grades array.
 */
function calcGpa() {
  var numGrades = 0.0;
  var curr = 0.0;
  for (var row of grades) {
    for (var g of row) {
      if (g !== null) {
        if (g.val != -1.0) {
          numGrades += 1.0;
          curr += g.val;
        }
      }
    }
  }
  var gpa = (curr / numGrades).toFixed(3);
  if (isNaN(gpa)) {
    gpa = "N/A";
  }
  text("GPA: ".concat(gpa), 700, 270);
}

/** @class Grade representing a single grade entry. */
class Grade {
/**
 * Creates an instance of Grade.
 *
 * @constructor
 * @author: Nicholas Zhang
 * @param {number} ix The desired x-coordinate of the grade entry.
 * @param {number} iy The desired y-coordinate of the grade entry.
 * @param {number} iId The desired unique ID of the grade entry.
 * @param {number} iGrade The desired starting grade value of the grade entry.
 */
  constructor(ix, iy, iId, iGrade) {
    this.x = ix;
    this.y = iy;
    this.grade = iGrade;
    this.c = gradeValues[iGrade].hlColor;
    this.credit = gradeValues[iGrade].credit;
    this.val = gradeValues[iGrade].val;
    this.menuOpen = false;
    this.id = iId;
    this.center = [this.x + 12.5, this.y + 12.5];
  }
  
  /**
   * Checks if the grade entry box is under a currently open menu.
   *
   * @return {boolean} true if the grade entry box is under a currently open menu.
   */
  isUnderOpen() {
    return dist(this.center[0], this.center[1], currOpenCenter[0], currOpenCenter[1]) <= 92.5;
  }
  
  /**
   * Displays the grade entry box.
   */
  display() {
    if (!this.isUnderOpen()) {
      fill(this.c);
      rect(this.x, this.y, 25, 25, 5);
      fill(225);
      textSize(14);
      if (this.grade.length == 1) {
        text(" ".concat(this.grade), this.x + 5, this.y + 17);
      } else {
        text(this.grade, this.x + 6, this.y + 17);
      }
    }
    this.hoverOver();
  }
  
  /**
   * Checks if the menu should currently be open, then calls buttons() if yes.
   */
  hoverOver() {
    var over = (((mouseX > this.x) && (mouseX < (this.x + 25))) && ((mouseY > this.y) && (mouseY < (this.y + 25))) || this.menuOpen) && (menuCurrOpen == -10 || menuCurrOpen == this.id);
    if ((over && mouseIsPressed) || (this.menuOpen)) {
      this.menuOpen = true;
      menuCurrOpen = this.id;
      currOpenCenter = this.center;
      this.buttons();
    }
  }
  
  /**
   * Opens a circular menu around the grade entry box for selecting a new value.
   */
  buttons() {
    fill(darkBlue);
    var curr_xs = [this.x - 25];
    circle(this.x + 12.5, this.y + 12.5, 160);
    
    var around_coords = {
      "A": [this.x, this.y - 70],
      "A-": [this.x + 30, this.y - 60],
      "B+": [this.x + 60, this.y - 30],
      "B": [this.x + 70, this.y],
      "B-": [this.x + 60, this.y + 30],
      "C+": [this.x + 30, this.y + 60],
      "C": [this.x, this.y + 70],
      "C-": [this.x - 30, this.y + 60],
      "D+": [this.x - 60, this.y + 30],
      "D": [this.x - 70, this.y],
      "D-": [this.x - 60, this.y - 30],
      "F": [this.x - 30, this.y - 60],
      "P": [this.x, this.y + 32],
      " ": [this.x, this.y - 32]
    };
    
    textSize(14);
    fill(lightBlue);
    rect(this.x, this.y, 25, 25, 5);
    fill(225);
    if (this.grade.length == 1) {
      text(" ".concat(this.grade), this.x + 5, this.y + 17);
    } else {
      text(this.grade, this.x + 6, this.y + 17);
    }

    var currX;
    var currY;
    var g;
    
    for (g of possibleGrades) {
      currX = around_coords[g][0];
      currY = around_coords[g][1];
      fill(gradeValues[g].hlColor);
      var over = mouseX > currX && mouseX < (currX + 25) && mouseY > currY && mouseY < (currY + 25);
      if (over) {
        this.assignGrade(g);
        fill(lightBlue);
        rect(this.x, this.y, 25, 25, 5);
        fill(225);
        if (this.grade.length == 1) {
          text(" ".concat(this.grade), this.x + 5, this.y + 17);
        } else {
          text(this.grade, this.x + 6, this.y + 17);
        }
        fill(lightBlue);
      }
      
      rect(currX, currY, 25, 25, 5);
      fill(225);
      if (g.length == 1) {
        text(" ".concat(g), currX + 5, currY + 17);
      } else {
        text(g, currX + 6, currY + 17);
      }
    }
    
    if (!mouseIsPressed) {
      this.menuOpen = false;
      menuCurrOpen = -10;
      currOpenCenter = [-10, -10];
    }
  }
  
  /**
   * Assigns itself a new grade value, while updating its attributes.
   */
  assignGrade(newGrade) {
    this.grade = newGrade;
    this.c = gradeValues[newGrade].hlColor;
    this.credit = gradeValues[newGrade].credit;
    this.val = gradeValues[newGrade].val;
  }
}
