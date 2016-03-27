
// Simulated Football version 3.0 by Sonny Sheth

//heres an example of how one might declare all these variables.
//Throughout the program you can reference them by 'gameVars.fieldPosition' etc.
//Not

var gameVars = {
	fieldPosition: null,
	currentFP: null,
	yardsToGo: null,
	yardsGained: null,
	down: null,
	p1Score: 0,
	p2Score: 0,
	clock: 3600, // set this in seconds
	min: null,
	sec: null,
	playBook: null,
	highLight: "3px solid #00FF00", //highlight border around enabled buttons
	delay: 1000, // used for the setTimeout function in terms of how long before showing next display status

};

// the variables to keep track of game stats
var gameStats = {
	passes: 0,
	completions: 0,
	yardsThrown: 0,
	passTD: 0,
	rushes: 0,
	rushYardage: 0,
	intsThrown: 0,
	numSacks: 0,
	tdRushed: 0,
	fumbles: 0,
	fgAttempted: 0,
	fgsMade: 0,
	fgs: [0]
};

var fieldPosition;
var currentFP;
var yardsToGo;
var yardsGained;
var down;
var p1Score = 0;
var p2Score = 0;
var clock = 3600; // set this in seconds
var min;
var sec;
var playBook;
var highLight = "3px solid #00FF00"; //highlight border around enabled buttons
var delay = 1000 // used for the setTimeout function in terms of how long before showing next display status

// the variables to keep track of game stats
var passes = 0;
var completions = 0;
var yardsThrown = 0;
var passTD = 0;
var rushes = 0;
var rushYardage = 0;
var intsThrown = 0;
var numSacks = 0;
var tdRushed = 0;
var fumbles = 0;
var fgAttempted = 0;
var fgsMade = 0;
var fgs = [0];

// standard messages displayed given a particular situation

var computerResults = [

	'Computer fumbles the ball near the goal line ...',
	'Computer takes the handoff, the ball is stripped at the goal line ...',
	'You recover in the end zone! Your ball on the 20 yard line',
	'And FUMBLES, you recover!',
	'Computer throws into the end zone ...',
	'INTERCEPTION! Your ball on the 20 yard line',
	'Computer drops back to pass ...',
	'Computer throws into coverage ...',
	'Computer targets his receiver ...',
	'Computer fires off a quick pass ...',
	'Computer looks to pass ...',
	'Coverage sack!',
	'QB hit, sacked!',
	'QB pressured, sacked',
	'The pass is picked off! INTERCEPTION!',
	'Computer lines up for a field goal ...',
	'The kick is no good!',
	'The ball sails through the uprights. Kick is good!',
	'The ball hits the post, but falls in. Kick is good!',
	'The kick is good!',
	'Computer goes for it on 4th down ...',
	'Hands off, stopped short! Turnover on downs',
	'Makes a quick pass, incomplete! Turnover on downs',
	'Incomplete, ball overthrown',
	'Incomplete, pass broken up',
	'Incomplete, ball underthrown',
	'Incomplete, ball dropped',
	'Computer hands the ball off ...',
	'Computer runs a draw ...',
	'Computer runs a sweep to the left ...',
	'Computer runs a sweep to the right ...',
	'Computer hands off, the RB cuts up the middle ...',
	'Computer tosses left ...',
	'Computer tosses right ...',
	'Stuffed in the backfield!',
	'Defense swallows up the RB.',
	'RB has no where to go',
	'Computer punts the ball ...',
	'It goes through the end zone, touchback',
	'You take the punt in the end zone, kneel for a touchback',
	'Computer throws for a touchdown!',
	'Computer runs for a touchdown!',
	'Computer returns kickoff for a touchdown!',
	'Touchback on the kickoff'
];

var displayResults = {

	gameOver: 'GAME OVER!',

	playerResults: [
		' yards to go',
		'TURNOVER ON DOWNS',
		'Missed FG!',
		' yard TOUCHDOWN!!!',
		' yard Field Goal GOOD!',
		'You FUMBLE, Computer recovers!',
		'INTERCEPTION, Computer ball!',
		'Incomplete Pass',
		'You return the kickoff for a Touchdown!!!',
		'Computer tackled in its end zone, Safety!'
	]
};

var canvas;
var context;
var xPos;
var yPos;
var playerHasBall = true;
// ======= CREATING CANVAS ELEMENTS ===============
window.onload = function(){

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

	drawEverything();

};

function moveBall(yardline){

	xPos = 50 + (yardline * 7) || 50 + (fieldPosition * 7);
	if(xPos > 800){
		xPos = 775;
	} else if (xPos < 50){
		xPos = 25;
	}
	yPos = randomNumber(25,60);

	drawEverything(); // had 'red' as the argument

}


function computerScoreBall(){
	xPos = 25;
	yPos = 36;
	drawEverything();
}

function removeBall(){

	makeRect(0, 5, 800, 75, 'darkgreen');
	makeRect(0, 5, 50, 75, 'darkblue');
	makeRect(750, 5, 50, 75, 'darkblue');
	makeRect(390, 5, 1, 75, 'black');
}

function drawEverything(){ // color was a parameter here
	//this ternery was evaluating correctly, but I don't think its best practice to do it that way :P
	var color = playerHasBall === true  ? 'red' : 'blue';

	makeRect(0, 5, 800, 75, 'darkgreen'); // the field
	makeRect(0, 5, 50, 75, 'darkblue'); // endzone
	makeRect(750, 5, 50, 75, 'darkblue'); // endzone
	makeRect(399, 5, 1, 75, 'black'); // this is the 50-yard line
	makeRect(xPos, yPos, 5, 5, color); // the ball

}

function makeRect(x, y, width, height, color){
	context.fillStyle = color;
	context.fillRect(x,y,width,height);
}

//============ DOM FUNCTIONALITY ======================================
var receiveButton = document.getElementById("kickoff");
var runMiddleButton = document.getElementById("runMiddle");
var runLeftButton =	document.getElementById("runLeft");
var runRightButton = document.getElementById("runRight");
var	passShortButton = document.getElementById("passShort");
var	passMediumButton = document.getElementById("passMedium");
var	passLongButton = document.getElementById("passLong");
var fgButton =	document.getElementById("fieldgoal");
var puntButton = document.getElementById("puntball");
var kickButton = document.getElementById("postScore");
var runDefenseButton = document.getElementById("rundefense");
var passDefenseButton = document.getElementById("passdefense");
var resetButton = document.getElementById("new");

var outcome = document.getElementById('playOutcome');
var downs = document.getElementById('currentDown');
var ytg = document.getElementById('currentYTG');
var fP = document.getElementById('fieldPosition');

var timeleft = document.getElementById('timeleft');
timeleft.innerHTML = 'CLOCK';

var p1points = document.getElementById('p1score');
p1points.innerHTML = p1Score;

var p2points = document.getElementById('p2score');
p2points.innerHTML = p2Score;

var passAttempts = document.getElementById('attempts');
passAttempts.innerHTML = 'Attempts: ' + passes;

var passCompletions = document.getElementById('completions');
passCompletions.innerHTML = 'Completions: ' + completions;

var yardsPassed = document.getElementById('yardsThrown');
yardsPassed.innerHTML = 'Yards: ' + yardsThrown;

var tdsThrown = document.getElementById('tdsThrown');
tdsThrown.innerHTML = 'TD: ' + passTD;

var intThrown = document.getElementById('intThrown');
intThrown.innerHTML = 'INT: ' + intsThrown;

var sacked = document.getElementById('sacked');
sacked.innerHTML = 'Sacks: ' + numSacks;

var rushAttempts = document.getElementById('rushAttempts');
rushAttempts.innerHTML = 'Attempts: ' + rushes;

var rushYards = document.getElementById('rushYards');
rushYards.innerHTML = 'Yards: ' + rushYardage;

var rushTD = document.getElementById('rushTD');
rushTD.innerHTML = 'Touchdowns: ' + tdRushed;

var lostFumble = document.getElementById('lostFumble');
lostFumble.innerHTML = 'Fumbles: ' + fumbles;

var fgAttempts = document.getElementById('fgAttempts');
fgAttempts.innerHTML = 'FG Attempts: ' + fgAttempted;

var fgMade = document.getElementById('fgMade');
fgMade.innerHTML = 'FG Made: ' + fgsMade;

var fgLong = document.getElementById('fgLong');
fgLong.innerHTML = 'Longest FG: ' + longestFG(fgs);

outcome.innerHTML = '';

var showHow = document.getElementById('howTo');

var modal = document.querySelector('.modal');
var button = document.querySelector('.close');

function changeModal(attribute){
	modal.style.visibility=attribute;
}

button.onclick= function(){
	changeModal('hidden');
};

howTo.onclick = function(){
	changeModal('visible');
};

function kickoff_clickHandler(event){
		clockCheck();
		runClock();
		playerHasBall = true;
		kickOff();
}

function runMiddle_clickHandler(event){
		clockCheck();
		runClock(1.25);
		playBook.run[0]();
}

function runLeft_clickHandler(event){
		clockCheck();
		runClock(1.25);
		playBook.run[1]();
}

function runRight_clickHandler(event){
		clockCheck();
		runClock(1.25);
		playBook.run[2]();
		console.log('button was clicked');
}

function passShort_clickHandler(event){
		clockCheck();
		runClock();
		playBook.pass[0]();
}

function passMedium_clickHandler(event){
		clockCheck();
		runClock();
		playBook.pass[1]();
}

function passLong_clickHandler(event){
		clockCheck();
		playBook.pass[2]();
}

function fg_clickHandler(event){
		clockCheck();
		runClock();
		playBook.fieldGoal();
}

function punt_clickHandler(event){
		clockCheck();
		runClock();
		playerHasBall = false;
		playBook.punt();
}

function postScore_clickHandler(event){
	clockCheck();
	runClock();
	playerHasBall = false;
	postScoreKick();
	computerHasBall();
}

function runDefense_clickHandler(event){
	clockCheck();
	runClock();
	computerOnOffense('run');
}

function passDefense_clickHandler(event){
	clockCheck();
	runClock();
	computerOnOffense('pass');
}

function resetGame_clickHandler(event){
	resetGame();
}

// ====================PLAYS TO SIMULATE GAME BEGIN HERE ==================================

startGame();

function randomNumber(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

// this function is used to populate the longest field goal within kicking stats
function longestFG(array) {
  return Math.max.apply(null, array);
}

// this function has computer kicking ball to player; game starts this way
function kickOff(){
	clockCheck();
	var kick = randomNumber(0,100);
		if(kick < 51){
			fieldPosition = 20;
		} else if (kick > 50 && kick < 80) {
			fieldPosition = randomNumber(15, 40);
		} else if (kick > 79 && kick < 90) {
			fieldPosition = randomNumber(0, 14);
		} else {
			fieldPosition = randomNumber(41, 100);
		}

	postKickStatus();
	moveBall();
}

function postKickStatus(){

	afterPlayerReceives();

	var playerReceive = [

		'You return the kickoff for ' +
		fieldPosition + ' yards',

		"The ball is on your " +
		fieldPosition + " yard line",

		"The ball is on the computer's " +
		(100 - fieldPosition) + " yard line",

		"Touchback"
	];

	down = 1;
	if(fieldPosition >= 100){
		scoring.kickReturnTD();
	}
	else if(fieldPosition >=0 && fieldPosition <= 90){
		yardsToGo = 10;
		if(fieldPosition === 20){
			outcome.innerHTML = playerReceive[3];
		} else {
		outcome.innerHTML = playerReceive[0];
		}
		if(fieldPosition <= 50){
				fP.innerHTML = playerReceive[1];
			} else {
				fP.innerHTML = playerReceive[2];
			}
		//console.log('clock: ' + clock + ', fieldPosition: ' + fieldPosition);

	} else {
		yardsToGo = 100 - fieldPosition;
		outcome.innerHTML = playerReceive[0];
		fP.innerHTML = playerReceive[2];
		//console.log('clock: ' + clock + ', fieldPosition: ' + fieldPosition);
	}
	currentYTG.innerHTML = yardsToGo + ' yards to go';
	downs.innerHTML = 'DOWN: ' + down;
	clockCheck();
}

// this function is to kick off to computer a/f player scores TD or FG

function postScoreKick(){
	removeBall();
	clockCheck();
	var x = randomNumber(1,15);

	if(x === 1){

		startGame();
		scoring.p2TD();
		down = 1;
		moveBall(-3); // set to negative to show ball in middle of end zone
		outcome.innerHTML = computerResults[42];
		console.log('computer returns kick for TD');
	}

	else if (x > 1 && x < 10){
		fieldPosition = 80;
		moveBall();
		computerHasBall();
		displayFP('cReturn');
		outcome.innerHTML = computerResults[43];
	}

	else if(x => 10 && x <= 15){

		fieldPosition = 100 - randomNumber(1,75);
		moveBall();
		computerHasBall();
		outcome.innerHTML = 'The ball was returned for ' + (100 - fieldPosition) + ' yards';
		displayFP('cReturn');
	}

}

//each play will take a certain range of time off the clock
function runClock(time){ // time parameter is set in case want to make certain plays run more time
	time = time || 1;
	clock -= Math.floor(randomNumber(10, 60) * time);
	min = Math.floor(clock/60);
	sec = clock % 60;
	if(sec < 10){sec = '0' + sec;}
	timeleft.innerHTML = min + ':' + sec;
}

function nonFumRushYards(){
	rushYardage += yardsGained;
	nonFumbleRun();
}

function nonTOPass(){
	yardsThrown += yardsGained;
	completions++;
	nonINTPass();
}

// playBook is an object of 8 offensive plays user can execute

playBook = {

	run: [
		// this is the goaline run for higher chance of short-yardage gains, but risk of fumble higher
		function middle(){

			rushes++;
			var defense = randomNumber(1,6);

			switch(defense){

				case 1:
				if(randomNumber(0,10) > 8){
					playerFumble();
					break;
				} else {yardsGained = randomNumber(0,3) * -1;}
				nonFumRushYards();
				break;

				case 2:
				if(randomNumber(0,10) > 9){
					playerFumble();
					break;
				} else {yardsGained = 0;}
				nonFumRushYards();
				break;

				case 3:
				case 4:
				case 5:
				yardsGained = randomNumber(1,3);
				nonFumRushYards();
				break;

				default:
				if(randomNumber(0,10) === 10){
					yardsGained = randomNumber(3,35);
				} else {yardsGained = randomNumber(1, 10);}
				nonFumRushYards();
				break;
			}

		},

		// this is the off-tackle run
		function left(){

			rushes++;
			var defense = randomNumber(1,6);

			switch(defense){

				case 1:
				if(randomNumber(0,10) > 9){
					playerFumble();
					break;
				} else {yardsGained = 0;}
				nonFumRushYards();
				break;

				case 2:
				if(randomNumber(0,10) > 9){
					playerFumble();
					break;
				} else {yardsGained = randomNumber(0,3) * -1;}
				nonFumRushYards();
				break;

				case 3:
				yardsGained = randomNumber(0,7);
				nonFumRushYards();
				break;

				case 4:
				case 5:
				yardsGained = randomNumber(0,10);
				nonFumRushYards();
				break;

				default:
				if(randomNumber(0,10) === 10){
					yardsGained = randomNumber(10,100);
				} else {yardsGained = randomNumber(5, 12);}
				nonFumRushYards();
				break;

			}

		},
		// this is the toss run play; risk higher for loss, but higher for big play
		function right(){

			rushes++;
			var defense = randomNumber(1,6);

			switch(defense){

				case 1:
				if(randomNumber(0,10) > 9){
					playerFumble();
					break;
				} else {yardsGained = 0;}
				nonFumRushYards();
				break;

				case 2:
				if(randomNumber(0,10) > 9){
					playerFumble();
					break;
				} else {yardsGained = randomNumber(3,6) * -1;}
				nonFumRushYards();
				break;

				case 3:
				yardsGained = randomNumber(0,7);
				nonFumRushYards();
				break;

				case 4:
				case 5:
				yardsGained = randomNumber(2,12);
				nonFumRushYards();
				break;

				default:
				if(randomNumber(0,10) === 10){
					yardsGained = randomNumber(10,100);
				} else {yardsGained = randomNumber(5, 15);}
				nonFumRushYards();
				break;

			}

		}

	],

	pass: [
		// this is the screen pass
		function short(){

			passes++;
			var defense = randomNumber(1,6);

			switch(defense){

				case 1:
				if(randomNumber(1,10) > 9){
					playerINT();
					break;
				} else {yardsGained = randomNumber(0,5) * -1;}
				nonINTPass('sack');
				break;

				case 2:
				case 3:
				yardsGained = 0;
				nonINTPass('incomplete');
				break;

				case 4:
				case 5:
				yardsGained = randomNumber(0, 7);
				nonTOPass();
				break;

				case 6:
				if(randomNumber(1,10) < 8){
					yardsGained = randomNumber(0, 35)
				} else {yardsGained = randomNumber(0, 100)};
				nonTOPass();
				break;

			}
		},
		// this is the normal pass play
		function medium(){

			passes++;
			var defense = randomNumber(1,6);

			switch(defense){

				case 1:
				if(randomNumber(1,10) > 8){
					playerINT();
					break;
				} else {yardsGained = randomNumber(0,7) * -1;}
				nonINTPass('sack');
				break;

				case 2:
				case 3:
				yardsGained = 0;
				nonINTPass('incomplete');
				break;

				case 4:
				case 5:
				yardsGained = randomNumber(5, 15);
				nonTOPass();
				break;

				case 6:
				if(randomNumber(1,10) < 7){
					yardsGained = randomNumber(5, 45);
				} else {yardsGained = randomNumber(15, 100);}
				nonTOPass();
				break;
			}
		},

		function long(){

			passes++;
			var defense = randomNumber(1,10);

			switch(defense){

				case 1:
				if(randomNumber(1,10) > 7){
					playerINT();
					break;
				} else {yardsGained = randomNumber(0,10) * -1;}
				nonINTPass('sack');
				break;

				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				yardsGained = 0;
				nonINTPass('incomplete');
				break;

				case 8:
				case 9:
				yardsGained = randomNumber(20, 45);
				nonTOPass();
				break;

				case 10:
				if(randomNumber(1,10) < 8){
					yardsGained = randomNumber(30, 50);
				} else {yardsGained = randomNumber(50, 100);}
				nonTOPass();
				break;
			}
		}

	],

	fieldGoal: function(){

		fgAttempted++;

		var x = randomNumber(1,100);

		if(fieldPosition > 79 && x < 98){
			currentFP = fieldPosition;
			scoring.p1FG();
		}

		else if(fieldPosition > 69 && fieldPosition < 80 && x < 76){
			currentFP = fieldPosition;
			scoring.p1FG();
		}

		else if(fieldPosition > 59 && fieldPosition < 70 && x < 70){
			currentFP = fieldPosition;
			scoring.p1FG();
		}

		else if(fieldPosition > 49 && fieldPosition < 60 && x < 51){
			currentFP = fieldPosition;
			scoring.p1FG();
		}

		else{
			playerHasBall = false;
			if(fieldPosition < 50){
				fP.innerHTML = "Computer takes over on your " + fieldPosition + " yard line";
			}
			else{
				fP.innerHTML = 'Computer takes over on its ' + (100 - fieldPosition) + ' yard line';
			}
			//console.log('missed FG, ball on player side');
			outcome.innerHTML = displayResults.playerResults[2];
			computerHasBall();
		}

		updateGameStats();
	},

	punt: function(){
		playerHasBall = false;
		fP.innerHTML = '';
		clockCheck();
		fieldPosition += (randomNumber(40,60) -
 					randomNumber(0, 15));

		//console.log(fieldPosition);

		if(fieldPosition >= 0 && fieldPosition < 100){
			//console.log('player punt');
			if(fieldPosition > 50){
				outcome.innerHTML = 'The computer returned your punt to its ' +
								(100 - fieldPosition) + ' yard line';
			} else {
				outcome.innerHTML = 'The computer returned the punt to your ' +
								fieldPosition + ' yard line';
			}
			moveBall();
			computerHasBall();


		}
		else if(fieldPosition > 100){
			fieldPosition = 80;
			moveBall();
			//console.log(fieldPosition + ' computer punts, touchback');
			outcome.innerHTML = 'You punted into the end zone. Ball placed on the 20 yard line';
			computerHasBall();
		}

		else if(fieldPosition < 0){
			//console.log(fieldPosition);
			moveBall();
			scoring.p2TD(42);
		}
	}

};

function nonINTPass(type){
	updateGameStats();
	currentFP = fieldPosition;
	fieldPosition += yardsGained;
	yardsToGo -= yardsGained;
	currentYTG.innerHTML = yardsToGo + displayResults.playerResults[0];
	moveBall();

	if(type === 'sack'){
		statusCheck('sack');
	} else if (type === 'incomplete') {
		statusCheck('incomplete');
	} else {
		statusCheck('pass');
	}

	downsCheck();
	/*console.log('clock: ' + clock + ', yards gained: ' + yardsGained);
	console.log('down: ' + down + ', yards to go: ' + yardsToGo);
	console.log('Ball is on the: ' + fieldPosition + ' yard line');*/
}

function nonFumbleRun(){
	updateGameStats();
	currentFP = fieldPosition;
	fieldPosition += yardsGained;
	yardsToGo -= yardsGained;
	currentYTG.innerHTML = yardsToGo + displayResults.playerResults[0];
	moveBall();
	statusCheck('run');
	downsCheck();
	/*console.log('clock: ' + clock + ', yards gained: ' + yardsGained);
	console.log('down: ' + down + ', yards to go: ' + yardsToGo);
	console.log('Ball is on the: ' + fieldPosition + ' yard line');*/
}

function playerFumble(){
	playerHasBall = false;
	fumbles++;
	updateGameStats();
	clockCheck();
	outcome.innerHTML = displayResults.playerResults[5];
	playerTOFieldPosDisplay();
	moveBall();
	computerHasBall();
	//console.log('Player 1 fumbles, Computer recovers!');
}

function playerINT(){
		playerHasBall = false;
		updateGameStats();
		intsThrown++;
		updateGameStats();
		clockCheck();
		outcome.innerHTML = displayResults.playerResults[6];
		playerTOFieldPosDisplay();
		moveBall();
		computerHasBall();
		//console.log('INTERCEPTION!');
}

function playerTOFieldPosDisplay(){
	if(fieldPosition <= 50){
		fP.innerHTML = "Computer takes over on your " +
			fieldPosition + " yard line";
	} else {
		fP.innerHTML = "Computer takes over at its "
			+ (100 - fieldPosition) + " yard line";
	}
}

function clockCheck(){
	if(clock < 1){

		var finalResult =[

			'You Win! ',
			'TIE GAME: ',
			'Computer Wins! '
		];

		endGame();
		removeBall();
		clearDownYTG();
		displayFP('remove');
		console.log('GAME OVER!');
		timeleft.innerHTML = '00:00';

		if(p1Score > p2Score){
			fP.innerHTML = finalResult[0] + p1Score + ' - ' + p2Score + '<br /> GAME OVER';
		} else if(p1Score === p2Score) {
			fP.innerHTML = finalResult[1] + p1Score + ' - ' + p2Score + '<br /> GAME OVER';
		} else {
			fP.innerHTML = finalResult[2] + p2Score + ' - ' + p1Score + '<br /> GAME OVER';
		}

	}
}

function statusCheck(type){

	if(fieldPosition > 99){

		if(type === 'pass'){passTD++;}
		if(type === 'run'){tdRushed++;}
		clearDownYTG();
		scoring.p1TD();
	}

	if(fieldPosition < 0){
		clearDownYTG();
		scoring.p2Safety();
		displayFP('remove');
	}

	if(fieldPosition >=0 && fieldPosition < 100){
		ballFieldPositionPlacement();

		if(yardsGained >= 0){
			if(type === 'incomplete'){
				outcome.innerHTML = displayResults.playerResults[7];
				//console.log('incomplete pass');
			}
			else {
				outcome.innerHTML = 'A gain of ' + yardsGained + ' yards on the play';
			}
		}
		else {

			if(type === 'sack'){
				numSacks++;
				outcome.innerHTML = 'QB SACK! A loss of ' + -yardsGained + ' yards on the play';
			}

			else {
				outcome.innerHTML = 'A loss of ' + -yardsGained + ' yards on the play';
			}

		}

		clockCheck();
		updateGameStats();
	}
}

function downsCheck(){
		if(yardsToGo > 0){
			++down;
			downs.innerHTML = 'DOWN: ' + down;
			clockCheck();
			if(down > 4){
				playerHasBall = false;
				computerHasBall();
				outcome.innerHTML = displayResults.playerResults[1];
				playerTOFieldPosDisplay();
				down = 1;
				yardsToGo = 10;
				downs.innerHTML = 'DOWN: ' + down;
				clockCheck();
				/*console.log('Computer takes possession on the ' + fieldPosition + ' yard line');
				console.log('Turnover on downs!');*/
			}
		}

		else {
			down = 1;
			yardsToGo = 10;
			downs.innerHTML = 'DOWN: ' + down;
			currentYTG.innerHTML = yardsToGo + displayResults.playerResults[0];
			clockCheck();
		}

		if(fieldPosition > 99){
			clearDownYTG();
			clockCheck();
		}
}

var scoring = {

	p1TD: function(){
		p1ScoreUpdate(7, 3);
		updateGameStats();
		//console.log((100 - currentFP) + ' P1 touchdown!!!!');
	},
	p2TD: function(display){
		p2ScoreUpdate(7, display, startGame);
		computerScoreBall();
		//console.log('P2 touchdown!!!!');
	},
	p1FG: function(){
		fgsMade++;
		fgs.push((100 - currentFP) + 10);
		removeBall();
		p1ScoreUpdate(3, 4);
		updateGameStats();
		//console.log('P1 fieldgoal!!!!');
	},
	p2FG: function(display){
		p2ScoreUpdate(3, display, startGame);
		computerScoreBall();
		//console.log('P2 fieldgoal!!!!');
	},
	p2Safety: function(display){
		clearDownYTG();
		p2ScoreUpdate(2, display, afterPlayerScore);
		computerScoreBall();
		//console.log('P2 safety!!!!');
	},

	kickReturnTD: function(){
		afterPlayerScore();
		p1Score += score;
		p1points.innerHTML = p1Score;
		outcome.innerHTML = displayResults.playerResults[displayNum];
		displayFP('remove');
		clearDownYTG();
		clockCheck();
		removeBall();
		//console.log('Player kick return touchdown!!!!');
	},

	p1Safety: function(){
		p1ScoreUpdate(2, 9);
		updateGameStats();
		//console.log('P1 Safety!');
	}
};

function postP1ScoreActions(callback){
	displayFP('remove');
	clockCheck();
	callback();
}

function p1ScoreUpdate(score, displayNum){
	p1Score += score;
	p1points.innerHTML = p1Score;
	if(score === 3){
		outcome.innerHTML = ((100 - currentFP) + 10)  +
		displayResults.playerResults[displayNum];
		postP1ScoreActions(afterPlayerScore);
	} else if(score === 7){
		outcome.innerHTML = (100 - currentFP) +
		displayResults.playerResults[displayNum];
		postP1ScoreActions(afterPlayerScore);
	}
	else if(score ===2){
		outcome.innerHTML = displayResults.playerResults[displayNum];
		postP1ScoreActions(startGame);
	}
}

function p2ScoreUpdate(score, displayNum, callback){

	callback();
	clearDownYTG();
	p2Score += score;
	p2points.innerHTML = p2Score;
	outcome.innerHTML = computerResults[displayNum];
	displayFP('remove');
	moveBall(0 - score);
	clockCheck();
}

function ballFieldPositionPlacement(){
	if(fieldPosition <= 50){
				fP.innerHTML = "The ball is on your " +
				fieldPosition + " yard line";
			} else {
				fP.innerHTML = "The ball is on the computer's "
				+ (100 - fieldPosition) + " yard line";
			}
}

function displayFP(display){
	var compSide = "The ball is on the computer's ";
	var playerSide = "The ball is on your ";
	var yardline = " yard line";

	if(display === 'remove'){
		fP.innerHTML = '';
	}

	else if(display === 'cReturn'){
		ballFieldPositionPlacement();
	}

	else if(display === 'cTurnOver'){
		if(fieldPosition < 51){
			fP.innerHTML = playerSide + fieldPosition + yardline;
		}

		else if(fieldPosition > 99){
			fieldPosition = 20;
			fP.innerHTML = 'Turnover in the endzone, the ball is placed on your 20-yard line';
		}

		else {
			fP.innerHTML = compSide + (100 - fieldPosition) + yardline;
		}
	}

	else {
		if(fieldPosition < 51){
			fP.innerHTML = playerSide + fieldPosition + yardline;
		}

		else {
			fP.innerHTML = compSide + (100 - fieldPosition) + yardline;
		}

	}
}

function clearDownYTG(){
	downs.innerHTML = '';
	ytg.innerHTML = '';
}


function updateGameStats(){

	passAttempts.innerHTML = 'Attempts: ' + passes;
	passCompletions.innerHTML = 'Completions: ' + completions;
	yardsPassed.innerHTML = 'Yards: ' + yardsThrown;
	tdsThrown.innerHTML = 'TD: ' + passTD;
	intThrown.innerHTML = 'INT: ' + intsThrown;
	sacked.innerHTML = 'Sacks: ' + numSacks;
	rushAttempts.innerHTML = 'Attempts: ' + rushes;
	rushYards.innerHTML = 'Yards: ' + rushYardage;
	rushTD.innerHTML = 'Touchdowns: ' + tdRushed;
	lostFumble.innerHTML = 'Fumbles: ' + fumbles;
	fgAttempts.innerHTML = 'FG Attempts: ' + fgAttempted;
	fgMade.innerHTML = 'FG Made: ' + fgsMade;
	fgLong.innerHTML = 'Longest FG: ' + longestFG(fgs);
}


//===========================================================
// fxns to enable/disable button control given game situation

function setButtonStatus(receive, runM, runL, runR, passS, passM,
		           passL, fG, punt, kickoff, computerSim){

	receiveButton.disabled = receive;
	runMiddleButton.disabled = runM;
	runLeftButton.disabled = runL;
	runRightButton.disabled = runR;
	passShortButton.disabled = passS;
	passMediumButton.disabled = passM;
	passLongButton.disabled = passL;
	fgButton.disabled = fG;
	puntButton.disabled = punt;
	kickButton.disabled = kickoff;
	runDefenseButton.disabled = computerSim;
	passDefenseButton.disabled = computerSim;

}

function setButtonHighlight(receive, runM, runL, runR, passS, passM,
					passL, fG, punt, kickoff, computerSim){

	receiveButton.style.border = receive;
	runMiddleButton.style.border = runM;
	runLeftButton.style.border = runL;
	runRightButton.style.border = runR;
	passShortButton.style.border = passS;
	passMediumButton.style.border = passM;
	passLongButton.style.border = passL;
	fgButton.style.border = fG;
	puntButton.style.border = punt;
	kickButton.style.border = kickoff;
	runDefenseButton.style.border = computerSim;
	passDefenseButton.style.border = computerSim;

}

function startGame(){
	clockCheck();
	setButtonStatus(false, true, true, true, true, true,
					true, true, true, true, true);

	setButtonHighlight(highLight, 'none', 'none','none','none','none',
					'none','none','none','none','none');
}

function afterPlayerReceives(){
	playerHasBall = true;
	clockCheck();
	down = 1;
	downs.innerHTML = 'DOWN: ' + down;
	yardsToGo = '10';
	currentYTG.innerHTML = yardsToGo + ' yards to go';
	setButtonStatus(true, false, false, false, false, false,
					false, false, false, true, true);

	setButtonHighlight('none', highLight, highLight,highLight,
					highLight,highLight,highLight,highLight,
					highLight,'none','none');

}

function afterPlayerScore(){

	clearDownYTG();
	clockCheck();

	setButtonStatus(true, true, true, true, true, true, true,
		true, true, false, true);

	setButtonHighlight('none', 'none', 'none','none','none','none',
					'none','none','none',highLight,'none');
	fP.innerHTML = '';

}

function computerHasBall(){
	playerHasBall = false;
	drawEverything('red');
	setButtonStatus(true, true, true, true, true, true, true,
		true, true, true, false);

	setButtonHighlight('none', 'none', 'none','none','none','none',
					'none','none','none','none',highLight);
	clockCheck();
	down = 1;
	yardsToGo = 10;
	downs.innerHTML = 'DOWN: ' + down;
	ytg.innerHTML = yardsToGo + ' yards to go';
	computerOnOffense();
}

function resetGame(){

	fieldPosition = 0;
	currentFP = 0;
	yardsToGo = 0;
	yardsGained = 0;
	down = 0;
	p1Score = 0;
	p2Score = 0;
	clock = 3600;
	downs.innerHTML = '';
	ytg.innerHTML = '';
	timeleft.innerHTML = 'CLOCK';
	p1points.innerHTML = '0';
	p2points.innerHTML = '0';
	outcome.innerHTML = '';
	fP.innerHTML = '';
	startGame();
	moveBall();

	passes = 0;
	completions = 0;
	yardsThrown = 0;
	passTD = 0;
	rushes = 0;
	rushYardage = 0;
	intsThrown = 0;
	numSacks = 0;
	tdRushed = 0;
	fumbles = 0;
	fgAttempted = 0;
	fgsMade = 0;
	fgs = [0];

	passAttempts.innerHTML = 'Attempts: 0';
	passCompletions.innerHTML = 'Completions: 0';
	yardsPassed.innerHTML = 'Yards: 0';
	tdsThrown.innerHTML = 'TD: 0';
	intThrown.innerHTML = 'INT: 0';
	sacked.innerHTML = 'Sacks: 0';
	rushAttempts.innerHTML = 'Attempts: 0';
	rushYards.innerHTML = 'Yards: 0';
	rushTD.innerHTML = 'Touchdowns: 0';
	lostFumble.innerHTML = 'Fumbles: 0';
	fgAttempts.innerHTML = 'FG Attempts: 0';
	fgMade.innerHTML = 'FG Made: 0';
	fgLong.innerHTML = 'Longest FG: 0';
}

function disableButtons(){
	setButtonStatus(true, true, true, true, true, true,
					true, true, true, true, true);

	setButtonHighlight('none', 'none', 'none','none','none','none',
					'none','none','none','none','none');
}

function reEnableButtons(){

	setButtonStatus(true, true, true, true, true, true, true,
		true, true, true, false);

	setButtonHighlight('none', 'none', 'none','none','none','none',
					'none','none','none','none',highLight);
}

function endGame(){

	clearDownYTG();
	disableButtons();

}

//================ COMPUTER OFFENSE FUNCTIONS==================================

function computerTurnOver(type){
	playerHasBall = true;
	disableButtons();
	clockCheck();
	if(clock <= 0){return;}
	down = 1;

	switch(type){

		case 'fumble':
		fieldPosition -= randomNumber(1,49);
		if(fieldPosition < 0){
				outcome.innerHTML = computerResults[randomNumber(0,1)]; // fumble recovered in end zone; touchback
				displayFP('remove');
				window.setTimeout(function(){
					outcome.innerHTML = computerResults[2];
					fieldPosition = 20;
					displayFP();
					moveBall();
					afterPlayerReceives();
				},delay);
			}
		else {
			disableButtons();
			outcome.innerHTML = computerResults[randomNumber(27,33)];
			displayFP('remove');
			window.setTimeout(function(){
					outcome.innerHTML = computerResults[3];
					displayFP();
					moveBall();
					afterPlayerReceives();
				},delay);
		}
		break;

		case 'interception':
		fieldPosition -= randomNumber(1,49);
		if(fieldPosition < 0){
			outcome.innerHTML = computerResults[4]; // interception in the end zone; touchback
			displayFP('remove');
			window.setTimeout(function(){
					outcome.innerHTML = computerResults[5];
					fieldPosition = 20;
					displayFP();
					moveBall();
					afterPlayerReceives();
				},delay);
		}
		else {
			outcome.innerHTML = computerResults[randomNumber(6,10)];
			displayFP('remove');
			window.setTimeout(function(){
					outcome.innerHTML = computerResults[14];
					displayFP();
					moveBall();
					afterPlayerReceives();
				},delay);
		}
		break;

		case 'missedFG':
		outcome.innerHTML = computerResults[15];
		displayFP('remove');
		window.setTimeout(function(){
					outcome.innerHTML = computerResults[16]; // kick is no good
					displayFP();
					moveBall();
					afterPlayerReceives();
				},delay);
		break;

		default:
		outcome.innerHTML = computerResults[20];
		displayFP('remove');
		window.setTimeout(function(){
					outcome.innerHTML = computerResults[randomNumber(21,22)];
					displayFP();
					moveBall();
					afterPlayerReceives();
				},delay);
		break;
	}
}

function computerSimulation(firstOutcome, secondOutcome){

	outcome.innerHTML = firstOutcome;
	disableButtons();
	window.setTimeout(function(){
		outcome.innerHTML = secondOutcome;
		computerDownsCheck();
		moveBall();
		ballFieldPositionPlacement();
		reEnableButtons();
	}, delay);

}

function computerTDSimulation(firstOutcome, displayNumber){

	outcome.innerHTML = firstOutcome;
	disableButtons();
	window.setTimeout(function(){
		scoring.p2TD(displayNumber);
		clearDownYTG();
	}, delay);

}

function computerStatusCheck(status, compPlay){

	if(fieldPosition < 0){

		if(compPlay === 'pass'){
			computerTDSimulation(computerResults[randomNumber(6,10)], 40);
		}
		else if(compPlay === 'run'){
			computerTDSimulation(computerResults[randomNumber(27,33)], 41);
		}

	}

	if(fieldPosition >= 100){
		clearDownYTG();
		scoring.p1Safety();
		displayFP('remove');
	}

	if(fieldPosition >=0 && fieldPosition < 100){

		if(yardsGained >= 0){
			if(status === 'incomplete'){
				computerSimulation(computerResults[randomNumber(6,10)],
					computerResults[randomNumber(23, 26)]);
			}
			else {
				if(compPlay === 'run'){
					if(yardsGained === 0){
						computerSimulation(computerResults[randomNumber(27,33)],
							computerResults[36] + ', gains nothing');
					}
					else {
						computerSimulation(computerResults[randomNumber(27,33)],
							yardsGained + ' yards gained on the run');
					}
				}

				else if(compPlay === 'pass'){
					if(yardsGained === 0){
						computerSimulation(computerResults[randomNumber(6, 10)],
							computerResults[randomNumber(23, 26)]);
					}
					else{
						computerSimulation(computerResults[randomNumber(6, 10)],
							'A catch for ' + yardsGained + ' yards');
					}
				}
			}
		}
		else {

			if(status === 'sack'){
				computerSimulation(computerResults[6],
					computerResults[randomNumber(11,13)] + ' Loss of ' + -yardsGained + ' yards');
			}

			else {
				computerSimulation(computerResults[randomNumber(27,31)],
					computerResults[randomNumber(34,36)] + ' Loss of ' + -yardsGained + ' yards');
			}
		}
		clockCheck();
	}
}


function computerDownsCheck(){

	if(yardsToGo > 0){
			++down;
			downs.innerHTML = 'DOWN: ' + down;
			currentYTG.innerHTML = yardsToGo + displayResults.playerResults[0];
			clockCheck();
			if(down > 4){
				computerTurnOver();
				outcome.innerHTML = displayResults.playerResults[1];
				if (fieldPosition <= 50){
					fP.innerHTML = "You take over on the computer's " + fieldPosition + " yard line";
				}
				else {
					fP.innerHTML = 'You take over on your ' + (100 - fieldPosition) + ' yard line';
				}
				down = 1;
				yardsToGo = 10;
				downs.innerHTML = 'DOWN: ' + down;
				clockCheck();
			}

	}

	else if(yardsToGo <= 0){
		down = 1;
		yardsToGo = 10;
		downs.innerHTML = 'DOWN: ' + down;
		currentYTG.innerHTML = yardsToGo + displayResults.playerResults[0];
		clockCheck();
	}
}


function computerOnOffense(defense){  //defense = 'run' || 'pass'
	//console.log('user ' + defense + ' play executed ' + 'field position is ' + fieldPosition);
	var x = randomNumber(1,100);

	if(down === 1 || down === 2){

		if(x < 60){computerRun(defense);}
		else {computerPass(defense);}
	}

	else if (down === 3 && yardsToGo === 1){

		if(x < 76){computerRun(defense);}
		else{computerPass(defense);}
	}

	else if (down === 3 && yardsToGo > 1 && yardsToGo < 5){
		if(x < 50){computerRun(defense);}
		else{computerPass(defense);}
	}

	else if(down === 3 && yardsToGo > 4 && yardsToGo < 8){
		if(x < 36){computerRun(defense);}
		else {computerPass(defense);}
	}

	else if(down === 3 && yardsToGo > 7)
		if(x < 15){computerRun(defense);}
		else{computerPass(defense);}

	else if(down === 4 && fieldPosition > 50){

		disableButtons();
		computerPunt();

	}

	else if(down === 4 && fieldPosition > 40 && fieldPosition < 51){
		if(x < 46){disableButtons(); computerFG();}
		else{disableButtons();computerPunt();}
	}

	else if(down === 4 && fieldPosition < 41){
		if(fieldPosition > 69 && yardsToGo === 1){
			if(x < 76){disableButtons();computerFG();}
			else{computerRun(defense);}
		}
		else{disableButtons(); computerFG();}

	}
}

function computerRun(defense){

	var z = randomNumber(1,100);

	if(defense === 'run' && z < 6){computerTurnOver('fumble');}
	else if(defense === 'run' && z > 5 && z < 15){
		yardsGained = randomNumber(0,7) * -1;
		computerYards('normal', 'run');
	}
	else if(defense === 'run' && z > 14 && z < 60){
		yardsGained = 0;
		computerYards('normal', 'run');
	}
	else if(defense === 'run' && z > 59){
		computerYards('normal', 'run');
	}

	else if(defense === 'pass' && z === 1){computerTurnOver('fumble');}
	else if(defense === 'pass' && z > 1 && z < 11){
		yardsGained = randomNumber(0,4) * -1;
		computerYards('normal', 'run');
	}
	else if(defense === 'pass' && z > 10 && z < 40){
		yardsGained = 0;
		computerYards('normal', 'run');
	}
	else if(defense === 'pass' && z > 39){
		computerYards('normal', 'run');
	}
}

function computerPass(defense){

	var z = randomNumber(1,100);

	if(defense === 'pass' && z < 6){computerTurnOver('interception');}
	else if(defense === 'pass' && z > 5 && z < 15){
		yardsGained = randomNumber(0,10) * -1;
		computerYards('sack', 'pass');
	}
	else if(defense === 'pass' && z > 14 && z < 60){
		yardsGained = 0;
		computerYards('incomplete', 'pass');
	}
	else if(defense === 'pass' && z > 59){
		yardsGained = randomNumber(1,15);
		computerYards('normal', 'pass');
	}

	else if(defense === 'run' && z === 1){computerTurnOver('interception');}
	else if(defense === 'run' && z > 1 && z < 11){computerYards('sack', 'pass');}
	else if(defense === 'run' && z > 10 && z < 40){
		yardsGained = 0;
		computerYards('incomplete', 'pass');
	}
	else if(defense === 'run' && z > 39){
		if(randomNumber(1,100) > 89){yardsGained = randomNumber(5,100);}
		else{yardsGained = randomNumber(5,50);}
		computerYards('normal', 'pass');
	}
}

// play = run || pass || incomplete || sack; used to indicate in statuscheck what kind of display for yards gained on the run play or pass play
function computerYards(status, compPlay){

	currentFP = fieldPosition;
	fieldPosition -= yardsGained;
	yardsToGo -= yardsGained;
	computerStatusCheck(status, compPlay);
}


function computerFG(){

	disableButtons();
	var x = randomNumber(1,100);
	if(fieldPosition < 31 && x < 91){
		outcome.innerHTML = computerResults[15];
		window.setTimeout(function(){
			scoring.p2FG(19)}, delay);
		clockCheck();
	}
	else if(fieldPosition > 30 && fieldPosition < 41 && x < 76){
		outcome.innerHTML = computerResults[15];
		window.setTimeout(function(){
			scoring.p2FG(19)}, delay);
		clockCheck();
	}
	else if(fieldPosition > 40 && fieldPosition < 50 && x < 16){
		outcome.innerHTML = computerResults[15];
		window.setTimeout(function(){
			scoring.p2FG(19)}, delay);
		clockCheck();
	}
	else{
		playerHasBall = true;
		computerTurnOver('missedFG');
		clockCheck();
	}

}

function computerPuntActions(callback){

	moveBall();
	displayFP('remove');
	callback();
}

function computerPuntSimulation(secondOutcome){

	outcome.innerHTML = computerResults[37];
	window.setTimeout(function(){
		outcome.innerHTML = secondOutcome;
		computerPuntActions(afterPlayerReceives);
		clockCheck();
	}, delay);
}

function computerPunt(){
	playerHasBall = true;
	disableButtons()
	clockCheck();

	fieldPosition -= (randomNumber(40,60) +
 					randomNumber(0, 15));

	if(fieldPosition >= 0 && fieldPosition < 51){
		computerPuntSimulation('You returned the punt to your ' +
							fieldPosition + ' yard line');
	}

	if(fieldPosition > 50){
		computerPuntSimulation("You returned the punt to the computer's " +
							(100 - fieldPosition) + " yard line");
	}

	else if(fieldPosition < 0){
		fieldPosition = 20;
		computerPuntSimulation(computerResults[randomNumber(38,39)]);
	}

	else if(fieldPosition > 100){
		outcome.innerHTML = computerResults[37];
		window.setTimeout(function(){
			scoring.kickReturnTD();
			computerPuntActions(afterPlayerScore);
			clockCheck();
		}, delay);
	}

}

function computerSacked(){

	yardsGained = randomNumber(0,10) * -1;
	currentFP = fieldPosition;
	fieldPosition -= yardsGained;
	yardsToGo -= yardsGained;
	moveBall();
	computerStatusCheck('sack', 'pass');
	computerDownsCheck();
	currentYTG.innerHTML = yardsToGo + displayResults.playerResults[0];
}

