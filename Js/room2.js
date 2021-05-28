'use strict'

//--------------- Global Vars -----------------//
roomText = "An ominous living room crowds around you, the inky darkness settling thick on the walls. Shadowy figures ward the door, blocking your path. They seem to feed on the darkness.";

nextRoom = "room3.html";
const room2Div = document.getElementById('room2');
const hall = '../images/hall.png';
const room = 'room2';
const hintArray = ['Banish the shadows.', 'Look for a light source.','Check the lamp?'];
let extraHint = 'Find a lightbulb for the lamp.';

let shiftText = 'Another room escaped, another dimly lit corridor. The darkness deepens until you can barely keep track of the direction you walk.'

let lightText = [
  `You attempt turning the ceiling light on. The switch clicks, but apparently is broken. No light springs from the bulb.`,
  `You carefully unscrew the light bulb, using both hands to avoid dropping it. The darkness in the room seems to intensify.`,
  `You've already taken the light bulb. The broken lightswitch offers little.`
];

let lampText = [
  `The lamp is in good condition, but the bulb is broken. The darkness threatens to consume you until you realize: could there be another bulb?"`,
  `You replace the light bulb and light floods into the living room. The shadows retreat, clearing your path to the door.`,
  `The light continues to shine dimly, just enough to keep the darkness at bay. The nearby door should be safe now, right?`
];

let screenText = [
  `Whe you press the power button, screen flickers. You swear a face blinks on the screen for a second, but the screen fizzles out and shuts off.`,
  `It seems you have witnessed the screen's last gasp. `
];

let chessText = [
  `The pieces seem carefully arranged on the board, leaving signs of an unfinished match, but now is not the time for playing chess.`
];

let shadow1Text = [
  `A large shadow loiters to your left. It seems harmless, but it wont let you leave.`,
  `This shadow no longer poses any threat to you.`
];

let shadow2Text = [
  `The shadow distorts as you approach it, agitated by your proximity. You cautiously back away.`,
  `The shadow can no longer impede your escape.`
];

let escapeText = [
  `You attempt to escape the room, but the shadows block your path. The looming shadows make you think: can you banish the ghost of so many years ago witha little illumination?`,
  `The lamp's soft light chases the darkness away, and the path ahead is clear. You can make your exit`
];

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
    hintArray.push(extraHint);
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