var canvas = document.getElementById("stockGraph");
var ctx = canvas.getContext("2d");


const CO = 500, LI = 300
const CEL_WIDTH = canvas.offsetWidth/CO
const CEL_HEIGHT = canvas.offsetHeight/LI
const CEL_COLOR = "rgba(0, 0, 200, 0.5)"

var x = 0;
var y = 0;
var col=0;
var lig=0;

var generation = 0;
var ouvert = false;
var matrix = initArray(CO, LI)
var runfunction = null





canvas.addEventListener("mousemove", (evt) => {

    x = evt.offsetX;
    y = evt.offsetY;
    col = parseInt(x/CEL_WIDTH);
    lig = parseInt(y/CEL_HEIGHT);

    if (evt.buttons == 1) {

        matrix[col][lig] = 1; // parseInt(1 - matrix[col][lig]);
    }
        
})

canvas.addEventListener("mousedown", (evt) => {

    matrix[col][lig] = parseInt(1 - matrix[col][lig]);
    
})

document.getElementById("clear").addEventListener("click", (evt) => {

    for (let i = 0; i < CO; i++) {
        for (let j = 0; j < LI; j++) {
            matrix[i][j] = 0
            
        }
    }
    generation=0
})

document.getElementById("p1").addEventListener("click", (evt) => {

    // puffer (https://fr.wikipedia.org/wiki/Puffeur)
    matrix[parseInt(CO*3/4)+1][parseInt(LI*3/4)+0] = 1
    matrix[parseInt(CO*3/4)+0][parseInt(LI*3/4)+1] = 1
    matrix[parseInt(CO*3/4)+2][parseInt(LI*3/4)+1] = 1
    matrix[parseInt(CO*3/4)+0][parseInt(LI*3/4)+3] = 1
    matrix[parseInt(CO*3/4)+3][parseInt(LI*3/4)+3] = 1
    matrix[parseInt(CO*3/4)+3][parseInt(LI*3/4)+4] = 1
    matrix[parseInt(CO*3/4)+2][parseInt(LI*3/4)+4] = 1
    matrix[parseInt(CO*3/4)+3][parseInt(LI*3/4)+5] = 1
    
})

document.getElementById("p2").addEventListener("click", (evt) => {

    // puffer (https://fr.wikipedia.org/wiki/Puffeur)
    matrix[parseInt(CO*3/4)+0][parseInt(LI*1/4)+0] = 1
    matrix[parseInt(CO*3/4)+2][parseInt(LI*1/4)+0] = 1
    matrix[parseInt(CO*3/4)+2][parseInt(LI*1/4)+1] = 1
    matrix[parseInt(CO*3/4)+4][parseInt(LI*1/4)+2] = 1
    matrix[parseInt(CO*3/4)+4][parseInt(LI*1/4)+3] = 1
    matrix[parseInt(CO*3/4)+4][parseInt(LI*1/4)+4] = 1
    matrix[parseInt(CO*3/4)+6][parseInt(LI*1/4)+3] = 1
    matrix[parseInt(CO*3/4)+6][parseInt(LI*1/4)+4] = 1
    matrix[parseInt(CO*3/4)+6][parseInt(LI*1/4)+5] = 1
    matrix[parseInt(CO*3/4)+7][parseInt(LI*1/4)+4] = 1
    
})

document.getElementById("p3").addEventListener("click", (evt) => {

    // puffer (https://fr.wikipedia.org/wiki/Puffeur)
    matrix[(CO/2)+0][(LI/2)+0] = 1
    matrix[(CO/2)+0][(LI/2)+3] = 1
    matrix[(CO/2)+0][(LI/2)+4] = 1
    matrix[(CO/2)+1][(LI/2)+1] = 1
    matrix[(CO/2)+1][(LI/2)+4] = 1
    matrix[(CO/2)+2][(LI/2)+0] = 1
    matrix[(CO/2)+2][(LI/2)+1] = 1
    matrix[(CO/2)+2][(LI/2)+4] = 1
    matrix[(CO/2)+3][(LI/2)+2] = 1
    matrix[(CO/2)+4][(LI/2)+0] = 1
    matrix[(CO/2)+4][(LI/2)+1] = 1
    matrix[(CO/2)+4][(LI/2)+2] = 1
    matrix[(CO/2)+4][(LI/2)+4] = 1
    
})


document.getElementById("c1").addEventListener("click", (evt) => {

    let col = parseInt(CO/6)
    let lig = parseInt(LI*2/3)
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

    
})

/**
 * Boucle principale du jeu...
 */
window.requestAnimationFrame(draw);


/**************************************************************************************
 * 
 * 
 * 
 */

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


function draw() {
    // document.getElementById("x").innerHTML = x;
    // document.getElementById("y").innerHTML = y;

    // document.getElementById("col").innerHTML = col;
    // document.getElementById("lig").innerHTML = lig;
    
    document.getElementById("generation").innerHTML = generation;
    
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

    
    window.requestAnimationFrame(draw);
}

function start() {
    let label = document.getElementById("btn").innerHTML
    // console.log("click..." + label)
    if (label=="start") {
        document.getElementById("btn").innerHTML="stop"
        runfunction = setInterval(run, 10)
    } else {
        document.getElementById("btn").innerHTML="start"
        clearInterval(runfunction)
        runfunction = null
    }
}

function run() {

    let tmp2 = initArray(CO, LI)

    for (let i = 0; i < CO;  i++) {
        for (let j = 0; j < LI; j++) {
            tmp2[i][j] = checkLife(i, j) ? 1 : 0
        }
        
    }
    
    matrix = structuredClone(tmp2)
    generation++;

}


function checkLife(i, j) {
    let nb = ouvert?countNeighbours2(i,j):countNeighbours(i,j)

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

function changeOuvert() {
    if (runfunction) clearInterval(runfunction)
    if (document.getElementById("ouvert").checked) {
        ouvert=true
    }
    else {
        ouvert=false
    }
    if (runfunction) runfunction = setInterval(run, 10)
}