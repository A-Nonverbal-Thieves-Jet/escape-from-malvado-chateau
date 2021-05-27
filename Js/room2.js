'use strict'

//--------------- Global Vars -----------------//
roomText = "An ominous living room waits before you. The inky darkness settling thick on the walls, and edges of the room. Figures peel themselves from the shadows, blocking your path";

nextRoom = "room3.html";
const room2Div = document.getElementById('room2');
const hall = '../images/hall.png';
const room = 'room2';
const hintArray = ['hint1', 'hint2','hint3','hint4'];

let shiftText = 'Another room escaped, another dimly lit corridor. The darkness deepens until you can barely keep track of the direction you walk.'

let lightText = [
  `You attempt turning the ceiling light on. It clicks, but the switch is now broken and can't light the bulb.`,
  `You carefully unscrew the light bulb, being careful not to drop it. The darkness in the room appears to intensify.`,
  `You've already taken the light bulb.`
];

let lampText = [
  `You attempt to use the lamp, but the bulb is broken. You think to yourself - "Is there another bulb?"`,
  `You replace the light bulb and light floods into the living room. The shadows flash out of existence, clearing your path ahead.`,
  `The light continues to shine dimly, enough to keep the darkness at bay, allowing you to escape this room.`
];

let screenText = [
  `The screen flickers, you swear you see a face blink on the screen for a second, but the screen fizzles out and shuts off.`,
  `The screen seems to no longer function.`
];

let chessText = [
  `The pieces seem carefully arranged on the board, leaving signs of an unfinished match, but now is not the time for playing chess.`
];

let shadow1Text = [
  `The Shadow lingers around, seemingly harmless, but it wont let you leave.`,
  `The shadow can no longer impede your escape.`
];

let shadow2Text = [
  `The shadow distorts as you approach it, aggitated by your proximity. You cautiously back away.`,
  `The shadow can no longer impede your escape.`
];

let escapeText = [
  `You attempt to escape the room, but the shadows block your path. The looming shadows make you think - "It's too dark in this room."`,
  `The lamp's light flashes the darkness away, the path cleared ahead for you. You take your exit`
]

const lightDiv = document.getElementById('light');
const lampDiv = document.getElementById('lamp');
const screenDiv= document.getElementById('screen');
const chessDiv = document.getElementById('chess');
const shadow1Div = document.getElementById('shadow1');
const shadow2Div = document.getElementById('shadow2');
const escapeDiv = document.getElementById('escape');

//----------- Functions ------------//
function clickLight() {
  if (checkInventory('Lightbulb')) {
    displayText(roomObjects[0].text[2]);
  } else if (roomObjects[1].status1 == true) {
    displayText(roomObjects[0].text[1]);
    addItem(lightbulb);
  } else {
    displayText(roomObjects[0].text[0]);
  } 
}

function clickLamp() {
  if (roomObjects[1].status2 == true) {
    displayText(roomObjects[1].text[2]);
  } else if (checkInventory('Lightbulb')) {
    displayText(roomObjects[1].text[1]);
    roomObjects[1].status2 = true;
    roomObjects[4].status1 = true;
    roomObjects[5].status1 = true;
    roomObjects[6].status1 = true;
    lightbulb.used = true;
  } else {
    displayText(roomObjects[1].text[0]);
    roomObjects[1].status1 = true;
  }
}

function clickScreen() {
  if (roomObjects[2].status1 == false) {
    displayText(roomObjects[2].text[0]);
    roomObjects[1].status1 = true;
  } else {
    displayText(roomObjects[2].text[1]);
  }
}

function clickChess() {
  displayText(roomObjects[3].text[0]);
}

function clickShadow1() {
  if (roomObjects[4].status1 == false){
    displayText(roomObjects[4].text[0]);
  } else if(roomObjects[1].status2 == true) {
    displayText(roomObjects[4].text[1]);
  }
}

function clickShadow2() {
  if (roomObjects[5].status1 == false){
    displayText(roomObjects[5].text[0]);
  } else if(roomObjects[1].status2 == true) {
    displayText(roomObjects[5].text[1]);
  }
}

function clickEscape() {
  if (roomObjects[6].status1 == false) {
    displayText(roomObjects[6].text[0]);
  } else {
    displayText(roomObjects[6].text[1]);
    const shiftOk = document.getElementById('okButton');
    shiftOk.removeEventListener('click',okClick);
    shiftOk.addEventListener('click', function(){transition(room2Div, hall, shiftText, nextRoom)});
  }
}

//--------- Objects ----------//
const lightbulb = new Tool ('Lightbulb', '../images/interface-vectors/bulb-vector.png');

const light = new Interactable ('light', lightText);
const lamp = new Interactable ('lamp', lampText);
const screens = new Interactable ('screen', screenText);
const chess = new Interactable ('chess', chessText);
const shadow1 = new Interactable ('shadow1', shadow1Text);
const shadow2 = new Interactable ('shadow2', shadow2Text);
const escapeDoor = new Interactable ('escape', escapeText);

roomObjects = [
  light,
  lamp,
  screens,
  chess,
  shadow1,
  shadow2,
  escapeDoor,
];

//------------ Event Listeners -------------//
lightDiv.addEventListener('click', clickLight);
lampDiv.addEventListener('click', clickLamp);
screenDiv.addEventListener('click', clickScreen);
chessDiv.addEventListener('click', clickChess);
shadow1Div.addEventListener('click', clickShadow1);
shadow2Div.addEventListener('click', clickShadow2);
escapeDiv.addEventListener('click', clickEscape);

//-------------- Invoker!!! ---------------//
initialize('room2');