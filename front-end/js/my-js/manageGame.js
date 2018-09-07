function next(){
	type = "next";
	doAjax(type, " ");
}

function checkAnswer(answer) {
	type= "answer";
	doAjax(type, answer.children["0"].innerHTML);
}

function doAjax(type, infoToSend) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var elements = JSON.parse(this.responseText);
			if (elements[0] == "finished") {
				window.location.href = "eraMenu.html";
			}
			prepareScreen(elements);
		}
	};
	xmlhttp.open("POST", "/history/chapters-class/nextScreen.php");
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send("type=" + type + "&info=" + infoToSend);
}

function prepareScreen(elements){

	cleanDialogue();
	
	if (elements[0] == "dialogue"){
		createDialogue(elements[5]);
		createNextIcon();
	} else if (elements[0] == "question") {
		createQuestion(elements);
	}

	document.getElementById("speaking-character").src = "../front-end/Images/" + elements[1];
	document.getElementById("character-name").innerHTML=elements[2];
	document.getElementById("dialogue").innerHTML=elements[3];
	document.getElementById("background").style.backgroundImage = "url(../front-end/Images/background/" + elements[4] + ")";
	document.getElementById("main-container").style.visibility = "visible";
}

function cleanDialogue() {
	//Clean dialogue area
	dialogueArea = document.getElementById("dialogue-area");
	while (dialogueArea.firstChild) {
		dialogueArea.removeChild(dialogueArea.firstChild);
	}
	dialogueArea.removeAttribute("onclick");
	dialogueArea.classList.remove("hasPointer");
	document.getElementById("teacher").style.visibility = "hidden";
}

function createDialogue(backgroundColor){
	dialogueArea = document.getElementById("dialogue-area");

	//create dialogue div
	var div = document.createElement("div");
	div.setAttribute("class", "dialogue col-11");
	dialogueArea.style.backgroundColor = backgroundColor;

	//create dialogue text
	var dialogue = document.createElement("p");
	dialogue.setAttribute("id", "dialogue");
	//append text indo dialogue div
	div.appendChild(dialogue);

	dialogueArea.appendChild(div);
}

function createNextIcon() {
	//Create clickToNext IMG tag
	var clickToNext = document.createElement("IMG");
	clickToNext.setAttribute("alt", "Click here!");
	clickToNext.setAttribute("class", "clickToNext");

	dialogueArea.appendChild(clickToNext);
	clickToNext.src = "../front-end/Images/click-gif-3.gif";

	dialogueArea.setAttribute("onclick", "next()");
	dialogueArea.classList.add("hasPointer");
}

function createQuestion(elements){
	createDialogue(elements[5]);
	//create buttons
	var button1 = document.createElement("button");
	var button2 = document.createElement("button");
	var button3 = document.createElement("button");
	button1.setAttribute("class", "dialogue option-button hasPointer"); //col-3
	button2.setAttribute("class", "dialogue option-button hasPointer"); //col-3
	button3.setAttribute("class", "dialogue option-button hasPointer"); //col-3
	button1.setAttribute("onclick", "showHelp(this,'" + elements[7][0][1] + "')");
	button2.setAttribute("onclick", "showHelp(this,'" + elements[7][1][1] + "')");
	button3.setAttribute("onclick", "showHelp(this,'" + elements[7][2][1] + "')");
 
	dialogueArea.appendChild(button1);
	dialogueArea.appendChild(button2);
	dialogueArea.appendChild(button3);

	var option1 = document.createElement("p");
	var option2 = document.createElement("p");
	var option3 = document.createElement("p");
	option1.innerHTML=elements[7][0][0];
	option2.innerHTML=elements[7][1][0];
	option3.innerHTML=elements[7][2][0];

	button1.appendChild(option1);
	button2.appendChild(option2);
	button3.appendChild(option3);
}

function showHelp(answer, helpText) {

	cleanDialogue();
	backgroundColor = "rgb(0, 123, 255, 0.6)";
	createDialogue(backgroundColor);
	createNextIcon();
	dialogueArea = document.getElementById("dialogue-area");
	/*
	//create dialogue text
	var help = document.createElement("p");
	help.setAttribute("class", "teacher-help");
	dialogueArea.appendChild(help);
	*/
	document.getElementById("dialogue").innerHTML=helpText;
	document.getElementById("teacher").style.visibility = "visible";

	event.stopPropagation();
	dialogueArea.setAttribute("onclick", "next('" + answer + "')");
}

