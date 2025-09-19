const trigopts = ["sin", "cos", "tan", "sec", "csc", "cot"]
const rootchoices = ["0", "\\dfrac{1}{2}", "\\dfrac{\\sqrt{3}}{3}", " \\dfrac{\\sqrt{2}}{2}", "\\dfrac{\\sqrt{3}}{2}", "1", "\\dfrac{2\\sqrt{3}}{3}", "\\sqrt{2}", "\\sqrt{3}", "2", 
	"\\text{undef}", "-\\dfrac{1}{2}", "-\\dfrac{\\sqrt{3}}{3}", "-\\dfrac{\\sqrt{2}}{2}", "-\\dfrac{\\sqrt{3}}{2}", "-1", "-\\dfrac{2\\sqrt{3}}{3}", "-\\sqrt{2}", "-\\sqrt{3}", "-2"];
const rootchoicesvalues = [0, 1/2, Math.sqrt(3)/3, Math.sqrt(2)/2, Math.sqrt(3)/2, 1, 2*Math.sqrt(3)/3, Math.sqrt(2), Math.sqrt(3), 2,
	NaN, -1/2, -Math.sqrt(3)/3, -Math.sqrt(2)/2, -Math.sqrt(3)/2, -1, -2*Math.sqrt(3)/3, -Math.sqrt(2), -Math.sqrt(3), -2]
	
const radchoices = ["0", "\\dfrac{\\pi}{6}", "\\dfrac{\\pi}{4}", "\\dfrac{\\pi}{3}", "\\dfrac{\\pi}{2}", "\\dfrac{2\\pi}{3}", "\\dfrac{3\\pi}{4}", "\\dfrac{5\\pi}{6}", "\\pi", "\\text{none}",
"\\text{undef}", "\\dfrac{-\\pi}{6}", "\\dfrac{-\\pi}{4}", "\\dfrac{-\\pi}{3}", "\\dfrac{-\\pi}{2}", "\\dfrac{-2\\pi}{3}", "\\dfrac{-3\\pi}{4}", "\\dfrac{-5\\pi}{6}", "-\\pi", "\\text{multiple}"]

var answer = 35;
var attempts = -1;
var lastfew = []
var label;
var newtext;

function onLoad() {

	label = document.getElementById("problemLabel");

	choicefield = document.getElementById("choices");
	for (x in rootchoices){
		choicefield.innerHTML += "<button type=\"button\" onclick=\"checkAnswer(" + x + ")\"> \\(" + rootchoices[x] + "\\)  </button>";
		if (x==9) {choicefield.innerHTML += "<br>"};
	}

	newRadian()
}

function gcd(x, y) {
	x = Math.abs(x);
	y = Math.abs(y);
	while(y) {
   		var t = y;
   		y = x % y;
   		x = t;
	}
	return x;
}

function randint(n){return Math.floor(Math.random()*n)} //Generates an integer from 0 to n-1 inclusive)

function newRadian() {

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
			row.innerHTML += "<img src=\"correct.png\" style=\"width: 50px;\">"
		}
		else {
			row.innerHTML += "<img src=\"incorrect.png\" style=\"width: 50px;\">"
		}
	}
	if (result) {
		label.innerHTML = "\\(" + newtext + " = " + a + "\\) Correct!"
		}
	else {label.innerHTML = "\\(" + newtext + " \\neq " + a + "\\) Incorrect, try again"}
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

