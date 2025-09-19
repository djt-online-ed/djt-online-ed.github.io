const radchoices = ["0", "\\dfrac{\\pi}{6}", "\\dfrac{\\pi}{4}", "\\dfrac{\\pi}{3}", "\\dfrac{\\pi}{2}", "\\dfrac{2\\pi}{3}", "\\dfrac{3\\pi}{4}", "\\dfrac{5\\pi}{6}", "\\pi",
"\\text{undef}", "\\dfrac{-\\pi}{6}", "\\dfrac{-\\pi}{4}", "\\dfrac{-\\pi}{3}", "\\dfrac{-\\pi}{2}", "\\dfrac{-2\\pi}{3}", "\\dfrac{-3\\pi}{4}", "\\dfrac{-5\\pi}{6}", "-\\pi"]
const radchoicesvalues = [0, Math.PI/6, Math.PI/4, Math.PI/3, Math.PI/2, 2*Math.PI/3, 3*Math.PI/4, 5*Math.PI/6, Math.PI,
NaN, -Math.PI/6, -Math.PI/4, -Math.PI/3, -Math.PI/2, -2*Math.PI/3, -3*Math.PI/4, -5*Math.PI/6, -Math.PI]

const numchoices = ["-1", "-\\dfrac{\\sqrt{3}}{2}", "-\\dfrac{\\sqrt{2}}{2}", "-\\dfrac{1}{2}", "0", "\\dfrac{1}{2}", "\\dfrac{\\sqrt{2}}{2}", "\\dfrac{\\sqrt{3}}{2}", "1", "\\sqrt{3}", "-\\sqrt{3}"]
const numchoicesvalues = [-1, -Math.sqrt(3)/2, -Math.sqrt(2)/2, -1/2, 0, 1/2, Math.sqrt(2)/2, Math.sqrt(3)/2, 1, Math.sqrt(3), -Math.sqrt(3)]

const three = ["arcsin", "arccos", "arctan"]

var answer = 35;
var attempts = -1;
var lastfew = []
var label;
var newtext;

function onLoad() {

	label = document.getElementById("problemLabel");

	choicefield = document.getElementById("choices");
	for (x in radchoices){
		choicefield.innerHTML += "<button type=\"button\" onclick=\"checkAnswer(" + x + ")\"> \\(" + radchoices[x] + "\\)  </button>";
		if (x==8) {choicefield.innerHTML += "<br>"};
	}

	newNumber()
}

function randint(n){return Math.floor(Math.random()*n)} //Generates an integer from 0 to n-1 inclusive)

function newNumber() {

	if (attempts == 0) {checkAnswer(-12)}
	attempts = 0
	
	whichtrig = randint(3)
	do { 
		whichrad = randint(numchoices.length) 
	} while (((numchoices[whichrad]).slice(-3) == "{2}") && (whichtrig==2))
	/*Avoid arctan of anything with denominator 2*/
	/*Decided not to include +- sqrt(3)/3 as these work only for arctan*/
	num = numchoices[whichrad]
	numval = numchoicesvalues[whichrad]
	
	console.log(three[whichtrig] + " of " + num + " or " + numval)
	
	switch(whichtrig){
		case 0: answer = Math.asin(numval); break;
		case 1: answer = Math.acos(numval); break;
		case 2: answer = Math.atan(numval); break;
	}
	
	console.log("Answer: " + answer)
	
	newtext = "\\" + three[whichtrig] + "(" + num + ")"
	
	label.innerHTML = "\\(" + newtext + "\\)";

	//Rewrite math
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function checkAnswer(picked) {

	var a = radchoices[picked];
	var b = radchoicesvalues[picked];
	console.log(answer, b)
	if (picked == -12) {b = -12}
	var result = false
	if ((Math.abs(answer-b) < 10e-8) || (!isFinite(answer) && !isFinite(b))) { result = true }
	attempts += 1
	
	if (attempts == 1) { lastfew.push(result) }
	
	while (lastfew.length > 5) {lastfew.shift()}
	
	var row = document.getElementById("inarow");
	row.innerHTML = " ";
	for (i in lastfew){
		if (lastfew[i]) { row.innerHTML += "<img src=\"correct.png\" style=\"width: 50px;\">" }
		else { row.innerHTML += "<img src=\"incorrect.png\" style=\"width: 50px;\">" }
	}
	if (result) { label.innerHTML = "\\(" + newtext + " = " + a + "\\) Correct!" }
	else { label.innerHTML = "\\(" + newtext + " \\neq " + a + "\\) Incorrect, try again"}
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

