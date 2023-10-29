const numbers = "123456789"
const letters = "abcdhjkmnpqrstuvwxyz"

const trues = ["(A+B)N = AN+BN", "N(A+B) = NA+NB", "(A-B)N = AN-BN", "N(A-B) = NA-NB", "\dfrac{(A+B)}{N} = \dfrac{A}{N} + \dfrac{B}{N}", "\dfrac{(A-B)}{N} = \dfrac{A}{N} - \dfrac{B}{N}", "(AB)^N = A^NB^N", "(\dfrac{A}{B})^N = \dfrac{A^N}{B^N}", "\sqrt[N]{AB} = \sqrt[N]{A} \sqrt[N]{B}", "\sqrt[N]{\dfrac{A}{B}} = \dfrac{\sqrt[N]{A}}{\sqrt[N]{B}}"]
const falses = ["\dfrac{N}{A+B} = \dfrac{N}{A} + \dfrac{N}{B}", "\dfrac{N}{A-B} = \dfrac{N}{A} - \dfrac{N}{B}", "N^{AB} = N^{A} N^{B}", "N^{A/B} = \dfrac{N^A}{N^B}", "(A+B)^N = A^N + B^N", "(A-B)^N = A^N - B^N", "\sqrt[N]{A+B} = \sqrt[N]{A} + \sqrt[N]{B}", "\sqrt[N]{A-B} = \sqrt[N]{A} - \sqrt[N]{B}", "A+(B+N) = A+B + A+N", "A(BN) = (AB)(AN)", "A+(BN) = (A+B)(A+N)", "A(B^N) = AB^{(AN)}", "A+B^N = (A+B)^{(A+N)}"]

var answer = 35;
var attempts = -1;
var lastfew = []
var label;
var newtext;

function onLoad() {

	label = document.getElementById("problemLabel");
	choicefield = document.getElementById("choices");
	for (x in ["True", "False"]){
		choicefield.innerHTML += "<button type=\"button\" onclick=\"checkAnswer(" + x + ")\"> \\(" + rootchoices[x] + "\\)  </button>";
	}

	newDist()
}


function randint(n){return Math.floor(Math.random()*n)} //Generates an integer from 0 to n-1 inclusive)

function newDist() {

	var trigs = document.getElementsByName("trigopts");
	var l = 0;
	for (i in trigs) { if (trigs[i].checked) {l += 1;} }
	if (l==0) { label.innerHTML = "Check at least one trig function above"; return(false); }

	if (attempts == 0) {checkAnswer(-12)}
	attempts = 0

	var whichtrig = -1;
	do { whichtrig = randint(6) } while (!((trigs[whichtrig]).checked))
		
	var moreangles = document.getElementById("moreangles");
	var coterm = 12*(randint(11) - 5)
	var num = 1;
	do { num = randint(24) } while (num%6 == 1 || num%6 == 5)
	var denom = 12;
	if (moreangles.checked) {num += coterm}
	g = gcd(num,denom);
	num = num / g;
	denom = denom / g;
	var rad = num * Math.PI / denom
	
	srad = Math.sin(rad);
	crad = Math.cos(rad);
	if (Math.abs(srad) < 10e-7) {srad = 0}
	if (Math.abs(crad) < 10e-7) {crad = 0}
	trad = srad/crad;
	cotrad = crad/srad;
	
	switch(whichtrig){
		case 0: answer = srad; break;
		case 1: answer = crad; break;
		case 2: answer = trad; break;
		case 3: answer = 1/crad; break;
		case 4: answer = 1/srad; break;
		case 5: answer = cotrad; break;
	}
	
	newtext = num + "\\pi"
	if (num==1) {newtext = "\\pi"}
	if (num==-1) {newtext = "-\\pi"}
	if (denom>1) {newtext = "\\dfrac{" + newtext + "}{" + denom + "}"}
	if (num==0) {newtext = "0"}
	
	newtext = "\\" + trigopts[whichtrig] + "(" + newtext + ")";
		
	label.innerHTML = "\\(" + newtext + "\\)";

	//Rewrite math
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function checkAnswer(picked) {

	var a = rootchoices[picked];
	var b = rootchoicesvalues[picked];
	if (picked == -12) {b = -12}
	var result = true
	if ((Math.abs(answer-b) < 10e-8) || (!isFinite(answer) && !isFinite(b))) {
		attempts += 1
	}
	else {
		attempts += 1;
		result = false;
	}
	
	if (attempts == 1) { 
		lastfew.push(result) 
	}
	
	while (lastfew.length > 5) {lastfew.shift()}
	
	var row = document.getElementById("inarow");
	row.innerHTML = " ";
	for (i in lastfew){
		if (lastfew[i]) {
			row.innerHTML += "<img src=\"correct.png\">"
		}
		else {
			row.innerHTML += "<img src=\"incorrect.png\">"
		}
	}
	if (result) {
		label.innerHTML = "\\(" + newtext + " = " + a + "\\) Correct!"
		}
	else {label.innerHTML = "\\(" + newtext + " \\neq " + a + "\\) Incorrect, try again"}
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

