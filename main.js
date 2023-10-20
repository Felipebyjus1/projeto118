var timeCounter = 0
var timerCheck = ""
var drawSketch = ""
var answerHolder = ""
var score = 0

function setup(){
    cnv = createCanvas(280,280)
    cnv.center() 
    background("white")

    cnv.mouseReleased(mouseSolto)
}
function limpar(){
    background("white")
}
function preload(){
    classifier = ml5.imageClassifier("doodleNet")
}

function mouseSolto(){
    classifier.classify(canvas, gotResult)
}

function draw(){
    strokeWeight(13)
    stroke(0)

    if(mouseIsPressed){
       line(pmouseX, pmouseY, mouseX, mouseY)
    }

    checkSketch()
    if(drawSketch == sketch){
       answerHolder = "set"
       score = score + 1
       document.getElementById("resultadoPontuação").innerHTML = "pontuação" + score
       background("white")
    }   
}

function checkSketch(){
    timeCounter = timeCounter + 1
    document.getElementById("resultadoTempo").innerHTML = "tempo" + timeCounter
    console.log(timeCounter)
    if(timeCounter > 400){
    timeCounter = 0
    timerCheck = "completo"
    updateCanvas()
    }
    if(answerHolder == "set" || timerCheck == "completed"){
        timerCheck = 0
        answerHolder = 0
        updateCanvas()
    }
}

function updateCanvas(){
randomNo = Math.floor((Math.random() *array1.length))
sketch = array1[randomNo]
document.getElementById("esboço-a-ser-desenhado").innerHTML = sketch
}

array1=["pen","paper","book","bottle","t-shirt"]
randomNo = Math.floor((Math.random() *array1.length))
sketch = array1[randomNo]
document.getElementById("esboço-a-ser-desenhado").innerHTML = sketch

function gotResult(error, results){
    if(error){
         console.error(error)
         }
    else{
        console.log(results)
        var nome = results[0].label
        var precisao = (results[0].confidence * 100).toFixed(3) + "%"
        drawSketch = nome
        document.getElementById("resultadoNome").innerHTML = nome
        document.getElementById("resultadoPrecisão").innerHTML = precisao
        }
    }