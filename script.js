const totalPixelSpace = 400; // 400x400 px grid
let numSquares = 16; // 16x16 square grid
let blackColor = true; // Default square color

const drawGrid = function(n) {
    // Reference container div in html
    const container = document.querySelector('#container');

    // Create drawingContainer & append inside container
    const drawingContainer = document.createElement('div');
    container.appendChild(drawingContainer).id = "drawingContainer";
    
    // Calculate pixel value of square
    let squarePixelValue = totalPixelSpace / numSquares;    

    // Create grid rows
    for (let i = 0; i < n; i++) {
        // Declare array of rowDiv and append to drawingContainer
        const rowDiv = [];
        rowDiv[i] = document.createElement('div');
        drawingContainer.appendChild(rowDiv[i]).className = "rowDiv"; // Float left

        // Create grid columns
        for (let j = 0; j < n; j++) {
            // Create and append squareDiv for respective rowDiv
            const squareDiv = document.createElement('div');
            rowDiv[i].appendChild(squareDiv).className = "squareClass";
            squareDiv.style.width = `${squarePixelValue}px`;
            squareDiv.style.height = `${squarePixelValue}px`;
            squareDiv.style.background =  "rgb(255, 255, 255)";
        }
    }
};

const colorSquare = function() {   
    // Calculate value of square pixel size
    let squarePixelValue = totalPixelSpace / numSquares;

    // Calculate total number of squares in grid
    let totalSquares = numSquares * numSquares;

    const squareDiv = Array.from(document.querySelectorAll('.squareClass'));
    
    // Loop the event function for all squares in the grid
    for (let i = 0; i < totalSquares; i++) {
        squareDiv[i].addEventListener('mouseover', (e) => {
            // Change the square color & maintain pixel value
            if (blackColor === true) {
                squareDiv[i].setAttribute('style', 'background: black');
            } else {
                squareDiv[i].setAttribute('style', randomColor());
            }
            squareDiv[i].style.width = `${squarePixelValue}px`;
            squareDiv[i].style.height = `${squarePixelValue}px`;
        });
    }
};

function randomColor() {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    return `background: rgb(${r}, ${g}, ${b})`;
}

const displayButton = function() {
    // Reference Body element
    const bodyElement = document.querySelector('body');

    // Create div for buttons
    const buttonDiv = document.createElement('div');
    bodyElement.insertBefore(buttonDiv, container).id = "buttonDiv";
    
    // Create button for CHANGE SIZE
    const changeSizeButton = document.createElement('button');
    changeSizeButton.textContent = "Change Grid Size";
    buttonDiv.appendChild(changeSizeButton).id = "clearButton";

    // Create button for RANDOM COLOR
    const randomColorButton = document.createElement('button');
    randomColorButton.textContent = "Random Colors";
    buttonDiv.appendChild(randomColorButton).id = "randomColorButton";

    // Create button for BLACK MARKER
    const blackButton = document.createElement('button');
    blackButton.textContent = "Black Marker";
    buttonDiv.appendChild(blackButton).id = "blackMarker";

    changeGridSize();
};

// Change function eventually
function changeGridSize() {
    // Prompt user for number when button clicked, clear screen if successful
    buttonDiv.addEventListener('click', (e) => {
        if (e.target.id == "clearButton") {
            numSquares = window.prompt("Change grid size (Min: 5, Max: 100)");
            // Protect from strings and numbers outside desired range 
            if (numSquares < 5 || numSquares > 100) {
                alert("Number not within range");
            } else if (isNaN(numSquares)) {
                alert("This is not a number");
                return;
            } else {
                // Clear screen 
                drawingContainer.parentNode.removeChild(drawingContainer);
                displayGrid(numSquares);
            }
        } else if (e.target.id == "randomColorButton") {
            blackColor = false;
            colorSquare();
        } else if (e.target.id == "blackMarker") {
            blackColor = true;
            colorSquare();
        }
    });
}

function displayGrid(n) {
    drawGrid(n);
    colorSquare();
}

displayButton();
displayGrid(numSquares);