var canvas = document.querySelector("#world")
var ctx = canvas.getContext("2d")

var buttonStart = document.querySelector("#start")
var buttonNext = document.querySelector("#next")
var buttonClear = document.querySelector("#clear")
var buttonPuffer1 = document.querySelector("#p1")
var buttonPuffer2 = document.querySelector("#p2")
var buttonPuffer3 = document.querySelector("#p3")
var buttonGun1 = document.querySelector("#g1")
var buttonGun2 = document.querySelector("#g2")
var checkBoxOpenWorld = document.querySelector("#open-world")
var rangeSize = document.querySelector("#range-size")
var labelSize = document.querySelector("#label-size")

var labelGeneration = document.querySelector("#generation")



var CEL_COLOR = "rgba(0, 0, 200, 0.5)"

var x = 0;
var y = 0;
var col=0;
var lig=0;

var generation = 0
var openWorld = false
var matrix =[]
var loop = false

initGame()


/**
 * mail loop game...
 */

function draw() {
    labelGeneration.innerHTML = generation;
    
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.fillStyle = "rgba(200, 0, 0, 0.6)"
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, 2*Math.PI, false)
    ctx.fill()
    ctx.fillStyle = "rgba(20, 20, 20, 0.4)"
    ctx.fillRect(col*CEL_WIDTH, lig*CEL_HEIGHT, CEL_WIDTH, CEL_HEIGHT)

    for (let i = 0; i < CO;  i++) {
        for (let j = 0; j < LI; j++) {
            if (matrix[i][j] == 1) {
                ctx.fillStyle = CEL_COLOR
                ctx.fillRect(i*CEL_WIDTH, j*CEL_HEIGHT, CEL_WIDTH, CEL_HEIGHT)
            }
        }
    }
    
    if (loop) nextGeneration()
    // window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

/**************************************************************************************
 * 
 * Functions lib
 * 
 **************************************************************************************/

function initGame() {

    CO = rangeSize.value, LI = parseInt(CO/1.618)
    CEL_WIDTH = canvas.offsetWidth/CO
    CEL_HEIGHT = canvas.offsetHeight/LI

    labelSize.innerHTML = CO
    buttonStart.innerHTML = "start"

    matrix = initArray(CO, LI)
    loop = false

    window.requestAnimationFrame(draw);
}

function initArray(c, l) {
    let result = []

    for (let i = 0; i < c; i++) {
        let arr = []
        for (let j = 0; j < l; j++) {
            arr.push(0)
        }
        result.push(arr)
    }

    return result
}


function nextGeneration() {

    let tmp2 = initArray(CO, LI)

    for (let i = 0; i < CO;  i++) {
        for (let j = 0; j < LI; j++) {
            tmp2[i][j] = checkLife(i, j) ? 1 : 0
        }
        
    }
    
    matrix = structuredClone(tmp2)
    generation++;
    window.requestAnimationFrame(draw);

}


function checkLife(i, j) {
    let nb = openWorld?countNeighbours2(i,j):countNeighbours(i,j)

    if (nb==3 || (nb==2 && matrix[i][j]==1)) {
        return true
    } 
    return false
}

function countNeighbours(i, j) {
    let result = 0;

    if (i>0 && j>0) result += matrix[i-1][j-1]
    if (i>0 && j<LI-1) result += matrix[i-1][j+1] 
    if (i>0) result += matrix[i-1][j]   

    if (j>0) result += matrix[i][j-1]
    if (i<CO-1 && j>0) result += matrix[i+1][j-1]

    if (i<CO-1) result += matrix[i+1][j]    
    if (j<LI-1) result += matrix[i][j+1] 
    if (j<LI-1 && i<CO-1) result += matrix[i+1][j+1]
    
    return result
}

function countNeighbours2(i, j) {

    let result = 0;
    let im = i-1, ip = i+1, jm = j-1, jp = j+1;

    if (im<0) im=CO-1;
    if (ip>CO-1) ip=0;
    if (jm<0) jm=LI-1;
    if (jp>LI-1) jp=0;

    result += matrix[im][jm] + matrix[im][j] + matrix[im][jp]   

    result += matrix[i][jm] + matrix[i][jp]

    result += matrix[ip][jm] + matrix[ip][j] + matrix[ip][jp]
    
    return result
}

/**************************************************************************************
 * 
 * Event Listeners 
 * 
 **************************************************************************************/

// calculate mouse pointer position
canvas.addEventListener("mousemove", (evt) => {

    x = evt.offsetX;
    y = evt.offsetY;
    col = parseInt(x/CEL_WIDTH);
    lig = parseInt(y/CEL_HEIGHT);

    if (evt.buttons == 1) {

        matrix[col][lig] = 1; 
    }
    
    if (!loop) window.requestAnimationFrame(draw);
})

// toggle cell (live/dead)
canvas.addEventListener("mousedown", (evt) => {

    matrix[col][lig] = parseInt(1 - matrix[col][lig]);
    
    if (!loop) window.requestAnimationFrame(draw);
})

// Clear and reset universe
buttonClear.addEventListener("click", (evt) => {

    for (let i = 0; i < CO; i++) {
        for (let j = 0; j < LI; j++) {
            matrix[i][j] = 0
            
        }
    }
    generation=0
    if (!loop) window.requestAnimationFrame(draw);
})


checkBoxOpenWorld.addEventListener("change", () => {
        if (checkBoxOpenWorld.checked) {
            openWorld=true
        }
        else {
            openWorld=false
        }
    }
)

buttonStart.addEventListener("click", () => {
        let label = buttonStart.innerHTML
        if (label=="start") {
            buttonStart.innerHTML="stop"
            loop = true
        } else {
            buttonStart.innerHTML="start"
            loop = false
        }
        window.requestAnimationFrame(draw);
    }
)


buttonNext.addEventListener("click", () => {
    loop = false
    buttonStart.innerHTML = "start"
    nextGeneration()
    window.requestAnimationFrame(draw);
}
)

rangeSize.addEventListener("input", () => {
    labelSize.innerHTML = rangeSize.value
    initGame()
})

/**************************************************************************************
 * 
 * Sample Templates 
 * 
 **************************************************************************************/

buttonPuffer1.addEventListener("click", (evt) => {

    // puffer (https://fr.wikipedia.org/wiki/Puffeur)
    let col = parseInt(CO*3/4)
    let lig = parseInt(LI*3/4)
    matrix[col+1][lig+0] = 1
    matrix[col+0][lig+1] = 1
    matrix[col+2][lig+1] = 1
    matrix[col+0][lig+3] = 1
    matrix[col+3][lig+3] = 1
    matrix[col+3][lig+4] = 1
    matrix[col+2][lig+4] = 1
    matrix[col+3][lig+5] = 1
    
    if (!loop) window.requestAnimationFrame(draw);
})

buttonPuffer2.addEventListener("click", (evt) => {

    // puffer (https://fr.wikipedia.org/wiki/Puffeur)
    let col = parseInt(CO*3/4)
    let lig = parseInt(LI*1/4)
    matrix[col+0][lig+0] = 1
    matrix[col+2][lig+0] = 1
    matrix[col+2][lig+1] = 1
    matrix[col+4][lig+2] = 1
    matrix[col+4][lig+3] = 1
    matrix[col+4][lig+4] = 1
    matrix[col+6][lig+3] = 1
    matrix[col+6][lig+4] = 1
    matrix[col+6][lig+5] = 1
    matrix[col+7][lig+4] = 1

    if (!loop) window.requestAnimationFrame(draw);
})

buttonPuffer3.addEventListener("click", (evt) => {

    // puffer (https://fr.wikipedia.org/wiki/Puffeur)
    let col = parseInt(CO/2)
    let lig = parseInt(LI/2)
    matrix[col+0][lig+0] = 1
    matrix[col+0][lig+3] = 1
    matrix[col+0][lig+4] = 1
    matrix[col+1][lig+1] = 1
    matrix[col+1][lig+4] = 1
    matrix[col+2][lig+0] = 1
    matrix[col+2][lig+1] = 1
    matrix[col+2][lig+4] = 1
    matrix[col+3][lig+2] = 1
    matrix[col+4][lig+0] = 1
    matrix[col+4][lig+1] = 1
    matrix[col+4][lig+2] = 1
    matrix[col+4][lig+4] = 1

    if (!loop) window.requestAnimationFrame(draw);
})

buttonGun1.addEventListener("click", (evt) => {

    // https://fr.wikipedia.org/wiki/Canon_(automate_cellulaire)
    let col = parseInt(CO/8)
    let lig = parseInt(LI*3/4)
    matrix[col+0][lig+3] = 1
    matrix[col+0][lig+4] = 1
    matrix[col+1][lig+3] = 1
    matrix[col+1][lig+4] = 1

    matrix[col+10][lig+2] = 1
    matrix[col+10][lig+3] = 1
    matrix[col+10][lig+4] = 1
    matrix[col+11][lig+1] = 1
    matrix[col+11][lig+5] = 1
    matrix[col+12][lig+0] = 1
    matrix[col+12][lig+6] = 1
    matrix[col+13][lig+0] = 1
    matrix[col+13][lig+6] = 1
    matrix[col+14][lig+3] = 1
    matrix[col+15][lig+1] = 1
    matrix[col+15][lig+5] = 1
    matrix[col+16][lig+2] = 1
    matrix[col+16][lig+3] = 1
    matrix[col+16][lig+4] = 1
    matrix[col+17][lig+3] = 1
    
    matrix[col+20][lig+4] = 1
    matrix[col+20][lig+5] = 1
    matrix[col+20][lig+6] = 1
    matrix[col+21][lig+4] = 1
    matrix[col+21][lig+5] = 1
    matrix[col+21][lig+6] = 1
    matrix[col+22][lig+3] = 1
    matrix[col+22][lig+7] = 1
    matrix[col+24][lig+2] = 1
    matrix[col+24][lig+3] = 1
    matrix[col+24][lig+7] = 1
    matrix[col+24][lig+8] = 1

    matrix[col+34][lig+5] = 1
    matrix[col+34][lig+6] = 1
    matrix[col+35][lig+5] = 1
    matrix[col+35][lig+6] = 1

    if (!loop) window.requestAnimationFrame(draw);
})




buttonGun2.addEventListener("click", (evt) => {

    // https://fr.wikipedia.org/wiki/Canon_(automate_cellulaire)
    let col = parseInt(CO*8/9)
    let lig = parseInt(LI*4/5)
    matrix[col-0][lig+3] = 1
    matrix[col-0][lig+4] = 1
    matrix[col-1][lig+3] = 1
    matrix[col-1][lig+4] = 1

    matrix[col-10][lig+2] = 1
    matrix[col-10][lig+3] = 1
    matrix[col-10][lig+4] = 1
    matrix[col-11][lig+1] = 1
    matrix[col-11][lig+5] = 1
    matrix[col-12][lig+0] = 1
    matrix[col-12][lig+6] = 1
    matrix[col-13][lig+0] = 1
    matrix[col-13][lig+6] = 1
    matrix[col-14][lig+3] = 1
    matrix[col-15][lig+1] = 1
    matrix[col-15][lig+5] = 1
    matrix[col-16][lig+2] = 1
    matrix[col-16][lig+3] = 1
    matrix[col-16][lig+4] = 1
    matrix[col-17][lig+3] = 1
    
    matrix[col-20][lig+4] = 1
    matrix[col-20][lig+5] = 1
    matrix[col-20][lig+6] = 1
    matrix[col-21][lig+4] = 1
    matrix[col-21][lig+5] = 1
    matrix[col-21][lig+6] = 1
    matrix[col-22][lig+3] = 1
    matrix[col-22][lig+7] = 1
    matrix[col-24][lig+2] = 1
    matrix[col-24][lig+3] = 1
    matrix[col-24][lig+7] = 1
    matrix[col-24][lig+8] = 1

    matrix[col-34][lig+5] = 1
    matrix[col-34][lig+6] = 1
    matrix[col-35][lig+5] = 1
    matrix[col-35][lig+6] = 1

    if (!loop) window.requestAnimationFrame(draw);
})