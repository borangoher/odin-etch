const DEFAULT_SIZE = 16;

const boardDiv = document.querySelector('#board');
const penButton = document.querySelector('#pen');
const eraserButton = document.querySelector('#eraser');
const resetButton = document.querySelector('#reset');
const inputField = document.querySelector('input');
let pixelCount = DEFAULT_SIZE;
let penSelected = true;
let isDrawing = 0;

penButton.addEventListener('click', penSelect);
eraserButton.addEventListener('click', eraserSelect);
resetButton.addEventListener('click', resetBoard);
inputField.addEventListener('change', changeBoard);

function createGrid (boardDiv, pixelCount) {
    let subDivDel = document.querySelectorAll('.subDiv');
    subDivDel.forEach(element => element.remove());

    boardDiv.style.cssText += `grid-template-columns: repeat(${pixelCount}, 1fr);`

    for (i=0;i<pixelCount**2;i++) {
        let subDiv = document.createElement('div');
        subDiv.classList.add('subDiv');
        boardDiv.appendChild(subDiv);
    }

    let subDivEv = document.querySelectorAll('.subDiv');
    subDivEv.forEach(element => element.addEventListener('mouseover', colorGrid));
    subDivEv.forEach(element => element.addEventListener('mousedown', startDraw));
    subDivEv.forEach(element => element.addEventListener('mouseup', endDraw));

    return;
}

function penSelect () {
    if (penSelected) return;
    else {
        penSelected = 1;
        return;
    }
}

function eraserSelect () {
    if (!penSelected) return;
    else {
        penSelected = 0;
        return;
    }
}

function resetBoard () {
    let coloredGrids = document.querySelectorAll('.colored');
    coloredGrids.forEach(element => element.classList.remove('colored'));
    return;
}

function changeBoard (e) {
    pixelCount = this.value;
    createGrid(boardDiv, pixelCount)
}

function colorGrid (e) {
    e.preventDefault();
    if (isDrawing) {
        if (penSelected) {
            this.classList.add('colored');
        } else {
            this.classList.remove('colored');
        }
    }
}

function startDraw (e) {
    e.preventDefault();
    isDrawing = 1;
}

function endDraw (e) {
    e.preventDefault();
    isDrawing = 0;
}

createGrid(boardDiv, pixelCount);