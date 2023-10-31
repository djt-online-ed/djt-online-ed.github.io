const variables = "23456789abcdhjkmnpqrstuvwxyz"

const trues = [
"(A+B)N = AN+BN", 
"N(A+B) = NA+NB", 
"(A-B)N = AN-BN", 
"N(A-B) = NA-NB", 
"\\dfrac{(A+B)}{N} = \\dfrac{A}{N} + \\dfrac{B}{N}", 
"\\dfrac{(A-B)}{N} = \\dfrac{A}{N} - \\dfrac{B}{N}", 
"(AB)^N = A^NB^N", 
"(\\dfrac{A}{B})^N = \\dfrac{A^N}{B^N}", 
"\\sqrt[N]{AB} = \\sqrt[N]{A} \\sqrt[N]{B}", 
"\\sqrt[N]{\\dfrac{A}{B}} = \\dfrac{\\sqrt[N]{A}}{\\sqrt[N]{B}}"
]
const falses = [
"\\dfrac{N}{A+B} = \\dfrac{N}{A} + \\dfrac{N}{B}",
"\\dfrac{N}{A-B} = \\dfrac{N}{A} - \\dfrac{N}{B}",
"N^{AB} = N^{A} N^{B}",
"N^{A/B} = \\dfrac{N^A}{N^B}",
"(A+B)^N = A^N + B^N",
"(A-B)^N = A^N - B^N",
"\\sqrt[N]{A+B} = \\sqrt[N]{A} + \\sqrt[N]{B}",
"\\sqrt[N]{A-B} = \\sqrt[N]{A} - \\sqrt[N]{B}",
"A+(B+N) = A+B + A+N",
"A(BN) = (AB)(AN)",
"A+(BN) = (A+B)(A+N)",
"A(B^N) = AB^{(AN)}",
"A+B^N = (A+B)^{(A+N)}"
]

const truefalse = [trues, falses]

var which = 0;
var attempts = 0;
var lastfew = []
var label;
var newtext;
var yesnolabel;

function onLoad() { 
	label = document.getElementById("problemLabel");
	yesnolabel = document.getElementById("yesnolabel");
	newDist();
}

function randint(n){return Math.floor(Math.random()*n)} //Generates an integer from 0 to n-1 inclusive)

function shuffle(array) {
  let currentIndex = array.length, randomIndex; // While there remain elements to shuffle.
  while (currentIndex > 0) { // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


function newDist() {
	var which = randint(2);
	console.log(which);
	var a = [variables[randint(8)], variables[randint(10)+8], variables[randint(10)+18]];
	shuffle(a);
	newtext = truefalse[which][randint(truefalse[which].length)];
	newtext = newtext.replace(/A/g, a[0]) ;
	newtext = newtext.replace(/B/g, a[1]) ;
	newtext = newtext.replace(/N/g, a[2]) ;
	label.innerHTML = "<br> \\( \\LARGE " + newtext + "\\) <br>";
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //Rewrite math
	attempts = 0
}

function checkAnswer(picked) {
	attempts += 1;
	
	if (attempts == 1) {
		if (picked == which) {
			yesnolabel.innerHTML = "Correct!"
			lastfew.push(true);
		}
		else {
			yesnolabel.innerHTML = "Incorrect"
			lastfew.push(false);
		}
	}

	while (lastfew.length > 10) { lastfew.shift() ; }
	
	var row = document.getElementById("inarow");
	row.innerHTML = " ";
	for (i in lastfew){
		if (lastfew[i]) {
			row.innerHTML += "<img src=\"correct.png\">" ;
		}
		else {
			row.innerHTML += "<img src=\"incorrect.png\">" ;
		}
	}
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]); //Rewrite math
}

